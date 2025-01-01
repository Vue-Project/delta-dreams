<template>
  <div class="row p-3">
    <div>
      <div v-if="selectedDates && selectedDates.length">
        <div v-for="(date, index) in selectedDates" :key="index">
          <p>Selected Date: {{ formatDate(date) }}</p>
        </div>

      </div>
      <div v-else>
        <p>No dates selected</p>
      </div>
    </div>
    <div class="col-md-8">
      <CheckIn />
    </div>
    <div class="col-md-4">
      <BillingSummary />
    </div>
  </div>
</template>

<script>
import CheckIn from "../components/AddReservation/CheckIn.vue";
import BillingSummary from "../components/AddReservation/BillingSummary.vue";
console.log(this.$store.state.reservation);

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
  // computed: {
  //   // Access selectedDates from Vuex store
  //   selectedDates ()
  //   {
  //     return this.$store.state.reservation ? this.$store.state.reservation.selectedDates : [];
  //   }
  // },

  // methods: {
  //   // Format the date to be displayed
  //   formatDate (date)
  //   {
  //     return new Date(date).toLocaleDateString();  // Format the date as YYYY-MM-DD
  //   }
  // }
};
</script>

<style></style>
