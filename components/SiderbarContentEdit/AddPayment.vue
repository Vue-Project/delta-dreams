<template>

  <form class="payment-form" @submit.prevent="addPaymentReservation">

    <div class="row">

      <div class="col-12">
        <label for="flatpickr-date-01" class="form-label">Date</label>
        <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" aria-label="input Text to Check-in Date" v-model="formAddPayment.date" />
        <i class="fa-solid fa-calendar-days icon-date right-24"></i>
      </div>
      <span class="error-message small" v-if="$v.formAddPayment.date.$error">
        date is required
      </span>
      <div class=" col-12 mb-2">
        <label class="form-label" for="payment_Image">Payment Image</label>
        <input type="file" class="form-control" id="payment_Image" ref="paymentImage" @change="handleImageUpload">
        <span class="error-message small" v-if="$v.formAddPayment.image.$error">
          Payment image is required
        </span>
      </div>
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
        <span class="error-message small" v-if="$v.formAddPayment.type.$error">
          payment type is required
        </span>
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
        <span class="error-message small" v-if="$v.formAddPayment.method.$error">
          payment method is required
        </span>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <span class="input-group-text">EGP</span>
          <input type="text" class="form-control" placeholder="Amount" aria-label="Amount (to the nearest dollar)" v-model="formAddPayment.amount">
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.amount.$error">
          amount is required
        </span>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <label class="input-group-text" for="payment_accounts">Accounts</label>

          <select class="form-select" id="payment_accounts" v-model="formAddPayment.account">
            <option disabled value="">Select Accounts</option>
            <option v-for="account in accounts" :key="account.id" :value="account.id">
              {{ account.name }}
            </option>
          </select>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.account.$error">
          account is required
        </span>
      </div>
      <div class="col-12 mb-2 mb-2">
        <div class="input-group">
          <span class="input-group-text">Comment</span>
          <textarea class="form-control" aria-label="With textarea" placeholder="Comment" v-model="formAddPayment.comment"></textarea>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.comment.$error">
          comment is required
        </span>
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

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
        reservation_id: null,
        amount: '',
        image: null
      },
    }
  },
  validations: {
    formAddPayment: {
      date: { required },
      method: { required },
      type: { required },
      account: { required },
      comment: { required },
      amount: { required },
      image: { required }  // Add validation for image
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
    async addPaymentReservation() {
      try {
        // Get the file from the file input
        const paymentImageFile = this.$refs.paymentImage.files[0] || null;
        this.formAddPayment.image = paymentImageFile;

        this.$v.$touch()
        if (this.$v.$invalid) {
          return
        }

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
        if (paymentImageFile) {
          formData.append('image', paymentImageFile);
        }

        const response = await postAddPayment(formData);
        showSuccessAlert("Payment added successfully!");
        this.$emit('payment-added');
        this.$emit('close-offcanvas');
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
    handleImageUpload (event)
    {
      const file = event.target.files[0];
      this.formAddPayment.image = file || null;
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


  mixins: [flatpickrMixin, validationMixin],
};
</script>

<style scoped></style>
