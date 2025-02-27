<template>
  <section class="card">
    <!-- {{ data }} -->
    <momenalert></momenalert>
    <Loader :visible="isLoading" />
    <div :class="{ 'loading-overlay': isLoading }">
      <FilterCalendar ref="filterComponent" :statistics="statistics" :buildingNames="buildingNames" @show-all-resources="showAllResources" @show-building-resources="showBuildingResources" @date-selected="SelectedDateFilterCalendar" />
    <FullCalendar :options="calendarOptions" @select="handleSelect" ref="calendar" :selectedDate="selectedDate">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>
    <CalendarFooter :occupancyData="occupancyData" />
    <div v-if="isOverlayVisible" class="overlay" @click="closePopover"></div>
    <PopoverComponent v-if="isPopoverVisible" :isPopoverVisible="isPopoverVisible" :popoverStyle="popoverStyle" :popoverArrowLeft="popoverArrowLeft" :firstSelectedDate="firstSelectedDate" :lastSelectedDate="lastSelectedDate" @go-to-add-reservation="goToAddReservation" @toggle-sidebar="toggleSidebar" @close-popover="closePopover" />
    <SidebarBlockRoom :is-sidebar-open="isSidebarOpen" title="Block Room" width="400px" @close-sidebar="toggleSidebar" height="auto">
      <BlockRoomForm :selectedDates="selectedDates" :selectedResourceId="selectedResourceId"  @close-sidebar="toggleSidebar" />
    </SidebarBlockRoom>
    <SelectedEventSidebar :selectedEvent="selectedEvent" @navigate-to-edit-reservation="navigateToEditReservation" />
    </div>
  </section>
</template>


<script>
import momenalert from "../../layouts/momenalert.vue";
// Main calendar component from FullCalendar library
import FullCalendar from "@fullcalendar/vue";

// Timeline view plugin for resource scheduling
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

// Plugin for calendar interactions (drag & drop, resizing)
import interactionPlugin from "@fullcalendar/interaction";

// Custom loading spinner component
import Loader from "../layout/Loader.vue";

// Date/Resource filtering controls component
import FilterCalendar from "./FilterCalendar";

// Calendar bottom section with statistics/controls
import CalendarFooter from "./CalendarFooter.vue";

// Form for blocking rooms/units in calendar
import BlockRoomForm from "./BlockRoomForm.vue";

// Popup component for date selection feedback
import PopoverComponent from "./PopoverComponent.vue";

// Reusable sidebar component (from guest management)
import SidebarBlockRoom from "../layout/AddGuestSidebar.vue";

// Sidebar for displaying event details
import SelectedEventSidebar from "./SelectedEventSidebar.vue";

// Calendar header with navigation controls
import HeaderCalender from "./HeaderCalender.vue";

// API service for fetching calendar data
import { deleteBlock, getCalenderAllUnits, postUpdateBlock, postUpdateReservation, putUpdateBlock } from "../../Api/CalenderApi";
import Swal from 'sweetalert2'
import { handleSubmissionError, showSuccessAlert, showConfirmationDialog, showAlert } from "../../Api/MassageValidation/alertUtilities";
import { mapActions } from 'vuex';

