<template>
  <section class="summary position-sticky top-0">
    <div class="card">
      <!-- <p>{{ paymentDetails }}</p> -->
      <h5 class="card-header">
        Billing Summary

        <!-- <span class="badge bg-label-success float-right">حجز مؤكد معلق بتحويل المبلغ</span> -->
      </h5>
      <hr class="m-0" />
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-4">
            <div class="d-flex gap-2 align-items-center mb-2">
              <span class="badge bg-label-info p-1 rounded"></span>
              <p class="mb-0">Check-in</p>
            </div>
            <h5 class="mb-0 pt-1 text-nowrap fw-bold">{{ formatCheckInDate }}</h5>
          </div>
          <div class="col-4">
            <div class="divider">
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
          <div class="col-4 text-end">
            <div class="d-flex gap-2 justify-content-end align-items-center mb-2">
              <p class="mb-0">Check-out</p>
            </div>
            <h5 class="mb-0 pt-1 text-nowrap ms-lg-n3 ms-xl-0 fw-bold">{{ formatCheckOutDate }}</h5>
          </div>
        </div>
        <dl class="row mb-2 billingMoney rounded p-2">
          <dt class="col-6 fw-normal text-heading">Room Charges</dt>
          <dd class="col-6 text-end">{{ paymentDetails.roomCharges }}</dd>

          <label for="taxes" class="col-sm-9 col-4 col-form-label fw-normal">Taxes</label>
          <div class="col-sm-3 col-8">
            <input
              type="number"
              id="taxes"
              name="taxes"
              class="form-control rounded-2 fw-bold text-end"
              v-model="paymentDetails.taxes"
              min="0"
              @input="paymentDetails.taxes = Math.max(Number($event.target.value), 0)"
            >
          </div>

          <label for="dueAmount" class="col-sm-9 col-4 col-form-label fw-normal text-heading">Charge Extra</label>
          <div class="col-sm-3 col-8">
            <input
              type="number"
              id="dueAmount"
              name="dueAmount"
              class="form-control rounded-2 mt-1 fw-bold text-end"
              v-model="paymentDetails.dueAmount"
              min="0"
              @input="paymentDetails.dueAmount = Math.max(Number($event.target.value), 0)"
            >
          </div>
        </dl>

        <div class="input-group">
          <div class="input-group-text border-0 px-2 ml-3">
            <label class="pl-1 mb-0" for="inputCheckBox02">Payment Mode</label>
            <input id="inputCheckBox02" class="form-check-input mt-0" type="checkbox" v-model="value.paymentMode" />
          </div>
        </div>

        <div class="row" v-if="value.paymentMode">
          <div class="col-md-6 mb-3">
            <div class="input-group">
              <label class="input-group-text" for="paymentMethod">Methods</label>
              <select class="form-select" id="paymentMethod" v-model="value.paymentMethod">
                <option disabled value="">Select</option>
                <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
                  {{ paymentMethod.content }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="input-group">
              <label class="input-group-text" for="paymentType">Types</label>
              <select class="form-select" id="paymentType" v-model="selectedPaymentType">
                <option disabled value="">Select</option>
                <option v-for="(label, value) in paymentTypes" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <div class="input-group">
              <label class="input-group-text" for="paymentInsurance">Insurance</label>
              <input type="text" class="form-control" id="paymentInsurance" v-model="paymentDetails.insurance">
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <div class="input-group">
              <label class="input-group-text" for="paymentInsuranceBy">Insurance By</label>
              <select class="form-select" id="paymentInsuranceBy" v-model="paymentDetails.insurance_by">
                <option disabled value="">Select</option>
                <option v-for="account in accounts" :key="account.id" :value="account.id">
                  {{ account.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <p v-if="!value.paymentMode && validationMessage" class="validation-message">
          Payment Mode is required.
        </p>

        <!-- Payment Details Summary -->
        <div v-if="value.paymentMode" class="payment-summary mt-3">
          <h6 class="mb-3">Payment Details</h6>
          <dl class="row">
            <dt class="col-6">Payment Method:</dt>
            <dd class="col-6">{{ 'Cash' }}</dd>

            <dt class="col-6">Payment Type:</dt>
            <dd class="col-6">{{ selectedPaymentType || 'Not selected' }}</dd>

            <!-- Common fields for all payment types -->
            <dt class="col-6">Amount:</dt>
            <dd class="col-6">{{ paymentDetails.amount || 'Not specified' }}</dd>

            <dt class="col-6">Date:</dt>
            <dd class="col-6">{{ paymentDetails.date || 'Not specified' }}</dd>

            <template v-if="paymentDetails.comment">
              <dt class="col-6">Comment:</dt>
              <dd class="col-6">{{ paymentDetails.comment }}</dd>
            </template>

            <!-- New fields for insurance details -->
            <template v-if="paymentDetails.insurance">
              <dt class="col-6">Insurance:</dt>
              <dd class="col-6">{{ paymentDetails.insurance }}</dd>
            </template>

            <template v-if="paymentDetails.insurance_by">
              <dt class="col-6">Insurance By:</dt>
              <dd class="col-6">{{ accounts.find(account => account.id === paymentDetails.insurance_by)?.name || 'Not specified' }}</dd>
            </template>
          </dl>
        </div>

        <!-- Dynamic form fields based on payment type -->
        <div class="mt-3" v-if="selectedPaymentType">
          <!-- Common fields for all payment types -->
          <div class="mb-3">
            <label class="form-label">Amount</label>
            <input type="number" class="form-control" v-model="paymentDetails.amount">
          </div>
          <div class="mb-3">
            <label class="form-label">Date</label>
            <input type="date" class="form-control" v-model="paymentDetails.date">
          </div>
          <div class="mb-3">
            <label class="form-label">Comment</label>
            <textarea class="form-control" v-model="paymentDetails.comment" rows="3"></textarea>
          </div>

          <!-- Payment specific fields -->
          <!-- <template v-if="selectedPaymentType === 'bank_transfer'">
            <div class="mb-3">
              <label class="form-label">Bank Name</label>
              <input type="text" class="form-control" v-model="paymentDetails.bankName">
            </div>
            <div class="mb-3">
              <label class="form-label">Account Number</label>
              <input type="text" class="form-control" v-model="paymentDetails.accountNumber">
            </div>
          </template> -->

          <!-- <template v-if="['vodafone', 'we', 'orange', 'etisalat'].includes(selectedPaymentType)">
            <div class="mb-3">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-control" v-model="paymentDetails.phoneNumber">
            </div>
            <div class="mb-3">
              <label class="form-label">Transaction ID</label>
              <input type="text" class="form-control" v-model="paymentDetails.transactionId">
            </div>
          </template> -->

          <!-- <template v-if="selectedPaymentType === 'visa'">
            <div class="mb-3">
              <label class="form-label">Card Number</label>
              <input type="text" class="form-control" v-model="paymentDetails.cardNumber">
            </div>
          </template> -->

          <!-- <template v-if="['apple_pay', 'google_pay', 'instapay', 'fawry'].includes(selectedPaymentType)">
            <div class="mb-3">
              <label class="form-label">Transaction ID</label>
              <input type="text" class="form-control" v-model="paymentDetails.transactionId">
            </div>
          </template> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAccounts, getPaymentMethods } from '../../Api/addResvertionApi';

export default {
  name: "BillingSummary",
  props: {
    value: {
      type: Object,
      required: true,
    },
    selectedDates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      validationMessage: "",
      paymentMethods: [],
      paymentTypes: [],
      accounts: [],
      selectedPaymentType: '',
      paymentDetails: {
        roomCharges: 0.0,
        taxes: 0.0,
        dueAmount: 0.0,
        amount: null,
        bankName: '',
        accountNumber: '',
        transferDate: '',
        phoneNumber: '',
        transactionId: '',
        cardNumber: '',
        date: new Date().toISOString().split('T')[0],
        cvv: '',
        comment: '',
        insurance: '',
        insurance_by: '',



      }
    };
  },
  computed: {
    formatCheckInDate() {
      if (this.selectedDates && this.selectedDates.length > 0) {
        const firstDate = this.selectedDates[0].dateTime;
        const [datePart] = firstDate.split(", ");
        return datePart;
      }
      return "--/--/----";
    },
    formatCheckOutDate() {
      if (this.selectedDates && this.selectedDates.length > 0) {
        const lastDate = this.selectedDates[this.selectedDates.length - 1].dateTime;
        const [datePart] = lastDate.split(", ");
        return datePart;
      }
      return "--/--/----";
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
      this.accounts = accountsResponse.data.data;
    } catch (error) {
      console.error("Error loading data:", error);
    }


  },
  watch: {
    // "value.paymentMode": function (newVal) {
    //   if (!newVal) {
    //     this.validationMessage = "Payment Mode is required.";
    //   } else {
    //     this.validationMessage = "";
    //   }
    // },
    "value.roomCharges" : function(value){
      this.paymentDetails.roomCharges = value
    },
    selectedPaymentType(newVal) {
      this.$emit('input', {
        ...this.value,
        selectedPaymentType: newVal
      });
    },
    'paymentDetails': {
      deep: true,
      handler(newVal) {
        this.$emit('input', {
          ...this.value,
          ...newVal
        });
      }
    }
  },
  methods: {
    // Add this new method to mask card numbers
    maskCardNumber(cardNumber) {
      if (!cardNumber) return 'Not specified';
      return `****-****-****-${cardNumber.slice(-4)}`;
    },
  },
};
</script>

<style scoped>
.payment-summary {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.payment-summary dt {
  font-weight: 500;
  color: #566a7f;
}

.payment-summary dd {
  text-align: right;
  margin-bottom: 0.5rem;
}

.billingMoney {
  background-color: #f8f9fa;
}
</style>
