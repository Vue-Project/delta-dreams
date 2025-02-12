<template>
  <section class="summary position-sticky top-0">
    <div class="card">
      <form id="formReservation" class=" g-3" @submit.prevent="FormUpdateWallet" ref="emptyForm">

        <div class="card-body">
          <div class="offcanvas offcanvas-end event-sidebar" tabindex="-1" id="Sidebar" aria-labelledby="SidebarLabel" aria-modal="true">
            <div class="offcanvas-header my-1">
              <h5 class="offcanvas-title" id="SidebarLabel">{{ sidebarTitle }}</h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr class="mt-0">
            <div class="offcanvas-body pt-0">
              <PaymentContent />
            </div>
            <button type="button" class="btn btn-primary waves-effect waves-light offcanvas-footer w-25" style="position:absolute; bottom: 20px;right: 25px;">Save</button>
          </div>
            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead>
                  <tr>
                    <th>Payment Method</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ 'Cash' }}</td>
                    <td>{{ selectedPaymentType || 'Not selected' }}</td>
                    <td>{{ paymentDetails.amount || 'Not specified' }}</td>
                    <td>{{ paymentDetails.date || 'Not specified' }}</td>
                    <td>
                      <template v-if="paymentDetails.comment">
                        <div>{{ paymentDetails.comment }}</div>
                      </template>
                    </td>
                    <td>
                      <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#Sidebar" data-title="Edit Payment" href="javascript:void(0);">
                            <i class="fa-regular fa-pen-to-square me-1"></i> Edit
                          </a>
                          <a class="dropdown-item" @click="deletewallet" href="javascript:void(0);"><i class="fa-regular fa-trash-can me-1"></i> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { getPaymentMethods } from '../../Api/addResvertionApi';
import { updateWallet } from '../../Api/editResvertion';
import { showSuccessAlert, handleSubmissionError, showConfirmationAlert } from '../../Api/MassageValidation/alertUtilities';
import PaymentContent from '../../components/SiderbarContentEdit/PaymentContent.vue';

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
    PaymentContent, // تسجيل المكون هنا
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
    };
  },
  methods: {
    async deletewallet ()
    {

      // Show confirmation dialog using SweetAlert
      const result = await showConfirmationAlert(
        'Are you sure?',
        "You won't be able to restore it again",
      );


      // Proceed only if user confirmed
      if (result.isConfirmed) {
        try {
          const response = await updateWallet(walletData);

          await showSuccessAlert(
            "Payment Details Is Deleted Successfully!",
            this.$router,
            'index'
          );

        } catch (error) {
          handleSubmissionError(
            error,
            "Failed to delete wallet" // Updated error message
          );
        }
      }
    },
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
    async FormUpdateWallet ()
    {
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
  mounted ()
  {
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


