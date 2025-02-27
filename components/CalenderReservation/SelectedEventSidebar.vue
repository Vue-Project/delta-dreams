<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
    <!-- Offcanvas Header -->

    <div class="offcanvas-header">
      <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">

        <template v-if="selectedEvent">
          <h6>
            <i class="fa-solid fa-user pr-2 text-primary fs-3 mb-2"></i>
            {{ selectedEvent.client?.name }}
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

          <div class="row mt-4 ">
            <div class="col-4 pt-1">
              <label class="form-label fs-4" for="status-reservation">Status</label>
            </div>
            <div class="col-8 pt-1">
              <select class="badge w-100" :class="statusBadgeClass(selectedEvent.status)" :value="selectedEvent.status" @change="handleStatusChange">
                <option v-for="(label, value) in statusOptions" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div class="row ">
              <div class="col-9">
                <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range" ref="rangePicker1" v-model="dateRange" @change='parseDateRange'  aria-label="input Text to Date" />

              </div>
              <div class="col-3">
                <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="changeDateReservation">
                  Confirm
                </button>
              </div>
            </div> -->

        </template>
      </h5>

      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <!-- Offcanvas Body -->
    <hr />
    <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
      <div class="row mb-4">
        <div class="col-9">
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range" ref="rangePicker1" v-model="dateRange" @change='parseDateRange' aria-label="input Text to Date" />

        </div>
        <div class="col-3">
          <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="changeDateReservation">
            Confirm
          </button>
        </div>
      </div>
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
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
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
                  </div>
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
                  <i class="fa-solid fa-calendar-days icon-date right-24"></i>
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
          </form>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
import { postAddPayment, postCancelReservation, postStatusChange } from "../../Api/editResvertion";
import { showSuccessAlert, handleSubmissionError, showConfirmationAlert } from "../../Api/MassageValidation/alertUtilities";
import { getGuestsInfo, getPaymentMethods } from "../../Api/addResvertionApi";
import { postUpdateReservation } from '../../Api/CalenderApi';

export default {

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
      statusOptions: [],
    }
  },
  props: {
    selectedEvent: {
      type: Object,
      default: null,
    },
  },

  methods: {
    async handleStatusChange (event)
    {
      const oldStatus = this.selectedEvent.status;
      const newStatus = event.target.value;

    const result = await showConfirmationAlert('Are you sure you?', 'Do you want to change the status of this reservation?');

      if (result.isConfirmed) {
        const changeStatus = {
          status: newStatus
        }
        // Send the new status to the server
        try {
          const response = await postStatusChange(this.selectedEvent.id, changeStatus);
          this.selectedEvent.status = newStatus;
          showSuccessAlert("Status updated successfully!");
          location.reload()
        } catch (error) {
          handleSubmissionError(error, "Failed to update status");
          // Revert to previous value if the server update fails
          event.target.value = oldStatus;
        }
      } else {
        event.target.value = oldStatus;
      }
    },


    async cancelReservation() {
    // Show SweetAlert2 confirmation dialog
    const result = await showConfirmationAlert(
      'Are you sure?',
      "You won't be able to restore it again",
      'Yes, cancel it!',

    );


      // Proceed only if the user confirms
      if (result.isConfirmed) {
        try {
          const response = await postCancelReservation(this.selectedEvent.id);

          // Show success alert
          await showSuccessAlert(
            "Reservation cancelled successfully!", // Custom message

          );
          location.reload()


        } catch (error) {
          handleSubmissionError(
            error,
            "Failed to cancel reservation" // Updated error message
          );
        }
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
        'bg-label-danger': status === 'cancelled',     // Red for cancelled
        'bg-label-warning': status === 'request',
        'bg-label-warning': status === 'pending',      // Blue for pending/waiting
        'bg-label-primary': status === 'approved',     // Green for approved
        'bg-label-primary': status === 'check_in',        // Light blue for check in
        'bg-label-success': status === 'check_out',    // Orange/yellow for check out
        'bg-label-success': status === 'finished',    // Gray for finished
      };
    },
    async submitPayment ()
    {
      try {
        // Ensure all fields are included in the payload
        const paymentData = {
          date_at: this.formAddPayment.date,
          payment_id: this.formAddPayment.method,
          type: this.formAddPayment.type,
          assigned_to: this.formAddPayment.account,
          note: this.formAddPayment.comment,
          reservation_id: this.selectedEvent.id,
          price: this.formAddPayment.amount, // Add amount field
          // Add any additional fields here
        };
        // console.log(paymentData);
        const response = await postAddPayment(paymentData);
        showSuccessAlert(
          "Payment added successfully!", // Custom message
        );
        location.reload()

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
    parseDateRange() {
      try {
        const flatpickrInstance = this.$refs.rangePicker1._flatpickr;
        const selectedDates = flatpickrInstance.selectedDates;

        if (selectedDates.length === 2) {
          const formatDate = (date) => {
            const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
            return localDate.toISOString().split('T')[0];
          };

          this.checkin_date = formatDate(selectedDates[0]);
          this.checkout_date = formatDate(selectedDates[1]);
          this.dateRange = `${this.checkin_date} to ${this.checkout_date}`;
        }
      } catch (error) {
        console.error("Error parsing date range:", error);
      }
    },
    async changeDateReservation() {
      const result = await showConfirmationAlert(
        'Are you sure?',
        "change the date of this reservation",
        'confirm',
      );

      if (result.isConfirmed && this.checkin_date && this.checkout_date) {
        try {
          const updateDataUnit = {
            checkin_date: this.checkin_date,
            checkout_date: this.checkout_date,
            unit_id: this.selectedEvent.unit_id,
            reservation_id: this.selectedEvent.id,
          };

          const response = await postUpdateReservation(updateDataUnit.reservation_id, updateDataUnit);

          if (response.data) {
            await showSuccessAlert("Reservation updated successfully!");
            location.reload();
          }
        } catch (error) {
          handleSubmissionError(error);
        }
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
  watch: {
    selectedEvent: {
      immediate: true,
      handler(newEvent) {
        if (newEvent) {
          // Format dates to YYYY-MM-DD while preserving local timezone
          const formatDate = (date) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };

          const checkinDate = formatDate(newEvent.checkin_date);
          const checkoutDate = formatDate(newEvent.checkout_date);

          this.checkin_date = checkinDate;
          this.checkout_date = checkoutDate;
          this.dateRange = `${checkinDate} to ${checkoutDate}`;

          // Update flatpickr instance with new dates
          if (this.$refs.rangePicker1?._flatpickr) {
            this.$refs.rangePicker1._flatpickr.setDate(
              [new Date(checkinDate), new Date(checkoutDate)],
              true
            );
          }

          if (newEvent.status_select) {
            this.statusOptions = newEvent.status_select;
          }
        }
      }
    }
  },
  mixins: [flatpickrMixin],


};
</script>

<style scoped>

</style>
