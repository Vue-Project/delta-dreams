<template>
  <section class="card">
    <HeaderCalender />
    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" @select="handleSelect">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>

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
            <div class="ant-col col-6">
              <div class="text-black fw-bold">Arrival</div>
              <div class="">{{ firstSelectedDate }}</div>
            </div>

            <!-- Display last selected day -->
            <div class="ant-col col-6">
              <div class="text-black fw-bold">Departure</div>
              <div>{{ lastSelectedDate }}</div>
            </div>
          </div>

          <div class="row">
            <hr class="my-2 w-75 mx-auto" />
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
              <span>Walk In / Reservation</span>
            </button>
            <hr class="my-2 w-75 mx-auto" />
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
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
  </section>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import HeaderCalender from "./HeaderCalender.vue";

export default {
  components: {
    FullCalendar,
    HeaderCalender,
  },
  data ()
  {
    return {
      selectedDates: [], // Array to store selected dates
      isPopoverVisible: false, // State to control popover visibility
      isOverlayVisible: false, // State to control overlay visibility
      popoverStyle: {}, // Inline style for popover positioning
      popoverArrowLeft: "0px", // Inline style for arrow positioning
      firstSelectedDate: "", // Store first selected date
      lastSelectedDate: "",
      // Store last selected date
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: "resourceTimeline",
        duration: { days: 20 },
        weekends: true,
        resources: this.createResources(),

        selectable: true, // Enable date selection
        selectMirror: true, // Make the selection draggable
        eventTimeFormat: {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          meridiem: false,
        },
        eventOverlap: false, // Disallow overlapping events
        slotDuration: "24:00", // Slot duration of one day

        // Customize only the required slot level
        slotLabelContent: (arg) =>
        {
          const date = new Date(arg.date);

          if (arg.level === 0) {
            // Higher-level: Months
            const month = date.toLocaleDateString("en-US", { month: "short" });

            return {
              html: `
          <div class="custom-slot-label">
            <div class="slot-month">${month}</div>
          </div>
        `,
            };
          }

          if (arg.level === 1) {
            // Lower-level: Days
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

        resourceGroupField: "groupId",
        resourceAreaHeaderContent: this.customResourceHeader, // Customize header
        dateClick: this.handleDateClick,
        select: this.handleSelect,
        events: [], // Store events programmatically
      },
    };
  },
  methods: {
    createResources ()
    {
      const roomData = [
        { id: "a", title: "Room A", subrooms: ["A1", "A2", "A3"] },
        { id: "b", title: "Room B", subrooms: ["B1", "B2", "B3"] },
        { id: "c", title: "Room C", subrooms: ["C1", "C2", "C3"] },
      ];
      const resources = [];

      roomData.forEach((room) =>
      {
        resources.push({
          id: room.id,
          title: room.title,
          groupId: room.id,
          classNames: ["resource"], // Add class to easily select room cells
        });

        room.subrooms.forEach((subroom) =>
        {
          resources.push({
            id: `${room.id}-${subroom}`,
            title: subroom,
            resourceId: room.id,
            groupId: room.id,
            classNames: ["subroom"], // Add class to easily select subroom cells
          });
        });
      });

      return resources;
    },

    handleSelect (info)
    {
      const { start, end } = info;

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

      //  After selection, update highlighted text and show the popover
      this.updateHighlightedText(start, end);
      this.firstSelectedDate = this.selectedDates[0];
      this.lastSelectedDate = this.selectedDates[this.selectedDates.length - 1];

      this.showOverlay();
    },

    highlightDate (dateStr)
    {
      const calendarEl = document.querySelector(".fc");
      const dateCell = calendarEl.querySelector(`[data-date='${dateStr}']`);

      if (dateCell) {
        dateCell.classList.add("fc-highlight");
      }
    },

    updateHighlightedText (start, end)
    {
      const startDate = new Date(start);
      console.log(startDate);

      const endDate = new Date(end);
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
      this.isPopoverVisible = true; // Show the Popover

      this.$nextTick(() =>
      {
        const popoverElement = document.querySelector(".popover");
        this.popoverHeight = popoverElement ? popoverElement.offsetHeight : 0;

        const highlightElements = document.querySelectorAll(".fc-highlight");

        if (highlightElements.length > 0) {
          const lastHighlight = highlightElements[highlightElements.length - 1];
          const rect = lastHighlight.getBoundingClientRect();

          // Position the popover centered on top of the last highlighted element
          this.popoverStyle = {
            left: `${rect.left + rect.width / 2 - popoverElement.offsetWidth / 50
              }px`, // Center horizontally
            top: `${rect.top + window.scrollY - this.popoverHeight - 90}px`, // Position above the element
          };

          // Center the arrow horizontally in the popover
          this.popoverArrowLeft = `${popoverElement.offsetWidth / 2 - 10}px`; // Adjust arrow to the center of the popover
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

    customResourceHeader ()
    {
      const container = document.createElement("div");
      container.classList.add("resource-header");
      container.style.position = "relative"; // Ensure parent has position: relative

      // Create the select element directly
      const dropdownSelect = document.createElement("select");
      dropdownSelect.classList.add("dropdown-menu");
      dropdownSelect.style.position = "relative";
      dropdownSelect.style.width = "465px";
      dropdownSelect.style.backgroundColor = "white";
      dropdownSelect.style.border = "1px solid #ccc";
      dropdownSelect.style.padding = "10px";
      dropdownSelect.style.display = "block"; // Show select box when clicked

      // Create a container to display the default selected option (e.g., "Select Room")
      const displaySelectedText = document.createElement("span");
      displaySelectedText.textContent = "Select Room"; // Default text
      dropdownSelect.appendChild(displaySelectedText);

      // Add the options for each room (and their subrooms)
      const roomData = this.createResources(); // Assuming createResources() returns room data with subrooms
      roomData.forEach((resource) =>
      {
        const option = document.createElement("option");
        option.value = resource.id;
        option.textContent = `Room: ${resource.title}`;
        dropdownSelect.appendChild(option);

        // Add options for subrooms if available
        if (resource.subrooms && Array.isArray(resource.subrooms)) {
          resource.subrooms.forEach((subroom) =>
          {
            const subOption = document.createElement("option");
            subOption.value = subroom.id;
            subOption.textContent = `Subroom: ${subroom.title}`;
            dropdownSelect.appendChild(subOption);
          });
        }

        // Toggle resource expand/collapse based on room selection
        option.addEventListener("change", () =>
        {
          if (option.selected) {
            this.toggleResourceExpand(resource.id);
            // Select subrooms if the parent room is selected
            if (resource.subrooms) {
              resource.subrooms.forEach((subroom) =>
              {
                this.toggleResourceExpand(subroom.id);
              });
            }
          }
        });
      });

      // Handle "Select All" functionality
      const selectAllOption = document.createElement("option");
      selectAllOption.value = "selectAll";
      selectAllOption.textContent = "Select All";
      dropdownSelect.insertBefore(selectAllOption, dropdownSelect.firstChild); // Add Select All as the first option

      // Function to update the dropdown text based on selected options
      function updateSelectedText ()
      {
        const selectedOptions = dropdownSelect.selectedOptions;
        const selectedTitles = Array.from(selectedOptions)
          .map((option) => option.textContent)
          .join(", ");

        // Update the displayed text inside the select box
        displaySelectedText.textContent = selectedTitles || "Select Room";

        // Show the "Select All" option only when nothing is selected
        selectAllOption.style.display =
          selectedOptions.length > 0 ? "none" : "block";
      }

      // Attach event to update selected options when selection changes
      dropdownSelect.addEventListener("change", updateSelectedText);

      // Add the collapse/expand icon
      const icon = document.createElement("i");
      icon.classList.add("fa-solid", this.isExpanded ? "fa-minus" : "fa-plus");
      icon.style.cursor = "pointer";
      icon.style.marginLeft = "8px";

      // Click event to toggle collapse/expand all
      icon.addEventListener("click", () =>
      {
        this.toggleResourceExpand(); // Toggle expand/collapse all
      });

      container.appendChild(icon); // Append icon first

      // Ensure that the dropdown is added to the DOM
      container.appendChild(dropdownSelect);

      return { domNodes: [container] };
    },

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

      // Recreate the resources to apply changes
      // this.calendarOptions.resources = this.createResources();
    },
  },
};
</script>

<style></style>
