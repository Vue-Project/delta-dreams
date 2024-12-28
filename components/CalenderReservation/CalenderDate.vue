<template>
  <section class="card">
    <p>{{ unitsDates }}</p>
    <!-- <div>
      <h1>Events and Reservations</h1>
      <div v-for="event in mappedEvents" :key="event.id" class="event-card">
        <h2>{{ event.title }}</h2>
        <p>Start: {{ event.start }}</p>
        <p>End: {{ event.end }}</p>
        <p>Resource: {{ event.resourceId }}</p>
        <h3>Reservations:</h3>
        <ul>
          <li v-for="reservation in event.reservations" :key="reservation.date">
            <strong>Date:</strong> {{ reservation.date }}
            <span v-if="reservation.is_reserved">
              - Reserved by {{ reservation.reserved_by.name }}
            </span>
            <span v-else>- Not reserved</span>
          </li>
        </ul>
      </div>
    </div> -->
    <!-- Loader (will be visible until data is fetched) -->
    <Loader :visible="isLoading" />

    <!-- Content (visible only after data is fetched) -->
    <div v-if="!isLoading">
      <!-- Your existing content goes here, like FullCalendar, tables, etc. -->

      <!-- <HeaderCalender :statistics="statisticsHeaderCalender" /> -->
      <FullCalendar :options="calendarOptions" @select="handleSelect">
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

        <table class="ant-table">
          <tbody class="ant-table-tbody">
            <!-- Additional table content can go here -->
          </tbody>
        </table>
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
              <NuxtLink to="/add-reservation">Go to Add Reservation</NuxtLink>
              <hr class="my-2 w-75 mx-auto" />
              <button type="button" class="ant-btn ant-btn-link ant-btn-block" @click="toggleSidebar">
                <span>Maintenance Block</span>
              </button>
            </div>
            <span role="img" aria-label="close" class="anticon anticon-close" @click="closePopover">
              <i class="fa-solid fa-xmark"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <Sidebar :is-sidebar-open="isSidebarOpen" title="Block Room" width="400px" @close-sidebar="toggleSidebar" style="height: auto;">
        <BlockRoomForm />
      </Sidebar>
    </div>
  </section>
</template>


<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import HeaderCalender from "./HeaderCalender.vue";
import Sidebar from "../layout/Sidebar.vue";
// import BlindingData from "../Api/data.local.json";
import BlockRoomForm from "./BlockRoomForm.vue";
import { getCalenderData } from "../Api/api";
import Loader from "../layout/Loader.vue";

