<template>
    <section class="summary position-sticky top-0">
        <div class="card">
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
                        <h5 class="mb-0 pt-1 text-nowrap fw-bold">
                            {{ formatCheckInDate }}
                        </h5>
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
                        <h5 class="mb-0 pt-1 text-nowrap ms-lg-n3 ms-xl-0 fw-bold">
                            {{ formatCheckOutDate }}
                        </h5>
                    </div>
                </div>
                <dl class="row mb-2 billingMoney rounded p-2">
                    <dt class="col-6 fw-normal text-heading">Room Charges</dt>
                    <dd class="col-6 text-end">{{ paymentDetails.roomCharges }}</dd>

                    <label for="taxes" class="col-sm-9 col-4 col-form-label fw-normal">Taxes</label>
                    <div class="col-sm-3 col-8">
                        <input type="number" id="taxes" name="taxes" class="form-control rounded-2 fw-normal text-end" v-model="paymentDetails.taxes" min="0" @input="paymentDetails.taxes = Math.max(Number($event.target.value), 0)" />
                    </div>

                    <label for="dueAmount" class="col-sm-9 col-4 col-form-label fw-normal text-heading">Charge Extra</label>
                    <div class="col-sm-3 col-8">
                        <input type="number" id="dueAmount" name="dueAmount" class="form-control rounded-2 mt-1 fw-normal text-end" v-model="paymentDetails.dueAmount" min="0" @input="paymentDetails.dueAmount = Math.max(Number($event.target.value), 0)" />
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
                            <select class="form-select" id="payment_method" v-model="value.paymentMethod" @change="fetchPaymentTypeByMethod">
                                <option disabled value="">Select Method</option>
                                <option v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" :value="paymentMethod.id">
                                    {{ paymentMethod.name }}
                                </option>
                            </select>
                            <label class="input-group-text" for="payment_method">Method</label>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="input-group">
                            <select class="form-select" id="paymentType" v-model="value.selectedPaymentType" @change="updateSelectedPaymentType">
                                <option disabled value="">Select type</option>
                                <option v-for="paymentType in paymentTypes" :key="paymentType.id" :value="paymentType.id">
                                    {{ paymentType.name }}
                                </option>
                            </select>
                            <label class="input-group-text" for="paymentType">Types</label>
                        </div>
                    </div>
                    <!-- <div class="col-md-6 mb-3">
                        <div class="input-group">
                            <select class="form-select" id="travelAgent" v-model="value.selectedTravelAgent">
                                <option disabled value="">Select</option>
                                <option v-for="travelAgent in travelAgents" :key="travelAgent.id" :value="travelAgent.id">
                                    {{ travelAgent.name }}
                                </option>
                            </select>
                            <label class="input-group-text" for="travelAgent">Travel Agents</label>
                        </div>
                    </div> -->
                    <!-- <div class="col-md-6 mb-3">
                        <div class="input-group">
                            <select class="form-select" id="businessSource" v-model="value.selectedBusinessSource">
                                <option disabled value="">Select</option>
                                <option v-for="businessSource in businessSources" :key="businessSource.id" :value="businessSource.id">
                                    {{ businessSource.name }}
                                </option>
                            </select>
                            <label class="input-group-text" for="businessSource">Business Source</label>
                        </div>
                    </div> -->
                    <!-- <div class="col-md-6 mb-3 d-flex align-items-center">
                        <div class="input-group mt-md-3">
                            <label class="input-group-text" for="paymentInsurance">Insurance</label>
                            <input type="text" class="form-control" id="paymentInsurance" v-model="paymentDetails.insurance" placeholder="Insurance" />
                        </div>
                    </div> -->
                    <!-- <div class="col-md-6 d-flex align-items-center">
                        <div class="input-group">
                            <select class="form-select" id="paymentInsuranceBy" v-model="paymentDetails.assigned_to">
                                <option disabled value="">Select</option>
                                <option v-for="account in accounts" :key="account.id" :value="account.id">
                                    {{ account.name }}
                                </option>
                            </select>
                            <label class="input-group-text" for="paymentInsuranceBy">Assigned By</label>
                        </div>
                    </div> -->
                </div>
                <p v-if="!value.paymentMode && validationMessage" class="validation-message">Payment Mode is required.</p>

                <!-- Payment Details Summary -->
                <div v-if="value.paymentMode" class="mt-3">
                    <h6 class="mb-3">Payment Details</h6>
                    <dl class="row payment-summary">
                        <dt class="col-6">Date:</dt>
                        <dd class="col-6">{{ paymentDetails.date }}</dd>

                        <dt class="col-6">Payment Method:</dt>
                        <dd class="col-6">
                            {{ getSelectedPaymentMethodName() }}
                        </dd>

                        <dt class="col-6 mb-2">Payment Type:</dt>
                        <dd class="col-6">{{ getSelectedPaymentTypeName() }}</dd>

                        <!-- Common fields for all payment types -->
                        <dt class="col-6">Amount:</dt>
                        <dd class="col-6">
                            {{ paymentDetails.amount }}
                        </dd>

                        <template v-if="paymentDetails.comment">
                            <dt class="col-6">Comment:</dt>
                            <dd class="col-6">{{ paymentDetails.comment }}</dd>
                        </template>

                        <!-- <template v-if="value.selectedTravelAgent">
                            <dt class="col-6">Travel Agent By:</dt>
                            <dd class="col-6">{{ getSelectedTravelAgentName() }}</dd>
                        </template> -->

                        <!-- Display selected business source if available -->
                        <!-- <template v-if="value.selectedBusinessSource">
                            <dt class="col-6">Business Source By:</dt>
                            <dd class="col-6">{{ getSelectedBusinessSourceName() }}</dd>
                        </template> -->

                        <!-- New fields for insurance details -->
                        <!-- <template v-if="paymentDetails.insurance">
              <dt class="col-6">Insurance:</dt>
              <dd class="col-6">{{ paymentDetails.insurance }}</dd>
            </template>  -->

                        <!-- <template v-if="paymentDetails.assigned_to">
                            <dt class="col-6">Assigned By:</dt>
                            <dd class="col-6">
                                {{ accounts.find(account => account.id === paymentDetails.assigned_to)?.name || 'Not specified' }}
                            </dd>
                        </template> -->
                    </dl>
                    <div class="mt-3" v-if="value.selectedPaymentType">
                        <!-- Common fields for all payment types -->
                        <div class="mb-3">
                            <label class="form-label">Amount</label>
                            <input type="number" class="form-control" v-model="paymentDetails.amount" aria-label="Amount" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="payment_Image">Payment Image</label>
                            <input type="file" class="form-control" id="payment_Image" ref="paymentImage" @change="handleImageUpload" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Date</label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="YYYY-MM-DD" ref="datePicker1" v-model="paymentDetails.date" />
                                <span class="input-group-text">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </span>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Comment</label>
                            <textarea class="form-control" v-model="paymentDetails.comment" rows="3"></textarea>
                        </div>

                        <!-- Building Details Section - Only show when numberOfRooms > 1 -->

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
                <!-- Building Details Section -->
                <div class="row mb-3">
                    <div v-if="numberOfRooms > 1" class="col-12">
                        <h6 class="mb-3">Payment Details Units</h6>
                        <div v-for="index in numberOfRooms - 1" :key="index" class="row mb-3">
                            <div class="col-md-6">
                                <label :for="'buildingName' + index" class="form-label">Unit Code</label>
                                <input type="text" :id="'buildingName' + index" class="form-control" v-model="buildingDetails[index - 1].name" placeholder="Enter unit code" readonly />
                            </div>
                            <div class="col-md-6">
                                <label :for="'buildingAmount' + index" class="form-label">Amount</label>
                                <input type="number" :id="'buildingAmount' + index" class="form-control" v-model="buildingDetails[index - 1].amount" placeholder="Enter amount" min="0" @input="updateBuildingAmount(index - 1, $event)" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dynamic form fields based on payment type -->
            </div>
        </div>
    </section>
