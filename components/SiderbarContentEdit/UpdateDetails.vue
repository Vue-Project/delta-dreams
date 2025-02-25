<template>
  <form @submit.prevent="updatingReservationItems" ref="emptyForm">
    <!-- <p>{{ reservationData.items }}</p> -->
    <div class="row g-3">
      <div class="col-md-12">
        <label for="updateDetailsRateType" class="col-form-label">Rate Type</label>
        <div class="input-group">
          <select class="form-select" id="updateDetailsRateType" v-model="formUpdateReservationItems.rateType">
            <option disabled selected> select</option>
            <option v-for="(type, index) in getRateTypes" :key="index" :value="index">
                              {{ type }}
                            </option>
          </select>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <label for="updateDetailsChildren" class="col-form-label">children </label>
        <input id="updateDetailsChildren" type="number" class="form-control" placeholder="Number of children" aria-label="Number of adults" min="0" v-model="formUpdateReservationItems.children" />
      </div>
      <div class="col-12 col-md-6">
        <label for="updateDetailsAdults" class="col-form-label">adults </label>
        <input id="updateDetailsAdults" type="number" class="form-control" placeholder="Number of adults" aria-label="Number of adults" min="0" v-model="formUpdateReservationItems.adults" />
      </div>
      <div class="col-md-12">
        <label for="updateDetailsRateAmount" class="col-form-label">Rate Amount</label>
        <input id="updateDetailsRateAmount" type="text" class="form-control" placeholder="00.00" aria-label="rate amount" min="00.00" v-model="formUpdateReservationItems.rateAmount" />
      </div>
    </div>
    <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 15px">
      <button type="submit" class="btn btn-primary">Update</button>
    </div>
  </form>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
import { PostReservationItems } from "../../Api/addResvertionApi";
import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';
import { mapGetters } from "vuex/";


export default {
  name: "UpdateDetails",
  layout: "component",
  mixins: [flatpickrMixin],
  props: {
    reservationId: {
      type: [String, Number],
      required: true,
    },
    reservationData: {
      type: Object,
      default: () => ({})
    },
    hideOffcanvas: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      // Form Data
      formUpdateReservationItems: {
        startDate: "",
        adults: "",
        children: "",
        rateAmount: "",
        rateType: "",
      },
    };
  },
  watch: {
    // Watch for changes in reservationData.items and update the form data
    "reservationData.items": {
      immediate: true,
      handler(newItems) {
        if (newItems && newItems.length > 0) {
          const item = newItems[0]; // Assuming the first item is the one to edit
          this.formUpdateReservationItems = {
            startDate: item.start_date || "",
            adults: item.adults || "",
            children: item.children || "",
            rateAmount: item.rate_amount || "",
            rateType: item.rate_type || "",
          };
        }
      },
    },
  },
  methods: {
    async updatingReservationItems() {
      try {
        const updateReservationItems = {
          id: this.reservationData.items[0].id,
          unit_id: this.reservationData.items[0].unit_id,
          reservation_id: this.reservationData.items[0].reservation_id,
          adults: this.formUpdateReservationItems.adults,
          children: this.formUpdateReservationItems.children,
          rate_type: this.formUpdateReservationItems.rateType,
          rate_amount: this.formUpdateReservationItems.rateAmount,
        };

        const response = await PostReservationItems(this.reservationId, updateReservationItems);
        await showSuccessAlert(
          "Reservation Items updated successfully.", // Custom message
          this.$router,
          'index' // Route name
        );


        this.hideOffcanvas();
      } catch (error) {
        handleSubmissionError(
          error,
          "There was an issue with your reservation." // Custom default error
        );
      }
    },
  },
  computed: {

    ...mapGetters([
      'getRateTypes',

    ]),
  },
};
</script>
