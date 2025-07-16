<template>
    <div class="offcanvas offcanvas-end editSidebar" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
        <!-- Offcanvas Header -->
        <div class="offcanvas-header editSideBarHeader">
            <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">
                <template v-if="selectedEvent">
                    <h6>
                        <!-- {{ selectedEvent }} -->
                        <i class="fa-solid fa-user pr-2 text-primary fs-3 mb-2"></i>
                        {{ selectedEvent.client?.name }}
                        <!-- {{ selectedEvent?.is_edit || 0 }}
                        {{ selectedEvent?.is_show || 0 }}
                        {{ selectedEvent?.is_cancel || 0 }} -->
                    </h6>
                    <div class="CityPhoneHeader">
                        <span class="mr-3">
                            <i class="text-secondary fa-solid fa-location-dot"></i>
                            {{ selectedEvent.client?.country_name }}
                        </span>
                        <span>
                            <i class="text-success fa-solid fa-phone"></i>
                            {{ selectedEvent.client?.phone || selectedEvent.client?.international_phone }}
                        </span>
                    </div>
                    <div class="row mt-4">
                        <div class="col-12 mb-2">
                            <button v-if="selectedEvent?.is_edit" type="button" class="btn btn-primary waves-effect waves-light btn-block EditBtnSideBar" @click="navigateToEditReservation(selectedEvent.id)">Edit</button>
                        </div>
                        <div class="col-12">
                            <button type="button" class="btn btn-primary waves-effect waves-light btn-block AddPaymentBtnSideBar" data-bs-toggle="modal" data-bs-target="#paymentModal">Add Payment</button>
                        </div>
                    </div>

                    <div class="row mt-4 StatusSideBar" v-if="selectedEvent?.is_edit">
                        <div class="col-4 pt-1">
                            <label class="form-label fs-4 StatusSideBarTitle" for="status-reservation">Status</label>
                        </div>
                        <div class="col-8 pt-1">
                            <select class="form-select badge h-px-40 lh-lg text-dark StatusSideBarSelect" :value="selectedEvent.status" @change="handleStatusChange">
                                <option v-for="(label, value) in selectedEvent.status_select" :key="value" :value="value">
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

            <button type="button" class="btn-close text-reset CloseSidebarEdit" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <!-- Offcanvas Body -->
        <hr />
        <div class="offcanvas-body mx-0 flex-grow-0 pt-0 overflow-auto scroll-hidden">
            <div class="row mb-4" v-if="selectedEvent?.is_edit">
                <div class="col-9">
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD to YYYY-MM-DD" id="flatpickr-range" ref="rangePicker1" v-model="dateRange" @change="parseDateRange" aria-label="input Text to Date" />
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-primary waves-effect waves-light btn-block confirmButton" @click="changeDateReservation">Confirm</button>
                </div>
            </div>
            <template v-if="selectedEvent">
                <div class="row editSidebarDetails">
                    <div class="col-6">
                        <ul class="list-unstyled mb-0">
                            <!-- <li class="mb-3 pb-1">
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
              </li> -->

                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Reservation Number</h6>
                                            <small class="text-muted">#{{ selectedEvent.name }}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Arrival Date</h6>
                                            <small class="text-muted">{{ formatDate(selectedEvent.checkin_date) }} {{ selectedEvent.checkin_time }}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Booking Date</h6>
                                            <small class="text-muted">{{ formatDate(selectedEvent.checkout_date) }} {{ selectedEvent.checkout_time }}</small>
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
                                                {{ selectedEvent.unit?.rooms }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Travel Agent</h6>

                                            <small class="text-muted">
                                                {{ selectedEvent.travel_agent?.name }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6>User</h6>
                                            <small class="text-muted">
                                                {{ selectedEvent.user?.name }}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Status</h6>
                                            <small class="badge" :style="{ backgroundColor: selectedEvent.status_color }">
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
                                            <h6 class="mb-0">Unit Code</h6>
                                            <!-- <small class="text-muted">{{ selectedEvent.unit_data?.building?.name }} / {{ selectedEvent.unit_data?.code }}</small> -->
                                            <small class="text-muted">{{ selectedEvent.unit?.code }}</small>
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
                                                        <i class="fa-solid fa-baby"></i>
                                                    </h6>
                                                    <small class="text-muted m-1">{{ selectedEvent.adults }}- {{ selectedEvent.children }}</small>
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
                                            <small class="text-muted">{{ selectedEvent.unit_price }}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Business Source</h6>
                                            <small class="text-muted">{{ selectedEvent.business_source?.name }}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Create At</h6>
                                            <small class="text-muted">{{ formatTimeAndDate(selectedEvent.created_at) }}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12">
                        <ul class="list-unstyled mb-0">
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6>Note</h6>
                                            <small class="text-muted">{{ selectedEvent.note }}</small>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6 class="mb-0">Create At</h6>
                                            {{ formatTimeAndDate(selectedEvent.create_at) }}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-12">
                        <ul class="list-unstyled mb-0" v-if="selectedEvent?.permit">
                            <li class="mb-3 pb-1">
                                <div class="d-flex align-items-start">
                                    <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                                        <div class="me-2">
                                            <h6>Permit Image</h6>
                                            <img :src="`${$nuxt.$config.baseURL}/${selectedEvent.permit_image}`" style="width: 100%; height: 50px; cursor: pointer" @click="showImg(`${$nuxt.$config.baseURL}/${selectedEvent.permit_image}`)" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="text-center" v-if="selectedEvent?.is_cancel">
                        <button @click="cancelReservation" type="button" title="Cancel Reservation" class="btn btn-danger waves-effect waves-light mt-3 w-100 px-0 cancelBtnSideBar">Cancel Reservation</button>
                    </div>
                </div>

                <div class="new-div mt-lg-5 mt-md-5 mt-2 w-100 TotalPayment">
                    <dl class="row mb-0">
                        <dt class="col-6 fw-normal text-heading">Insurance</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.insurance }} EGP</dd>
                        <dt class="col-6 fw-normal text-heading">Insurance Refund</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.insurance_refund }} EGP</dd>
                        <dt class="col-6 fw-normal text-heading">Insurance Remaining</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.insurance_remaining }} EGP</dd>
                        <dt class="col-6 fw-normal text-heading">Total Services</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.service_price }} EGP</dd>
                        <dt class="col-6 fw-normal text-heading">Unit Price (Nights)</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.unit_price_avg }} EGP {{ selectedEvent.nights }} Nights</dd>
                        <dt class="col-6 fw-normal text-heading">Total</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.total }} EGP</dd>
                        <dt class="col-6 fw-normal">Paid</dt>
                        <dd class="col-6 text-end mb-0">{{ selectedEvent.paid }} EGP</dd>
                        <dt class="col-6 fw-normal text-danger">Balance</dt>
                        <dd class="col-6 text-end mb-0 text-danger">{{ selectedEvent.remaining }} EGP</dd>
                    </dl>
                </div>
                <vue-easy-lightbox :visible="visible" :imgs="imgs" :index="index" @hide="handleHide" />
            </template>
            <!-- Modal Payment -->
            <div class="modal fade" id="paymentModal" data-bs-backdrop="static" tabindex="-1" style="display: none" aria-hidden="true">
                <div class="modal-dialog">
                    <form class="modal-content" @submit.prevent="submitPayment">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paymentModalTitle">Add Payment</h5>
                            <button @click="cancelPayment" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col">
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
                                <!-- <span class="error-message small" v-if="$v.formAddPayment.image.$error">
                      payment image is required
                    </span> -->
                            </div>
                            <div class="row g-2">
                                <div class="col-lg-6 col-md-6 col-12">
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
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="input-group">
                                        <select class="form-select" id="payment_type" v-model="formAddPayment.paymentType">
                                            <option disabled value="">Select Type</option>
                                            <option v-for="paymentType in paymentTypes" :key="paymentType.id" :value="paymentType.id">
                                                {{ paymentType.name }}
                                            </option>
                                        </select>
                                        <label class="input-group-text" for="payment_type">Payment Type</label>
                                    </div>
                                    <span class="error-message small" v-if="$v.formAddPayment.paymentType.$error">payment type is required</span>
                                </div>
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="input-group">
                                        <select class="form-select" id="payment_type" v-model="formAddPayment.type" value="value">
                                            <option disabled value="">Select Type</option>
                                            <option v-for="(label, value) in walletsTypes" :key="value" :value="value">
                                                {{ label }}
                                            </option>
                                        </select>
                                        <label class="input-group-text" for="payment_type">Types</label>
                                    </div>
                                    <span class="error-message small" v-if="$v.formAddPayment.type.$error">type is required</span>
                                </div>
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="input-group">
                                        <span class="input-group-text">EGP</span>
                                        <input type="text" class="form-control" placeholder="Amount" aria-label="Amount (to the nearest dollar)" v-model="formAddPayment.amount" />
                                    </div>
                                    <span class="error-message small" v-if="$v.formAddPayment.amount.$error">amount is required</span>
                                </div>
                                <!-- <div class="col-lg-6 col-md-6 col-12 mt-2">
                                    <div class="input-group">
                                        <select class="form-select" id="payment_accounts" v-model="formAddPayment.account">
                                            <option disabled value="">Select Accounts</option>
                                            <option v-for="account in accounts" :key="account.id" :value="account.id">
                                                {{ account.name }}
                                            </option>
                                        </select>
                                        <label class="input-group-text" for="payment_accounts">Accounts</label>
                                    </div>
                                </div> -->

                                <!-- <div class="col-lg-6 col-md-6 col-12">
                                    <div class="input-group">
                                        <select class="form-select" id="travelAgent" v-model="formAddPayment.travelAgent">
                                            <option disabled value="">Select</option>
                                            <option v-for="travelAgent in travelAgents" :key="travelAgent.id" :value="travelAgent.id">
                                                {{ travelAgent.name }}
                                            </option>
                                        </select>
                                        <label class="input-group-text" for="payment_type">Travel Agent</label>
                                    </div>
                                    <span class="error-message small" v-if="$v.formAddPayment.type.$error">type is required</span>
                                </div>
                                <div class="col-lg-6 col-md-6 col-12">
                                    <div class="input-group">
                                        <select class="form-select" id="businessSource" v-model="formAddPayment.businessSource">
                                            <option disabled value="">Select</option>
                                            <option v-for="businessSource in businessSources" :key="businessSource.id" :value="businessSource.id">
                                                {{ businessSource.name }}
                                            </option>
                                        </select>
                                        <label class="input-group-text" for="payment_type">Business Source</label>
                                    </div>
                                    <span class="error-message small" v-if="$v.formAddPayment.type.$error">type is required</span>
                                </div> -->
                                <div class="col-12">
                                    <div class="input-group">
                                        <span class="input-group-text">Comment</span>
                                        <textarea class="form-control" aria-label="With textarea" placeholder="Comment" v-model="formAddPayment.comment"></textarea>
                                    </div>
                                    <span class="error-message small" v-if="$v.formAddPayment.comment.$error">comment is required</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-label-secondary waves-effect" data-bs-dismiss="modal" @click="cancelPayment">Close</button>
                            <button type="submit" class="btn btn-primary waves-effect waves-light">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import flatpickrMixin from '../Mixin/flatpickrMixin';
    import { postAddPayment, postCancelReservation, postStatusChange } from '../../Api/editResvertion';
    import { showSuccessAlert, handleSubmissionError, showConfirmationAlert, showConfirmationAlertWithSelect } from '../../Api/MassageValidation/alertUtilities';
    import { getAccounts, getGuestsInfo, getPaymentMethods, getPaymentTypes, getPaymentTypeByPaymentId, getBusinessSources, getTravelAgents } from '../../Api/addResvertionApi';
    import { postUpdateReservation } from '../../Api/CalenderApi';
    import DropzoneComponent from '../layout/DropzoneComponent.vue';
    import { validationMixin } from 'vuelidate';
    import { required, email } from 'vuelidate/lib/validators';
    import { mapGetters } from 'vuex/dist/vuex.common.js';
    import { dateMixin } from '../Mixin/DateMixin';

    export default {
        data() {
            return {
                paymentMethods: [],
                paymentTypes: [],
                accounts: [],
                businessSources: [],
                travelAgents: [],
                walletsTypes: [],
                dateRange: '',
                checkin_date: '',
                checkout_date: '',
                formAddPayment: {
                    date: new Date().toISOString().split('T')[0],
                    method: '',
                    paymentType: '',
                    account: '',
                    comment: '',
                    image: null, // Add this for the image
                    reservation_id: null,
                    type: '',
                    businessSource: '',
                    travelAgent: '',
                },
                statusOptions: [],
                visible: false,
                index: 0,
                imgs: [],
            };
        },
        validations: {
            formAddPayment: {
                date: { required },
                method: { required },
                paymentType: { required },
                type: { required },
                // account: { required },
                comment: { required },
                amount: { required },
                image: { required }, // Add validation for image
            },
        },
        components: {
            DropzoneComponent,
        },
        props: {
            selectedEvent: {
                type: Object,
                default: null,
            },
        },

        methods: {
            initFlatpickr() {
                if (this.$refs.rangePicker1 && !this.$refs.rangePicker1._flatpickr) {
                    flatpickr(this.$refs.rangePicker1, {
                        mode: 'range',
                        dateFormat: 'Y-m-d',
                        defaultDate: [this.checkin_date, this.checkout_date],
                        onChange: selectedDates => {
                            this.parseDateRange();
                        },
                    });
                }
                if (this.$refs.datePicker1 && !this.$refs.datePicker1._flatpickr) {
                    flatpickr(this.$refs.datePicker1, {
                        mode: 'single',
                        dateFormat: 'Y-m-d', // Use the correct format
                        defaultDate: this.formAddPayment.date,
                        onChange: selectedDates => {
                            if (selectedDates && selectedDates.length > 0) {
                                const dateObj = selectedDates[0];
                                const yyyy = dateObj.getFullYear();
                                const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                                const dd = String(dateObj.getDate()).padStart(2, '0');
                                this.formAddPayment.date = `${yyyy}-${mm}-${dd}`;
                            }
                        },
                    });
                }
            },

            async handleStatusChange(event) {
                const oldStatus = this.selectedEvent.status;
                const newStatus = event.target.value;

                const result = await showConfirmationAlert('Are you sure you?', 'Do you want to change the status of this reservation?');

                if (result.isConfirmed) {
                    const changeStatus = {
                        status: newStatus,
                    };
                    // Send the new status to the server
                    try {
                        const response = await postStatusChange(this.selectedEvent.id, changeStatus);
                        this.selectedEvent.status = newStatus;
                        this.$emit('refresh-calendar');

                        showSuccessAlert('Status updated successfully!');
                        // Emit event to parent to refresh calendar
                    } catch (error) {
                        handleSubmissionError(error, 'Failed to update status');
                        // Revert to previous value if the server update fails
                        event.target.value = oldStatus;
                    }
                } else {
                    event.target.value = oldStatus;
                }
            },

            async cancelReservation() {
                // Show SweetAlert2 confirmation dialog
                const selectOptions = this.getReservationRejects;
                const result = await showConfirmationAlertWithSelect('Are you sure you want to cancel this Reservation?', 'Please select a reason for cancellation', Object.fromEntries(Object.entries(selectOptions).map(([key, value]) => [value.id, value.name])), 'Confirm', 'Cancel');
                // Proceed only if the user confirms
                if (result.isConfirmed) {
                    try {
                        const rejectedValue = result.value; // This will now be the key/id
                        const response = await postCancelReservation(this.selectedEvent.id, rejectedValue);
                        // Emit event to parent to refresh calendar
                        this.$emit('refresh-calendar');
                        // Show success alert
                        await showSuccessAlert(
                            'Reservation cancelled successfully!', // Custom message
                        );
                    } catch (error) {
                        handleSubmissionError(
                            error,
                            'Failed to cancel reservation', // Updated error message
                        );
                    }
                }
            },
            navigateToEditReservation(id) {
                this.$emit('navigate-to-edit-reservation', id);
            },
            formatDate(isoString) {
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
            // statusBadgeClass(status) {
            //   return {
            //     "bg-label-primary": status === "pending", // Blue for pending/waiting
            //     "bg-label-success": status === "approved", // Green for approved
            //     "bg-label-danger": status === "cancelled", // Red for cancelled
            //     "bg-label-info": status === "check_in", // Light blue for check in
            //     "bg-label-warning": status === "check_out", // Orange/yellow for check out
            //     "bg-label-secondary": status === "finished", // Gray for finished
            //   };
            // },
            async submitPayment() {
                try {
                    // Set the image value from the file input before validation
                    this.formAddPayment.image = this.$refs.paymentImage.files[0] || null;

                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    }
                    // Get the file from the file input
                    const paymentImageFile = this.$refs.paymentImage.files[0];

                    // Create FormData to handle file upload
                    const formData = new FormData();

                    // Add payment data
                    const paymentData = {
                        date_at: this.formAddPayment.date,
                        payment_id: this.formAddPayment.method,
                        payment_type_id: this.formAddPayment.paymentType,
                        // assigned_to: this.formAddPayment.account,
                        // travel_agent_id: this.formAddPayment.travelAgent,
                        // business_source_id: this.formAddPayment.businessSource,
                        note: this.formAddPayment.comment,
                        reservation_id: this.selectedEvent.id,
                        type: this.formAddPayment.type,
                        price: this.formAddPayment.amount,
                    };

                    // Append payment data to FormData
                    Object.keys(paymentData).forEach(key => {
                        formData.append(key, paymentData[key]);
                    });

                    // Append image file if it exists
                    if (paymentImageFile) {
                        formData.append('image', paymentImageFile);
                    }

                    const response = await postAddPayment(formData);
                    // Emit event to parent to refresh calendar
                    this.$emit('refresh-calendar');
                    showSuccessAlert('Payment added successfully!');

                    // Close the modal after saving
                    const modalElement = document.getElementById('paymentModal');
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    modalInstance.hide();
                } catch (error) {
                    handleSubmissionError(error, 'Failed to payment');
                }

                // Reset the payment form
                this.cancelPayment();
            },
            cancelPayment() {
                this.resetPaymentForm();
            },
            resetPaymentForm() {
                // Keep the last selected date instead of resetting to today
                const lastDate = this.formAddPayment.date;
                this.formAddPayment = {
                    date: lastDate, // Use the last selected date
                    method: null,
                    paymentType: null,
                    comment: '',
                    type: null,
                    amount: null,
                    image: null,
                };
                if (this.$refs.paymentImage) {
                    this.$refs.paymentImage.value = null;
                }
                this.$v.$reset();
            },
            parseDateRange() {
                try {
                    const flatpickrInstance = this.$refs.rangePicker1?._flatpickr;
                    if (!flatpickrInstance) {
                        return;
                    }
                    const selectedDates = flatpickrInstance.selectedDates;

                    if (selectedDates.length === 2) {
                        const formatDate = date => {
                            return new Date(date).toLocaleDateString('en-CA'); // YYYY-MM-DD
                        };

                        this.checkin_date = formatDate(selectedDates[0]);
                        this.checkout_date = formatDate(selectedDates[1]);
                        this.dateRange = `${this.checkin_date} to ${this.checkout_date}`;
                    }
                } catch (error) {
                    console.error('Error parsing date range:', error);
                }
            },
            async changeDateReservation() {
                const result = await showConfirmationAlert('Are you sure?', 'change the date of this reservation', 'confirm');

                if (result.isConfirmed && this.checkin_date && this.checkout_date) {
                    try {
                        const updateDataUnit = {
                            checkin_date: this.checkin_date,
                            checkout_date: this.checkout_date,
                            unit_id: this.selectedEvent.unit_id,
                            reservation_id: this.selectedEvent.id,
                            is_price: 0,
                        };

                        const response = await postUpdateReservation(updateDataUnit.reservation_id, updateDataUnit);

                        if (response.data) {
                            this.$emit('refresh-calendar');
                            await showSuccessAlert('Reservation updated successfully!');
                            // Emit event to parent to refresh calendar
                        }
                    } catch (error) {
                        handleSubmissionError(error);
                    }
                }
            },
            handleImageUpload(event) {
                const file = event.target.files[0];
                this.formAddPayment.image = file || null;
            },
            async fetchPaymentTypeByMethod() {
                if (this.formAddPayment.method) {
                    try {
                        const response = await getPaymentTypeByPaymentId(this.formAddPayment.method);
                        if (response && response.data) {
                            // Set the payment types based on the response
                            this.paymentTypes = response.data.data;
                        }
                    } catch (error) {
                        console.error('Error fetching payment type:', error);
                    }
                } else {
                    // Reset payment types when no method is selected
                    this.paymentTypes = [];
                    this.formAddPayment.paymentType = '';
                }
            },
            showImg(img) {
                this.imgs = [img];
                this.index = 0;
                this.visible = true;
            },
            handleHide() {
                this.visible = false;
            },
        },
        async mounted() {
            try {
                const [paymentMethodsResponse, accountsResponse, businessSourcesResponse, travelAgentsResponse] = await Promise.all([getPaymentMethods(), getAccounts(), getBusinessSources(), getTravelAgents()]);

                this.paymentMethods = paymentMethodsResponse.data.data;
                this.walletsTypes = paymentMethodsResponse.data.wallet_type;
                this.accounts = accountsResponse.data.data;
                this.businessSources = businessSourcesResponse.data.data;
                this.travelAgents = travelAgentsResponse.data.data;
            } catch (error) {
                console.error('Error loading data:', error);
            }
        },
        watch: {
            selectedEvent: {
                immediate: true,
                async handler(newEvent) {
                    if (newEvent) {
                        await this.$nextTick();

                        const formatDate = date => {
                            return new Date(date).toLocaleDateString('en-CA');
                        };

                        const checkinDate = formatDate(newEvent.checkin_date);
                        const checkoutDate = formatDate(newEvent.checkout_date);

                        if (this.$refs.rangePicker1 && !this.$refs.rangePicker1._flatpickr) {
                            this.initFlatpickr();
                        }

                        setTimeout(() => {
                            if (this.$refs.rangePicker1?._flatpickr) {
                                this.$refs.rangePicker1._flatpickr.setDate([checkinDate, checkoutDate]);
                            }
                        }, 100);
                        this.checkin_date = checkinDate;
                        this.checkout_date = checkoutDate;
                        this.dateRange = `${checkinDate} to ${checkoutDate}`;

                        if (this.$refs.rangePicker1 && !this.$refs.rangePicker1._flatpickr) {
                            this.initFlatpickr();
                        }
                        setTimeout(() => {
                            if (this.$refs.rangePicker1?._flatpickr) {
                                this.$refs.rangePicker1._flatpickr.setDate([checkinDate, checkoutDate]);
                            }
                        }, 100);
                        if (newEvent.status_select) {
                            this.statusOptions = newEvent.status_select;
                        }
                    }
                },
            },
        },
        mixins: [flatpickrMixin, validationMixin, dateMixin],
        computed: {
            ...mapGetters(['getReservationRejects']),
        },
    };
</script>

<style scoped></style>
