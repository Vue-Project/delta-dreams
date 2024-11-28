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
    <div v-if="isPopoverVisible" class="popover fade show bs-popover-top" role="tooltip" :style="popoverStyle" x-placement="top">
      <div class="arrow" :style="{ left: popoverArrowLeft }"></div>
      <div class="popover-body">
        <div class="sc-iXKDzi hYjxWD">
          <div class="ant-row" style="row-gap: 0px;">
            <!-- Display first selected day -->
            <div class="ant-col ant-col-12">
              <div class="sc-dhqjGB ilNAzn">First Day</div>
              <div class="sc-hDiigY bsfKst">{{ firstSelectedDate }}</div>
            </div>

            <!-- Display last selected day -->
            <div class="ant-col ant-col-12">
              <div class="sc-dhqjGB ilNAzn">Last Day</div>
              <div>{{ lastSelectedDate }}</div>
            </div>
          </div>

          <div class="sc-dFUPQr jLBeYh">
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
              <span>Walk In / Reservation</span>
            </button>
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
              <span>Maintenance Block</span>
            </button>
          </div>

          <span role="img" aria-label="close" tabindex="-1"
                class="anticon anticon-close sc-ibMOqO bkIyqW"
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
  data() {
    return {
      selectedDates: [], // Array to store selected dates
      isPopoverVisible: false, // State to control popover visibility
      isOverlayVisible: false, // State to control overlay visibility
      popoverStyle: {}, // Inline style for popover positioning
      popoverArrowLeft: "0px", // Inline style for arrow positioning
      firstSelectedDate: '', // Store first selected date
      lastSelectedDate: '', // Store last selected date
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
        slotLabelFormat: {
          day: "numeric",
          weekday: "short",
          month: "short",
        },
        resourceGroupField: "groupId",
        resourceLabelText: "Rooms",
        resourceAreaHeaderContent: this.customResourceHeader, // Customize header
        dateClick: this.handleDateClick,
        select: this.handleSelect,
        events: [], // Store events programmatically
      },
    };
  },
  methods: {
    createResources() {
      const resources = [];
      const roomData = [
        { id: "a", title: "Room A", subrooms: ["A1", "A2", "A3"] },
        { id: "b", title: "Room B", subrooms: ["B1", "B2", "B3"] },
        { id: "c", title: "Room C", subrooms: ["C1", "C2", "C3"] },
      ];

      roomData.forEach((room) => {
        resources.push({
          id: room.id,
          title: room.title,
          groupId: room.id,
        });
        room.subrooms.forEach((subroom) => {
          resources.push({
            id: `${room.id}-${subroom}`,
            title: `${room.title} Subroom ${subroom}`,
            resourceId: room.id,
            groupId: room.id,
          });
        });
      });
      return resources;
    },
    handleSelect(info) {
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

    highlightDate(dateStr) {
      const calendarEl = document.querySelector(".fc");
      const dateCell = calendarEl.querySelector(`[data-date='${dateStr}']`);

      if (dateCell) {
        dateCell.classList.add("fc-highlight");
      }
    },

    updateHighlightedText(start, end) {
      const startDate = new Date(start);
      console.log(startDate);

      const endDate = new Date(end);
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)) + 1; // Calculate total days selected

      const calendarEl = document.querySelector(".fc");
      const highlightCells = calendarEl.querySelectorAll(".fc-highlight");

      highlightCells.forEach((highlight) => {
        const tooltip = document.createElement("div");
        tooltip.classList.add("selected-days-tooltip");
        tooltip.textContent = `${totalDays} Nights`;

        highlight.appendChild(tooltip); // Add the total days count inside the highlighted area
      });

      // Show the popover after the overlay is visible
      this.showPopover();
    },

    showPopover() {
      this.isPopoverVisible = true; // Show the popover with selected dates

      // Find the position of the first .fc-highlight element
      const firstHighlight = document.querySelector(".fc-highlight");
      if (firstHighlight) {
        const rect = firstHighlight.getBoundingClientRect();
        this.popoverStyle = {
          left: `${rect.left + window.scrollX}px`,
          top: `${rect.bottom + window.scrollY}px`,
        };
        this.popoverArrowLeft = `${(rect.width / 2) - 10}px`; // Position the arrow in the middle
      }
    },

    showOverlay() {
      this.isOverlayVisible = true; // Show the overlay
    },

    closePopover() {
      this.isPopoverVisible = false;
      this.isOverlayVisible = false;
    },

    customResourceHeader() {
      return "Rooms";
    },

  },
};
</script>

<style>

</style>
