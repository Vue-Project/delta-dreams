<template>
  <div class="row p-3">
    <h1>Add Reservation</h1>
    <p v-if="selectedDates.length > 0">Selected Dates:</p>
    <ul>
      <li v-for="(date, index) in selectedDates" :key="index">{{ date.dateTime }}</li>
    </ul>
    <div class="col-md-8">
      <CheckIn :selectedDates="selectedDates" />
    </div>
    <div class="col-md-4">
      <BillingSummary :selectedDates="selectedDates" />
    </div>
  </div>
</template>

<script>
import CheckIn from "../components/AddReservation/CheckIn.vue";
import BillingSummary from "../components/AddReservation/BillingSummary.vue";
// console.log(this.$store.state.reservation);

export default {
  name: "AddReservation",
  layout: "main",
  components: {
    CheckIn,
    BillingSummary,
  },
  data ()
  {
    return {

      // selectedDates: []
    }
  },
  computed: {
    selectedDates ()
    {
      return this.$store.state.selectedDates;
    },
  },
};
</script>

<style></style>
