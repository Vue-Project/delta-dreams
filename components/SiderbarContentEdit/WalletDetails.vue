<template>
  <section class="summary position-sticky top-0">
    <div class="card">
          <div class="offcanvas offcanvas-end event-sidebar" tabindex="-1" id="Sidebar" aria-labelledby="SidebarLabel" aria-modal="true">
            <div class="offcanvas-header my-1">
              <h5 class="offcanvas-title" id="SidebarLabel">{{ sidebarTitle }}</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr class="mt-0">
            <div class="offcanvas-body pt-0">
              <EditPayment :selectedWallet="selectedWallet" />
            </div>
          </div>
        <div class="card-body">

          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead>
                <tr>
                  <th>Payment image</th>
                  <th>Payment Method</th>
                  <th>Payment Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Comment</th>
                  <th>Accounts</th>
                  <th>status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="wallet in reservationData.wallets" :key="wallet.id">
                  <td><img :src="wallet.image" alt="Payment Image" style="width: 50px; height: 50px;"></td>
                  <td>{{ 'Cash' }}</td>
                  <td>{{ wallet.type || 'Not selected' }}</td>
                  <td>{{ wallet.price || 'Not specified' }}</td>
                  <td>{{ wallet.date_at || 'Not specified' }}</td>
                  <td>
                    <template v-if="wallet.note">
                      <div>{{ wallet.note }}</div>
                    </template>
                  </td>
                  <td>{{ wallet.assigned.name || 'Not specified' }}</td>
                  <td>
                    <span :class="wallet.active === 1 ? 'badge bg-label-success' : 'badge bg-label-danger'">
                      {{ wallet.status || 'Not specified' }}
                    </span>
                  </td>
                  <td>
                    <div class="dropdown">
                      <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <div class="dropdown-menu" v-if="wallet.active !== 0">
                        <!-- <a
                           class="dropdown-item"
                           data-bs-toggle="offcanvas"
                           data-bs-target="#Sidebar"
                           data-title="Edit Payment"
                           @click="updateWallet(wallet)"
                        >
                          <i class="fa-regular fa-pen-to-square me-1"></i> Edit
                        </a> -->
                        <a class="dropdown-item" @click="deletedWallet(wallet.id)" >
                          <i class="fa-regular fa-trash-can me-1"></i> cancel
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
    </div>
  </section>
</template>

<script>
import { getPaymentMethods } from '../../Api/addResvertionApi';
import { putDeleteWallet } from '../../Api/editResvertion';
import { showSuccessAlert, handleSubmissionError, showConfirmationAlert } from '../../Api/MassageValidation/alertUtilities';
import EditPayment from './EditPayment.vue';

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
    },
  },
  components: {
    EditPayment, // تسجيل المكون هنا
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
      formAddPayment: {
        date: '',
        method: '',
        type: '',
        comment: '',
        reservation_id: null
      },
      sidebarTitle: '',
      selectedWallet: null,
    };
  },
  methods: {
    async deletedWallet (id)
    {

      // Show confirmation dialog using SweetAlert
      const result = await showConfirmationAlert(
        'Are you sure?',
        "deleted this payment for this reservation",
      );


      // Proceed only if user confirmed
      if (result.isConfirmed) {
        try {
          const walletStatus = {
            status: 'cancelled',
            wallet_id: id,
          }

          const response = await putDeleteWallet( walletStatus.wallet_id, walletStatus);
          console.log('after response');

          await showSuccessAlert(
            "Payment Details Is Cancelled Successfully!",

          );
          console.log('after success alert');

          location.reload()

        } catch (error) {
          handleSubmissionError(
            error,
            "Failed to delete wallet" // Updated error message
          );
        }
      }
    },
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
    updateWallet(wallet) {
      this.selectedWallet = wallet;
      this.$emit('wallet-selected', wallet);
    },
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
      // Listen for offcanvas show event
      const offcanvas = document.getElementById('Sidebar');
    offcanvas.addEventListener('show.bs.offcanvas', (event) =>
    {
      // Get the clicked trigger element
      const trigger = event.relatedTarget;
      // Get the title from data-title attribute
      this.sidebarTitle = trigger.getAttribute('data-title');
    });


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

  provide() {
    return {
      selectedWallet: () => this.selectedWallet
    };
  }
};
</script>