</template>

<script>
    import { getAccounts, getBusinessSources, getPaymentMethods, getPaymentTypeByPaymentId, getPaymentTypes, getTravelAgents } from '../../Api/addResvertionApi';
    import flatpickrMixin from '../Mixin/flatpickrMixin';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.min.css';

    export default {
        name: 'BillingSummary',
        mixins: [flatpickrMixin],
        props: {
            value: {
                type: Object,
                required: true,
            },
            selectedDates: {
                type: Array,
                required: true,
            },
            numberOfRooms: {
                type: Number,
                default: 1,
            },
        },
        data() {
            return {
                validationMessage: '',
                paymentMethods: [],
                paymentTypes: [],
                accounts: [],
                businessSources: [],
                travelAgents: [],
                datePicker1Instance: null,
                buildingDetails: [],
                paymentDetails: {
                    roomCharges: 0.0,
                    taxes: '0',
                    dueAmount: '0',
                    amount: null,
                    bankName: '',
                    accountNumber: '',
                    transferDate: '',
                    phoneNumber: '',
                    transactionId: '',
                    cardNumber: '',
                    image: null,
                    date: new Date().toISOString().split('T')[0],
                    cvv: '',
                    comment: '',
                    insurance: '',
                    assigned_to: '',
                    travel_agent_name: '',
                    business_source_name: '',
                },
            };
        },
        computed: {
            formatCheckInDate() {
                if (this.selectedDates && this.selectedDates.length > 0) {
                    const firstDate = this.selectedDates[0].dateTime;
                    const [datePart] = firstDate.split(', ');
                    return datePart;
                }
                return '--/--/----';
            },
            formatCheckOutDate() {
                if (this.selectedDates && this.selectedDates.length > 0) {
                    const lastDate = this.selectedDates[this.selectedDates.length - 1].dateTime;
                    const [datePart] = lastDate.split(', ');
                    return datePart;
                }
                return '--/--/----';
            },
        },
        async mounted() {
            // Call origi
            try {
                const [businessSourcesResponse, travelAgentsResponse] = await Promise.all([getBusinessSources(), getTravelAgents()]);

                this.businessSources = businessSourcesResponse.data.data;
                this.travelAgents = travelAgentsResponse.data.data;
            } catch (error) {
                console.error('Error loading data:', error);
            }
            // Call original API loading
            this.loadApiData();

            // Initialize flatpickr
            this.$nextTick(() => {
                this.initializeDatePicker();
            });
        },
        watch: {
            // "value.paymentMode": function (newVal) {
            //   if (!newVal) {
            //     this.validationMessage = "Payment Mode is required.";
            //   } else {
            //     this.validationMessage = "";
            //   }
            // },
            'value.roomCharges': function (value) {
                this.paymentDetails.roomCharges = value;
            },
            'value.selectedPaymentType': function (newVal) {
                this.$emit('input', {
                    ...this.value,
                    selectedPaymentType: newVal,
                });

                // Initialize datepicker when payment type is selected
                this.$nextTick(() => {
                    this.initializeDatePicker();
                });
            },
            paymentDetails: {
                deep: true,
                handler(newVal) {
                    this.$emit('input', {
                        ...this.value,
                        ...newVal,
                    });
                },
            },
            numberOfRooms: {
                immediate: true,
                handler(newValue) {
                    // Create array with one less than the number of rooms
                    const newBuildingDetails = [];
                    const detailsCount = Math.max(0, newValue - 1); // One less than total rooms

                    // Get the CheckIn component instance
                    const checkInComponent = this.$parent.$refs.checkIn;
                    if (!checkInComponent) return;

                    for (let i = 0; i < detailsCount; i++) {
                        // Get the unit from CheckIn component
                        const unitId = checkInComponent.formAddReservation.units[i + 1]?.unitId;
                        const availableUnits = checkInComponent.availableUnitsByRoom[i + 1] || [];
                        const unit = availableUnits.find(u => u.id === unitId);

                        // If we have existing data for this index, keep it
                        const existingData = this.buildingDetails[i] || { name: '', amount: 0, unitId: '' };

                        newBuildingDetails.push({
                            name: unit ? unit.code : existingData.name,
                            amount: existingData.amount,
                            unitId: unitId || existingData.unitId,
                            roomNumber: i + 1,
                        });
                    }

                    this.buildingDetails = newBuildingDetails;

                    // Update payment details with new building details
                    this.$emit('input', {
                        ...this.value,
                        buildingDetails: this.buildingDetails,
                        buildingAmount: this.calculateTotalBuildingAmount(),
                    });
                },
            },
            // Add a watcher for CheckIn units changes
            '$parent.$refs.checkIn.formAddReservation.units': {
                deep: true,
                handler(newUnits) {
                    if (!newUnits) return;

                    // Update building details when units change
                    this.buildingDetails = this.buildingDetails.map((detail, index) => {
                        const unitId = newUnits[index + 1]?.unitId;
                        const availableUnits = this.$parent.$refs.checkIn.availableUnitsByRoom[index + 1] || [];
                        const unit = availableUnits.find(u => u.id === unitId);

                        return {
                            ...detail,
                            name: unit ? unit.code : detail.name,
                            unitId: unitId || detail.unitId,
                        };
                    });

                    // Emit updated building details
                    this.$emit('input', {
                        ...this.value,
                        buildingDetails: this.buildingDetails,
                        buildingAmount: this.calculateTotalBuildingAmount(),
                    });
                },
            },
        },
        methods: {
            formatDate(date) {
                return date.toISOString().split('T')[0];
            },

            // Add a new method to initialize the datepicker
            initializeDatePicker() {
                if (this.$refs.datePicker1) {
                    // Destroy existing instance if it exists to prevent duplicates
                    if (this.datePicker1Instance) {
                        this.datePicker1Instance.destroy();
                    }

                    // Create new flatpickr instance
                    this.datePicker1Instance = flatpickr(this.$refs.datePicker1, {
                        dateFormat: 'Y-m-d',
                        defaultDate: this.paymentDetails.date,
                        onChange: selectedDates => {
                            if (selectedDates[0]) {
                                this.paymentDetails.date = this.formatDate(selectedDates[0]);
                            }
                        },
                    });
                }
            },

            async loadApiData() {
                try {
                    const [paymentMethodsResponse, accountsResponse] = await Promise.all([getPaymentMethods(), getAccounts()]);

                    this.paymentMethods = paymentMethodsResponse.data.data;
                    this.accounts = accountsResponse.data.data;

                    // Add console log to check payment types
                } catch (error) {
                    console.error('Error loading data:', error);
                }
            },
            // Add this new method to mask card numbers
            maskCardNumber(cardNumber) {
                if (!cardNumber) return 'Not specified';
                return `****-****-****-${cardNumber.slice(-4)}`;
            },
            handleImageUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    // Validate file type
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
                    if (!allowedTypes.includes(file.type)) {
                        alert('The image must be a file of type: jpeg, png, jpg, gif.');
                        // Reset the file input
                        this.$refs.paymentImage.value = '';
                        return;
                    }

                    this.paymentDetails.image = file;
                    // Emit the payment image to the parent component
                    this.$emit('payment-image-upload', file);
                }
            },
            // Add these methods to get the selected payment method and type names
            getSelectedPaymentMethodName() {
                if (!this.value.paymentMethod) return null;
                const method = this.paymentMethods.find(m => m.id === this.value.paymentMethod);
                return method ? method.name : null;
            },

            getSelectedPaymentTypeName() {
                if (!this.value.selectedPaymentType) return null;
                const type = this.paymentTypes.find(t => t.id == this.value.selectedPaymentType);
                return type ? type.name : null;
            },
            // getSelectedTravelAgentName() {
            //     if (!this.value.selectedTravelAgent) return null;
            //     const agent = this.travelAgents.find(a => a.id === this.value.selectedTravelAgent);
            //     return agent ? agent.name : null;
            // },

            // getSelectedBusinessSourceName() {
            //     if (!this.value.selectedBusinessSource) return null;
            //     const source = this.businessSources.find(s => s.id === this.value.selectedBusinessSource);
            //     return source ? source.name : null;
            // },

            updateSelectedPaymentType() {
                // Force a refresh of the component
                this.$forceUpdate();
            },
            async fetchPaymentTypeByMethod() {
                if (this.value.paymentMethod) {
                    try {
                        const response = await getPaymentTypeByPaymentId(this.value.paymentMethod);
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
                    this.value.selectedPaymentType = '';
                }
            },
            calculateTotalBuildingAmount() {
                return this.buildingDetails.reduce((sum, building) => {
                    return sum + (Number(building.amount) || 0);
                }, 0);
            },
            updateBuildingAmount(index, event) {
                // Ensure amount is not negative
                const value = Math.max(0, Number(event.target.value));
                this.buildingDetails[index].amount = value;

                // Calculate total building amount
                const totalBuildingAmount = this.calculateTotalBuildingAmount();

                // Update payment details with total building amount
                this.paymentDetails.buildingAmount = totalBuildingAmount;

                // Emit updated value
                this.$emit('input', {
                    ...this.value,
                    buildingDetails: this.buildingDetails,
                    buildingAmount: totalBuildingAmount,
                });
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
