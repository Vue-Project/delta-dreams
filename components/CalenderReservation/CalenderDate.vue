<template>
  <section class="card">
    <HeaderCalender />
    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" @select="handleSelect">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>
    <div id="calendar-footer">
      <table class="ant-table">
        <tbody class="ant-table-tbody">
          <tr style="background: #f1f1f1">
            <!-- Title Column -->
            <td title="Room Occupancy %" colspan="2" style="text-align: left; padding: 0 15px">
              Room Occupancy %
            </td>

            <!-- Data Columns -->
            <td v-for="(data, index) in occupancyData" :key="index">
              {{ data }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FullCalendar -->

    <!-- Overlay -->
    <div v-if="isOverlayVisible" class="overlay" @click="closePopover"></div>

    <!-- Popover content  -->
    <div v-if="isPopoverVisible" class="popover fade show bs-popover-top rounded-0" role="tooltip" :style="popoverStyle" x-placement="top">
      <div class="arrow" :style="{ left: popoverArrowLeft }"></div>
      <div class="popover-body">
        <div class="popoverContent text-center">
          <div class="row" style="row-gap: 0px">
            <!-- Display first selected day -->
            <div class="col-6">
              <div class="text-black fw-bold">Arrival</div>
              <div class="">{{ firstSelectedDate }}</div>
            </div>

            <!-- Display last selected day -->
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

          <span role="img" aria-label="close" tabindex="-1" class="anticon anticon-close sc-ibMOqO bkIyqW popoverClose" @click="closePopover">
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
      </div>
    </div>
    <!-- Popover content  -->
    <Sidebar :is-sidebar-open="isSidebarOpen" title="Block Room" width="400px" @close-sidebar="toggleSidebar">
      <!-- Custom Content for Sidebar -->
      <div>
        <div class="col-md-12col-12 px-0">
          <label for="flatpickr-date-01" class="form-label">Check-in</label>
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range-01" ref="rangePicker5" aria-label="input Text to Date" />
        </div>

        <div class=" gap-2 d-flex justify-content-end">
          <button class="btn btn-secondary waves-effect waves-light">
            Clear
          </button>
          <button type="submit" class="btn btn-primary waves-effect waves-light">
            Save
          </button>
        </div>
      </div>
    </Sidebar>
  </section>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import HeaderCalender from "./HeaderCalender.vue";
import Sidebar from "../layout/Sidebar.vue";
import BlindingData from "../Api/data.local.json";
import flatpickrMixin from "../Mixin/flatpickrMixin";

export default {
  components: {
    FullCalendar,
    HeaderCalender,
    Sidebar,
  },
  data ()
  {
    return {
      data: BlindingData,

      isSidebarOpen: false,
      isPopoverBodyVisible: true, // Body visibility
      selectedDates: [], // Array to store selected dates
      isPopoverVisible: false, // State to control popover visibility
      isOverlayVisible: false, // State to control overlay visibility
      popoverStyle: {}, // Inline style for popover positioning
      popoverArrowLeft: "0px", // Inline style for arrow positioning
      firstSelectedDate: "", // Store first selected date
      lastSelectedDate: "",
      occupancyData: [
        1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 20, 80, 19, 100,
      ],

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
          {
            id: "1",
            resourceId: "a",
            title: "Room A Reservation 100",
            start: "2024-12-24",
            end: "2025-01-12",
            color: "#4CAF50",
          },
          {
            id: "2",
            resourceId: "b-B1", // For specific subroom
            title: "Room B1 Reservation 100",
            start: "2024-12-25",
            end: "2025-01-02",
            color: "#2196F3",
          },
          {
            id: "3",
            resourceId: "c-C1", // For specific subroom
            title: "Room B1 Reservation 100",
            start: "2024-12-25",
            end: "2025-01-02",
            color: "#2896F3",
          },
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

    createResources ()
    {
      const resources = [];

      // Ensure roomData is defined and is an array
      if (Array.isArray(this.data)) {
        this.data.forEach((building) =>
        {
          // Add main room as a resource

          resources.push({
            id: building.name, // Unique identifier for main room
            groupId: building.name, // Groups related rooms together
            title: building.name, // Display name for the room
            classNames: ["build"], // CSS class for styling
          });
          // Add each subroom as a resource linked to main room

          building.units.data.forEach((unit) =>
          {
            resources.push({
              id: `${building.id}-${unit.id}`, // Combines parent and subroom IDs
              resourceId: building.id, // Links to parent room
              title: unit.code,
              groupId: building.name,
              classNames: ["unit"], // Groups with parent room
            });
          });
        });
      }

      return resources;
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
    updateHighlightedText (start, end)
    {
      const startDate = new Date(start);
      console.log(startDate);

      const endDate = new Date(end);
      console.log(endDate);

      const totalDays =
        Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1; // Calculate total days selected

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
    customResourceHeader ()
    {
      const buildingData = this.createResources(); // This now includes both rooms and subrooms

      let htmlContent = `
    <div class="resource-header" style="position: relative;">
      <div class="btn-group" style="width: 100%;">
        <button class="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Room Type
        </button>
        <ul class="dropdown-menu" style="width: 100%;">
          <li>
            <!-- "Select All" functionality -->
            <a class="dropdown-item" href="javascript:void(0);" onclick="this.toggleSelectAll(event)">Select All</a>
          </li>
  `;

      // Add only the main room options (without subrooms)
      buildingData.forEach((resource) =>
      {
        if (!resource.classNames.includes('subroom')) {  // Skip subrooms
          htmlContent += `
        <li>
          <div class="form-check" style="padding:10px 40px;">
            <input type="checkbox" class="form-check-input" id="bs-validation-checkbox-${resource.id}" data-id="${resource.id}">
            <label class="form-check-label" for="bs-validation-checkbox-${resource.id}">${resource.title}</label>
          </div>
        </li>
      `;
        }
      });

      htmlContent += `
        </ul>
      </div>
    </div>
  `;

      // Convert the HTML content to a DOM element and return it
      const div = document.createElement("div");
      div.innerHTML = htmlContent.trim();

      // Attach the event listeners for the checkboxes
      div.querySelectorAll('input[type="checkbox"]').forEach(checkbox =>
      {
        checkbox.addEventListener('change', this.handleCheckboxChange.bind(this)); // Bind the handler
      });

      return { domNodes: [div.firstElementChild] };
    },

    // New function to handle "Select All" logic
    // toggleSelectAll (event)
    // {
    //   // Get all checkboxes inside the dropdown
    //   const checkboxes = document.querySelectorAll('.resource-header input[type="checkbox"]');

    //   // Check if all checkboxes are already selected
    //   const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);

    //   // Toggle checkboxes based on the current state (select or deselect all)
    //   checkboxes.forEach(checkbox =>
    //   {
    //     checkbox.checked = !allChecked;
    //   });

    //   // Optionally update the button label (this depends on how you'd like to implement it)
    //   if (allChecked) {
    //     event.target.textContent = "Select All";
    //   } else {
    //     event.target.textContent = "Deselect All";
    //   }

    //   // Trigger change event to handle the visibility of data
    //   this.updateVisibleRooms();
    // },

    // Handle individual checkbox change
    handleCheckboxChange (event)
    {
      // Trigger the update for visibility when a checkbox is clicked
      this.updateVisibleRooms();
    },

    // Function to update the visibility of rooms based on selected checkboxes
    updateVisibleRooms ()
    {
      // Get all checkboxes inside the dropdown
      const checkboxes = document.querySelectorAll('.resource-header input[type="checkbox"]');
      // alert(checkboxes);

      // Loop through each checkbox
      checkboxes.forEach((checkbox) =>
      {
        const roomId = checkbox.dataset.id;
        const roomElement = document.getElementById(`room-${roomId}`); // Ensure this element exists

        // Check if the room element exists before modifying its style
        if (roomElement) {
          // Show or hide the room based on checkbox state
          if (checkbox.checked) {
            roomElement.style.display = "block";  // Show room
          } else {
            roomElement.style.display = "none";   // Hide room
          }
        }
      });
    }





    ,

    // Method to filter data based on selected checkboxes
    filterData ()
    {
      // Get all checked checkboxes
      const checkedRooms = Array.from(
        document.querySelectorAll(".room-checkbox:checked")
      ).map((checkbox) => checkbox.dataset.id);
      const checkedSubrooms = Array.from(
        document.querySelectorAll(".subroom-checkbox:checked")
      ).map((checkbox) => checkbox.dataset.id);

      // Filter the rooms and subrooms based on selected checkboxes
      const filteredData = this.createResources().filter((resource) =>
      {
        const roomSelected = checkedRooms.includes(resource.id.toString());
        const subroomsSelected =
          resource.subrooms &&
          resource.subrooms.some((subroom) =>
            checkedSubrooms.includes(subroom.id.toString())
          );
        return roomSelected || subroomsSelected;
      });

      // Update the table with filtered data
      const tableBody = document.querySelector("#resourceTable tbody");
      tableBody.innerHTML = ""; // Clear existing rows

      filteredData.forEach((resource) =>
      {
        resource.subrooms.forEach((subroom) =>
        {
          const row = document.createElement("tr");
          row.innerHTML = `
        <td>${resource.title}</td>
        <td>${subroom.title}</td>
      `;
          tableBody.appendChild(row);
        });
      });
    },

    // Optional: Select all checkboxes
    selectAll ()
    {
      const allCheckboxes = document.querySelectorAll(
        ".room-checkbox, .subroom-checkbox"
      );
      allCheckboxes.forEach((checkbox) => (checkbox.checked = true));
      this.filterData();
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
  },
  mounted ()
  {
    this.calendarOptions.resources = this.createResources();
    // Add a delay to ensure FullCalendar renders first
    this.$nextTick(() =>
    {
      const footerElement = document.querySelector("#calendar-footer");
      if (footerElement) {
        footerElement.style.display = "block"; // Ensure the footer is displayed
      }
    });
  },
  mixins: [flatpickrMixin],


}
</script>

<style></style>
