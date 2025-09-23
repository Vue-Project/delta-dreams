<template>
  <div>
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label w-100" for="sendInvoiceSendEmail">Send email to</label>
        <div class="input-group input-group-merge">
          <input id="sendInvoiceSendEmail" name="sendInvoiceSendEmail" class="form-control credit-card-mask" type="text" placeholder="Send email to" aria-describedby="Send email to">

        </div>
      </div>
      <div class="col-12">
        <label class="form-label w-100" for="sendInvoiceAddEmail">Add email in BCC</label>
        <div class="input-group input-group-merge">
          <input id="sendInvoiceAddEmail" name="sendInvoiceAddEmail" class="form-control credit-card-mask" type="text" placeholder="Use comma to add multiple email address." aria-describedby="sendInvoiceAddEmail">
        </div>
      </div>

      <div class="col-md-12">
        <label for="sendInvoiceFolioTemplate" class="col-form-label">Folio Template</label>
        <div class="input-group">
          <select class="form-select" id="sendInvoiceFolioTemplate">
            <option value="option1" disabled selected>Folio Detail Template - Template 31</option>
            <option value="option2">Folio Detail Template - Template 31</option>
            <option value="option2">Folio Detail Template - Template 31</option>
          </select>

        </div>
      </div>
      <div class="col-md-12">
        <label for="cInvoiceFolio" class="col-form-label">Folio</label>
        <div class="input-group">
          <select class="form-select" id="sendInvoiceFolio">
            <option value="option1" disabled selected>202 - Suite الفندق غرفتين وصاله</option>
            <option value="option2">8186 - Mr. مصطفى مدبولي</option>
          </select>

        </div>
      </div>
      <div class="col-md-12">
        <label for="sendInvoiceCurrency" class="col-form-label">Currency</label>
        <div class="input-group">
          <select class="form-select" id="sendInvoiceCurrency">
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
  name: "SendInvoice",
  layout: "component",



};
</script>

<style scoped></style>
