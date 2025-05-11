<template>
    <form class="payment-form" @submit.prevent="addPaymentReservation">
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
            </div> -->
            <!-- <div class="col-12 mb-2">
                <div class="input-group">
                    <select class="form-select" id="travelAgent" v-model="formAddPayment.travelAgent">
                        <option disabled value="">Select</option>
                        <option v-for="travelAgent in travelAgents" :key="travelAgent.id" :value="travelAgent.id">
                            {{ travelAgent.name }}
                        </option>
                    </select>
                    <label class="input-group-text" for="payment_accounts">Travel Agent</label>
                </div>
            </div> -->
            <!-- <div class="col-12 mb-2">
                <div class="input-group">
                    <select class="form-select" id="businessSource" v-model="formAddPayment.businessSource">
                        <option disabled value="">Select</option>
                        <option v-for="businessSource in businessSources" :key="businessSource.id" :value="businessSource.id">
                            {{ businessSource.name }}
                        </option>
                    </select>
                    <label class="input-group-text" for="payment_type">Business Source</label>
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
                <span v-else>Save</span>
            </button>
        </div>
    </form>
</template>

<script>
    import { getAccounts, getBusinessSources, getPaymentMethods, getPaymentTypeByPaymentId, getPaymentTypes, getTravelAgents } from '../../Api/addResvertionApi';
    import { postAddPayment } from '../../Api/editResvertion';
    import { handleSubmissionError, showSuccessAlert } from '../../Api/MassageValidation/alertUtilities';
    import DropzoneComponent from '../layout/DropzoneComponent.vue';
    import flatpickrMixin from '../Mixin/flatpickrMixin';
    import { validationMixin } from 'vuelidate';
    import { required, email } from 'vuelidate/lib/validators';

    export default {
        name: 'AddPayment',
        layout: 'component',
        data() {
            return {
                isSubmitting: false,
                paymentMethods: [],
                paymentTypes: [],
                accounts: [],
                walletsTypes: [],
                travelAgents: [],
                businessSources: [],
                dateRange: '',
                checkin_date: '',
                checkout_date: '',
                formAddPayment: {
                    date: new Date().toISOString().split('T')[0],
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
                // account: { required },
                comment: { required },
                amount: { required },
                image: { required }, // Add validation for image
                type: { required },
            },
        },
        components: {
            DropzoneComponent,
        },
        props: {
            reservationId: {
                type: [String, Number],
                required: true,
            },
        },
        methods: {
            async addPaymentReservation() {
                // If already submitting, prevent multiple submissions
                if (this.isSubmitting) {
                    return;
                }

                try {
                    // Set submitting state to true
                    this.isSubmitting = true;

                    // Get the file from the file input
                    const paymentImageFile = this.$refs.paymentImage.files[0] || null;
                    this.formAddPayment.image = paymentImageFile;

                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        this.isSubmitting = false;
                        return;
                    }

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
                        reservation_id: this.reservationId,
                        price: this.formAddPayment.amount,
                        type: this.formAddPayment.type,
                    };

                    // Append payment data to FormData
                    Object.keys(paymentData).forEach(key => {
                        formData.append(key, paymentData[key]);
                    });

                    // Append file if exists
                    if (paymentImageFile) {
                        formData.append('image', paymentImageFile);
                    }

                    const response = await postAddPayment(formData);
                    showSuccessAlert('Payment added successfully!');
                    this.$emit('payment-added');
                    this.$emit('close-offcanvas');
                } catch (error) {
                    handleSubmissionError(error, 'Failed to add payment');
                } finally {
                    // Always reset the submitting state, even if there's an error
                    this.isSubmitting = false;

                    // Reset the payment form
                    this.cancelPayment();
                }
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
                    reservation_id: null,
                };
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
        },
        async mounted() {
            try {
                const [paymentMethodsResponse, accountsResponse, businessSourcesResponse, travelAgentsResponse] = await Promise.all([getPaymentMethods(), getAccounts(), getBusinessSources(), getTravelAgents()]);

                this.paymentMethods = paymentMethodsResponse.data.data;
                this.walletsTypes = paymentMethodsResponse.data.wallet_type;
                this.businessSources = businessSourcesResponse.data.data;
                this.travelAgents = travelAgentsResponse.data.data;
                this.accounts = accountsResponse.data.data;
            } catch (error) {
                console.error('Error loading data:', error);
            }
        },

        mixins: [flatpickrMixin, validationMixin],
    };
</script>

<style scoped></style>
