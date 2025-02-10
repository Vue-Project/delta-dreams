<template>
  <div class="offcanvas offcanvas-end"  tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
    <!-- Offcanvas Header -->
    <div class="offcanvas-header">
      <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">
        <template v-if="selectedEvent">
          <h6>
            <i class="fa-solid fa-user pr-2 text-primary fs-3 mb-2"></i>
            {{ selectedEvent.user?.name }}
          </h6>
          <div>
            <span class="mr-3">
              <i class="text-secondary fa-solid fa-location-dot"></i>
              {{ selectedEvent.user?.country || "Egypt" }}
            </span>
            <span>
              <i class="text-success fa-solid fa-phone"></i>
              {{ selectedEvent.user?.phone || "0123456789" }}
            </span>
          </div>
          <div class="row mt-4">
            <div class="col-6 ">
              <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="navigateToEditReservation(selectedEvent.id)">
                Edit
              </button>
            </div>
            <div class="col-6">
              <button type="button" class="btn btn-primary waves-effect waves-light btn-block" data-bs-toggle="modal" data-bs-target="#paymentModal">
                Add Payment
              </button>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 mb-3 ">
              <label for="flatpickr-date" class="form-label">Dates Picker</label>
              <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-range-06" ref="rangePicker6" aria-label="input Text to Date" />
              <i class="fa-solid fa-calendar-days icon-date"></i>
            </div>
            <div class="col-4 pt-1">
              <label class="form-label" for="status-reservation">Status</label>
            </div>
            <div class="col-8 pt-1">
              <select class="badge w-100" :class="statusBadgeClass(selectedEvent.status)" :value="selectedEvent.status" @change="handleStatusChange($event)">
                <option v-for="status in statusOptions" :key="status.value" :value="status.value">
                  {{ status.name }}
                </option>
              </select>
            </div>
          </div>
        </template>
      </h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <!-- Offcanvas Body -->
    <hr />
    <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
      <template v-if="selectedEvent">
        <div class="row">
          <div class="col-md-6">
            <ul class="list-unstyled mb-0">
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Reservation Number</h6>
                      <small class="text-muted">{{
                        selectedEvent.id || "1025191591"
                        }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Arrival Date</h6>
                      <small class="text-muted">{{ formatDate(selectedEvent.checkin_date || "2024-10-21") }}
                        {{ selectedEvent.checkin_time || "12:00 PM" }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Booking Date</h6>
                      <small class="text-muted">{{ formatDate(selectedEvent.checkout_date || "2024-10-21") }}
                        {{ selectedEvent.checkout_time || "12:00 PM" }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Room Number</h6>
                      <small class="text-muted">
                        {{ selectedEvent.rooms || 5 }}</small>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list-unstyled mb-0">
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Status</h6>
                      <small class="badge" :class="statusBadgeClass(selectedEvent.status)">
                        {{ selectedEvent.status_name }}
                      </small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Room Type</h6>
                      <small class="text-muted">{{ selectedEvent.rate_type }}
                      </small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
              <li>
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">
                        <i class="fa-solid fa-person"></i>
                        -
                        <i class="fa-solid fa-child"></i>
                      </h6>
                      <small class="text-muted m-1">{{ selectedEvent.adults }}-
                        {{ selectedEvent.children }}</small>
                    </div>
                  </div>
                </div>
              </li>
          </div>
          </li>
          <li class="mb-3 pb-1">
            <div class="d-flex align-items-start">
              <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                <div class="me-2">
                  <h6 class="mb-0">Avg. Daily Rate</h6>
                  <small class="text-muted">{{ selectedEvent.unit_price || '0' }}
                  </small>
                </div>
              </div>
            </div>
          </li>
          </ul>
        </div>
    </div>
    <div class="new-div mt-3 position-absolute right-0 w-100 px-4 bottom-1">
      <dl class=" row mb-0">
        <dt class="col-6 fw-normal text-heading">Total</dt>
        <dd class="col-6 text-end">{{ selectedEvent.total || "0 " }} EGP</dd>

        <dt class="col-sm-6 fw-normal">Paid</dt>
        <dd class="col-sm-6 text-end">{{ selectedEvent.paid || "0 " }} EGP</dd>

        <dt class="col-6 fw-normal text-danger">Balance</dt>
        <dd class="col-6 text-end text-danger">
          {{ selectedEvent.balance || "0.0 " }} EGP
        </dd>
      </dl>
    </div>
    <div class="text-center">
      <button @click="cancelReservation" type="button" title="Cancel Reservation" class="btn btn-danger waves-effect waves-light mt-3 w-100 px-0">
        Cancel Reservation</button>
    </div>

</template>
<!-- Modal Payment -->
<div class="modal fade" id="paymentModal" data-bs-backdrop="static" tabindex="-1" style="display: none;" aria-hidden="true">
  <div class="modal-dialog">
    <form class="modal-content" @submit.prevent="submitPayment">
      <div class="modal-header">
        <h5 class="modal-title" id="paymentModalTitle">Add Payment</h5>
        <button @click="cancelPayment" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col mb-3">
            <label for="flatpickr-date-01" class="form-label">Date</label>
            <input type="text" class="form-control flatpickr-input" placeholder="DD/MM/YYYY" id="flatpickr-date-01" ref="datePicker1" aria-label="input Text to Check-in Date" v-model="formAddPayment.date" />
            <i class="fa-solid fa-calendar-days icon-date"></i>
          </div>
        </div>
        <div class="row g-2">
          <div class="col-6 mb-2">
            <div class="input-group">
              <select class="form-select" id="payment_type" v-model="formAddPayment.type">
                <option disabled value="">Select Type</option>
                <option v-for="(label, value) in paymentTypes" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
              <label class="input-group-text" for="payment_type">Type</label>
            </div>
          </div>
          <div class="col-6 mb-2">
            <div class="input-group">
              <select class="form-select" id="payment_method" v-model="formAddPayment.method">
                <option disabled value="">Select Method</option>
                <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
                  {{ paymentMethod.content }}
                </option>
              </select>
              <label class="input-group-text" for="payment_method">Method</label>
            </div>
          </div>
          <div class="col-6">
            <div class="input-group">
              <span class="input-group-text">EGP</span>
              <input type="text" class="form-control" placeholder="Amount" aria-label="Amount (to the nearest dollar)" v-model="formAddPayment.amount">
            </div>
          </div>
          <div class="col-6 mt-2">
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
          <div class="col-12 mb-2 mt-3">
            <div class="input-group">
              <span class="input-group-text">Comment</span>
              <textarea class="form-control" aria-label="With textarea" placeholder="Comment" v-model="formAddPayment.comment"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary waves-effect" data-bs-dismiss="modal" @click="cancelPayment">
          Close
        </button>
        <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>
      </div>
    </form>zd
  </div>
</div>
</div>
</div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
import { postCancelReservation, postStatusChange } from "../../Api/editResvertion";
import Swal from 'sweetalert2';
import { showConfirmationDialog, showSuccessAlert, handleSubmissionError } from "../../Api/MassageValidation/alertUtilities";
import { getGuestsInfo, getPaymentMethods } from "../../Api/addResvertionApi";
export default {
  data ()
  {
    return {
      paymentMethods: [],
      paymentTypes: [],
      accounts: [],
      formAddPayment: {
        date: new Date().toISOString().split('T')[0],
        method: '',
        type: '',
        account: '',
        comment: '',
        reservation_id: null
      },
      statusOptions: [
        { value: 'pending', name: 'قيد الانتظار' },
        { value: 'approved', name: 'مقبول' },
        { value: 'cancelled', name: 'مرفوض' }
      ]
    }
  },
  props: {
    selectedEvent: {
      type: Object,
      default: null,
    },
  },
  mixins: [flatpickrMixin],
  methods: {
    async handleStatusChange(event) {
    const oldStatus = this.selectedEvent.status;
    const newStatus = event.target.value;

    const result = await showConfirmationDialog('Are you sure you want to change the status of this reservation?');

    if (result.isConfirmed) {
      this.selectedEvent.status = newStatus;
      this.updateStatusName(newStatus);

      // Send the new status to the server
      try {
        const response = await postStatusChange(this.selectedEvent.id, newStatus);
        showSuccessAlert("Status updated successfully!");
      } catch (error) {
        handleSubmissionError(error, "Failed to update status");
        // Revert to previous value if the server update fails
        this.selectedEvent.status = oldStatus;
      }
    } else {
      event.target.value = oldStatus;
    }
  },

  updateStatusName(statusValue) {
    const status = this.statusOptions.find(s => s.value === statusValue);
    if (status) this.selectedEvent.status_name = status.name;
  },

    async cancelReservation ()
    {
      try {
        // Show confirmation dialog using SweetAlert
        const result = await showConfirmationDialog('Are you sure you want to cancel this reservation?');
        // Proceed only if user confirmed
        if (result.isConfirmed) {

          // Make API call to cancel reservation
          const response = await postCancelReservation(this.selectedEvent.id);
          // Show success alert
          await showSuccessAlert(
            "Reservation cancelled successfully!", // Custom message
            location.reload()
          );
        }
      } catch (error) {
        handleSubmissionError(
          error,
          "Failed to cancel reservation" // Updated error message
        );
      }
    },
    navigateToEditReservation (id)
    {
      this.$emit("navigate-to-edit-reservation", id);
    },
    formatDate (isoString)
    {
      return new Date(isoString).toLocaleDateString('en-GB');
    },
    // formatDateTime (isoString)
    // {
    //   return new Date(isoString).toLocaleString('en-GB', {
    //     day: 'numeric',
    //     month: 'short',
    //     year: 'numeric',
    //     hour: '2-digit',
    //     minute: '2-digit',
    //   });
    // },
    // formatCurrency (amount)
    // {
    //   return new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   }).format(amount);
    // },
    statusBadgeClass (status)
    {
      return {
        'bg-label-primary': status === 'pending',
        'bg-label-success': status === 'approved',
        'bg-label-danger': status === 'cancelled',
      };
    },
    async submitPayment ()
    {
      try {
        // Ensure all fields are included in the payload
        const paymentData = {
          created_at: this.formAddPayment.date,
          payment_method: this.formAddPayment.method,
          payment_type: this.formAddPayment.type,
          account_id: this.formAddPayment.account,
          note: this.formAddPayment.comment,
          reservation_id: this.selectedEvent.id,
          payment_price: this.formAddPayment.amount, // Add amount field
          // Add any additional fields here
        };
        console.log(paymentData);
        // const response = await postAddPayment(paymentData);
        showSuccessAlert(
          "Payment added successfully!", // Custom message
          location.reload()
        );

        // Close the modal after saving
        const modalElement = document.getElementById('paymentModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

      } catch (error) {
        handleSubmissionError(
          error,
          "Failed to payment" // Updated error message
        );
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
      getGuestsInfo(),
      ]);

      this.paymentMethods = paymentMethodsResponse.data.data;
      this.paymentTypes = paymentMethodsResponse.data.payment_type;
      this.accounts = accountsResponse.data.data
    } catch (error) {
      console.error("Error loading data:", error);
    }


  },
};
</script>

<style scoped>
.badge {
  padding: 0.5em 0.75em;
  font-size: 0.875em;
  border: none;
  cursor: pointer;
}

.bg-label-primary {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.bg-label-success {
  background-color: rgba(25, 135, 84, 0.1);
  color: #198754;
}

.bg-label-danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.icon-date {
  position: absolute;
  top: 37px;
  right: 23px;
}
</style>
