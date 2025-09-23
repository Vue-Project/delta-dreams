<template>
  <div>
    <div class="row g-3">
      <div class="col-3">
        <label class="form-label w-100" for="applyDiscountDate">Date</label>
        <div class="input-group input-group-merge">
          <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-01" ref="datePicker9" aria-label="input Text to Date" />

        </div>
      </div>
      <div class="col-3">
        <label for="applyDiscountDiscount" class="col-form-label">Discount</label>
        <div class="input-group">
          <select class="form-select" id="applyDiscountDiscount">
            <option value="option1" disabled selected>السعر شامل الافطا</option>
            <option value="option2">لسعر غير شام </option>
          </select>

        </div>
      </div>
      <div class="col-3">
        <label for="applyDiscountDiscountRule" class="col-form-label">Discount Rule</label>
        <div class="input-group">
          <select class="form-select" id="applyDiscountDiscountRule">
            <option value="option1" disabled selected>السعر شامل الافطا</option>
            <option value="option2">لسعر غير شام </option>
          </select>

        </div>
      </div>
      <div class="col-3">
        <button class="btn btn-primary btn-block mt-40">Apply</button>

      </div>

      <div class="col-3">
        <div class="form-check custom mb-2">
          <input type="checkbox" class="form-check-input" id="applyDiscountOpenDates">
          <label class="form-check-label" for="applyDiscountOpenDates">Open Dates</label>
        </div>
      </div>
      <div class="col-3">
        <div class="form-check custom mb-2">
          <input type="checkbox" class="form-check-input" id="applyDiscountAuditedDates">
          <label class="form-check-label" for="applyDiscountAuditedDates">Audited Dates
          </label>
        </div>
      </div>

      <div class="col-12">
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead class="table-light">
              <tr>
                <th>Discount Type</th>
                <th>Discount Rule</th>
                <th> Amount</th>
                <th>Applied For </th>
              </tr>
            </thead>
            <tbody>


            </tbody>
          </table>
        </div>
      </div>


    </div>


  </div>

</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";

export default {
  name: "ApplyDiscount",
  layout: "component",

  data () { },
  mixins: [flatpickrMixin],
};
</script>

<style scoped></style>
