<template>
  <form class="payment-form" @submit.prevent="FormUpdateWallet">
    <div class="row">
      <div class="col-12">
        <label for="flatpickr-date-01" class="form-label">Date</label>
        <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" aria-label="input Text to Check-in Date" v-model="formAddPayment.date" />
        <i class="fa-solid fa-calendar-days icon-date right-24"></i>
      </div>
      <span class="error-message small" v-if="$v.formAddPayment.date.$error">date is required</span>
      <div class="col-12 mb-2">
        <label class="form-label" for="payment_Image">Payment Image</label>
        <input type="file" class="form-control" id="payment_Image" ref="paymentImage" @change="handleImageUpload" />
        <span class="error-message small" v-if="$v.formAddPayment.image.$error">Payment image is required</span>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <select class="form-select" id="payment_method" v-model="formAddPayment.method" @change="fetchPaymentTypeByMethod">
            <option disabled value="">Select Method</option>
            <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
              {{ paymentMethod.name }}
            </option>
          </select>
          <label class="input-group-text" for="payment_method">Method</label>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.method.$error">payment method is required</span>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <select class="form-select" id="payment_type" v-model="formAddPayment.paymentType">
            <option disabled value="">Select Type</option>
            <option v-for="paymentType in paymentTypes" :key="paymentType.id" :value="paymentType.id">
              {{ paymentType.name }}
            </option>
          </select>
          <label class="input-group-text" for="payment_type">paymentType</label>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.type.$error">payment type is required</span>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <select class="form-select" id="wallet_type" v-model="formAddPayment.type">
            <option disabled value="">Select Type</option>
            <option v-for="(label, value) in walletsTypes" :key="value" :value="value">
              {{ label }}
            </option>
          </select>
          <label class="input-group-text" for="wallet_type">Types</label>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.type.$error">type is required</span>
      </div>
      <!-- <div class="col-12 mb-2">
        <div class="input-group">
          <select class="form-select" id="payment_accounts" v-model="formAddPayment.account">
            <option disabled value="">Select Accounts</option>
            <option v-for="account in accounts" :key="account.id" :value="account.id">
              {{ account.name }}
            </option>
          </select>
          <label class="input-group-text" for="payment_accounts">Accounts</label>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <select class="form-select" id="travelAgent" v-model="formAddPayment.travelAgent">
            <option disabled value="">Select</option>
            <option v-for="travelAgent in travelAgents" :key="travelAgent.id" :value="travelAgent.id">
              {{ travelAgent.name }}
            </option>
          </select>
          <label class="input-group-text" for="travelAgent">Travel Agent</label>
        </div>
      </div>
      <div class="col-12 mb-2">
        <div class="input-group">
          <select class="form-select" id="businessSource" v-model="formAddPayment.businessSource">
            <option disabled value="">Select</option>
            <option v-for="businessSource in businessSources" :key="businessSource.id" :value="businessSource.id">
              {{ businessSource.name }}
            </option>
          </select>
          <label class="input-group-text" for="businessSource">Business Source</label>
        </div>
      </div> -->
      <div class="col-12 mb-2">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Amount" aria-label="Amount (to the nearest dollar)" v-model="formAddPayment.amount" />
          <span class="input-group-text">EGP</span>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.amount.$error">amount is required</span>
      </div>
      <div class="col-12 mb-2 mb-2">
        <div class="input-group">
          <textarea class="form-control" aria-label="With textarea" placeholder="Comment" v-model="formAddPayment.comment"></textarea>
          <span class="input-group-text">Comment</span>
        </div>
        <span class="error-message small" v-if="$v.formAddPayment.comment.$error">comment is required</span>
      </div>
    </div>
    <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 20px">
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <span v-if="isSubmitting">
          <i class="fa fa-spinner fa-spin me-1"></i>
          Saving...
        </span>
        <span v-else>Update</span>
      </button>
    </div>
  </form>
</template>

