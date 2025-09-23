<template>
  <div>
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label w-100" for="addPaymentDate">Date</label>
        <div class="input-group input-group-merge">
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-01" ref="datePicker8" aria-label="input Text to Date" />

        </div>
      </div>
      <div class="col-md-12">
        <label for="addPaymentFolio" class="col-form-label">Folio</label>
        <div class="input-group">
          <select class="form-select" id="addPaymentFolio">
            <option value="option1" disabled selected>السعر شامل الافطا</option>
            <option value="option2">لسعر غير شام </option>
          </select>

        </div>

      </div>
      <!-- <div class="col-12 ">
        <label for="addPaymentFolio" class="col-form-label">Pax (A/C) </label>
        <div class="input-group">
          <select class="form-select" id="updateDetailsPax">
            <option value="option1" disabled selected> 1</option>
            <option value="option2"> 2 </option>
            <option value="option3"> 3 </option>
            <option value="option4">4</option>
            <option value="option5">5</option>
            <option value="option6">6</option>
            <option value="option7">7</option>
            <option value="option8">8</option>
            <option value="option9">9</option>
            <option value="option10">10</option>
          </select>

        </div>

      </div>

      <div class="col-12">
        <div class="form-check custom mb-2">
          <input type="checkbox" class="form-check-input" id="newFolioSGenerateInvoice" />
          <label class="form-check-label" for="newFolioSGenerateInvoice">Generate Invoice Number On/Post Checkout</label>
        </div>
      </div> -->
      <div class="col-12">

        <label for="addPaymentRec" class="form-label">Rec/Vou #</label>
        <input id="addPaymentRec" class="form-control" type="text" placeholder="Rec/Vou #" disabled>
      </div>





      <div class="col-4">
        <label for="addPaymentAmount" class="col-form-label">Amount</label>
        <div class="input-group">
          <select class="form-select" id="addPaymentAmount">
            <option value="option1" disabled selected>EGP</option>
            <option value="option2">Virtual Card</option>
          </select>

        </div>
      </div>
      <div class="col-md-8">
        <div class="input-group input-group-merge mt-40">
          <input id="addPaymentAmount" name="addPaymentAmount" class="form-control credit-card-mask" type="text" placeholder="10.00000" aria-describedby="addPaymentAmount">

        </div>

      </div>

      <div class="col-12">
        <div>
          <label for="addPaymentComment" class="form-label">Comment</label>
          <textarea class="form-control" id="addPaymentComment" rows="3"></textarea>
        </div>
      </div>

    </div>


  </div>
  </div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";

export default {
  name: "AddDiscount",
  layout: "component",

  mixins: [flatpickrMixin],
};
</script>

<style scoped></style>
