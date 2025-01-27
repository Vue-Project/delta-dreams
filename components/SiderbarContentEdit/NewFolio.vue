<template>
  <div>
    <div class="row g-3">
      <div class="col-md-12">
        <label class="form-label" for="newFolioSharer"> Sharer</label>
        <div class="input-group">
          <select class="form-select" id="newFolioSharer" aria-label="Example select with button addon">
            <option selected="">Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button class="btn btn-outline-primary waves-effect" type="button">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      <div class="col-12">
        <label class="form-label w-100" for="newFolioRegistration">Registration No</label>
        <div class="input-group input-group-merge">
          <input id="newFolioRegistration" name="newFolioRegistration" class="form-control credit-card-mask" type="text" placeholder="Registration No" aria-describedby="Registration No" />
        </div>
      </div>

      <div class="col-12">
        <div class="form-check custom mb-2">
          <input type="checkbox" class="form-check-input" id="newFolioShowTariff" />
          <label class="form-check-label" for="newFolioShowTariff">Show Tariff on Print Folio</label>
        </div>
      </div>
      <div class="col-12">
        <div class="form-check custom mb-2">
          <input type="checkbox" class="form-check-input" id="newFolioSGenerateInvoice" />
          <label class="form-check-label" for="newFolioSGenerateInvoice">Generate Invoice Number On/Post Checkout</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewFolio",
  layout: "component",
};
</script>

<style scoped></style>
