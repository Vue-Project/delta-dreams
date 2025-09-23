<template>
  <div id="calendar-footer">
    <div class="table-responsive text-nowrap">
      <table class="table">
        <tbody>
          <tr style="background: #f1f1f1">
            <td
              title="Room Occupancy %"
              colspan="0"
              style="text-align: left; border-right: 4px solid #ddd"
              class="w-18"
            >
              Room Occupancy %
            </td>
            <td
              v-for="(data, index) in occupancyData"
              :key="index"
              class="fc-timeline-slot"
            >
              {{ data.reserved_percentage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    occupancyData: {
      type: Array,
      required: true,
    },
  },
};
</script>
