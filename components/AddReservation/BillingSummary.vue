<template>
  <section class="summary position-sticky top-0">
    <div class="card">
      <h5 class="card-header">
        Billing Summary
        <span class="badge bg-label-success float-right">حجز مؤكد معلق بتحويل المبلغ</span>
      </h5>
      <hr class="m-0" />
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-4">
            <div class="d-flex gap-2 align-items-center mb-2">
              <span class="badge bg-label-info p-1 rounded"></span>
              <p class="mb-0">Check-in</p>
            </div>
            <h5 class="mb-0 pt-1 text-nowrap fw-bold">{{ formatCheckInDate }}</h5>
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
            <h5 class="mb-0 pt-1 text-nowrap ms-lg-n3 ms-xl-0 fw-bold">{{ formatCheckOutDate }}</h5>
          </div>
        </div>
        <dl class="row mb-2 billingMoney rounded p-2">
          <dt class="col-6 fw-normal text-heading">Room Charges</dt>
          <dd class="col-6 text-end">{{ value.roomCharges }}</dd>

          <dt class="col-sm-6 fw-normal">Taxes</dt>
          <dd class="col-sm-6 text-end">{{ value.taxes }}</dd>

          <dt class="col-6 fw-normal text-heading">Due Amount</dt>
          <dd class="col-6 text-end">£ {{ value.dueAmount }}</dd>
        </dl>
        <div class="row align-items-center">
          <div class="col-md-9">
            <div class="input-group">
              <label class="input-group-text" for="inputGroupSelect01">Bill To</label>
              <select class="form-select" id="inputGroupSelect01" v-model="value.billTo">
                <option selected>Choose...</option>
                <option value="Company">Company</option>
                <option value="GroupOwner">GroupOwner</option>
                <option value="Guest">Guest</option>
                <option value="Room and Tax to Company, Extra to Guest">Room and Tax to Company, Extra to Guest</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="input-group justify-content-end">
              <div class="input-group-text border-0 px-2">
                <label class="pl-1 mb-0" for="inputCheckBox01">Tax Exempt</label>
                <input id="inputCheckBox01" class="form-check-input mt-0" type="checkbox" v-model="value.taxExempt" />
              </div>
            </div>
          </div>
        </div>

        <div class="input-group">
          <div class="input-group-text border-0 px-2 ml-3">
            <label class="pl-1 mb-0" for="inputCheckBox02">Payment Mode</label>
            <input id="inputCheckBox02" class="form-check-input mt-0" type="checkbox" v-model="value.paymentMode" />
          </div>
        </div>

        <div class="row" v-if="value.paymentMode">
          <div class="col-md-6 d-flex align-items-center">
            <div class="input-group">
              <div class="input-group-text border-0 ml-3">
                <label class="pl-1 mb-0" for="inputRadio01">Cash/Bank</label>
                <input id="inputRadio01" class="form-check-input mt-0" type="radio" value="Cash/Bank" v-model="value.paymentMethod" />
              </div>
            </div>
            <div class="input-group float-right">
              <div class="input-group-text border-0 ml-3">
                <label class="pl-1 mb-0" for="inputRadio02">City Ledger</label>
                <input id="inputRadio02" class="form-check-input mt-0" type="radio" value="City Ledger" v-model="value.paymentMethod" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <select class="form-select" id="PaymentMethods" v-model="value.selectedPaymentMethod">
                <option selected>Select...</option>
                <option value="Mohamed">Mohamed</option>
                <option value="testing">testing</option>
                <option value="بد الله سامى">بد الله سامى</option>
                <option value="testing20">testing20</option>
                <option value="SS ss">SS ss</option>
                <option value="retfd">retfd</option>
                <option value="MOHAMED">MOHAMED</option>
                <option value="retfd">retfd</option>
                <option value="shhhh">shhhh</option>
                <option value="Shad">Shad</option>
                <option value="shady">shady</option>
              </select>
            </div>
          </div>
        </div>
        <p v-if="!value.paymentMode && validationMessage" class="validation-message">
          Payment Mode is required.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BillingSummary",
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
        const lastDate = this.selectedDates[this.selectedDates.length - 1].dateTime;
        const [datePart] = lastDate.split(", ");
        return datePart;
      }
      return "--/--/----";
    },
  },
  watch: {
    "value.paymentMode": function (newVal) {
      if (!newVal) {
        this.validationMessage = "Payment Mode is required.";
      } else {
        this.validationMessage = "";
      }
    },
  },
};
</script>

<style scoped></style>
