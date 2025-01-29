<template>
  <div>
    <div class="row g-3">


      <div class="col-md-12">
        <label for="printInvoiceFolioTemplate" class="col-form-label">Folio Template</label>
        <div class="input-group">
          <select class="form-select" id="printInvoiceFolioTemplate">
            <option value="option1" disabled selected>Folio Detail Template - Template 31</option>
            <option value="option2">Folio Detail Template - Template 31</option>
            <option value="option2">Folio Detail Template - Template 31</option>
          </select>

        </div>
      </div>
      <div class="col-md-12">
        <label for="printInvoiceFolio" class="col-form-label">Folio</label>
        <div class="input-group">
          <select class="form-select" id="printInvoiceFolio">
            <option value="option1" disabled selected>202 - Suite الفندق غرفتين وصاله</option>
            <option value="option2">8186 - Mr. مصطفى مدبولي</option>
          </select>

        </div>
      </div>
      <div class="col-md-12">
        <label for="printInvoiceCurrency" class="col-form-label">Currency</label>
        <div class="input-group">
          <select class="form-select" id="printInvoiceCurrency">
            <option value="option1">EGP (£)</option>
            <option value="option2">EUR (â‚¬)</option>
          </select>

        </div>
      </div>


    </div>
  </div>
</template>

<script>


export default {
  name: "PrintInvoice",
  layout: "component",

};
</script>

<style scoped></style>
