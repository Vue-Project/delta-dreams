<template>
  <div class="row p-3">
    <div class="col-xl-8 col-md-12">
      <CheckIn
        :paymentData="paymentData"
        @change="changeRoomCharges"
        :selectedDates="selectedDates"
        :selectedResourceName="selectedResourceName"
      />
    </div>
    <div class="col-xl-4 col-md-12">
      <BillingSummary
        v-model="paymentData"
        :selectedDates="selectedDates"
        @payment-image-upload="handlePaymentImageUpload"
      />
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
  data() {
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
        Image: null,
      },
      redirectTimeout: null,
    };
  },
  methods: {
    changeRoomCharges(charges) {
      this.paymentData.roomCharges = charges;
      // console.log(charges);
    },
    
    handlePaymentImageUpload(file) {
      // Validate file type
      if (file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          alert('The image must be a file of type: jpeg, png, jpg, gif.');
          return;
        }
        this.paymentData.Image = file;
      }
    }
  },
  computed: {
    selectedDates() {
      return this.$store.state.selectedDates;
    },
    selectedResourceName() {
      return this.$store.state.selectedResourceName;
    },
  },
  // beforeMount() {
  //   this.$store.dispatch('resetAccess')
  // }
  mounted() {
    this.redirectTimeout = setTimeout(() => {
      this.$router.go(-1);
    }, 300000);
  },
  beforeDestroy() {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
  },
};
</script>

<style></style>
