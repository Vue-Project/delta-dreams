<template>
  <form @submit.prevent="updatingReservationItems" ref="emptyForm">
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label w-100" for="UpdateDetailsDate">Date</label>
        <div class="input-group input-group-merge">
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-01" ref="datePicker8" aria-label="input Text to Date" v-model="formUpdateReservationItems.startDate" />
        </div>
      </div>
      <div class="col-md-12">
        <label for="updateDetailsRateType" class="col-form-label">Rate Type</label>
        <div class="input-group">
          <select class="form-select" id="updateDetailsRateType" v-model="formUpdateReservationItems.rateType">
            <option disabled selected> select</option>
            <option value="breakfast"> breakfast </option>
            <option value="nobreakfast"> nobreakfast </option>
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
        <input id="updateDetailsRateAmount" type="TEXT" class="form-control" placeholder="00.00" aria-label="rate amount" min="00.00" v-model="formUpdateReservationItems.rateAmount" />
      </div>
    </div>
    <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 0">
      <button type="submit" class="btn btn-primary ">Update</button>
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";
import flatpickrMixin from "../Mixin/flatpickrMixin";
import { PostReservationItems } from "../../Api/addResvertionApi";

export default {
  name: "UpdateDetails",
  layout: "component",
  mixins: [flatpickrMixin],
  props: {
    reservationId: {
      type: [String, Number],
      required: true,
    },
  },
  // ======================
  // Component Data
  // ======================
  data ()
  {
    return {
      // Form Data
      formUpdateReservationItems: {
        startDate: "",
        adults: "",
        children: "",
        rateAmount: "",
        rateType: "",
      },

    }
  },
  // ======================
  // Methods - Form Handling
  // ======================
  methods: {
    async updatingReservationItems ()
    {
      try {

        const updateReservationItems = {
          start_date: this.formUpdateReservationItems.startDate,
          adults: this.formUpdateReservationItems.adults,
          children: this.formUpdateReservationItems.children,
          rate_type: this.formUpdateReservationItems.rateType,
          rate_amount: this.formUpdateReservationItems.rateAmount,

        }

        console.log(updateReservationItems);


        // Make API call
        const response = await PostReservationItems(updateReservationItems);

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Reservation updated successfully.",
          confirmButtonText: "OK",
        });



      }
      catch (error) {
        // Handle validation errors
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach((field) =>
          {
            if (this.$refs[field]) {
              this.$refs[field].classList.add("input-error");
              this.validationMessages[field] = errors[field][0];
            }
          });
        }

        // Show error message
        await Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message ||
            error.message ||
            "Failed to Update Reservation. Please try again.",
        });
      }
    }
  }
};
</script>
