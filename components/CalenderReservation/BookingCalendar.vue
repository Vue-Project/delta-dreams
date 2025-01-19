<template>
  <section class="card">
    <Loader :visible="isLoading" />
    <div v-if="!isLoading">
      <FilterCalendar @date-selected="SelectedDateFilterCalendar" :statistics="statistics" :buildingNames="buildingNames" @show-all-resources="showAllResources" @show-building-resources="showBuildingResources" />
      <FullCalendar :options="calendarOptions" @select="handleSelect" ref="calendar">
        <template v-slot:eventContent="arg">
          <b>{{ arg.event.title }}</b>
        </template>
      </FullCalendar>
      <CalendarFooter :occupancyData="occupancyData" />
      <div v-if="isOverlayVisible" class="overlay" @click="closePopover"></div>
      <PopoverComponent v-if="isPopoverVisible" :isPopoverVisible="isPopoverVisible" :popoverStyle="popoverStyle" :popoverArrowLeft="popoverArrowLeft" :firstSelectedDate="firstSelectedDate" :lastSelectedDate="lastSelectedDate" @go-to-add-reservation="goToAddReservation" @toggle-sidebar="toggleSidebar" @close-popover="closePopover" />
      <SidebarBlockRoom :is-sidebar-open="isSidebarOpen" title="Block Room" width="400px" @close-sidebar="toggleSidebar">
        <BlockRoomForm :selectedDates="selectedDates" :selectedResourceId="selectedResourceId" @close-sidebar="toggleSidebar" />
      </SidebarBlockRoom>
      <SelectedEventSidebar :selectedEvent="selectedEvent" @navigate-to-edit-reservation="navigateToEditReservation" />
    </div>
  </section>
</template>


<script>

import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import Loader from "../layout/Loader.vue";
import FilterCalendar from "./FilterCalendar";
import CalendarFooter from "./CalendarFooter.vue";
import BlockRoomForm from "./BlockRoomForm.vue";
import PopoverComponent from "./PopoverComponent.vue";
import SidebarBlockRoom from "../layout/AddGuestSidebar.vue";
import { getCalenderAllUnits } from "../../Api/CalenderApi";
import SelectedEventSidebar from "./SelectedEventSidebar.vue";

