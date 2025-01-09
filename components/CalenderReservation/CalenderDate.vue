<template>
  <section class="card">
    <Loader :visible="isLoading" />



    <!-- Content (visible only after data is fetched) -->
    <div v-if="!isLoading">
      <HeaderCalender :statistics="statisticsHeaderCalender" />


      <div class="filter-buttons">
        <button class="btn btn-primary" @click="showAllResources">Show All</button>
        <button v-for="building in buildingNames" :key="building" class="btn btn-secondary mr-2" @click="showBuildingResources(building)">
          Show {{ building }}
        </button>
      </div>

      <FullCalendar :options="calendarOptions" @select="handleSelect" ref="calendar">
        <template v-slot:eventContent="arg">
          <b>{{ arg.event.title }}</b>
        </template>
      </FullCalendar>

      <div id="calendar-footer">
        <div class="table-responsive text-nowrap">
          <table class="table">
            <tbody>
              <tr style="background: #f1f1f1">
                <td title="Room Occupancy %" colspan="0" style="text-align: left; border-right: 4px solid #ddd;" class="w-18">
                  Room Occupancy %
                </td>
                <td v-for="(data, index) in occupancyData" :key="index" class="fc-timeline-slot">
                  {{ data.reserved_percentage }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>

      <!-- Overlay -->
      <div v-if="isOverlayVisible" class="overlay" @click="closePopover"></div>

      <!-- Popover content -->
      <div v-if="isPopoverVisible" class="popover fade show bs-popover-top rounded-0" role="tooltip" :style="popoverStyle">
        <div class="arrow" :style="{ left: popoverArrowLeft }"></div>
        <div class="popover-body">
          <div class="popoverContent text-center">
            <div class="row" style="row-gap: 0px">
              <div class="col-6">
                <div class="text-black fw-bold">Arrival</div>
                <div>{{ firstSelectedDate }}</div>
              </div>
              <div class="col-6">
                <div class="text-black fw-bold">Departure</div>
                <div>{{ lastSelectedDate }}</div>
              </div>
            </div>
            <div class="row">
              <hr class="my-2 w-75 mx-auto" />
              <button @click="goToAddReservation">Go to Add Reservation</button>

              <hr class="my-2 w-75 mx-auto" />
              <button type="button" class="ant-btn ant-btn-link ant-btn-block" @click="toggleSidebar">
                <span>Maintenance Block</span>
              </button>
            </div>
            <span role="img" aria-label="close" class="popoverClose" @click="closePopover">
              <i class="fa-solid fa-xmark"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <SidebarBlockRoom :is-sidebar-open="isSidebarOpen" title="Block Room" width="400px" @close-sidebar="toggleSidebar" style="height: auto !important;">
        <BlockRoomForm :selectedDates="selectedDates" :selectedResourceId="selectedResourceId" @close-sidebar="toggleSidebar" />
      </SidebarBlockRoom>
    </div>
  </section>
</template>


<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import HeaderCalender from "./HeaderCalender.vue";
import SidebarBlockRoom from "../layout/Sidebar.vue";
// import BlindingData from "../Api/data.local.json";
import BlockRoomForm from "./BlockRoomForm.vue";
import { getCalenderData } from "../Api/api";
import Loader from "../layout/Loader.vue";

export default {
  components: {
    FullCalendar,
    HeaderCalender,
    SidebarBlockRoom,
    BlockRoomForm, Loader
  },
  data ()
  {
    return {
      linkToAddReservation: '/add-reservation',
      datesbuilding: [],
      buildingNames: [], // Store building names dynamically
      selectedDates: '',
      selectedResourceId: '',
      selectedResourceName: '',
      isLoading: true,
      data: [],
      unitsDates: [],
      isSidebarOpen: false,
      isPopoverBodyVisible: true, // Body visibility
      // selectedDates: [], // Array to store selected dates
      isPopoverVisible: false, // State to control popover visibility
      isOverlayVisible: false, // State to control overlay visibility
      popoverStyle: {}, // Inline style for popover positioning
      popoverArrowLeft: "0px", // Inline style for arrow positioning
      firstSelectedDate: "", // Store first selected date
      lastSelectedDate: "",
      occupancyData: [],
      statisticsHeaderCalender: [],
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: "resourceTimeline",
        duration: { days: 20 },
        weekends: true,
        resources: this.createResources(),
        selectable: true, // Enable date selection
        selectMirror: true, // Make the selection draggable
        eventOverlap: false, // Disallow overlapping events
        slotDuration: "24:00", // Slot duration of one day

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
        resourceAreaWidth: '18%',




        // datesSet (info)
        // {
        //   console.log("datesSet called", info);

        //   // Room data
        //   const roomData = [
        //     {
        //       id: "a",
        //       title: "Building A",
        //       availability: {
        //         "2025-01-01": { units: 30, price: "$100" },
        //         "2025-01-02": { units: 25, price: "$90" },
        //         "2025-01-03": { units: 20, price: "$80" },
        //       },
        //     },
        //     {
        //       id: "b",
        //       title: "Building B",
        //       availability: {
        //         "2025-01-01": { units: 15, price: "$120" },
        //         "2025-01-02": { units: 10, price: "$110" },
        //         "2025-01-03": { units: 5, price: "$100" },
        //       },
        //     },
        //   ];

        //   // Get the current date range in the calendar
        //   const startDate = new Date(info.start);
        //   const endDate = new Date(info.end);

        //   // Get the timeline grid rows for each resource
        //   const timelineRows = document.querySelectorAll(
        //     ".fc-timeline-lane.fc-resource-group.fc-cell-shaded"
        //   );

        //   if (timelineRows.length === 0) {
        //     console.warn("No timeline rows found!");
        //     return;
        //   }

        //   // Loop through the resources and inject data
        //   timelineRows.forEach((row, rowIndex) =>
        //   {
        //     const room = roomData[rowIndex]; // Match the resource with room data
        //     if (!room) {
        //       console.warn(`No data for row ${rowIndex + 1}`);
        //       return;
        //     }

        //     // Clear existing content in the row
        //     row.innerHTML = "";

        //     // Loop through the visible dates in the calendar
        //     for (
        //       let currentDate = new Date(startDate);
        //       currentDate <= endDate;
        //       currentDate.setDate(currentDate.getDate() + 1)
        //     ) {
        //       const dateString = currentDate.toISOString().split("T")[0];
        //       const availability = room.availability[dateString];

        //       // Create a cell for this date
        //       const dateCell = document.createElement("div");
        //       dateCell.className = "custom-date-cell";
        //       dateCell.style.cssText = "padding: 10px; border: 1px solid #ddd;";

        //       // Add availability data or a fallback message
        //       if (availability) {
        //         dateCell.innerHTML = `
        //     <div><strong>${dateString}</strong></div>
        //     <div>Units: ${availability.units}</div>
        //     <div>Price: ${availability.price}</div>
        //   `;
        //       } else {
        //         dateCell.innerHTML = `
        //     <div><strong>${dateString}</strong></div>
        //     <div>No availability</div>
        //   `;
        //       }

        //       // Append the cell to the row
        //       row.appendChild(dateCell);
        //     }
        //   });
        // },










        resourceGroupField: "groupId",
        resourceAreaHeaderContent: this.customResourceHeader, // Customize header
        dateClick: this.handleDateClick,
        select: this.handleSelect,
        events: [


        ], // Store events programmatically
        footerToolbar: {
          left: "",
          center: "",
          right: "",
        },
      },
    };
  },

  methods: {
    generateEvents() {
    this.eventData = [];
    this.data.forEach((building) => {
      building.units.data.forEach((unit) => {
        unit.dates.forEach((dateStr) => {
          const event = {
            start: dateStr,
            resourceId: `${building.name}-${unit.code}`,
            price: unit.price, // Ensure price is correctly referenced
            title: unit.code,
          };
          this.eventData.push(event);
        });
      });
    });
  },
    goToAddReservation() {
  this.$store.commit('setSelectedDates', this.selectedDates);
  this.$store.commit('setSelectedResourceName', this.selectedResourceName);
  this.$store.dispatch('allowAccess')
  this.$router.push('/add-reservation')
  // this.$router.push('/secret')

  // Navigate to the add-reservation page
  // this.$router.push({ name: '' });
  // this.$router.push('/secret')

},




    /**
     * Generates a list of resources from predefined room data.
     *
     * This function iterates over a set of room data, each containing a list of subrooms,
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
     * @returns {Array} An array of resources, where each resource represents a room or subroom
     *                  with specific attributes for identification and styling.
     */
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

    // Create resources dynamically based on the fetched data and selected IDs
    createResources (selectedIds = [], selectedDate = null)
    {
      const resources = [];

      if (Array.isArray(this.data)) {
        this.data.forEach((building) =>
        {
          // Only include the building resource if it is in selectedIds or if "Show All" is selected
          if (selectedIds.length === 0 || selectedIds.includes(building.name)) {
            resources.push({
              id: building.name,
              groupId: building.name,
              title: building.name,
              classNames: ["building"],
            });

            if (building.units?.data) {
              building.units.data.forEach((unit) =>
              {
                // Check if the unit's date matches the selected date (if provided)
                if (!selectedDate || (unit.date && unit.date === selectedDate)) {
                  const resource = {
                    id: `${building.id}-${unit.id}`,
                    resourceId: building.name,
                    title: unit.code,
                    groupId: building.name,
                    classNames: ["unit"],
                    extendedProps: {
                      is_clean: unit.is_clean,
                      is_smoking: unit.is_smoking,
                      price: unit.price, // Add price data
                      date: unit.date, // Add date for reference
                    },
                  };

                  resources.push(resource);
                }
              });
            }
          }
        });
      }

      return resources;
    }
    ,

    // Update FullCalendar resources
    updateCalendarResources (selectedIds = [])
    {
      const resources = this.createResources(selectedIds);
      const calendar = this.$refs.calendar?.getApi();
      if (calendar) {
        calendar.setOption('resources', resources); // Set the resources in the calendar
      } else {
        console.error('FullCalendar API is not accessible.');
      }
    },

    // Show resources for a specific building
    showBuildingResources (buildingName)
    {
      // Update the calendar resources to show only the selected building's data
      this.updateCalendarResources([buildingName]);
    },

    // Show all resources (no filter)
    showAllResources ()
    {
      // Update the calendar to show all resources (no filter)
      this.updateCalendarResources();
    },
    // Helper method to get daily prices for each unit
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
     handleSelect(info) {
  const { start, end, resource } = info;

  // Helper to get current Egypt time
  const getCurrentEgyptTime = () => {
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
  const formatDateTimeEgypt = (date) => {
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
  const formatDateOnly = (date) => {
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
}

,

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
    customResourceHeader ()
    {
      let htmlContent = `
    <div class="resource-header" style="position: relative;">
      <div class="btn-group" style="width: 100%;">
        <button class="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Room Type
        </button>
        <ul class="dropdown-menu" style="width: 100%;">
          <li>
            <div class="form-check" style="padding:10px 40px;">
              <input type="checkbox" class="form-check-input" id="select-all-checkbox" @click="selectAllResources">
              <label class="form-check-label" for="select-all-checkbox">Select All</label>
            </div>
          </li>`;

      const allResources = this.createResources(); // Get all resources initially

      // Add room options dynamically as checkboxes
      allResources.forEach((resource) =>
      {
        if (!resource.classNames.includes('unit')) { // Filter out units, as we only want rooms
          htmlContent += `
        <li>
          <div class="form-check" style="padding:10px 40px;">
            <input type="checkbox" class="form-check-input room-checkbox"
              id="bs-validation-checkbox-${resource.id}"
              data-id="${resource.id}" @click="toggleResourceSelection(resource)">
            <label class="form-check-label"
              for="bs-validation-checkbox-${resource.id}">${resource.title}</label>
          </div>
        </li>`;
        }
      });

      htmlContent += `
        </ul>
      </div>
    </div>`;

      const div = document.createElement("div");
      div.innerHTML = htmlContent.trim();

      // Return the div element to be inserted into the DOM
      return { domNodes: [div.firstElementChild] };
    },









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
    // storeSelectedDatesAndNavigate ()
    // {
    //   // Store the data before navigation
    //   this.$store.commit('reservation/SET_SELECTED_DATES', this.selectedDates)

    //   // Optional: Also store in localStorage as backup
    //   localStorage.setItem('selectedDates', JSON.stringify(this.selectedDates))
    // }

  },
  async mounted ()
  {
    try {
      const [
        CalenderDataResponse
      ] = await Promise.all([
        getCalenderData(),
      ]);

      this.data = CalenderDataResponse.data.data;
      this.occupancyData = CalenderDataResponse.data.calendar.data;
      this.statisticsHeaderCalender = CalenderDataResponse.data.statistics ;
      this.datesbuilding = CalenderDataResponse.data.data.dates;
      this.buildingNames = this.getBuildingNames();

      this.data.forEach(building =>
      {
        building.units.data.forEach(unit =>
        {
          this.unitsDates = this.unitsDates.concat(unit.dates); // Merge unit.dates into unitsDates
        });
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
