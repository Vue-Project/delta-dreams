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
    <div v-if="isPopoverVisible" class="popover fade show bs-popover-top rounded-0" role="tooltip" :style="popoverStyle"
      x-placement="top">
      <div class="arrow" :style="{ left: popoverArrowLeft }"></div>
      <div class="popover-body">
        <div class="sc-iXKDzi hYjxWD popoverContent text-center">
          <div class="row" style="row-gap: 0px">
            <!-- Display first selected day -->
            <div class="ant-col col-6">
              <div class="sc-dhqjGB ilNAzn text-black fw-bold">Arrival</div>
              <div class="sc-hDiigY bsfKst">{{ firstSelectedDate }}</div>
            </div>

            <!-- Display last selected day -->
            <div class="ant-col col-6">
              <div class="sc-dhqjGB ilNAzn text-black fw-bold">Departure</div>
              <div>{{ lastSelectedDate }}</div>
            </div>
          </div>

          <div class="row ">
            <hr class="my-2 w-75 mx-auto" />
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
              <span>Walk In / Reservation</span>
            </button>
            <hr class="my-2 w-75 mx-auto" />
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
              <span>Maintenance Block</span>
            </button>
          </div>

          <span role="img" aria-label="close" tabindex="-1" class="anticon anticon-close sc-ibMOqO bkIyqW popoverClose"
            @click="closePopover">
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
      lastSelectedDate: "", // Store last selected date
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
        resourceLabelText: "Rooms",
        resourceAreaHeaderContent: this.customResourceHeader, // Customize header
        dateClick: this.handleDateClick,
        select: this.handleSelect,
        events: [], // Store events programmatically
        isExpanded: true, // Toggle for expanding/collapsing resources

      },
    };
  },
  methods: {
    createResources() {
      const roomData = [
        { id: "a", title: "Room A", subrooms: ["A1", "A2", "A3"] },
        { id: "b", title: "Room B", subrooms: ["B1", "B2", "B3"] },
        { id: "c", title: "Room C", subrooms: ["C1", "C2", "C3"] },
      ];
      const resources = [];

      roomData.forEach((room) => {
        resources.push({
          id: room.id,
          title: room.title,
          groupId: room.id,
          classNames: ['resource'], // Add class to easily select room cells
        });

        room.subrooms.forEach((subroom) => {
          resources.push({
            id: `${room.id}-${subroom}`,
            title: subroom,
            resourceId: room.id,
            groupId: room.id,
            classNames: ['subroom'], // Add class to easily select subroom cells
          });
        });
      });

      return resources;
    },

    toggleResourceExpand() {
      this.isExpanded = !this.isExpanded; // Toggle expand/collapse state

      // Get all rows for rooms and subrooms
      const resourceCells = document.querySelectorAll('.fc-datagrid-cell.fc-resource'); // Select all resource rows
      const subroomCells = document.querySelectorAll('.fc-datagrid-cell.fc-subroom'); // Select all subroom rows

      resourceCells.forEach((cell) => {
        // Collapse or expand all cells under the room id
        const roomId = cell.dataset.resourceId;
        if (this.isExpanded) {
          // Expand: Remove collapsed class
          document.querySelectorAll(`[data-resource-id='${roomId}']`).forEach((subCell) => {
            subCell.classList.remove('collapsed');
          });
        } else {
          // Collapse: Add collapsed class
          document.querySelectorAll(`[data-resource-id='${roomId}']`).forEach((subCell) => {
            subCell.classList.add('collapsed');
          });
        }
      });

      this.calendarOptions.resources = this.createResources(); // Recreate the resource list
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

    // showPopover() {
    //   this.isPopoverVisible = true; // Show the popover with selected dates

    //   // Find the position of the first .fc-highlight element
    //   const firstHighlight = document.querySelector(".fc-highlight");
    //   if (firstHighlight) {
    //     const rect = firstHighlight.getBoundingClientRect();
    //     this.popoverStyle = {
    //       left: `${rect.left + window.scrollX}px`,
    //       top: `${rect.bottom + window.scrollY}px`,
    //     };
    //     this.popoverArrowLeft = `${(rect.width / 2) - 10}px`; // Position the arrow in the middle
    //   }
    // },

    // sama function and try the top spacing is correct but the left is need to adjust
    showPopover ()
    {
      this.isPopoverVisible = true; // عرض الـ Popover

      this.$nextTick(() =>
      {
        const popoverElement = document.querySelector(".popover");
        this.popoverHeight = popoverElement ? popoverElement.offsetHeight : 0;
        const highlightElements = document.querySelectorAll(".fc-highlight");
        if (highlightElements.length > 0) {
          const lastHighlight = highlightElements[highlightElements.length - 1];
          const rect = lastHighlight.getBoundingClientRect();
          this.popoverStyle = {
            left: `${rect.left + rect.width / 2 - 90}px`, // Adjust alignment
            top: `${rect.top + window.scrollY - this.popoverHeight - 90}px`, // Position above
          };
          this.popoverArrowLeft = `${rect.width / 2 - 10}px`;
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

    customResourceHeader() {
      const container = document.createElement("div");
      container.classList.add("resource-header");

      const title = document.createElement("span");
      title.textContent = "Rooms";

      const icon = document.createElement("i");
      icon.classList.add("fa-solid", this.isExpanded ? "fa-minus" : "fa-plus");
      icon.style.cursor = "pointer";
      icon.style.marginLeft = "8px";

      icon.addEventListener("click", this.toggleResourceExpand); // Toggle expand/collapse when clicked

      container.appendChild(title);
      container.appendChild(icon);

      return { domNodes: [container] };
    },











  },
};
</script>

<style>
.fc-timeline-slot-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slot-label-weekday {
  font-weight: bold;
}

.slot-label-day {
  font-size: 16px;
}

.slot-label-month {
  font-size: 12px;
  color: gray;
}

.fc-timeline-header-row th {
  border: 0;
  border-right: 1px solid #D1D4D9;
  border-left: 1px solid #D1D4D9;
}

.fc-timeline-header-row-chrono {
  border-bottom: 1px solid #D1D4D9;

}

.fc .fc-timeline-header-row-chrono .fc-timeline-slot-frame {
  justify-content: flex-end;
}

.fc .fc-timeline-header-row:last-child .fc-timeline-slot-frame {
  overflow: visible;
}

.resource-header-container {
  width: 200px;
  font-family: Arial, sans-serif;
}

.resource-header-select {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  background-color: white;
}

.resource-header-selected-label {
  font-weight: bold;
  padding-right: 5px;
}

.checkbox-container {
  margin-top: 5px;
  padding: 10px;
  border-top: 1px solid #ccc;
  display: none;
  max-height: 150px;
  overflow-y: auto;
  background-color: white;
}

.checkbox-option-wrapper {
  margin-bottom: 8px;
}

.resource-header-checkbox {
  margin-right: 10px;
}

.fc .fc-timeline-slot-cushion {

  position: relative;
  top: -4px;
}
</style>