export default {
  components: {
    FullCalendar,
    CalendarFooter,
    PopoverComponent,
    SelectedEventSidebar,
    SidebarBlockRoom,
    BlockRoomForm,
    Loader,
    FilterCalendar,
  },
  data ()
  {
    return {
      linkToAddReservation: '/add-reservation',
      datesBuilding: [],
      buildingNames: [], // Store building names dynamically
      selectedDates: '',
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
        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: "resourceTimeline",
        eventClick: this.handleEventClick,
        duration: { days: 20 },
        weekends: true,
        // editable: true, // Enable dragging and resizing
        resources: this.createResources(),
        selectable: true, // Enable date selection
        selectMirror: true, // Make the selection draggable
        eventOverlap: false, // Disallow overlapping events
        slotDuration: "24:00", // Slot duration of one day
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
            cleanIcon.className = 'fa fa-broom'; // FontAwesome icon for clean
            // cleanIcon.style.color = 'green';
            cleanIcon.setAttribute('title', 'This unit is clean');
          } else {
            cleanIcon.className = 'fa fa-trash'; // FontAwesome icon for not clean
            // cleanIcon.style.color = 'orange';
            cleanIcon.setAttribute('title', 'This unit is not clean');
          }
          cleanIcon.setAttribute('data-bs-toggle', 'tooltip');
          cleanIcon.setAttribute('data-bs-placement', 'top');
          iconContainer.appendChild(cleanIcon);

          // Add icon for smoking status
          const smokingIcon = document.createElement('i');
          if (is_smoking) {
            smokingIcon.className = 'fa fa-smoking'; // FontAwesome icon for smoking
            // smokingIcon.style.color = 'red';
            smokingIcon.setAttribute('title', 'Smoking is allowed ');
          } else {
            smokingIcon.className = 'fa fa-smoking-ban'; // FontAwesome icon for no smoking
            // smokingIcon.style.color = 'blue';
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


    // groupBuildingsByDate (datesBuilding)
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

    //   return { domNodes: [laneContent] };
    // },


    /**
     * Generates a list of resources from predefined room data.
     *
     * This function takes a set of room data, each containing a list of subrooms,
     * and constructs a resources array. Each room and subroom is transformed into a resource
     * object with specific properties like `id`, `title`, `groupId`, and `classNames`.
     *
     * - Rooms are identified by their `id` and `title`, and are assigned a `groupId` corresponding
     *   to their `id`. They are also given a "resource" class for easy selection.
     *
     * - Subrooms are identified by a composite `id` (combining room and subroom identifiers),
     *   `title`, `resourceId` (corresponding to the parent room's `id`), and `groupId`.
     *   They are given a "subroom" class for easy selection.
     *
     * @param {Array} rooms - An array of room data, each containing a list of subrooms
     * @returns {Array} An array of resources, where each resource represents a room or subroom
     *                  with specific attributes for identification and styling.
     */
    createResources (selectedIds = [], selectedDate = null)
    {
      const resources = [];

      if (Array.isArray(this.data)) {
        this.data.forEach((building) =>
        {
          // Include building resource if "Show All" or selectedIds includes building.name
          if (selectedIds.length === 0 || selectedIds.includes(building.name)) {
            // Add the building resource
            resources.push({
              id: building.name, // Unique ID for the building
              groupId: building.name, // Group ID for the building
              title: building.name, // Display name for the building
              classNames: ["building"], // CSS class for styling
            });

            // Add units under the building if they exist
            if (building.units?.data) {
              building.units.data.forEach((unit) =>
              {
                // Include unit if no date is selected or unit.date matches selectedDate
                if (!selectedDate || (unit.date && unit.date === selectedDate)) {
                  resources.push({
                    id: `${building.id}-${unit.id}`, // Unique ID for the unit
                    resourceId: building.id, // Link unit to the building
                    title: unit.code, // Display unit code (not building name)
                    groupId: building.name, // Group ID for the building
                    classNames: ["unit"], // CSS class for styling
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

      return resources; // Return the filtered resources
    },
    /**
     * Update the FullCalendar resources based on the given selectedIds.
     * This will re-render the calendar with resources filtered by the given selectedIds.
     * If no selectedIds are given, all resources are shown.
     * @param {Array<string>} selectedIds - An array of IDs to filter the resources by. If empty, all resources are shown.
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
    // Show resources for specific buildings
    showBuildingResources (buildingNames)
    {
      this.updateCalendarResources(buildingNames); // Pass the selected building names
    },
    // Show all resources (no filter)
    showAllResources ()
    {
      this.updateCalendarResources(); // No selectedIds means show all resources
    },
    /**
     * Handles date selection event from FullCalendar.
     *
     * Given the date range selection, it loops through the selected dates and
     * highlights the corresponding cells in the calendar, and stores the
     * dates in the `selectedDates` array.
     *
     * After selection, it updates the highlighted text and shows the popover.
     *
     * @param {Object} info - Selection info object containing `start` and `end` dates
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
      const endDate = new Date(end);

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

      // Store first and last selected dates
      this.firstSelectedDate = formatDateOnly(startDate);
      this.lastSelectedDate = formatDateOnly(endDate);

      // Calculate total days/nights
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
      const nights = totalDays > 0 ? totalDays : 1; // Minimum of 1 night

      // Store nights count
      this.selectedNights = nights;

      // Capture resource ID and name
      if (resource) {
        const unitTitle = resource.title || 'Unknown Unit';
        const buildingName = resource.extendedProps.groupId || 'Unknown Building';
        const resourceId = resource.id || 'Unknown ID';  // Get the resource ID
        this.selectedResourceName = `${unitTitle} - ${buildingName} - ID: ${resourceId}`;  // Include the ID in the name
        this.selectedResourceId = resource.id;
      } else {
        this.selectedResourceId = null;
        this.selectedResourceName = null;
      }



      // Update highlighted text with formatted dates and nights
      this.updateHighlightedText(this.firstSelectedDate, this.lastSelectedDate, nights);

      // Show overlay if required
      this.showOverlay();
    },
    /**
     * Highlights the cell for a given date in the calendar.
     *
     * It does this by adding the `fc-highlight` class to the cell with the
     * `data-date` attribute equal to the given date string.
     *
     * @param  {String} dateStr - The date string to highlight, in format "YYYY-MM-DD".
     */
    highlightDate (dateStr)
    {
      const calendarEl = document.querySelector(".fc");
      const dateCell = calendarEl.querySelector(`[data-date='${dateStr}']`);

      if (dateCell) {
        dateCell.classList.add("fc-highlight");
      }
    },
    /**
     * Updates the highlighted text after a date range is selected.
     *
     * This function works by first calculating the total number of days selected
     * by subtracting the start date from the end date. It then finds all the
     * highlighted cells (`fc-highlight` class) and appends a child element
     * containing the total number of days selected.
     *
     * Finally, it shows the popover after the overlay is visible.
     *
     * @param {String} start - The start date of the selection in format "YYYY-MM-DD".
     * @param {String} end - The end date of the selection in format "YYYY-MM-DD".
     */
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

    /**
     * Generates a custom resource header to display a dropdown to select a room (and its subrooms).
     * The dropdown shows a "Select All" option when nothing is selected.
     * When a room is selected, the subrooms under that room are also selected.
     * The dropdown text is updated based on the selected options.
     * The resource header also includes a toggle icon to collapse/expand all resources.
     * @returns {Object} - An object containing the custom resource header DOM nodes.
     */

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

    /**
     * Toggles the expand/collapse state of resources in a calendar view.
     *
     * If a specific room ID is provided, it will toggle the visibility of
     * subrooms associated with that room. If no room ID is provided, it will
     * toggle the visibility of all resources.
     *
     * @param {string|null} selectedRoomId - The ID of the room to toggle. If null,
     * toggles all rooms.
     */

    toggleResourceExpand (selectedRoomId = null)
    {
      this.isExpanded = !this.isExpanded; // Toggle expand/collapse state

      const resourceCells = document.querySelectorAll(
        ".fc-datagrid-cell.fc-resource"
      );
      const subroomCells = document.querySelectorAll(
        ".fc-datagrid-cell.fc-subroom"
      );

      // If a room is selected, collapse or expand that specific resource
      if (selectedRoomId) {
        const resourceCell = document.querySelector(
          `[data-resource-id='${selectedRoomId}']`
        );
        if (resourceCell) {
          const subCells = document.querySelectorAll(
            `[data-resource-id='${selectedRoomId}']`
          );
          subCells.forEach((subCell) =>
          {
            if (this.isExpanded) {
              subCell.classList.remove("collapsed");
            } else {
              subCell.classList.add("collapsed");
            }
          });
        }
      } else {
        // If no specific room is selected, toggle all rooms
        resourceCells.forEach((cell) =>
        {
          const roomId = cell.dataset.resourceId;
          if (this.isExpanded) {
            document
              .querySelectorAll(`[data-resource-id='${roomId}']`)
              .forEach((subCell) =>
              {
                subCell.classList.remove("collapsed");
              });
          } else {
            document
              .querySelectorAll(`[data-resource-id='${roomId}']`)
              .forEach((subCell) =>
              {
                subCell.classList.add("collapsed");
              });
          }
        });
      }
    },
    toggleSidebar ()
    {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.isPopoverVisible = false;
      this.isOverlayVisible = false;
    },

    navigateToEditReservation (id)
    {
      this.$router.push(`/edit-reservation/${id}`);
    },
    handleEventClick (info)
    {
      // alert(`Event: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${info.event.end}`);
      this.openOffcanvas(info.event);
    },
    openOffcanvas (event)
    {
      this.selectedEvent = event;
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
    SelectedDateFilterCalendar (selectedDate)
    {
      const calendarApi = this.$refs.calendar.getApi();

      // Navigate to the selected date in FullCalendar
      calendarApi.gotoDate(selectedDate);

      // Optionally, highlight the selected date
      this.highlightDate(selectedDate);
    },
    transformUnitToEvents (unitData)
    {
      const events = [];
      let currentEvent = null;

      // Define color mapping based on status
      const statusColorMap = {
        unavailable: '#FF4444', // Red for unavailable
        available: '#4CAF50',   // Green for available
        reserved: '#FFA000',    // Orange for reserved
        blocked: '#9E9E9E',     // Grey for blocked
      };

      // Get the unit-level status
      const unitStatus = unitData.status?.toLowerCase().trim() || 'unknown';
      const unitColor = statusColorMap[unitStatus] || '#CCCCCC'; // Default color for the unit

      // Sort dates to ensure they're in chronological order
      const sortedDates = [...unitData.dates].sort((a, b) =>
        new Date(a.date) - new Date(b.date)
      );

      console.log('Unit Status:', unitStatus, 'Unit Color:', unitColor);

      sortedDates.forEach((dateInfo, index) =>
      {
        console.log('DateInfo:', dateInfo); // Log the entire dateInfo object

        // Determine the color for this date
        let color = unitColor; // Default to unit color
        if (dateInfo.is_reserved) {
          color = statusColorMap.reserved; // Override with reserved color
        } else if (dateInfo.is_blocked) {
          color = statusColorMap.blocked; // Override with blocked color
        }

        console.log(`Date: ${dateInfo.date}, Color: ${color}`);

        if (dateInfo.is_reserved || dateInfo.is_blocked || unitStatus !== 'available') {
          if (!currentEvent) {
            // Start new event
            currentEvent = {
              resourceId: unitData.code,
              title: dateInfo.is_blocked ?
                `Blocked: ${dateInfo.block_reason}` :
                dateInfo.is_reserved ?
                  `Reserved by ${dateInfo.reserved_by?.name || 'Unknown'}` :
                  `Status: ${unitStatus}`,
              start: dateInfo.date,
              end: dateInfo.date,
              color: color // Use the resolved color
            };
          }

          // If this is the last date or next date is not reserved/blocked,
          // close out the current event
          const nextDate = sortedDates[index + 1];
          if (!nextDate || (!nextDate.is_reserved && !nextDate.is_blocked)) {
            // Set end date to next day (since FullCalendar uses exclusive end dates)
            const endDate = new Date(dateInfo.date);
            endDate.setDate(endDate.getDate() + 1);
            currentEvent.end = endDate.toISOString().split('T')[0];
            events.push(currentEvent);
            currentEvent = null;
          }
        } else {
          // If date is not reserved/blocked and we have a current event,
          // close it out
          if (currentEvent) {
            const endDate = new Date(dateInfo.date);
            currentEvent.end = endDate.toISOString().split('T')[0];
            events.push(currentEvent);
            currentEvent = null;
          }
        }
      });

      console.log(JSON.stringify(events, null, 2)); // Debugging: Log events with colors
      return events;
    },

    // Add this method to transform all units data
    transformAllUnitsToEvents ()
    {
      let allEvents = [];

      if (Array.isArray(this.data)) {
        this.data.forEach(building =>
        {
          if (building.units?.data) {
            building.units.data.forEach(unit =>
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

    // Update calendar events
    updateCalendarEvents ()
    {
      const events = this.transformAllUnitsToEvents();
      const calendar = this.$refs.calendar?.getApi();
      if (calendar) {
        calendar.removeAllEvents();
        calendar.addEventSource(events);
      }

    }


  },
  async mounted ()
  {
    try {
      const [
        CalenderDataResponse
      ] = await Promise.all([
        getCalenderAllUnits(),
      ]);

      this.data = CalenderDataResponse.data.data;
      this.occupancyData = CalenderDataResponse.data.calendar.data;
      this.statistics = CalenderDataResponse.data.statistics;
      this.datesBuilding = CalenderDataResponse.data.data;
      this.buildingNames = this.getBuildingNames();
      const events = this.transformAllUnitsToEvents();

      // Update calendarOptions with the new events
      this.calendarOptions = {
        ...this.calendarOptions,
        events: events // Replace the static events with dynamic ones
      };


      this.datesBuilding = []; // Initialize an empty array to store all dates
      this.data.forEach(building =>
      {
        // Check if the building has a valid 'dates' array
        if (building && building.dates && Array.isArray(building.dates)) {
          // console.log('Building ID:', building.id);

          // Add all dates from the current building to the datesBuilding array
          this.datesBuilding = this.datesBuilding.concat(building.dates);
        } else {
          // console.log('Invalid building.dates:', building.dates);
        }
      });




    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      // Once the data is fetched, hide the loader
      this.isLoading = false;
    }
    this.calendarOptions.resources = this.createResources();
    this.$nextTick(() =>
    {
      const footerElement = document.querySelector("#calendar-footer");
      if (footerElement) {
        footerElement.style.display = "block"; // Ensure the footer is displayed
      }
    });
    if (!this.$refs.calendar) {
      console.error('FullCalendar ref is not available.');
    }
  },
}
</script>
