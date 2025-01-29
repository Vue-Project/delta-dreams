<template>
  <div class="row p-3">
    <div class="col-md-8">
      <CheckIn :paymentData="paymentData"  :selectedDates="selectedDates" :selectedResourceName="selectedResourceName" />
    </div>
    <div class="col-md-4">
      <BillingSummary v-model="paymentData" :selectedDates="selectedDates" />
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
  data ()
  {
    return {
      paymentData: {
        roomCharges: 0.0,
        taxes: 0.0,
        dueAmount: 0.0,
        billTo: "",
        taxExempt: false,
        paymentMode: false,
        paymentMethod: "",
        selectedPaymentMethod: "",
      },
    }
  },
  computed: {
    selectedDates() {
      return this.$store.state.selectedDates;
    },
    selectedResourceName() {
      return this.$store.state.selectedResourceName;
    }
  },
  // beforeMount() {
  //   this.$store.dispatch('resetAccess')
  // }

};
</script>

<style></style>
