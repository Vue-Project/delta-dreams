<template>
  <div>
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label w-100" for="UpdateDetailsDate">Date</label>
        <div class="input-group input-group-merge">
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-01" ref="datePicker8" aria-label="input Text to Date" />

        </div>
      </div>
      <div class="col-md-12">
        <label for="updateDetailsRate" class="col-form-label">Rate Type</label>
        <div class="input-group">
          <select class="form-select" id="updateDetailsRate">
            <option value="option1" disabled selected>السعر شامل الافطا</option>
            <option value="option2">لسعر غير شام </option>
          </select>

        </div>

      </div>
      <div class="col-12 col-md-6">
        <label for="updateDetailsPax" class="col-form-label">Pax (A/C) </label>
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
      <div class="col-12 col-md-6">
        <label for="updateDetailsPax" class="col-form-label"> </label>
        <div class="input-group mt-3">
          <select class="form-select" id="updateDetailsPax">
            <option value="option1" disabled selected> 1</option>
            <option value="option2"> 2 </option>
            <option value="option3"> 3 </option>
            <option value="option4">4</option>
            <option value="option5">5</option>

          </select>

        </div>

      </div>


      <div class="col-12">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="updateDetailsComplimentary">
          <label class="form-check-label" for="updateDetailsComplimentary">Complimentary Room</label>
        </div>
      </div>
      <div class="col-md-4">
        <label for="updateDetailsRate" class="col-form-label">Rate</label>
        <div class="input-group">
          <select class="form-select" id="updateDetailsRate" disabled>
            <option value="option1" disabled selected>Physical Card</option>
            <option value="option2">Virtual Card</option>
          </select>

        </div>
      </div>
      <div class="col-md-8">
        <div class="input-group input-group-merge mt-40">
          <input id="updateDetailsRate" name="updateDetailsRate" class="form-control credit-card-mask" type="text" placeholder="10.00000" aria-describedby="updateDetailsRate">
          <span class="input-group-text cursor-pointer p-1" id="paymentCard2"><span class="card-type"></span></span>

        </div>

      </div>
      <div class="col-12">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="updateDetailsRates Inclusive">
          <label class="form-check-label" for="updateDetailsRates Inclusive">Rates Inclusive Tax</label>
        </div>
      </div>
      <div class="col-12">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="updateDetailsUpdate Meal">
          <label class="form-check-label" for="updateDetailsUpdate Meal">Update Meal Plan</label>
        </div>
      </div>

      <div class="col-6">
        <div class="form-check custom mb-2">
          <input type="radio" id="updateDetailsSelectedDates" name="updateDetailsRadio" class="form-check-input" checked="">
          <label class="form-check-label" for="updateDetailsSelectedDates">Apply on Selected Dates</label>
        </div>
      </div>
      <div class="col-6">
        <div class="form-check custom mb-2">
          <input type="radio" id="updateDetailsWholestay" name="updateDetailsRadio" class="form-check-input">
          <label class="form-check-label" for="updateDetailswholestay">Apply on whole stay</label>
        </div>
      </div>

    </div>


  </div>
  </div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";

export default {
  name: "UpdateDetails",
  layout: "component",


  mixins: [flatpickrMixin],
};
</script>

<style scoped></style>
