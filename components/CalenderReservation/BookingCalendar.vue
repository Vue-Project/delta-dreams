<template>
  <section class="card">
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
      <BlockRoomForm :selectedDates="selectedDates" :selectedResourceId="selectedResourceId" @close-sidebar="toggleSidebar" />
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
import { deleteBlock, getCalenderAllUnits, postUpdateReservation } from "../../Api/CalenderApi";
import Swal from 'sweetalert2'
import { handleSubmissionError, showSuccessAlert, showConfirmationDialog, showAlert } from "../../Api/MassageValidation/alertUtilities";

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
        duration: { days: 20 },
        weekends: true,
         editable: true, // Enable dragging and resizing
         eventDrop: this.handleEventChange,
        eventResize: this.handleEventChange,
        eventDidMount: (info) => {
          this.adjustHarnessPosition(info);
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
      selectedEvent: null, // Store the data for the selectedEvent
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
          const start = reservation.checkin_date.split('T')[0];
          const end = reservation.checkout_date.split('T')[0];

          events.push({
            resourceId: unitData.code,
            title: `Reserved by ${reservation.user?.name || 'Unknown'}`,
            start: start,
            end: end + 'T23:59:59',
            color: '#7367f0',
            reservationId: reservation.id,
            extendedProps: {
              reservation: reservation, // Include the full reservation object
            },
            classNames: ['custom-event'],
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
                id: dateInfo.block.id, // Add this line to include the block ID
                resourceId: unitData.code,
                title: `Blocked Reason: ${dateInfo.block.reason.name || 'No reason provided'}`,
                start: dateInfo.date,
                end: dateInfo.date,
                color: '#4b4b4b',
                extendedProps: {
                  is_blocked: true, // Indicate this is a blocked date
                  block_reason: dateInfo.block_reason || 'No reason provided',
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
        user: event.extendedProps?.reservation?.user,
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
    // Show loading state

    try {
      const event = info.event;
    const resourceId = event.getResources()[0]?.id;

    const unitId = resourceId?.split('-')[1];


    const startDate = event.start.toISOString().split('T')[0];
    const endDate = event.end.toISOString().split('T')[0];

      // Prepare the update data
      const updateData = {
        unit_id: unitId,
        checkin_date: startDate,
        checkout_date: endDate,
        reservation_id: event.extendedProps?.reservation?.id
      };
      console.log(updateData);


      // Show confirmation dialog
      const result = await showConfirmationDialog("Are you sure you want to update this reservation?");

      if (result.isConfirmed) {
        // Replace 'updateReservation' with your actual API endpoint
        const response = await postUpdateReservation(updateData.reservation_id, updateData);

        if (response.data.success) {
          await showSuccessAlert(
          "Reservation updated successfully!", // Custom message

        );
        } else {
          throw new Error('Failed to update reservation');
        }
      } else {
        // If user cancels, revert the change
        info.revert();
      }
    } catch (error) {

      // Show error message
      handleSubmissionError(
          error,
          "Failed to update reservation." // Custom default error
        );

      // Revert the calendar event to its original position/size
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
            rightOffset = 5;
        } else if (screenWidth < 1200) {
            // Medium screens (tablets)
            leftOffset = 30;
            rightOffset =0;
        } else {
            // Large screens (desktops)
            leftOffset = 40;
            rightOffset = 15;
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
            console.log('widthAdjustment', widthAdjustment);
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
    // ==============================================
    // DEPRECATED/UNUSED METHODS
    // ==============================================

    // Custom resource header function
    // customResourceHeader ()
    // {
    //   let htmlContent = `
    // <div class="resource-header" style="position: relative;">
    //   <div class="btn-group" style="width: 100%;">
    //     <button class="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    //       Room Type
    //     </button>
    //     <ul class="dropdown-menu" style="width: 100%;">
    //       <li>
    //         <div class="form-check" style="padding:10px 40px;">
    //           <input type="checkbox" class="form-check-input" id="select-all-checkbox" @click="selectAllResources">
    //           <label class="form-check-label" for="select-all-checkbox">Select All</label>
    //         </div>
    //       </li>`;

    //   const allResources = this.createResources(); // Get all resources initially

    //   // Add room options dynamically as checkboxes
    //   allResources.forEach((resource) =>
    //   {
    //     if (!resource.classNames.includes('unit')) { // Filter out units, as we only want rooms
    //       htmlContent += `
    //     <li>
    //       <div class="form-check" style="padding:10px 40px;">
    //         <input type="checkbox" class="form-check-input room-checkbox"
    //           id="bs-validation-checkbox-${resource.id}"
    //           data-id="${resource.id}" @click="toggleResourceSelection(resource)">
    //         <label class="form-check-label"
    //           for="bs-validation-checkbox-${resource.id}">${resource.title}</label>
    //       </div>
    //     </li>`;
    //     }
    //   });

    //   htmlContent += `
    //     </ul>
    //   </div>
    // </div>`;

    //   const div = document.createElement("div");
    //   div.innerHTML = htmlContent.trim();

    //   // Return the div element to be inserted into the DOM
    //   return { domNodes: [div.firstElementChild] };
    // },


    // Add this method to transform all units data
    // Update calendar events
    // updateCalendarEvents ()
    // {
    //   const events = this.transformAllUnitsToEvents();
    //   const calendar = this.$refs.calendar?.getApi();
    //   if (calendar) {
    //     calendar.removeAllEvents();
    //     calendar.addEventSource(events);
    //   }

    // },

    //   groupBuildingsByDate (datesBuilding)
    // {
    //   const grouped = {};
    //   datesBuilding.forEach(buildingDate =>
    //   {
    //     const dateKey = buildingDate.date; // Assuming date is a string like '2025-01-18'
    //     if (!grouped[dateKey]) {
    //       grouped[dateKey] = [];
    //     }
    //     grouped[dateKey].push(buildingDate);
    //   });
    //   return grouped;
    // },
    // resourceGroupLaneContent (arg)
    // {
    //   // console.log(this.datesBuilding);

    //   const laneContent = document.createElement('div');
    //   laneContent.style.display = 'flex';
    //   laneContent.style.width = '100%';
    //   laneContent.style.height = '37px';
    //   laneContent.style.padding = '0px';

    //   const slotMinWidth = arg.view.calendar.getOption('slotMinWidth');
    //   console.log(slotMinWidth);
    //   const visibleStartDate = arg.view.intervalStart;
    //   console.log(visibleStartDate);

    //   const visibleEndDate = arg.view.intervalEnd;
    //   console.log(visibleEndDate);


    //   // Generate array of dates in visible range
    //   const visibleDates = [];
    //   let currentDate = new Date(visibleStartDate);
    //   while (currentDate < visibleEndDate) {
    //     visibleDates.push(new Date(currentDate));
    //     currentDate.setDate(currentDate.getDate() + 1);
    //   }

    //   // Group buildings by date
    //   const groupedBuildings = this.groupBuildingsByDate(this.datesBuilding);
    //   console.log(groupedBuildings);

    //   visibleDates.forEach(date =>
    //   {
    //     const dateKey = date.toISOString().split('T')[0]; // '2025-01-18'
    //     const buildingsForDate = groupedBuildings[dateKey] || [];

    //     const dateContainer = document.createElement('div');
    //     dateContainer.style.display = 'flex';
    //     dateContainer.style.flexDirection = 'column';
    //     dateContainer.style.alignItems = 'center';
    //     dateContainer.style.width = slotMinWidth + 'px';
    //     dateContainer.style.borderRight = '1px solid #ccc';
    //     dateContainer.style.boxSizing = 'border-box';

    //     if (buildingsForDate.length > 0) {
    //       buildingsForDate.forEach(building =>
    //       {
    //         const buildingInfo = document.createElement('div');
    //         buildingInfo.textContent = `Units: ${building.available_units}, Price: ${building.price}`;
    //         dateContainer.appendChild(buildingInfo);
    //       });
    //     } else {
    //       const noDataMessage = document.createElement('div');
    //       noDataMessage.textContent = 'No data';
    //       dateContainer.appendChild(noDataMessage);
    //     }

    //     laneContent.appendChild(dateContainer);
    //   });
    // toggleResourceExpand (selectedRoomId = null)
    // {
    //   this.isExpanded = !this.isExpanded; // Toggle expand/collapse state

    //   const resourceCells = document.querySelectorAll(
    //     ".fc-datagrid-cell.fc-resource"
    //   );
    //   const subroomCells = document.querySelectorAll(
    //     ".fc-datagrid-cell.fc-subroom"
    //   );

    //   // If a room is selected, collapse or expand that specific resource
    //   if (selectedRoomId) {
    //     const resourceCell = document.querySelector(
    //       `[data-resource-id='${selectedRoomId}']`
    //     );
    //     if (resourceCell) {
    //       const subCells = document.querySelectorAll(
    //         `[data-resource-id='${selectedRoomId}']`
    //       );
    //       subCells.forEach((subCell) =>
    //       {
    //         if (this.isExpanded) {
    //           subCell.classList.remove("collapsed");
    //         } else {
    //           subCell.classList.add("collapsed");
    //         }
    //       });
    //     }
    //   } else {
    //     // If no specific room is selected, toggle all rooms
    //     resourceCells.forEach((cell) =>
    //     {
    //       const roomId = cell.dataset.resourceId;
    //       if (this.isExpanded) {
    //         document
    //           .querySelectorAll(`[data-resource-id='${roomId}']`)
    //           .forEach((subCell) =>
    //           {
    //             subCell.classList.remove("collapsed");
    //           });
    //       } else {
    //         document
    //           .querySelectorAll(`[data-resource-id='${roomId}']`)
    //           .forEach((subCell) =>
    //           {
    //             subCell.classList.add("collapsed");
    //           });
    //       }
    //     });
    //   }
    // },



  },
  async mounted ()
  {
    try {
      const [CalenderDataResponse] = await Promise.all([getCalenderAllUnits()]);
      this.data = CalenderDataResponse.data;
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

    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      this.isLoading = false;
    }

}

}
</script>