export default {
  components: {
    momenalert,
    FullCalendar,
    CalendarFooter,
    PopoverComponent,
    SelectedEventSidebar,
    SidebarBlockRoom,
    BlockRoomForm,
    Loader,
    FilterCalendar,
    HeaderCalender
  },
  data ()
  {
    return {
      linkToAddReservation: '/add-reservation',
      datesBuilding: [],
      buildingNames: [], // Store building names dynamically
      selectedDate: null,
      selectedResourceId: '',
      selectedResourceName: '',
      isLoading: true,
      data: [],
      selectedEvent: null, // Store the data for the selectedEvent
      reservationType: [],
      rateType: [],
      vipStatus: [],
      nationalTypes: [],
      genderTypes: [],
      projects: [],
      remindGuestType: [],
      isSidebarOpen: false,
      isPopoverBodyVisible: true, // Body visibility
      isPopoverVisible: false, // State to control popover visibility
      isOverlayVisible: false, // State to control overlay visibility
      popoverStyle: {}, // Inline style for popover positioning
      popoverArrowLeft: "0px", // Inline style for arrow positioning
      firstSelectedDate: "", // Store first selected date
      lastSelectedDate: "",
      occupancyData: [],
      statistics: {},
      calendarOptions: {
        customButtons: {
          prev: {
            click: this.handlePrevClick
          },
          next: {
            click: this.handleNextClick
          },
          today: {
            text: 'Today',
            click: () => this.handleTodayClick()
          }
        },
        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: "resourceTimeline",
        eventClick: this.handleEventClick,
        duration: this.getDuration(),
        weekends: true,
         editable: true, // Enable dragging and resizing
         eventDrop: this.handleEventChange,
        eventResize: this.handleEventChange,
        eventDidMount: (info) => {
          this.adjustHarnessPosition(info);
          if (info.event.extendedProps?.fullName) {
            info.el.setAttribute('data-full-name', info.event.extendedProps.fullName);
          }
        },        resources: this.createResources(),
        selectable: true, // Enable date selection
        selectMirror: true, // Make the selection draggable
        eventOverlap: false, // Disallow overlapping events
        slotDuration: "24:00", // Slot duration of one day
        datesSet: this.handleDatesSet, // Listen to date changes
        initialDate: this.getTwoDaysAgoDate(),


        // eventColor: 'red', // This will override individual event colors
        slotLabelContent: (arg) =>
        {
          const date = new Date(arg.date);
          // For level 0 (Months), show only the month
          if (arg.level === 0) {
            const month = date.toLocaleDateString("en-US", { month: "short" });
            return {
              html: `
              <div class="custom-slot-label">
                <div class="slot-month">${month}</div>
              </div>
            `,
            };
          }
          // For level 1 (Days), show only the day and weekday
          if (arg.level === 1) {
            const day = date.toLocaleDateString("en-US", { day: "2-digit" });
            const weekday = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            return {
              html: `
              <div class="custom-slot-label">
                <div class="slot-day">${day}</div>
                <div class="slot-weekday">${weekday}</div>
              </div>
            `,
            };
          }

          return null; // For other levels, return null (if any)
        },
        resourceLabelDidMount: function (info)
        {
          // Get the resource's extendedProps
          const { is_clean, is_smoking } = info.resource.extendedProps;

          // Create container for icons
          const iconContainer = document.createElement('span');
          iconContainer.style.float = 'right';
          iconContainer.style.cursor = 'pointer';

          // Add icon for cleanliness status
          const cleanIcon = document.createElement('i');
          cleanIcon.style.paddingRight = '10px';

          if (is_clean) {
            cleanIcon.className = 'fa fa-broom '; // FontAwesome icon for clean
            cleanIcon.style.color = '#28c76f';
            cleanIcon.setAttribute('title', 'This unit is clean');
          } else {
            cleanIcon.className = 'fa fa-trash'; // FontAwesome icon for not clean
            cleanIcon.style.color = '#ea5455';
            cleanIcon.setAttribute('title', 'This unit is not clean');
          }
          cleanIcon.setAttribute('data-bs-toggle', 'tooltip');
          cleanIcon.setAttribute('data-bs-placement', 'top');
          iconContainer.appendChild(cleanIcon);

          // Add icon for smoking status
          const smokingIcon = document.createElement('i');
          if (is_smoking) {
            smokingIcon.className = 'fa fa-smoking'; // FontAwesome icon for smoking
            smokingIcon.style.color = '#ea5455';
            smokingIcon.setAttribute('title', 'Smoking is allowed ');
          } else {
            smokingIcon.className = 'fa fa-smoking-ban'; // FontAwesome icon for no smoking
            smokingIcon.style.color = '#ff9f43';
            smokingIcon.setAttribute('title', 'Smoking is not allowed ');
          }
          smokingIcon.setAttribute('data-bs-toggle', 'tooltip');
          smokingIcon.setAttribute('data-bs-placement', 'top');
          iconContainer.appendChild(smokingIcon);

          // Append the icon container to the resource label
          info.el.querySelector('.fc-datagrid-cell-main').appendChild(iconContainer);

          // Initialize Bootstrap tooltips
          const tooltipTriggerList = [].slice.call(iconContainer.querySelectorAll('[data-bs-toggle="tooltip"]'));
          tooltipTriggerList.forEach(function (tooltipTriggerEl)
          {
            new bootstrap.Tooltip(tooltipTriggerEl); // Activate tooltip
          });
        },

        resourceGroupLaneContent: this.resourceGroupLaneContent,
        resourceAreaWidth: '15%',
        resourceGroupField: "groupId",
        // resourceAreaHeaderContent: this.customResourceHeader, // Customize header
        dateClick: this.handleDateClick,
        select: this.handleSelect,

        footerToolbar: {
          left: "",
          center: "",
          right: "",
        },
      },

    };
  },

  methods: {

    // ==============================================
    // RESOURCE MANAGEMENT
    // ==============================================
    /**
     * Generates calendar resources from building/unit data
     * @param {Array} selectedIds - Building IDs to filter
     * @param {Date} selectedDate - Date to filter units
     */
    createResources (selectedIds = [], selectedDate = null)
    {
      const resources = [];

      if (Array.isArray(this.data)) {
        this.data.forEach((building) =>
        {
          // Only process if building is selected
          if (selectedIds.length === 0 || selectedIds.includes(building.name)) {
            // Add units under the building if they exist
            if (building.units) {
              building.units.forEach((unit) =>
              {
                if (!selectedDate || (unit.date && unit.date === selectedDate)) {
                  resources.push({
                    id: `${building.id}-${unit.id}`,
                    resourceId: building.id,
                    title: unit.code,  // This should display "UNIT-XXXX"
                    groupId: building.name,  // Group by building name (e.g., "Studio")
                    classNames: ["unit"],
                    extendedProps: {
                      is_clean: unit.is_clean,
                      is_smoking: unit.is_smoking,
                      price: unit.price,
                      date: unit.date,
                    },
                  });
                }
              });
            }
          }
        });
      }

      return resources;
    },
    // ==============================================
    // Updating Calendar based on selected building IDs
    // ==============================================

    /**
    * Updates calendar resources based on selected building IDs
    * @param {Array} selectedIds - Building IDs to show
    */
    updateCalendarResources (selectedIds = [])
    {
      const resources = this.createResources(selectedIds); // Create resources based on selectedIds
      const calendar = this.$refs.calendar?.getApi();
      if (calendar) {
        calendar.setOption('resources', resources); // Update the calendar resources
      } else {
        console.error('FullCalendar API is not accessible.');
      }
    },
    showBuildingResources (buildingNames)
    {
      this.updateCalendarResources(buildingNames); // Pass the selected building names
    },
    showAllResources ()
    {
      this.updateCalendarResources(); // No selectedIds means show all resources
    },


    // ==============================================
    // DATE & TIME MANAGEMENT
    // ==============================================

    /**
    * Handles date range selection
    * @param {Object} info - Contains start/end dates and resource
    */
    handleSelect (info)
    {
      const { start, end, resource } = info;

      // Helper to get current Egypt time
      const getCurrentEgyptTime = () =>
      {
        const now = new Date();
        return new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
      };

      // Get current Egypt time and initialize start/end dates
      const currentEgyptTime = getCurrentEgyptTime();
      const startDate = new Date(start);

      // Adjust end date to be the last selected day (subtract 1 day from end)
      const endDate = new Date(end);
      endDate.setDate(endDate.getDate() - 1);

      // Align start and end dates to Egypt's current time
      startDate.setHours(currentEgyptTime.getHours(), currentEgyptTime.getMinutes(), 0, 0);
      endDate.setHours(currentEgyptTime.getHours(), currentEgyptTime.getMinutes(), 0, 0);

      this.selectedDates = [];

      // Helper to format date with time in Egypt timezone
      const formatDateTimeEgypt = (date) =>
      {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Cairo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        return formatter.format(date);
      };

      // Helper to format date only (no time) in Egypt timezone
      const formatDateOnly = (date) =>
      {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Cairo',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return formatter.format(date);
      };

      // Generate all dates between startDate and endDate
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        this.selectedDates.push({
          dateTime: formatDateTimeEgypt(currentDate),
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Store first and last selected dates (endDate is now correct)
      this.firstSelectedDate = formatDateOnly(startDate);
      this.lastSelectedDate = formatDateOnly(endDate);


      // Calculate total days/nights (using adjusted endDate)
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1;
      const nights = totalDays > 0 ? totalDays : 1; // Minimum of 1 night

      // Store nights count
      this.selectedNights = nights;

      // Capture resource ID and name
      if (resource) {
        const unitTitle = resource.title || 'Unknown Unit';
        const buildingName = resource.extendedProps.groupId || 'Unknown Building';
        const resourceId = resource.id || 'Unknown ID';  // Get the resource ID
        this.selectedResourceName = `${unitTitle} - ${buildingName} - ID: ${resourceId}`;  // Include the ID in the name
        this.selectedResourceId = `${resource.title}  - ID: ${resourceId}`;
      } else {
        this.selectedResourceId = null;
        this.selectedResourceName = null;
      }



      // Update highlighted text with formatted dates and nights
      this.updateHighlightedText(this.firstSelectedDate, this.lastSelectedDate, nights);

      // Show overlay if required
      this.showOverlay();
    },
    getTwoDaysAgoDate ()
    {
      const today = new Date()
      //   console.log(today);

      const twoDaysAgo = new Date(today)
      //   console.log(twoDaysAgo)
      twoDaysAgo.setDate(today.getDate() - 2)
      //   console.log(twoDaysAgo)

      return twoDaysAgo
    },

    // ==============================================
    // UI ACTIONS
    // ==============================================

    updateHighlightedText (start, end, nights)
    {
      const calendarEl = document.querySelector(".fc");
      const highlightCells = calendarEl.querySelectorAll(".fc-highlight");

      highlightCells.forEach((highlight) =>
      {
        const tooltip = document.createElement("div");
        tooltip.classList.add("selected-days-tooltip");
        tooltip.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;

        highlight.appendChild(tooltip); // Add the total days count inside the highlighted area
      });

      // Show the popover after the overlay is visible
      this.showPopover();
    },
    // highlightDate (dateStr)
    // {
    //   const calendarEl = document.querySelector(".fc");
    //   const dateCell = calendarEl.querySelector(`[data-date='${dateStr}']`);

    //   if (dateCell) {
    //     dateCell.classList.add("fc-highlight");
    //   }
    // },

    showPopover ()
    {
      this.isPopoverVisible = true;
      this.isPopoverBodyVisible = true; // Ensure body is visible when popover shows

      this.$nextTick(() =>
      {
        const popoverElement = document.querySelector(".popover");
        this.popoverHeight = popoverElement ? popoverElement.offsetHeight : 0;

        const highlightElements = document.querySelectorAll(".fc-highlight");
        if (highlightElements.length > 0) {
          const lastHighlight = highlightElements[highlightElements.length - 1];
          const rect = lastHighlight.getBoundingClientRect();

          this.popoverStyle = {
            left: `${rect.left + rect.width / 2 - popoverElement.offsetWidth / 2}px`,
            top: `${rect.top + window.scrollY - this.popoverHeight - 90}px`,
          };

          this.popoverArrowLeft = `${popoverElement.offsetWidth / 2 - 10}px`;
        } else {
          alert("No highlighted elements found.");
        }
      });
    },
    showOverlay ()
    {
      this.isOverlayVisible = true; // Show the overlay
    },

    closePopover ()
    {
      this.isPopoverVisible = false;
      this.isOverlayVisible = false;
    },
    toggleSidebar ()
    {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.isPopoverVisible = false;
      this.isOverlayVisible = false;
    },

    // ==============================================
    // EVENT HANDLING
    // ==============================================
    handleEventClick (info)
    {
      if (info.event.extendedProps.is_blocked) {
        // Format dates for display
        const startDate = info.event.start.toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });
        const endDate = info.event.end.toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short'
        });

        // Store blocked event details
        this.selectedBlockedEvent = {
          id: info.event.id,
          start: info.event.start,
          end: info.event.end,
          title: info.event.title,
          room: info.event.extendedProps.room || 'Not specified'
        };


        // Show detailed confirmation dialog
        Swal.fire({
          title: 'Blocked Room Details',
          html: `
        <div class="text-left">
          <p><strong>Start:</strong> ${startDate}</p>
          <p><strong>End:</strong> ${endDate}</p>
          <p><strong>Room:</strong> ${this.selectedBlockedEvent.title}</p>
        </div>
      `,
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#7367f0',
          cancelButtonColor: '#e2e1e5',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Close',
        }).then((result) =>
        {
          if (result.isConfirmed) {
            // Show delete confirmation
            this.deleteBlockedPeriod();
          } else if (result.isDenied) {
            // Handle edit functionality
            this.editBlockedPeriod();
          }
        });
      } else {
        // For reservations (existing logic)
        this.selectedEvent = this.transformEventToReservationData(info.event);
        this.openOffcanvas();
      }
    },

    async deleteBlockedPeriod ()
    {
      try {
        // Make API call to delete the blocked period
        await deleteBlock(this.selectedBlockedEvent.id);

        // Remove the event from the calendar
        const calendar = this.$refs.calendar.getApi();
        const event = calendar.getEventById(this.selectedBlockedEvent.id);
        if (event) {
          event.remove();
        }

        // Show success message
        showAlert({
          title: 'Deleted!',
          text: 'The blocked period has been successfully removed.',
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } catch (error) {
        // Handle error
        showAlert({
          title: 'Error!',
          text: 'Failed to delete the blocked period. Please try again.',
          icon: 'error'
        });
        // console.error('Error deleting blocked period:', error);
      }
    },

    transformUnitToEvents (unitData)
    {
      const events = [];
      const handledReservations = new Set();

      // Process reservations first
      unitData.dates.forEach(dateInfo =>
      {
        if (dateInfo.is_reserved && dateInfo.reservation && !handledReservations.has(dateInfo.reservation.id)) {
          const reservation = dateInfo.reservation;
          const fullName = reservation.client?.name || reservation.user?.name || 'Unknown';
          const shortName = fullName.substring(0, 2).toUpperCase(); // Get first 2 letters and capitalize

          events.push({
            resourceId: unitData.code,
            title: shortName,
            start: reservation.checkin_date.split('T')[0],
            end: reservation.checkout_date.split('T')[0] + 'T23:59:59',
            color: '#7367f0',
            reservationId: reservation.id,
            extendedProps: {
              reservation: reservation,
              fullName: fullName, // Store full name for tooltip
            },
            classNames: ['custom-event', 'hoverable-event'], // Add hoverable class
          });

          handledReservations.add(reservation.id);
        }
      });

      // Process blocked dates
      let currentBlock = null;
      const sortedDates = [...unitData.dates]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach((dateInfo, index) =>
        {
          if (dateInfo.is_blocked) {
            if (!currentBlock) {
              currentBlock = {
                id: dateInfo.block.id,
                resourceId: unitData.code,
                title: `Blocked Reason: ${dateInfo.block.reason.name || 'No reason provided'}`,
                start: dateInfo.date,
                end: dateInfo.date,
                color: '#4b4b4b',
                extendedProps: {
                  is_blocked: true,
                  block_reason: dateInfo.block_reason || 'No reason provided',
                  block: dateInfo.block,
                  reason_id: dateInfo.block.reason?.id
                },
                classNames: ['custom-event'],
              };
            }

            // Update end date to the end of the current day
            const endDate = new Date(dateInfo.date);
            endDate.setHours(23, 59, 59, 999); // Set to the end of the day
            currentBlock.end = endDate.toISOString();
          } else if (currentBlock) {
            events.push(currentBlock);
            currentBlock = null;
          }
        });

      if (currentBlock) {
        events.push(currentBlock);
      }

      return events;
    },
    transformEventToReservationData (event)
    {

      return {
        client: event.extendedProps?.reservation?.client,
        unit_id: event.extendedProps?.reservation?.unit_id,
        id: event.extendedProps?.reservation?.id || event.id,
        checkin_date: event.start,
        checkout_date: event.end,
        checkin_time: event.extendedProps?.reservation?.checkin_time,
        checkout_time: event.extendedProps?.reservation?.checkout_time,
        rooms: event.extendedProps?.reservation?.rooms,
        rate_type: event.extendedProps?.reservation?.rate_type,
        adults: event.extendedProps?.reservation?.adults,
        children: event.extendedProps?.reservation?.children,
        status: event.extendedProps?.reservation?.status,
        status_name: event.extendedProps?.reservation?.status_name,
        unit_price: event.extendedProps?.reservation?.unit_price,
        total: event.extendedProps?.reservation?.total,
        paid: event.extendedProps?.reservation?.paid,
        balance: event.extendedProps?.reservation?.remaining,
        status_select: event.extendedProps?.reservation?.status_select,
      };
    },
    transformAllUnitsToEvents ()
    {
      let allEvents = [];

      if (Array.isArray(this.data)) {
        this.data.forEach(building =>
        {
          if (building.units) {
            building.units.forEach(unit =>
            {
              const unitEvents = this.transformUnitToEvents({
                ...unit,
                code: `${building.id}-${unit.id}` // Match the resourceId format
              });
              allEvents = [...allEvents, ...unitEvents];
            });
          }
        });
      }

      return allEvents;
     },

async handleEventChange(info) {
    try {
      const event = info.event;
      console.log(event);
      const resourceId = event.getResources()[0]?.id;
      const unitId = resourceId?.split('-')[1];

      // Get the original reservation times from extendedProps
      const originalCheckinTime = event.extendedProps?.reservation?.checkin_time || '14:00:00';
      const originalCheckoutTime = event.extendedProps?.reservation?.checkout_time || '12:00:00';

      // Adjust dates to handle timezone offset
      const startDateObj = new Date(event.start);
      const endDateObj = new Date(event.end);

      // Format dates correctly with local timezone
      const startDate = `${startDateObj.getFullYear()}-${String(startDateObj.getMonth() + 1).padStart(2, '0')}-${String(startDateObj.getDate())}`;
      const endDate = `${endDateObj.getFullYear()}-${String(endDateObj.getMonth() + 1).padStart(2, '0')}-${String(endDateObj.getDate())}`;

      // Check if this is a blocked event or reservation
      if (event.extendedProps?.is_blocked) {
        // Extract reason_id from the block event
        const reasonId = event.extendedProps?.block?.reason?.id ||
                        event.extendedProps?.reason_id;

        // Handle blocked event update
        const updateDataBlock = {
          unit_id: unitId,
          start_date: startDate,
          end_date: endDate,
          block_id: event.id,
          reason_id: reasonId // Add the reason_id here
        };

        const result = await showConfirmationDialog("Are you sure you want to update this blocked period?");

        if (result.isConfirmed) {
          // Make API call to update blocked period
          const response = await putUpdateBlock(updateDataBlock.block_id, updateDataBlock);

          // Update the event in the calendar
          event.setDates(startDate, endDate);
          event.setResources([resourceId]);

          await showSuccessAlert("Blocked period updated successfully!");
        } else {
          info.revert(); // Revert the change if not confirmed
        }
      } else {
        // Handle reservation update
        const updateDataUnit = {
          unit_id: unitId,
          checkin_date: startDate,
          checkout_date: endDate,
          reservation_id: event.extendedProps?.reservation?.id
        };


        const result = await showConfirmationDialog("Are you sure you want to update this reservation?");

        if (result.isConfirmed) {
          const response = await postUpdateReservation(updateDataUnit.reservation_id, updateDataUnit);

          // Get the calendar API
          const calendarApi = this.$refs.calendar.getApi();

          // Remove the old event
          event.remove();

          // Create a new event with updated properties
          calendarApi.addEvent({
            resourceId: resourceId,
            title: event.title,
            start: startDate,
            end: endDate,
            color: event.backgroundColor,
            extendedProps: {
              ...event.extendedProps,
              reservation: {
                ...event.extendedProps.reservation,
                checkin_date: startDate,
                checkout_date: endDate,
                checkin_time: originalCheckinTime,
                checkout_time: originalCheckoutTime,
                unit_id: unitId
              }
            },
            classNames: event.classNames
          });

          await showSuccessAlert("Reservation updated successfully!");
        } else {
          info.revert(); // Revert the change if not confirmed
        }
      }
    } catch (error) {
      handleSubmissionError(error, "Failed to update event");
      info.revert();
    } finally {
      this.isLoading = false;
    }
},

// Add validation method
validateEventChange(event, newStart, newEnd) {
    // Check if dates are valid
    if (!newStart || !newEnd || newStart >= newEnd) {
      return false;
    }

    // Check if the new dates overlap with other events
    const calendar = this.$refs.calendar.getApi();
    const events = calendar.getEvents();
    const resourceId = event.getResources()[0]?.id;

    for (const existingEvent of events) {
      if (existingEvent === event) continue;

      if (existingEvent.getResources()[0]?.id === resourceId) {
        // Check for overlap
        if (!(newEnd <= existingEvent.start || newStart >= existingEvent.end)) {
          return false;
        }
      }
    }

    return true;
  },
  adjustHarnessPosition(info) {
    // Get the harness element parent
    const harness = info.el.closest('.fc-timeline-event-harness');

    if (harness) {
        // Get current left position (parse as number)
        const currentLeft = parseInt(harness.style.left) || 0;
        const currentRight = parseInt(harness.style.right) || 0;

        // Determine breakpoints and adjust accordingly
        let leftOffset = 35; // Default value
        let rightOffset = 5; // Default value
        let widthAdjustment = 0;

        const screenWidth = window.innerWidth;

        // Example breakpoints for different screen sizes
        if (screenWidth < 600) {
            // Small screens (mobile)
            leftOffset = 20;
            rightOffset = 0;
        } else if (screenWidth < 1200) {
            // Medium screens (tablets)
            leftOffset = 30;
            rightOffset =0;
        } else {
            // Large screens (desktops)
            leftOffset = 50;
            rightOffset = -6;
        }

        // Adjust the left and right positions
        harness.style.left = `${currentLeft + leftOffset}px`;
        harness.style.right = `${currentRight + rightOffset}px`;

        // Adjust the width of the event element
        const eventElement = harness.querySelector('.fc-timeline-event');
        if (eventElement) {
            const currentWidth = eventElement.offsetWidth;

            // Calculate width adjustment based on the offsets
            widthAdjustment = leftOffset + rightOffset;
            eventElement.style.width = `${currentWidth - widthAdjustment}px`;

        }
    }
}
,


    // ==============================================
    // CALENDAR NAVIGATION
    // ==============================================

    handlePrevClick ()
    {
      this.$refs.calendar.getApi().prev(); // Navigate to the previous time period
      this.handleNavigation('prev'); // Update calendar data and visuals
    },

    handleNextClick ()
    {
      this.$refs.calendar.getApi().next();
      this.handleNavigation('next');
    },

    async handleNavigation (direction)
    {
      try {
        this.isLoading = true;
        const calendarApi = this.$refs.calendar.getApi();
        const view = calendarApi.view;

        // Get current view dates
        const start = view.activeStart;
        const end = view.activeEnd;

        // Format dates for server
        let startDate = start.toISOString().split('T')[0];
        const endDate = end.toISOString().split('T')[0];

        // Modify startDate by adding 1 day
        const startDateObj = new Date(startDate);
        startDateObj.setDate(startDateObj.getDate() + 1);
        startDate = startDateObj.toISOString().split('T')[0];

        // Fetch data for the new date range
        const response = await getCalenderAllUnits({
          start: startDate,
          end: endDate
        });

        // Update data sources
        this.data = response.data;

        // Transform the new data into events
        const newEvents = this.transformAllUnitsToEvents();

        // Update the calendar with new events
        calendarApi.removeAllEvents(); // Clear existing events
        calendarApi.addEventSource(newEvents); // Add new events

        // If you're using resources, uncomment these lines:
        // const resources = this.createResources();
        // calendarApi.setOption('resources', resources);
        // calendarApi.refetchResources();

      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async handleTodayClick ()
    {
      try {
        this.isLoading = true;
        const calendarApi = this.$refs.calendar.getApi();

        // Navigate to two days ago
        const twoDaysAgo = this.getTwoDaysAgoDate();
        calendarApi.gotoDate(twoDaysAgo);

        // Get the new date range
        const view = calendarApi.view;
        let startDate = view.activeStart.toISOString().split('T')[0];
        const endDate = view.activeEnd.toISOString().split('T')[0];

        // Adjust start date
        const startDateObj = new Date(startDate);
        startDateObj.setDate(startDateObj.getDate() + 1);
        startDate = startDateObj.toISOString().split('T')[0];

        // Fetch new data
        const response = await getCalenderAllUnits({
          start: startDate,
          end: endDate
        });

        // Update data and events
        this.data = response.data;
        const newEvents = this.transformAllUnitsToEvents();
        calendarApi.removeAllEvents();
        calendarApi.addEventSource(newEvents);

      } catch (error) {
        console.error('Today navigation error:', error);
      } finally {
        this.isLoading = false;
      }
    }
    ,

    // ==============================================
    // CALENDAR SETUP & CONFIG
    // ==============================================

    handleDatesSet (dateInfo)
    {
      const startDate = dateInfo.start; // The first visible date in the calendar
      this.updateFlatpickrDate(startDate); // Update Flatpickr with the start date
    },
    updateFlatpickrDate (date)
    {
      // Emit the date to the FilterCalendar component
      if (this.$refs.filterComponent) {
        this.$refs.filterComponent.$refs.headerCalender.updateFlatpickr(date);
      } else {
        console.error("FilterCalendar ref is not available.");
      }
    },


    handleCalendarReady (info)
    {
      this.calendarApi = info.view.calendar
    },
    SelectedDateFilterCalendar (selectedDate)
    {
      // Update the selected date
      this.selectedDate = selectedDate;

      // Access the FullCalendar API and navigate to the selected date
      const calendarApi = this.$refs.calendar.getApi();
      if (calendarApi) {
        calendarApi.gotoDate(selectedDate);
        // Trigger data update after navigation
        this.$nextTick(() =>
        {
          this.handleNavigation('date-select');
        });
      } else {
        console.error('FullCalendar API is not available.');
      }
    },

    // ==============================================
    // DATA TRANSFORMATION
    // ==============================================
    getBuildingNames ()
    {
      const names = [];
      this.data.forEach((building) =>
      {
        if (building.name && !names.includes(building.name)) {
          names.push(building.name);
        }
      });
      return names;
    },

    // ==============================================
    // ROUTING & STATE MANAGEMENT
    // ==============================================
    navigateToEditReservation (id)
    {
      this.$router.push(`/edit-reservation/${id}`);
    },
    goToAddReservation ()
    {
      this.$store.commit('setSelectedDates', this.selectedDates);
      this.$store.commit('setSelectedResourceName', this.selectedResourceName);
      this.$store.dispatch('allowAccess')
      this.$router.push('/add-reservation')
      // this.$router.push('/secret')

      // Navigate to the add-reservation page
      // this.$router.push({ name: '' });
      // this.$router.push('/secret')

    },
    // ==============================================
    // SelectedEvent Sidebar Component Methods
    // ==============================================
    openOffcanvas ()
    {
      this.$nextTick(() =>
      {
        const offcanvasElement = document.getElementById('offcanvasEnd');
        if (offcanvasElement) {
          const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
          offcanvas.show();
        } else {
          console.error('Offcanvas element not found.');
        }
      });
    },

    ...mapActions([
      'updateReservationTypes',
      'updateRateTypes',
      'updateCountries',
      'updateVipStatus',
      'updateNationalTypes',
      'updateGenderTypes',
      'updateProjects',
      'updateRemindGuestType',
    ]),

    refreshCalendarData () {
      // Implement the logic to refresh the calendar data
      this.handleNavigation('refresh');
    },

    // Add this new method to handle data updates
    async updateCalendarData(filterData) {
      try {
        this.isLoading = true;

        // Get the calendar API instance
        const calendarApi = this.$refs.calendar.getApi();

        // Update the component's data
        this.data = filterData;

        // Transform the new data into events
        const newEvents = this.transformAllUnitsToEvents();

        // Update calendar events
        calendarApi.removeAllEvents();
        calendarApi.addEventSource(newEvents);

        // Update resources if needed
        const resources = this.createResources();
        calendarApi.setOption('resources', resources);

      } catch (error) {
        console.error('Error updating calendar data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    getDuration() {
      // Check if the device is mobile
      const isMobile = window.innerWidth <= 768; // You can adjust the width threshold as needed
      return { days: isMobile ? 10 : 20 };
    },

    updateDuration() {
      this.calendarOptions.duration = this.getDuration();
    },

  },
  async mounted ()
  {
    try {
      const [CalenderDataResponse] = await Promise.all([getCalenderAllUnits()]);
      this.data = CalenderDataResponse.data;
      this.reservationType = CalenderDataResponse.reservation_type;
      this.rateType = CalenderDataResponse.rate_type;
      this.countries = CalenderDataResponse.countries;
      this.vipStatus = CalenderDataResponse.vip_status;
      this.nationalTypes = CalenderDataResponse.national_type;
      this.genderTypes = CalenderDataResponse.gender_type;
      this.projects = CalenderDataResponse.projects;
      this.remindGuestType = CalenderDataResponse.release_type;
      this.buildingNames = this.getBuildingNames();
      const events = this.transformAllUnitsToEvents();
      this.calendarOptions = { ...this.calendarOptions, events };

      // Initialize calendar resources
      this.calendarOptions.resources = this.createResources();

      // Set up DOM elements after render
      this.$nextTick(() =>
      {
        const footerElement = document.querySelector("#calendar-footer");
        if (footerElement) footerElement.style.display = "block";
      });

      // Store the data in Vuex when received
      this.updateReservationTypes(this.reservationType);
      this.updateRateTypes(this.rateType);
      this.updateCountries(this.countries);
      this.updateVipStatus(this.vipStatus);
      this.updateNationalTypes(this.nationalTypes);
      this.updateGenderTypes(this.genderTypes);
      this.updateProjects(this.projects);
      this.updateRemindGuestType(this.remindGuestType);

      // Listen for data updates from HeaderCalender
      this.$root.$on('calendar-data-updated', this.updateCalendarData);

      // Add an event listener to update duration on window resize
      window.addEventListener('resize', this.updateDuration);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      this.isLoading = false;
    }

  },
  beforeDestroy() {
    // Clean up the event listener when component is destroyed
    this.$root.$off('calendar-data-updated', this.updateCalendarData);

    // Clean up the event listener
    window.removeEventListener('resize', this.updateDuration);
  }
}
</script>

<style>
/* ... existing styles ... */


</style>
