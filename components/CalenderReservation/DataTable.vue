<template>
  <div>
    <table class="custom-scheduler">
      <thead>
        <tr>
          <th>Room</th>
          <th v-for="day in dates" :key="day">{{ formatDate(day) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in rooms" :key="room.id">
          <td>{{ room.name }}</td>
          <td v-for="day in dates" :key="day">
            <!-- Example: Render events or other data for each room and day -->
            <div v-for="event in getEvents(room, day)" :key="event.id">
              {{ event.title }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
export default {
  data ()
  {
    return {
      rooms: [
        { id: 1, name: "Room D" },
        { id: 2, name: "Room E" },
        { id: 3, name: "Room A" },
      ],
      dates: this.getDatesInRange("2024-12-21", "2025-01-09"),
      events: [
        { id: 1, title: "Event 1", roomId: 1, date: "2024-12-25" },
        { id: 2, title: "Event 2", roomId: 2, date: "2024-12-26" },
      ],
    };
  },
  methods: {
    getDatesInRange (start, end)
    {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const dates = [];
      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        dates.push(new Date(d));
      }
      return dates;
    },
    formatDate (date)
    {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    },
    getEvents (room, day)
    {
      const dateString = day.toISOString().split("T")[0];
      return this.events.filter(
        (event) => event.roomId === room.id && event.date === dateString
      );
    },
  },
};
</script>

<style>
.custom-scheduler {
  width: 100%;
  border-collapse: collapse;
}

.custom-scheduler th,
.custom-scheduler td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
</style>
