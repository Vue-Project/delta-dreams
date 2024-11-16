<template>
  <div class="card">
    <h5 class="card-header"><i class="fa-solid fa-angle-left pr-2"></i>Add Reservation</h5>
    <hr class="m-0" />
    <div class="card-body">
      <form id="formValidationReservation" class="row g-3 fv-plugins-bootstrap5 fv-plugins-framework"
        novalidate="novalidate">
        <!-- Reservation  Details -->
        <div class="row mb-2">
          <div class="col-md-8">
            <div class="row  align-items-center">
              <!-- Date Picker-->
              <div class="col-md-3 col-12 ">
                <label for="flatpickr-date" class="form-label">Check-in</label>
                <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date"
                  readonly="readonly">
              </div>
              <!-- /Date Picker -->

              <!-- Time Picker-->
              <div class="col-md-3 col-12 ">
                <input type="text" class="form-control flatpickr-input mt-4" placeholder="HH:MM" id="flatpickr-time"
                  readonly="readonly">

              </div>
              <!-- Date Picker-->
              <div class="col-md-3 col-12">
                <label for="flatpickr-date" class="form-label">Check-out</label>
                <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date"
                  readonly="readonly">
              </div>
              <!-- /Date Picker -->

              <!-- Time Picker-->
              <div class="col-md-3 col-12 ">
                <input type="text" class="form-control flatpickr-input mt-4" placeholder="HH:MM" id="flatpickr-time"
                  readonly="readonly">

              </div>

            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-3 col-12 ">
                <label for="firstName" class="form-label">Room(s)</label>
                <input class="form-control" type="number" id="firstName" name="firstName" value="John" autofocus="">
              </div>
              <div class="col-md-9 col-12 mb-4 mt-4">
                <div class="input-group">
                  <label class="input-group-text" for="inputGroupSelect01">Reservation Type</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

            </div>

          </div>
          <div class="row">
            <div class="col-md-6 col-12 mb-4 mt-4">
              <div class="row">

                <div class="col-md-6">
                  <div class="input-group">
                    <label class="input-group-text" for="inputGroupSelect01">Booking Source</label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group">
                    <label class="input-group-text" for="inputGroupSelect01">Business Source</label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-0">
        <div class="row mb-2">
          <div class="row">
            <div class="col-md-4">
            <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="basic-default-checkbox" required="">
                            <label class="form-check-label" for="basic-default-checkbox">Agree to our terms and conditions</label>
                          </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="row  align-items-center">
              <!-- Date Picker-->
              <div class="col-md-3 col-12 ">
                <label for="flatpickr-date" class="form-label">Check-in</label>
                <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date"
                  readonly="readonly">
              </div>
              <!-- /Date Picker -->

              <!-- Time Picker-->
              <div class="col-md-3 col-12 ">
                <input type="text" class="form-control flatpickr-input mt-4" placeholder="HH:MM" id="flatpickr-time"
                  readonly="readonly">

              </div>
              <!-- Date Picker-->
              <div class="col-md-3 col-12">
                <label for="flatpickr-date" class="form-label">Check-out</label>
                <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date"
                  readonly="readonly">
              </div>
              <!-- /Date Picker -->

              <!-- Time Picker-->
              <div class="col-md-3 col-12 ">
                <input type="text" class="form-control flatpickr-input mt-4" placeholder="HH:MM" id="flatpickr-time"
                  readonly="readonly">

              </div>

            </div>
          </div>
          <div class="col-md-4">
            <div class="row">
              <div class="col-md-3 col-12 ">
                <label for="firstName" class="form-label">Room(s)</label>
                <input class="form-control" type="number" id="firstName" name="firstName" value="John" autofocus="">
              </div>
              <div class="col-md-9 col-12 mb-4 mt-4">
                <div class="input-group">
                  <label class="input-group-text" for="inputGroupSelect01">Reservation Type</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option selected>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

            </div>

          </div>
          <div class="row">
            <div class="col-md-6 col-12 mb-4 mt-4">
              <div class="row">

                <div class="col-md-6">
                  <div class="input-group">
                    <label class="input-group-text" for="inputGroupSelect01">Booking Source</label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group">
                    <label class="input-group-text" for="inputGroupSelect01">Business Source</label>
                    <select class="form-select" id="inputGroupSelect01">
                      <option selected>Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden">
      </form>
    </div>
  </div>
</template>

<script>


export default {
  name: "CheckIn",
  layout: "component",
};
</script>

<style>
.all-nights {
  display: block;
  width: 70px;
  height: 20px;
  background: #596D86;
  border-radius: 5px;
  padding: 20px;
  color: white;


}
</style>
