<template>
  <div class="row p-3">
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
