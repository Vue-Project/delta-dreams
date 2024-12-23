<template>
  <section class="card">
    <HeaderCalender :statistics="statistics" />

    <!-- FullCalendar with Custom Layout -->
    <FullCalendar :options="calendarOptions" @select="handleSelect" class="custom-resource-calendar">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>

    <!-- Occupancy Table -->
    <div id="calendar-footer">
      <table class="ant-table">
        <tbody class="ant-table-tbody">
          <tr style="background: #f1f1f1">
            <td title="Room Occupancy %" colspan="2" style="text-align: left; padding: 0 15px">
              Room Occupancy %
            </td>
            <td v-for="(data, index) in occupancyData" :key="index">
              {{ data }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Selection Overlay and Popover -->
    <div v-if="isOverlayVisible" class="overlay" @click="closePopover"></div>
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
            <NuxtLink to="/addreservation">Go to Add Reservation</NuxtLink>
            <hr class="my-2 w-75 mx-auto" />
            <button type="button" class="ant-btn ant-btn-link ant-btn-block">
              <span>Maintenance Block</span>
            </button>
          </div>
          <span class="anticon anticon-close popoverClose" @click="closePopover">
            <i class="fa-solid fa-xmark"></i>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import HeaderCalender from './HeaderCalender.vue';

export default {
  components: {
    FullCalendar,
    HeaderCalender,
  },
  data ()
  {
    return {
      selectedDates: [],
      isPopoverVisible: false,
      isOverlayVisible: false,
      popoverStyle: {},
      popoverArrowLeft: '0px',
      firstSelectedDate: '',
      lastSelectedDate: '',
      occupancyData: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 50, 0, 0, 20, 80, 19, 100],
      calendarOptions: {
        plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin],
        initialView: 'resourceDayGridDay',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'resourceDayGridDay,resourceDayGridWeek'
        },
        views: {
          resourceDayGridDay: {
            type: 'resourceDayGrid',
            duration: { days: 1 }
          },
          resourceDayGridWeek: {
            type: 'resourceDayGrid',
            duration: { days: 7 }
          }
        },
        resources: [],
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        resourceAreaWidth: '200px',
        slotDuration: '24:00:00',
        allDaySlot: false,
        resourceAreaHeaderContent: 'Rooms',
        select: this.handleSelect,
        eventOverlap: false,
        resourceGroupField: 'groupId',
        datesSet: this.handleDatesSet
      }
    };
  },
  methods: {
    createResources ()
    {
      const roomData = [
        { id: 'a', title: 'Room A', subrooms: ['A1', 'A2', 'A3'] },
        { id: 'b', title: 'Room B', subrooms: ['B1', 'B2', 'B3'] },
        { id: 'c', title: 'Room C', subrooms: ['C1', 'C2', 'C3'] }
      ];

      const resources = [];

      roomData.forEach(room =>
      {
        resources.push({
          id: room.id,
          title: room.title,
          groupId: room.id,
          classNames: ['resource-row']
        });

        room.subrooms.forEach(subroom =>
        {
          resources.push({
            id: `${room.id}-${subroom}`,
            title: subroom,
            resourceId: room.id,
            groupId: room.id,
            classNames: ['subroom-row']
          });
        });
      });

      return resources;
    },
    handleSelect (info)
    {
      const { start, end } = info;
      this.selectedDates = [];

      let currentDate = new Date(start);
      const endDate = new Date(end);

      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (!this.selectedDates.includes(dateStr)) {
          this.selectedDates.push(dateStr);
          this.highlightDate(dateStr);
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.firstSelectedDate = this.selectedDates[0];
      this.lastSelectedDate = this.selectedDates[this.selectedDates.length - 1];
      this.showOverlay();
      this.showPopover();
    },
    handleDatesSet ()
    {
      this.applyCustomStyling();
    },
    applyCustomStyling ()
    {
      // Add custom styling to make it look more like a daygrid
      this.$nextTick(() =>
      {
        const calendar = document.querySelector('.fc');
        if (calendar) {
          calendar.classList.add('daygrid-style');
        }
      });
    },
    showOverlay ()
    {
      this.isOverlayVisible = true;
    },
    showPopover ()
    {
      this.isPopoverVisible = true;
      this.$nextTick(() =>
      {
        const popoverElement = document.querySelector('.popover');
        const highlightElements = document.querySelectorAll('.fc-highlight');

        if (highlightElements.length > 0 && popoverElement) {
          const lastHighlight = highlightElements[highlightElements.length - 1];
          const rect = lastHighlight.getBoundingClientRect();

          this.popoverStyle = {
            left: `${rect.left + rect.width / 2 - popoverElement.offsetWidth / 2}px`,
            top: `${rect.top + window.scrollY - popoverElement.offsetHeight - 10}px`
          };
          this.popoverArrowLeft = `${popoverElement.offsetWidth / 2 - 10}px`;
        }
      });
    },
    closePopover ()
    {
      this.isPopoverVisible = false;
      this.isOverlayVisible = false;
    },
    highlightDate (dateStr)
    {
      const calendarEl = document.querySelector('.fc');
      const dateCell = calendarEl?.querySelector(`[data-date='${dateStr}']`);

      if (dateCell) {
        dateCell.classList.add('fc-highlight');
      }
    }
  },
  mounted ()
  {
    this.calendarOptions.resources = this.createResources();
    this.$nextTick(() =>
    {
      this.applyCustomStyling();
    });
  },
  props: {
    statistics: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
/* Custom styles to make resourceTimeline look like daygrid */
.custom-resource-calendar {
  --fc-border-color: #ddd;
  --fc-day-today-bg-color: rgba(255, 220, 40, 0.15);
}

.daygrid-style .fc-resource-timeline-divider {
  display: none;
}

.daygrid-style .fc-resource-timeline-header-row {
  height: 40px;
}

.daygrid-style .fc-timeline-slot-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.daygrid-style .fc-timeline-slot {
  border: 1px solid var(--fc-border-color);
}

.daygrid-style .fc-timeline-slot-lane {
  border-bottom: 1px solid var(--fc-border-color);
}

.resource-row {
  font-weight: bold;
  background-color: #f8f9fa;
}

.subroom-row {
  padding-left: 20px;
  background-color: white;
}

.fc-highlight {
  background-color: rgba(130, 177, 255, 0.3);
  position: relative;
}

.selected-days-tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popover {
  z-index: 1001;
  position: absolute;
  max-width: 300px;
}

.popover-close {
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}
</style>
