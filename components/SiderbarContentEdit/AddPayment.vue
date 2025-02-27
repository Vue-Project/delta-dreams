<template>

  <form class="payment-form" @submit.prevent="addPaymentReservation">
              <div class="row">
                <div class="col mb-3">
                  <label for="flatpickr-date-01" class="form-label">Date</label>
                  <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" aria-label="input Text to Check-in Date" v-model="formAddPayment.date" />
                  <i class="fa-solid fa-calendar-days icon-date right-24"></i>
                </div>
              </div>
              <div class="row g-2">
                <div class="col-12 mb-2">
                  <div class="input-group">
                    <label class="input-group-text" for="payment_type">Type</label>

                    <select class="form-select" id="payment_type" v-model="formAddPayment.type">
                      <option disabled value="">Select Type</option>
                      <option v-for="(label, value) in paymentTypes" :key="value" :value="value">
                        {{ label }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12 mb-2">
                  <div class="input-group">
                    <label class="input-group-text" for="payment_method">Method</label>

                    <select class="form-select" id="payment_method" v-model="formAddPayment.method">
                      <option disabled value="">Select Method</option>
                      <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
                        {{ paymentMethod.content }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group">
                    <span class="input-group-text">EGP</span>
                    <input type="text" class="form-control" placeholder="Amount" aria-label="Amount (to the nearest dollar)" v-model="formAddPayment.amount">
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <div class="input-group">
                    <label class="input-group-text" for="payment_accounts">Accounts</label>

                    <select class="form-select" id="payment_accounts" v-model="formAddPayment.account">
                      <option disabled value="">Select Accounts</option>
                      <option v-for="account in accounts" :key="account.id" :value="account.id">
                        {{ account.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-12 mb-2 mt-3">
                  <div class="input-group">
                    <span class="input-group-text">Comment</span>
                    <textarea class="form-control" aria-label="With textarea" placeholder="Comment" v-model="formAddPayment.comment"></textarea>
                  </div>
                </div>
                <div class="col-12 mb-2 mt-3">
                  <DropzoneComponent ref="dropzone" :id="'profile-image'" />

                </div>
              </div>
              <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 20px">

                <button type="submit" class="btn btn-primary ">Save</button>
              </div>
          </form>

</template>

<script>
import { getAccounts, getPaymentMethods } from "../../Api/addResvertionApi";
import { postAddPayment } from "../../Api/editResvertion";
import { handleSubmissionError, showSuccessAlert } from "../../Api/MassageValidation/alertUtilities";
import DropzoneComponent from "../layout/DropzoneComponent.vue";
import flatpickrMixin from "../Mixin/flatpickrMixin";

export default {
  name: "AddPayment",
  layout: "component",
  data ()
  {
    return {
      paymentMethods: [],
      paymentTypes: [],
      accounts: [],
      dateRange: '',
      checkin_date: '',
      checkout_date: '',
      formAddPayment: {
        date: new Date().toISOString().split('T')[0],
        method: '',
        type: '',
        account: '',
        comment: '',
        reservation_id: null
      },


    }
  },
  components: {
    DropzoneComponent
  },
  props: {
    reservationId: {
      type: [String, Number],
      required: true,
    },

  },
  methods: {
    async addPaymentReservation ()
    {
      try {
        // Get the file from DropzoneComponent
        const dropzoneElement = this.$refs.dropzone; // Add ref to DropzoneComponent
        const files = dropzoneElement?.getFiles();

        // Create FormData to handle file upload
        const formData = new FormData();

        // Add payment data
        const paymentData = {
          date_at: this.formAddPayment.date,
          payment_id: this.formAddPayment.method,
          type: this.formAddPayment.type,
          assigned_to: this.formAddPayment.account,
          note: this.formAddPayment.comment,
          reservation_id: this.reservationId,
          price: this.formAddPayment.amount,
        };

        // Append payment data to FormData
        Object.keys(paymentData).forEach(key => {
          formData.append(key, paymentData[key]);
        });

        // Append file if exists
        if (files?.[0]) {
          formData.append('image', files[0]);
        }

        const response = await postAddPayment(formData);
        showSuccessAlert("Payment added successfully!");
        location.reload();
      } catch (error) {
        handleSubmissionError(error, "Failed to add payment");
      }

      // Reset the payment form
      this.cancelPayment();
    },
    cancelPayment ()
    {
      this.resetPaymentForm();
    },
    resetPaymentForm ()
    {
      this.formAddPayment = {
        date: '',
        method: '',
        type: '',
        comment: '',
        reservation_id: null
      }
    },
  },
  async mounted ()
  {
    try {
      const [
        paymentMethodsResponse,
        accountsResponse,


      ] = await Promise.all([
        getPaymentMethods(),
        getAccounts(),
      ]);

      this.paymentMethods = paymentMethodsResponse.data.data;
      this.paymentTypes = paymentMethodsResponse.data.payment_type;
      this.accounts = accountsResponse.data.data
    } catch (error) {
      console.error("Error loading data:", error);
    }


  },

  mixins: [flatpickrMixin],
};
</script>

<style scoped></style>