<script>
import { getAccounts, getBusinessSources, getPaymentMethods, getPaymentTypeByPaymentId, getTravelAgents } from '../../Api/addResvertionApi';
import { putUpdateWallet } from '../../Api/editResvertion';
import { handleSubmissionError, showSuccessAlert } from '../../Api/MassageValidation/alertUtilities';
import flatpickrMixin from '../Mixin/flatpickrMixin';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'EditPayment',
  props: {
    selectedWallet: {
      type: Object,
      required: true
    }
  },
  mixins: [flatpickrMixin, validationMixin],
  data() {
    return {
      isSubmitting: false,
      paymentMethods: [],
      paymentTypes: [],
      accounts: [],
      walletsTypes: [],
      travelAgents: [],
      businessSources: [],
      formAddPayment: {
        date: '',
        method: '',
        type: '',
        account: '',
        comment: '',
        reservation_id: null,
        amount: '',
        image: null,
        paymentType: '',
        businessSource: '',
        travelAgent: '',
      },
    };
  },
  validations: {
    formAddPayment: {
      date: { required },
      method: { required },
      type: { required },
      comment: { required },
      amount: { required },
      image: { required },
    },
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.formAddPayment.image = file || null;
    },
    async fetchPaymentTypeByMethod() {
      if (this.formAddPayment.method) {
        try {
          const response = await getPaymentTypeByPaymentId(this.formAddPayment.method);
          if (response && response.data) {
            this.paymentTypes = response.data.data;
          }
        } catch (error) {
          console.error('Error fetching payment type:', error);
        }
      } else {
        this.paymentTypes = [];
        this.formAddPayment.paymentType = '';
      }
    },
    async populateFormUpdateWallet(wallet) {
      this.formAddPayment = {
        date: wallet?.date_at || '',
        method: wallet?.payment_id || '',
        type: wallet?.type || '',
        comment: wallet?.note || '',
        amount: wallet?.price || '',
        account: wallet.assigned?.id || '',
        reservation_id: wallet.reservation_id || null,
        image: null,
        paymentType: '', // temporarily empty, will set after fetching
        businessSource: wallet?.business_source_id || '',
        travelAgent: wallet?.travel_agent_id || '',
      };

      // Fetch payment types for the selected method
      if (wallet?.payment_id) {
        try {
          const response = await getPaymentTypeByPaymentId(wallet.payment_id);
          if (response && response.data) {
            this.paymentTypes = response.data.data;
            // Set the paymentType after fetching options
            this.formAddPayment.paymentType = wallet?.payment_type_id || '';
          }
        } catch (error) {
          console.error('Error fetching payment type:', error);
          this.paymentTypes = [];
        }
      } else {
        this.paymentTypes = [];
        this.formAddPayment.paymentType = '';
      }
    },
    async FormUpdateWallet() {
      if (this.isSubmitting) return;
      try {
        this.isSubmitting = true;
        const paymentImageFile = this.$refs.paymentImage?.files[0] || null;
        this.formAddPayment.image = paymentImageFile;
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.isSubmitting = false;
          return;
        }
        const formData = new FormData();
        const paymentData = {
          wallet_id: this.selectedWallet.id,
          date_at: this.formAddPayment.date,
          payment_id: this.formAddPayment.method,
          payment_type_id: this.formAddPayment.paymentType,
          note: this.formAddPayment.comment,
          reservation_id: this.selectedWallet.reservation_id,
          price: this.formAddPayment.amount,
          type: this.formAddPayment.type,
          assigned_to: this.formAddPayment.account,
          travel_agent_id: this.formAddPayment.travelAgent,
          business_source_id: this.formAddPayment.businessSource,
        };
        Object.keys(paymentData).forEach(key => {
          formData.append(key, paymentData[key]);
        });
        if (paymentImageFile) {
          formData.append('image', paymentImageFile);
        }
        await putUpdateWallet(paymentData.wallet_id, formData);
        await showSuccessAlert('Wallet updated successfully!');
        this.$emit('wallet-updated');
        this.$emit('close-offcanvas');
      } catch (error) {
        handleSubmissionError(error, 'There was an issue with your reservation.');
      } finally {
        this.isSubmitting = false;
      }
    },
  },
  async mounted() {
    try {
      const [paymentMethodsResponse, accountsResponse, businessSourcesResponse, travelAgentsResponse] = await Promise.all([
        getPaymentMethods(),
        getAccounts(),
        getBusinessSources(),
        getTravelAgents()
      ]);
      this.paymentMethods = paymentMethodsResponse.data.data;
      this.walletsTypes = paymentMethodsResponse.data.wallet_type;
      this.businessSources = businessSourcesResponse.data.data;
      // this.travelAgents = travelAgentsResponse.data.data;
      // this.accounts = accountsResponse.data.data;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  },
  watch: {
    selectedWallet: {
      immediate: true,
      handler(wallet) {
        if (wallet) {
          this.populateFormUpdateWallet(wallet);
        }
      }
    }
  }
};
</script>

<style scoped></style>
