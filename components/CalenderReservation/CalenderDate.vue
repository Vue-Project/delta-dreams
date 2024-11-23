<template>
  <div class="card">
    <HeaderCalender/>
    <FullCalendar :options="calendarOptions" @dateClick="handleDateClick" @select="handleSelect">
      <template v-slot:eventContent="arg">
        <b>{{ arg.event.title }}</b>
      </template>
    </FullCalendar>

    <!-- Display selected dates -->
    <div v-if="selectedDates.length">
      <h3>Selected Dates:</h3>
      <ul>
        <li v-for="(date, index) in selectedDates" :key="index">{{ date }}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import HeaderCalender from './HeaderCalender.vue';

export default {
  components: {
    FullCalendar,
    HeaderCalender
  },
  data ()
  {
    return {
      selectedDates: [], // Array to store selected dates
      calendarOptions: {
        plugins: [resourceTimelinePlugin, interactionPlugin],
        initialView: 'resourceTimeline',
        duration: { days: 20 },
        weekends: true,
        resources: this.createResources(),
        selectable: true, // Enable date selection
        selectMirror: true, // Make the selection draggable
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false
        },
        eventOverlap: false, // Disallow overlapping events
        slotDuration: '24:00', // Slot duration of one day
        slotLabelFormat: {
          day: 'numeric',
          weekday: 'short',
          month: 'short',
          // year: 'numeric'
        },
        resourceGroupField: 'groupId',
        resourceLabelText: 'Rooms',
      }
    };
  },
  methods: {

    createResources ()
    {
      const resources = [];
      const roomData = [
        { id: 'a', title: 'Room A', subrooms: ['A1', 'A2', 'A3'] },
        { id: 'b', title: 'Room B', subrooms: ['B1', 'B2', 'B3'] },
        { id: 'c', title: 'Room C', subrooms: ['C1', 'C2', 'C3'] },
        { id: 'd', title: 'Room D', subrooms: ['D1', 'D2', 'D3'] },
        { id: 'e', title: 'Room E', subrooms: ['E1', 'E2', 'E3'] },
        { id: 'f', title: 'Room F', subrooms: ['F1', 'F2', 'F3'] },
      ];

      roomData.forEach(room =>
      {
        resources.push({
          id: room.id,
          title: room.title,
          groupId: room.id,
        });
        room.subrooms.forEach(subroom =>
        {
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

    handleDateClick (info)
    {
      const newEvent = {
        title: 'New Event',
        start: info.dateStr,
        end: info.dateStr,
        resourceId: 'a',
      };

      this.calendarOptions.events.push(newEvent); // Add new event
    },

    handleSelect (info)
    {
      // Handle the date range selection (start and end date)
      const { start, end } = info;

      // Clear any previously selected dates
      this.selectedDates = [];

      // Loop through the selected date range and add it to the array
      let currentDate = start;
      while (currentDate <= end) {
        this.selectedDates.push(currentDate.toLocaleDateString()); // Push selected date
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    }
  }
}
</script>

<style scoped>
.full-calendar {
  width: 100%;
  height: 400px;
}

.selectable-date {
  background-color: rgba(0, 0, 255, 0.2);
  border: 1px solid blue;
}

.selected-days {
  margin-top: 20px;
}
.fc .fc-toolbar-title {
 display: none !important;
}
</style>
