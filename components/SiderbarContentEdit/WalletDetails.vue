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
        <!-- {{reservationData.wallets}} -->


        <!-- <div class="row">
          <div class="col-md-6">
            <div class="input-group">
              <label class="input-group-text" for="inputGroupSelect01">Methods</label>
              <select class="form-select" id="businessSource">
                <option disabled value="">Select</option>
                <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
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
        </div> -->


        <!-- Payment Details Summary -->
        <div class="payment-summary mt-3">
          <h5 class="mb-3 text-center">Payment Details</h5>
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
                  <!-- <td>
                    <div class="row g-0">
                      <div class="col-6">
                        <div class="text-center">
                          <button type="button" title="Cancel Reservation" class="btn btn-label-primary waves-effect mt-3 w-100">
                          Edit</button>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="text-center">
                          <button type="button" class="btn btn-label-primary waves-effect mt-3 px-3 w-100" data-bs-toggle="modal" data-bs-target="#paymentModal">
                            Add Payment </button>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                        <div class="text-center">
                            <button type="button" title="Cancel Reservation" class="btn btn-label-danger waves-effect mt-3 w-100">
                              Cancel Payment</button>
                        </div>
                    </div>

                  </td> -->
                  <td>
                    <div class="dropdown">
                      <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#Sidebar" 
                          data-title="Edit Payment" href="javascript:void(0);">
                          <i class="fa-regular fa-pen-to-square me-1"></i> Edit
                        </a>
                        <a class="dropdown-item" @click="deletewallet" href="javascript:void(0);"><i class="fa-regular fa-trash-can me-1"></i> Delete</a>
                        <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#Sidebar" 
                          data-title="Add Payment" href="javascript:void(0);">
                          <i class="fa-solid fa-plus mt-1 me-1"></i> Add
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <dl class="row">
            <dt class="col-6">Payment Method:</dt>
            <dd class="col-6">{{ 'Cash' }}</dd>

            <dt class="col-6">Payment Type:</dt>
            <dd class="col-6">{{ selectedPaymentType || 'Not selected' }}</dd>

            Common fields for all payment types
            <dt class="col-6">Amount:</dt>
            <dd class="col-6">{{ paymentDetails.amount || 'Not specified' }}</dd>

            <dt class="col-6">Date:</dt>
            <dd class="col-6">{{ paymentDetails.date || 'Not specified' }}</dd>

            <template v-if="paymentDetails.comment">
              <dt class="col-6">Comment:</dt>
              <dd class="col-6">{{ paymentDetails.comment }}</dd>
            </template>


          </dl> -->
        </div>

        <!-- Dynamic form fields based on payment type -->
        <!-- <div class="mt-3" v-if="selectedPaymentType"> -->
          <!-- Common fields for all payment types -->
          <!-- <div class="mb-3">
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

        </div> -->
      </div>
      </form>
    </div>
  </section>
</template>

<script>
import { getPaymentMethods } from '../../Api/addResvertionApi';
import { updateWallet } from '../../Api/editResvertion';
import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';
import Swal from 'sweetalert2';
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
    async deletewallet() {
  // Show confirmation dialog using SweetAlert
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  });

  // Proceed only if user confirmed
  if (result.isConfirmed) {
    try {
      await deletewallet(
        "Payment Details Is Deleted Successfully!",
        this.$router,
        'index'
      );

      // Optional: Show success alert
      await Swal.fire(
        'Deleted!',
        'Your payment details have been deleted.',
        'success'
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
    submitPayment() {
      this.$emit('add-payment', {
        ...this.formAddPayment,
        reservation_id: this.selectedEvent.id
      });
      this.cancelPayment();
    },
    cancelPayment() {
      this.resetPaymentForm();
    },
    resetPaymentForm() {
      this.formAddPayment = {
        date: '',
        method: '',
        type: '',
        comment: '',
        reservation_id: null
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
  mounted() {
    // Listen for offcanvas show event
    const offcanvas = document.getElementById('Sidebar');
    offcanvas.addEventListener('show.bs.offcanvas', (event) => {
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
