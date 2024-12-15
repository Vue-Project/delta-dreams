<template>
  <div class="row p-3">
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

export default {
  name: "AddReservation",
  layout: "main",
  components: {
    CheckIn,
    BillingSummary,
  },
};
</script>

<style></style>
