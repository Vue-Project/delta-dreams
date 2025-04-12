<template>
  <section class="summary position-sticky top-0">
    <div class="card">
      <!-- <p>{{ paymentDetails }}</p> -->
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
            <div
              class="d-flex gap-2 justify-content-end align-items-center mb-2"
            >
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

          <label for="taxes" class="col-sm-9 col-4 col-form-label fw-normal"
            >Taxes</label
          >
          <div class="col-sm-3 col-8">
            <input
              type="number"
              id="taxes"
              name="taxes"
              class="form-control rounded-2 fw-normal text-end"
              v-model="paymentDetails.taxes"
              min="0"
              @input="
                paymentDetails.taxes = Math.max(Number($event.target.value), 0)
              "
            />
          </div>

          <label
            for="dueAmount"
            class="col-sm-9 col-4 col-form-label fw-normal text-heading"
            >Charge Extra</label
          >
          <div class="col-sm-3 col-8">
            <input
              type="number"
              id="dueAmount"
              name="dueAmount"
              class="form-control rounded-2 mt-1 fw-normal text-end"
              v-model="paymentDetails.dueAmount"
              min="0"
              @input="
                paymentDetails.dueAmount = Math.max(
                  Number($event.target.value),
                  0
                )
              "
            />
          </div>
        </dl>

        <div class="input-group">
          <div class="input-group-text border-0 px-2 ml-3">
            <label class="pl-1 mb-0" for="inputCheckBox02">Payment Mode</label>
            <input
              id="inputCheckBox02"
              class="form-check-input mt-0"
              type="checkbox"
              v-model="value.paymentMode"
            />
          </div>
        </div>

        <div class="row" v-if="value.paymentMode">
          <div class="col-md-6 mb-3">
            <div class="input-group">
              <label class="input-group-text" for="paymentMethod"
                >Methods</label
              >
              <select
                class="form-select"
                id="paymentMethod"
                v-model="value.paymentMethod"
              >
                <option disabled value="">Select</option>
                <option
                  v-for="paymentMethod in paymentMethods"
                  :key="paymentMethod.id"
                  :value="paymentMethod.id"
                >
                  {{ paymentMethod.type }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <div class="input-group">
              <label class="input-group-text" for="paymentType">Types</label>
              <select
                class="form-select"
                id="paymentType"
                v-model="selectedPaymentType"
              >
                <option disabled value="">Select</option>
                <option
                  v-for="paymentType in paymentTypes"
                  :key="paymentType.id"
                  :value="paymentType.id"
                >
                  {{ paymentType.name }}
                </option>
              </select>
            </div>
          </div>
          <!-- <div class="col-md-6 mb-3 d-flex align-items-center">
            <div class="input-group mt-md-3">
              <label class="input-group-text" for="paymentInsurance">Insurance</label>
              <input type="text" class="form-control" id="paymentInsurance" v-model="paymentDetails.insurance" placeholder="Insurance">
            </div> -->
          <!-- </div> -->
          <div class="col-md-6 d-flex align-items-center">
            <div class="input-group">
              <label class="input-group-text" for="paymentInsuranceBy"
                >Assigned By</label
              >
              <select
                class="form-select"
                id="paymentInsuranceBy"
                v-model="paymentDetails.assigned_to"
              >
                <option disabled value="">Select</option>
                <option
                  v-for="account in accounts"
                  :key="account.id"
                  :value="account.id"
                >
                  {{ account.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <p
          v-if="!value.paymentMode && validationMessage"
          class="validation-message"
        >
          Payment Mode is required.
        </p>

        <!-- Payment Details Summary -->
        <div v-if="value.paymentMode" class="payment-summary mt-3">
          <h6 class="mb-3">Payment Details</h6>
          <dl class="row">
            <dt class="col-6">Payment Method:</dt>
            <dd class="col-6">
              {{ getSelectedPaymentMethodName() || "Not selected" }}
            </dd>

            <dt class="col-6">Payment Type:</dt>
            <dd class="col-6">{{ getSelectedPaymentTypeName() || "Not selected" }}</dd>

            <!-- Common fields for all payment types -->
            <dt class="col-6">Amount:</dt>
            <dd class="col-6">
              {{ paymentDetails.amount || "Not specified" }}
            </dd>

            <dt class="col-6">Date:</dt>
            <dd class="col-6">{{ paymentDetails.date || "Not specified" }}</dd>

            <template v-if="paymentDetails.comment">
              <dt class="col-6">Comment:</dt>
              <dd class="col-6">{{ paymentDetails.comment }}</dd>
            </template>

            <!-- New fields for insurance details -->
            <!-- <template v-if="paymentDetails.insurance">
              <dt class="col-6">Insurance:</dt>
              <dd class="col-6">{{ paymentDetails.insurance }}</dd>
            </template> -->

            <template v-if="paymentDetails.assigned_to">
              <dt class="col-6">Assigned By:</dt>
              <dd class="col-6">
                {{
                  accounts.find(
                    (account) => account.id === paymentDetails.assigned_to
                  )?.name || "Not specified"
                }}
              </dd>
            </template>
          </dl>
        </div>

        <!-- Dynamic form fields based on payment type -->
        <div class="mt-3" v-if="selectedPaymentType">
          <!-- Common fields for all payment types -->
          <div class="mb-3">
            <label class="form-label">Amount</label>
            <input
              type="number"
              class="form-control"
              v-model="paymentDetails.amount"
              aria-label="Amount"
            />
          </div>
          <div class="mb-3">
            <label class="form-label" for="payment_Image">Payment Image</label>
            <input
              type="file"
              class="form-control"
              id="payment_Image"
              ref="paymentImage"
              @change="handleImageUpload"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Date</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="YYYY-MM-DD"
                ref="datePicker1"
                v-model="paymentDetails.date"
              />
              <span class="input-group-text">
                <i class="fa-solid fa-calendar-days"></i>
              </span>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Comment</label>
            <textarea
              class="form-control"
              v-model="paymentDetails.comment"
              rows="3"
            ></textarea>
          </div>

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
    </div>
  </section>
</template>

<script>
import {
  getAccounts,
  getPaymentMethods,
  getPaymentTypes,
} from "../../Api/addResvertionApi";
import flatpickrMixin from "../Mixin/flatpickrMixin";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default {
  name: "BillingSummary",
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
  },
  data() {
    return {
      validationMessage: "",
      paymentMethods: [],
      paymentTypes: [],
      accounts: [],
      selectedPaymentType: "",
      datePicker1Instance: null, // Add this line to store the flatpickr instance
      paymentDetails: {
        roomCharges: 0.0,
        taxes: "1",
        dueAmount: "1",
        amount: null,
        bankName: "",
        accountNumber: "",
        transferDate: "",
        phoneNumber: "",
        transactionId: "",
        cardNumber: "",
        image: null,
        date: new Date().toISOString().split("T")[0],
        cvv: "",
        comment: "",
        insurance: "",
        assigned_to: "",
      },
    };
  },
  computed: {
    formatCheckInDate() {
      if (this.selectedDates && this.selectedDates.length > 0) {
        const firstDate = this.selectedDates[0].dateTime;
        const [datePart] = firstDate.split(", ");
        return datePart;
      }
      return "--/--/----";
    },
    formatCheckOutDate() {
      if (this.selectedDates && this.selectedDates.length > 0) {
        const lastDate =
          this.selectedDates[this.selectedDates.length - 1].dateTime;
        const [datePart] = lastDate.split(", ");
        return datePart;
      }
      return "--/--/----";
    },
  },
  mounted() {
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
    "value.roomCharges": function (value) {
      this.paymentDetails.roomCharges = value;
    },
    selectedPaymentType(newVal) {
      this.$emit("input", {
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
        this.$emit("input", {
          ...this.value,
          ...newVal,
        });
      },
    },
  },
  methods: {
    formatDate(date) {
      return date.toISOString().split("T")[0];
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
          dateFormat: "Y-m-d",
          defaultDate: this.paymentDetails.date,
          onChange: (selectedDates) => {
            if (selectedDates[0]) {
              this.paymentDetails.date = this.formatDate(selectedDates[0]);
            }
          },
        });
      }
    },

    async loadApiData() {
      try {
        const [paymentMethodsResponse, accountsResponse, paymentTypesResponse] =
          await Promise.all([
            getPaymentMethods(),
            getAccounts(),
            getPaymentTypes(),
          ]);

        this.paymentMethods = paymentMethodsResponse.data.data;
        this.paymentTypes = paymentTypesResponse.data.data;
        this.accounts = accountsResponse.data.data;
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    // Add this new method to mask card numbers
    maskCardNumber(cardNumber) {
      if (!cardNumber) return "Not specified";
      return `****-****-****-${cardNumber.slice(-4)}`;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Validate file type
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/gif",
        ];
        if (!allowedTypes.includes(file.type)) {
          alert("The image must be a file of type: jpeg, png, jpg, gif.");
          // Reset the file input
          this.$refs.paymentImage.value = "";
          return;
        }

        this.paymentDetails.image = file;
        // Emit the payment image to the parent component
        this.$emit("payment-image-upload", file);
      }
    },
    // Add these methods to get the selected payment method and type names
    getSelectedPaymentMethodName() {
      if (!this.value.paymentMethod) return null;
      const method = this.paymentMethods.find(m => m.id === this.value.paymentMethod);
      return method ? method.type : null;
    },
    
    getSelectedPaymentTypeName() {
      if (!this.selectedPaymentType) return null;
      const type = this.paymentTypes.find(t => t.id === this.selectedPaymentType);
      return type ? type.name : null;
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
