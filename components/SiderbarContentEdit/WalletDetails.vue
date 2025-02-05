<template>
  <section class="summary position-sticky top-0">
    <div class="card">
      <form id="formReservation" class=" g-3" @submit.prevent="FormUpdateWallet" ref="emptyForm">

      <div class="card-body">
        <!-- {{reservationData.wallets}} -->


        <div class="row">
          <div class="col-md-6">
            <div class="input-group">
              <label class="input-group-text" for="inputGroupSelect01">Methods</label>
              <select class="form-select" id="businessSource">
                <!-- <option disabled value="">Select</option> -->
                <option v-for="(paymentMethod, index) in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
                  {{ paymentMethod.content }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <div class="input-group">
              <label class="input-group-text" for="inputGroupSelect01">Types</label>
              <select class="form-select" id="businessSource" v-model="selectedPaymentType">
                <option disabled value="">Select</option>
                <option v-for="(label, value) in paymentTypes" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
            </div>
          </div>
        </div>


        <!-- Payment Details Summary -->
        <div class="payment-summary mt-3">
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

        </div>
      </div>
      <div class="row">
            <div class="col-12 text-end ">
              <button type="submit" class="btn btn-lg btn-primary waves-effect waves-light m-3">
                Update
              </button>
            </div>
          </div>
          </form>
    </div>
  </section>
</template>

<script>
import { getPaymentMethods } from '../../Api/addResvertionApi';
import { updateWallet } from '../../Api/editResvertion';
import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';


export default {
  name: "WalletDetails",
  layout: "component",
  props: {
    reservationId: {
      type: [String, Number],
      required: true, // Ensure the prop is provided
    },
    reservationData: {
      type: Object,
      default: () => ({})
    }
  },
  data ()
  {
    return {
      paymentMethods: [],
      paymentTypes: [],
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
      },
      selectedPaymentType: '',
    };
  },
  methods: {
    // Add this new method to mask card numbers
    maskCardNumber (cardNumber)
    {
      if (!cardNumber) return 'Not specified';
      return `****-****-****-${cardNumber.slice(-4)}`;
    },
    fillWalletsData (data)
    {
      if (data.wallets && data.wallets.length > 0) {
        const wallet = data.wallets[0]; // Getting the first wallet

        // Fill payment details
        this.paymentDetails = {
          ...this.paymentDetails,
          amount: wallet.price || null,
          date: wallet.date_at || new Date().toISOString().split('T')[0],
          comment: wallet.note || '',
        };

        // Set payment method (using the payment ID)
        if (wallet.payment_id) {
          const select = document.getElementById('businessSource');
          if (select) {
            select.value = wallet.payment_id;
          }
        }

        // Set payment type
        if (wallet.type) {
          this.selectedPaymentType = wallet.type;
        }
      }
    },
    async FormUpdateWallet() {
      try {
        const walletData = {
          wallet_id: this.reservationData.wallets[0]?.id, // Get wallet ID from the first wallet
          payment_id: document.getElementById('businessSource').value,
          type: this.selectedPaymentType,
          price: this.paymentDetails.amount,
          date_at: this.paymentDetails.date,
          note: this.paymentDetails.comment
        };


        // You'll need to import and call your API function here
        // const response = await updateWallet(walletData);

        // Show success message
        await showSuccessAlert(
          "Wallet updated successfully!", // Custom message
          this.$router,
          'index' // Route name
        );
      } catch (error) {
        handleSubmissionError(
          error,
          "There was an issue with your reservation." // Custom default error
        );
      }
    }
  },
  watch: {
    reservationData: {
      immediate: true,
      handler (newData)
      {
        if (newData && typeof newData === 'object') {
          this.fillWalletsData(newData);
        }
      }
    }
  },
  async mounted ()
  {
    try {
      const [
        paymentMethodsResponse,

      ] = await Promise.all([
        getPaymentMethods(),
      ]);

      this.paymentMethods = paymentMethodsResponse.data.data;
      this.paymentTypes = paymentMethodsResponse.data.payment_type;
    } catch (error) {
      console.error("Error loading data:", error);
    }


  },
  // watch: {
  //   "value.paymentMode": function (newVal) {
  //     if (!newVal) {
  //       this.validationMessage = "Payment Mode is required.";
  //     } else {
  //       this.validationMessage = "";
  //     }
  //   },
  //   selectedPaymentType(newVal) {
  //     this.$emit('input', {
  //       ...this.value,
  //       selectedPaymentType: newVal
  //     });
  //   },
  //   'paymentDetails': {
  //     deep: true,
  //     handler(newVal) {
  //       this.$emit('input', {
  //         ...this.value,
  //         ...newVal
  //       });
  //     }
  //   }
  // },

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
