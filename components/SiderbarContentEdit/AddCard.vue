<template>
  <div>
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label w-100" for="addCardNumber">Card Number</label>
        <div class="input-group input-group-merge">
          <input id="paymentCard" name="addCardNumber" class="form-control credit-card-mask" type="text" placeholder="1356 3215 6548 7898" aria-describedby="paymentCard2">
          <span class="input-group-text cursor-pointer p-1" id="paymentCard2"><span class="card-type"></span></span>

        </div>
      </div>
      <div class="col-12">
        <label class="form-label w-100" for="addCardHolderName">Card Holder Name</label>
        <div class="input-group input-group-merge">
          <input id="paymentCard" name="addCardHolderName" class="form-control credit-card-mask" type="text" placeholder="Card Holder Name" aria-describedby="paymentCard2">
          <span class="input-group-text cursor-pointer p-1" id="paymentCard2"><span class="card-type"></span></span>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <label class="form-label" for="addCardExpiryDate">Expiry Date</label>
        <input type="text" id="addCardExpiryDate" class="form-control" placeholder="John Doe">
      </div>
      <div class="col-6 col-md-4">
        <label class="form-label" for="addCardExpiryDate"></label>
        <input type="text" id="addCardExpiryDate" class="form-control expiry-date-mask" placeholder="MM/YY">
      </div>
      <div class="col-6 col-md-4">
        <label class="form-label" for="addCardCvv">CVV</label>
        <div class="input-group input-group-merge">
          <input type="text" id="addCardCvv" class="form-control cvv-code-mask" maxlength="3" placeholder="654">
          <span class="input-group-text cursor-pointer" id="paymentCardCvv2"><i class="ti ti-help text-muted" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Card Verification Value" data-bs-original-title="Card Verification Value"></i></span>
        </div>
      </div>
      <div class="col-12">
        <label class="form-label w-100" for="addCardRoom">Room</label>
        <div class="input-group input-group-merge">
          <input id="addCardRoom" name="paymentCard" class="form-control credit-card-mask" type="text" placeholder="1356 3215 6548 7898" aria-describedby="paymentCard2">
          <span class="input-group-text cursor-pointer p-1" id="paymentCard2"><span class="card-type"></span></span>
        </div>
      </div>
      <div class="col-md-12">
        <label for="addCardFormat" class="col-form-label">Format</label>
        <div class="input-group">
          <select class="form-select" id="addCardFormat">
            <option value="option1" disabled selected>Physical Card</option>
            <option value="option2">Virtual Card</option>
          </select>

        </div>
      </div>


    </div>
  </div>
</template>

<script>


export default {
  name: "AddCard",
  layout: "component",



};
</script>

<style scoped></style>