export default {
  components: {
    FullCalendar,
    HeaderCalender,
    Sidebar,
    BlockRoomForm, Loader
  },
  data ()
  {
    return {
      isLoading: true,
      data: [],
      unitsDates: [],
      isSidebarOpen: false,
      isPopoverBodyVisible: true, // Body visibility
      selectedDates: [], // Array to store selected dates
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
          const units = 50; // Example static units (can be dynamically set)
          const price = "$200"; // Example static price (can be dynamically set)

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
        // resourceAreaColumns: [
        //   {
        //     field: 'title',
        //     headerContent: 'Units'
        //   }
        // ],

        //   datesSet: function (info)
        //   {
        //     console.log("datesSet called", info); // Debugging

        //     // Room data with sub-rooms, units, and prices
        //     const roomData = [
        //       {
        //         id: "a",
        //         title: "Room A",
        //         units: 30,
        //         price: "$100",
        //         subrooms: ["A1", "A2", "A3"],
        //       },
        //       // { id: "b", title: "Room B", units: 40, price: "$150", subrooms: ["B1", "B2", "B3"] },
        //       // { id: "c", title: "Room C", units: 50, price: "$200", subrooms: ["C1", "C2", "C3"] },
        //       // { id: "5", title: "Room D", units: 60, price: "$250", subrooms: ["D1", "D2", "D3"] },
        //       // { id: "6", title: "Room E", units: 70, price: "$300", subrooms: ["E1", "E2", "E3"] }
        //     ];

        //     // Iterate over all the slot lanes in the FullCalendar
        //     document
        //       .querySelectorAll(".fc-timeline-slot-lane")
        //       .forEach((slotLane) =>
        //       {
        //         // Clear previous custom content if it exists
        //         const existingContent = slotLane.querySelector(
        //           ".custom-slot-content"
        //         );
        //         if (existingContent) {
        //           existingContent.remove();
        //         }

        //         // Create a container for the room and sub-room rows
        //         const subRoomContainer = document.createElement("div");
        //         subRoomContainer.className = "custom-slot-content";

        //         // Loop through roomData to create content for each room
        //         roomData.forEach((room) =>
        //         {
        //           // Create a row for each room
        //           const subRoomRow = document.createElement("div");
        //           subRoomRow.className = "sub-room-row";

        //           // Add room details dynamically (name, units, price)
        //           subRoomRow.innerHTML = `
        //   <div class="sub-room-name">${room.title}</div>
        //   <div class="sub-room-units">Units: ${room.units}</div>
        //   <div class="sub-room-price">Price: ${room.price}</div>
        // `;

        //           // Append the room row to the sub-room container
        //           subRoomContainer.appendChild(subRoomRow);
        //         });

        //         // Append the sub-room container to the slot lane
        //         slotLane.appendChild(subRoomContainer);
        //       });
        //   },

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
  created ()
  {
    // Call the function to group data and generate events
    this.generateEvents();
  },
  methods: {


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

    // createResources (selectedIds = [])
    // {
    //   const resources = [];

    //   if (Array.isArray(this.data)) {
    //     this.data.forEach((building) =>
    //     {
    //       // Add main room as a resource
    //       resources.push({
    //         id: building.name,
    //         groupId: building.name,
    //         title: building.name,
    //         classNames: ["build500"],
    //       });

    //       // Add each subroom as a resource
    //       if (building.units?.data) {
    //         building.units.data.forEach((unit) =>
    //         {
    //           const resource = {
    //             id: `${building.id}-${unit.id}`,
    //             resourceId: building.name,
    //             title: unit.code,
    //             groupId: building.name,
    //             classNames: ["unit"],
    //             extendedProps: {
    //               is_clean: unit.is_clean,
    //               is_smoking: unit.is_smoking,
    //             },
    //           };

    //           // Only add unit if it's in selected list or if "Select All" is chosen
    //           if (selectedIds.length === 0 || selectedIds.includes(resource.resourceId)) {
    //             resources.push(resource);
    //           }
    //         });
    //       }
    //     });
    //   }

    //   // Update the calendar resources when filtered
    //   if (this.calendar) {
    //     this.calendar.setOption('resources', resources);
    //   }

    //   return resources;
    // }





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
      const { start, end, resource } = info; // Destructure the resource object

      let currentDate = new Date(start);
      const endDate = new Date(end);
      this.selectedDates = [];

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split("T")[0];

        if (!this.selectedDates.includes(dateStr)) {
          this.selectedDates.push(dateStr);
          this.highlightDate(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // After selection, update highlighted text and show the popover
      this.updateHighlightedText(start, end);
      this.firstSelectedDate = this.selectedDates[0];
      this.lastSelectedDate = this.selectedDates[this.selectedDates.length - 1];

      // Capture the resource ID
      if (resource) {
        this.selectedResourceId = resource.id; // Save the resource ID for further use
        console.log("Selected Resource ID:", this.selectedResourceId); // Log for debugging
      } else {
        this.selectedResourceId = null; // Handle cases where no resource is selected
        console.log("No resource selected.");
      }

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
        dateCell.classList.add("fc-highlightvev");
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
    updateHighlightedText (start, end)
    {
      const startDate = new Date(start);
      console.log(startDate);

      const endDate = new Date(end);
      console.log(endDate);

      const totalDays =
        Math.ceil((endDate - startDate) / (1000 * 3600 * 24)); // Calculate total days selected

      const calendarEl = document.querySelector(".fc");
      const highlightCells = calendarEl.querySelectorAll(".fc-highlight");

      highlightCells.forEach((highlight) =>
      {
        const tooltip = document.createElement("div");
        tooltip.classList.add("selected-days-tooltip");
        tooltip.textContent = `${totalDays} Nights`;

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
            <input type="checkbox" class="form-check-input" id="select-all-checkbox">
            <label class="form-check-label" for="select-all-checkbox">Select All</label>
          </div>
        </li>`;

      const allResources = this.createResources(); // Get all resources initially
      // console.log('All resources:', allResources);

      // Add room options
      allResources.forEach((resource) =>
      {
        if (!resource.classNames.includes('unit')) {
          htmlContent += `
      <li>
        <div class="form-check" style="padding:10px 40px;">
          <input type="checkbox" class="form-check-input room-checkbox"
            id="bs-validation-checkbox-${resource.id}"
            data-id="${resource.id}">
          <label class="form-check-label"
            for="bs-validation-checkbox-${resource.id}">${resource.title}</label>
        </div>
      </li>`;
        }
      });

      htmlContent += `
    </ul>
  </div>
  <div id="filtered-data" class="mt-3">
    <div id="loading" style="display: none;">Loading...</div> <!-- Loading spinner -->
  </div>
</div>`;

      const div = document.createElement("div");
      div.innerHTML = htmlContent.trim();

      const selectAllCheckbox = div.querySelector('#select-all-checkbox');
      const roomCheckboxes = div.querySelectorAll('.room-checkbox');
      const filteredContainer = div.querySelector('#filtered-data');
      const loadingContainer = div.querySelector('#loading'); // Get the loading container

      // Function to show the loading state
      const showLoading = () =>
      {
        filteredContainer.innerHTML = ''; // Clear previous data
        loadingContainer.style.display = 'block'; // Show loading spinner
      };

      // Function to hide the loading state and render data
      const hideLoadingAndRender = (filteredResources) =>
      {
        loadingContainer.style.display = 'none'; // Hide loading spinner
        if (filteredResources.length > 0) {
          filteredContainer.innerHTML = filteredResources
            .map((resource) =>
              resource.classNames.includes('unit')
                ? `<div>
                <strong>${resource.title}</strong><br>
                ${resource.extendedProps?.is_clean ? "Clean" : "Not Clean"} |
                ${resource.extendedProps?.is_smoking ? "Smoking" : "Non-Smoking"}
              </div>`
                : `<div><strong>${resource.title}</strong></div>`
            )
            .join('');
        } else {
          filteredContainer.innerHTML = '<div>No data to display</div>';
        }
      };

      // Event listener for Select All checkbox
      selectAllCheckbox.addEventListener('change', (event) =>
      {
        const isChecked = event.target.checked;
        roomCheckboxes.forEach((checkbox) =>
        {
          checkbox.checked = isChecked;
          const changeEvent = new Event('change', { bubbles: true });
          checkbox.dispatchEvent(changeEvent);
        });
        // Call updateFilteredData to update the displayed data based on the selection
        this.updateFilteredData(roomCheckboxes);
      });

      // Event listener for individual room checkboxes
      roomCheckboxes.forEach((checkbox) =>
      {
        checkbox.addEventListener('change', () =>
        {
          const allChecked = Array.from(roomCheckboxes).every((cb) => cb.checked);
          const someChecked = Array.from(roomCheckboxes).some((cb) => cb.checked);

          selectAllCheckbox.checked = allChecked;
          selectAllCheckbox.indeterminate = someChecked && !allChecked;

          // Call updateFilteredData to update the displayed data based on the selection
          this.updateFilteredData(roomCheckboxes);
        });
      });

      // Function to update filtered data directly from createResources
      this.updateFilteredData = (roomCheckboxes) =>
      {
        const selectedIds = Array.from(roomCheckboxes)
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.dataset.id);

        console.log('Selected IDs:', selectedIds);

        showLoading(); // Show loading before rendering

        setTimeout(() =>
        { // Simulate async operation (you can replace this with real async data fetching logic)
          const filteredResources = this.createResources(selectedIds); // Pass the selected room IDs to createResources
          hideLoadingAndRender(filteredResources); // Hide loading and render data
        }, 500); // Simulate a delay of 500ms (you can remove or adjust this as needed)
      };

      return { domNodes: [div.firstElementChild] };
    },

    // Create resources function with filtering logic
    createResources: function (selectedIds = [])
    {
      const resources = [];

      try {
        // console.log('createResources called with selectedIds:', selectedIds);

        if (Array.isArray(this.data)) {
          // console.log('Data exists and is an array:', this.data);

          this.data.forEach((building) =>
          {
            // console.log('Processing building:', building);

            // Always include the building as a resource
            resources.push({
              id: building.name,
              groupId: building.name,
              title: building.name,
              classNames: ["build500"],
            });

            // Add units, but only those that match the selected IDs
            if (building.units?.data) {
              building.units.data.forEach((unit) =>
              {
                const resource = {
                  id: `${building.id}-${unit.id}`,
                  resourceId: building.name,
                  title: unit.code,
                  groupId: building.name,
                  classNames: ["unit"],
                  extendedProps: {
                    is_clean: unit.is_clean,
                    is_smoking: unit.is_smoking,
                  },
                };

                // Log the unit details
                // console.log('Processing unit:', unit);

                // If no specific IDs are selected, or this unit's ID is in the selected list, add it
                if (selectedIds.length === 0 || selectedIds.includes(resource.id)) {
                  // console.log('Adding resource:', resource);
                  resources.push(resource);
                } else {
                  // console.log('Skipping unit (not selected):', resource);
                }
              });
            }
          });
        } else {
          // console.error('Data is not an array:', this.data);
        }

      } catch (error) {
        // console.error('Error in createResources:', error);
      }

      // console.log('Filtered resources:', resources);
      return resources;
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
    generateEvents ()
    {
      const groupedByUser = this.unitsDates.reduce((acc, item) =>
      {
        if (item.is_reserved) {
          const name = item.reserved_by.name;
          console.log('name is:', name);

          if (!acc[name]) {
            acc[name] = { start: item.date, end: item.date, reserved_by: item.reserved_by.name };
          } else {
            acc[name].end = item.date; // Update end date to the latest reserved date
          }
        }
        return acc;
      }, {});

      // Generate events array from the grouped data
      this.events = Object.keys(groupedByUser).map((name, index) => ({
        id: `${index + 1}`,
        resourceId: `21-10`, // You can customize this based on the resource
        title: `${name} Reservation 100`,
        start: groupedByUser[name].start, // First reserved date
        end: groupedByUser[name].end,     // Last reserved date
        color: "#4CAF50", // Static color (can be customized)
      }));
    },
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
      this.statisticsHeaderCalender = CalenderDataResponse.data;
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
  },




}
</script>

<style></style>
