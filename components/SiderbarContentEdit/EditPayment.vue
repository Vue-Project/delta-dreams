<template>
  <form class="payment-form" @submit.prevent="FormUpdateWallet">
    <p>{{selectedWallet}}</p>
    <div class="row">
      <div class="col mb-3">
        <label for="flatpickr-date-01" class="form-label">Date</label>
        <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" aria-label="input Text to Check-in Date" v-model="formAddPayment.date" />
        <i class="fa-solid fa-calendar-days icon-date"></i>
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
    </div>
    <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 20px">
      <button class="btn btn-secondary" data-bs-dismiss="offcanvas">
        Close
      </button>
      <button type="submit" class="btn btn-primary ">Save</button>
    </div>
  </form>

</template>



<script>
import { getAccounts, getPaymentMethods } from "../../Api/addResvertionApi";
import { putUpdateWallet } from "../../Api/editResvertion";
import { handleSubmissionError, showSuccessAlert } from "../../Api/MassageValidation/alertUtilities";
import flatpickr from "../Mixin/flatpickrMixin";
export default {
  name: "PaymentContent",
  props: {
    selectedWallet: {
      type: Object,
      required: true
    }
  },
  mixins: [flatpickr],
  data ()
  {
    return {
      paymentMethods: [],
      paymentTypes: [],
      accounts: [],
      formAddPayment: {
        date: '',
        method: '',
        type: '',
        comment: '',
        amount: '',
        account: '',
        reservation_id: null
      },
    }
  },
  methods: {
    submitPayment ()
    {
      this.$emit('add-payment', {
        ...this.formAddPayment,
        reservation_id: this.selectedEvent.id
      });
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
    populateFormUpdateWallet (wallet)
    {
      this.formAddPayment = {
        date: wallet.date_at,
        method: wallet.payment_id,
        type: wallet.type,
        comment: wallet.note,
        amount: wallet.price,
        account: wallet.assigned.id,
        reservation_id: wallet.reservation_id
      };
    },
    async FormUpdateWallet ()
    {
      try {
        const walletData = {
          wallet_id: this.selectedWallet.id, // Get wallet ID from the first wallet
          type: this.formAddPayment.type,
          price: this.formAddPayment.amount,
          date_at: this.formAddPayment.date,
          note: this.formAddPayment.comment,
          assigned_to: this.formAddPayment.account,
          amount: this.formAddPayment.amount,
          payment_id: this.formAddPayment.method,
          reservation_id: this.selectedWallet.reservation_id
        };


        // You'll need to import and call your API function here
        const response = await putUpdateWallet( walletData.wallet_id, walletData);

        // Show success message
        await showSuccessAlert(
          "Wallet updated successfully!", // Custom message

        );
        location.reload();
      } catch (error) {
        handleSubmissionError(
          error,
          "There was an issue with your reservation." // Custom default error
        );
      }

    }
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
  watch: {
    selectedWallet: {
      immediate: true,
      handler (wallet)
      {
        if (wallet) {
          this.populateFormUpdateWallet(wallet);
        }
      }
    }
  },
}
</script>
