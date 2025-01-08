<template>
  <section class="summary position-sticky top-0">
    <!-- {{ selectedDates }} -->

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
            <div class="divider ">
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
          <dd class="col-6 text-end">0.00</dd>

          <dt class="col-sm-6 fw-normal">Taxes</dt>
          <dd class="col-sm-6 text-end">0.00</dd>

          <dt class="col-6 fw-normal text-heading">Due Amount</dt>
          <dd class="col-6 text-end">£ 0.00</dd>
        </dl>
        <div class="row align-items-center">
          <div class="col-md-9">
            <div class="input-group">
              <label class="input-group-text" for="inputGroupSelect01">Bill To</label>
              <select class="form-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option value="0">Company</option>
                <option value="1">GroupOwner</option>
                <option value="2">Guest</option>
                <option value="3">Room and Tax to Company, Extra to Guest</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="input-group justify-content-end">
              <div class="input-group-text border-0 px-2 ">
                <label class="pl-1 mb-0" for="inputCheckBox01">Tax Exempt</label>
                <input id="inputCheckBox01" class="form-check-input mt-0" type="checkbox" value aria-label="Checkbox for following text input" />
              </div>
            </div>
          </div>
        </div>

        <div class="input-group ">
          <div class="input-group-text border-0 px-2 ml-3">
            <label class="pl-1 mb-0" for="inputCheckBox02 ">Payment Mode</label>
            <input v-model="isChecked" @change="handleCheckboxChange" id="inputCheckBox02" class="form-check-input mt-0" type="checkbox" value aria-label="Checkbox for following text input" />
          </div>
        </div>

        <div class="row" v-if="isChecked">

          <div class="col-md-6 d-flex align-items-center">
            <div class="input-group">
              <div class="input-group-text border-0 ml-3">
                <label class="pl-1 mb-0" for="inputRadio01">Cash/Bank</label>
                <input id="inputRadio01" class="form-check-input mt-0" type="radio" value="option01" name="paymentMethod" aria-label="Radio button for following text input" checked="" />
              </div>
            </div>
            <div class="input-group float-right">
              <div class="input-group-text border-0 ml-3">
                <label class="pl-1 mb-0" for="inputRadio02">City Ledger</label>
                <input id="inputRadio02" class="form-check-input mt-0" type="radio" value="option02" name="paymentMethod" aria-label="Radio button for following text input" />
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <select class="form-select" id="PaymentMethods">
                <option selected>Select...</option>
                <option value="1">Mohamed</option>
                <option value="2">testing</option>
                <option value="3">بد الله سامى</option>
                <option value="4">testing20</option>
                <option value="5">SS ss</option>
                <option value="6">retfd</option>
                <option value="7">MOHAMED</option>
                <option value="8">retfd</option>
                <option value="9">shhhh</option>
                <option value="10">Shad</option>
                <option value="11">shady</option>

              </select>
            </div>
          </div>
        </div>
        <p v-if="!isChecked && validationMessage" class="validation-message">
          Payment Mode is required.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BillingSummary",
  layout: "component",
  data ()
  {
    return {

      isChecked: false,
      validationMessage: "",

    };
  },
  methods: {
    handleCheckboxChange ()
    {
      if (!this.isChecked) {
        this.validationMessage = "Payment Mode is required.";
      } else {
        this.validationMessage = "";
      }
    },
  },
  mounted ()
  {
    this.isChecked = true;
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
    }
  },
  props: {
    selectedDates: {
      type: Array,
      required: true,
    },
  }
};
</script>

<style scoped></style>
