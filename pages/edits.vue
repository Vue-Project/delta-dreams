<template>
  <div class="row">
    <div class="col-md-12">
      <HeaderReservation>
        <template #button>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-FolioOperation"
              role="tab"
              aria-selected="false"
              tabindex="-1"
            >
              Folio Operations
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-BookingDetails"
              role="tab"
              aria-selected="false"
              tabindex="-1"
            >
              Booking Details
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-GuestDetails"
              role="tab"
              aria-selected="true"
            >
              Guest Details
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-RoomCharges"
              role="tab"
              aria-selected="true"
            >
              Room Charges
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-CreditCard"
              role="tab"
              aria-selected="true"
            >
              Credit Card
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#form-tabs-AuditTrail"
              role="tab"
              aria-selected="true"
            >
              Audit Trail
            </button>
          </li>
        </template>
        <template #content>
          <!-- Folio Operation  -->
          <div
            class="tab-pane fade active show"
            id="form-tabs-FolioOperation"
            role="tabpanel"
          ></div>
          <!-- Booking Details  -->
          <div
            class="tab-pane fade"
            id="form-tabs-BookingDetails"
            role="tabpanel"
          >
            <div class="row">
              <div class="col-8"></div>
              <div class="col-4">
                <ul class="list-unstyled d-flex justify-content-around">
                  <li>
                    <span>Remark</span>
                    <span
                      class="badge badge-center rounded-pill bg-label-primary"
                      >1</span
                    >
                  </li>
                  <li>
                    <span>Task</span>
                    <span
                      class="badge badge-center rounded-pill bg-label-primary"
                      >1</span
                    >
                  </li>
                  <li>
                    <span>Message</span>
                    <span
                      class="badge badge-center rounded-pill bg-label-primary"
                      >1</span
                    >
                  </li>
                  <li>
                    <span>Preference</span>
                    <span
                      class="badge badge-center rounded-pill bg-label-primary"
                      >1</span
                    >
                  </li>
                </ul>
              </div>
              <hr />

              <!-- Billing imformation section  -->
              <div class="row" style="height: 60vh">
                <div class="col-5">
                  <h4 class="text-center fw-bold">Billing Information</h4>
                  <form>
                    <div class="row">
                      <div class="col-6">
                        <label for="BillTo" class="col-form-label"
                          >Bill To</label
                        >
                        <select class="form-select mb-2" id="BillTo">
                          <option value="" disabled selected>MR.</option>
                          <option value="option1">DR.</option>
                          <option value="option2">JN.</option>
                          <option value="option3">MAM.</option>
                          <option value="option4">MRs.</option>
                          <option value="option4">Ms.</option>
                          <option value="option4">Sir.</option>
                          <option value="option4">Sr.</option>
                        </select>

                        <label>Payment Mode</label>
                        <select class="form-select mb-2" id="PaymentMode">
                          <option value="" disabled selected>MR.</option>
                          <option value="option1">DR.</option>
                          <option value="option2">JN.</option>
                          <option value="option3">MAM.</option>
                          <option value="option4">MRs.</option>
                          <option value="option4">Ms.</option>
                          <option value="option4">Sir.</option>
                          <option value="option4">Sr.</option>
                        </select>

                        <label for="ReservationType" class="col-form-label"
                          >Reservation Type</label
                        >
                        <select
                          id="ReservationType"
                          class="select2 form-select select2-hidden-accessible mb-2"
                          disabled=""
                          data-select2-id="select2Disabled"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <option value="1">Option1</option>
                          <option value="2" selected="" data-select2-id="10">
                            Option2
                          </option>
                          <option value="3">Option3</option>
                          <option value="4">Option4</option>
                        </select>
                      </div>
                      <div class="col-6">
                        <label class="mb-3">Type</label>
                        <div class="d-flex justify-content-between mb-3">
                          <div class="form-check">
                            <input
                              name="default-radio-1"
                              class="form-check-input"
                              type="radio"
                              value=""
                              id="defaultRadio2"
                              checked=""
                            />
                            <label class="form-check-label" for="defaultRadio2">
                              Cash/Bank
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              name="default-radio-1"
                              class="form-check-input"
                              type="radio"
                              value=""
                              id="defaultRadio2"
                              checked=""
                            />
                            <label class="form-check-label" for="defaultRadio2"
                              >City Ledger</label
                            >
                          </div>
                        </div>
                        <div>
                          <label
                            for="defaultFormControlInput"
                            class="form-label mb-3"
                            >Registration No</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="defaultFormControlInput"
                            placeholder="Registration No"
                            aria-describedby="defaultFormControlHelp"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="col-1 d-flex justify-content-center">
                  <span
                    style="border-left: 1px solid #e1e0e3; height: auto"
                  ></span>
                </div>

                <!-- source information section  -->
                <div class="col-6">
                  <h4 class="text-center fw-bold">Source Information</h4>
                  <form>
                    <div class="row">
                      <div class="col-6">
                        <label for="MarketCode" class="col-form-label"
                          >Market Code</label
                        >
                        <select class="form-select mb-2" id="MarketCode">
                          <option value="" disabled selected>-select-</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>

                        <label for="TravelAgent" class="col-form-label"
                          >Travel Agent</label
                        >
                        <div class="input-group mb-2">
                          <select class="form-select" id="TravelAgent">
                            <option selected="">-select-</option>
                            <option value="1">name 1</option>
                            <option value="2">name 2</option>
                            <option value="3">name 3</option>
                          </select>
                          <button
                            class="btn btn-outline-primary waves-effect"
                            type="button"
                          >
                            <i class="fa-solid fa-user"></i>
                          </button>
                        </div>

                        <label for="CommissionPlan" class="col-form-label"
                          >Commission Plan</label
                        >
                        <select
                          id="CommissionPlane"
                          class="select2 form-select select2-hidden-accessible mb-2"
                          disabled=""
                          data-select2-id="select2Disabled"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <option value="1">Option1</option>
                          <option value="2" selected="" data-select2-id="10">
                            -select-
                          </option>
                          <option value="3">Option3</option>
                          <option value="4">Option4</option>
                        </select>

                        <label for="Company" class="col-form-label"
                          >Company</label
                        >
                        <div class="input-group">
                          <select
                            class="form-select"
                            id="Company"
                            aria-label="Example select with button addon"
                          >
                            <option selected="">-select-</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                          <button
                            class="btn btn-outline-primary waves-effect"
                            type="button"
                          >
                            <i class="fa-solid fa-building"></i>
                          </button>
                        </div>
                      </div>

                      <div class="col-6">
                        <label for="BusinessSource" class="col-form-label"
                          >Business Source</label
                        >
                        <select
                          id="BusinessSource"
                          class="select2 form-select select2-hidden-accessible mb-3"
                          disabled=""
                          data-select2-id="select2Disabled"
                          tabindex="-1"
                          aria-hidden="true"
                        >
                          <option value="1">Option1</option>
                          <option value="2" selected="" data-select2-id="10">
                            Option2
                          </option>
                          <option value="3">Option3</option>
                          <option value="4">Option4</option>
                        </select>
                        <div>
                          <label for="VoucherNO" class="form-label"
                            >Voucher No.</label
                          >
                          <input
                            type="text"
                            class="form-control mb-3"
                            id="VoucherNO"
                            placeholder="VoucherNO"
                            aria-describedby="defaultFormControlHelp"
                          />
                        </div>
                        <label for="PlanValue" class="col-form-label"
                          >Plan Value</label
                        >
                        <div class="input-group mb-2">
                          <input
                            id="PlanValue"
                            type="text"
                            class="form-control"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            disabled
                            input
                          />
                          <button
                            class="btn btn-outline-primary waves-effect"
                            type="button"
                            id="valueIcon"
                          >
                            <i class="fa-solid fa-sterling-sign"></i>
                          </button>
                        </div>

                        <label for="SalesPerson" class="col-form-label"
                          >Sales Person</label
                        >
                        <select class="form-select" id="SalesPerson">
                          <option value="" disabled selected>-select-</option>
                          <option value="option1">item</option>
                          <option value="option2">item</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="bottom d-flex justify-content-between col-6">
                <button
                  type="button"
                  class="btn btn-outline-primary waves-effect"
                >
                  Send Email
                </button>
                <div class="form-check mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck3"
                    checked=""
                  />
                  <label class="form-check-label" for="defaultCheck3">
                    Checked
                  </label>
                </div>
                <select id="MarketCode" class="form-select w-25">
                  <option value="" disabled="disabled" selected="selected">
                    -select-
                  </option>
                  <option value="option1">item</option>
                  <option value="option2">item</option>
                </select>
                <div class="d-flex mt-2">
                  <div class="form-check me-3">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck3"
                      checked=""
                    />
                    <label class="form-check-label" for="defaultCheck3">
                      Supress Rate on GR Card
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="defaultCheck3"
                      checked=""
                    />
                    <label class="form-check-label" for="defaultCheck3">
                      Access Guest Portal
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-outline-primary waves-effect"
                  disabled
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <!-- Guest Details  -->
          <div
            class="tab-pane fade"
            id="form-tabs-GuestDetails"
            role="tabpanel"
          >
            <div class="row">
              <div class="col-3">
                <div class="d-flex justify-content-between">
                  <h6>Guest</h6>
                  <div>
                    <button
                      type="button"
                      class="btn btn-outline-primary waves-effect mb-2"
                    >
                      <i class="fa-solid fa-user"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-primary waves-effect mb-2"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
                <hr />
              </div>

              <div class="col-1 d-flex align-items-stretch">
                <div
                  style="
                    border-left: 2px solid #e1e0e3;
                    height: auto;
                  "
                ></div>
              </div>

              <div class="col-8">
                <form id="formGustInfo">
            <div class="row p-3 mb-5">
              <div class="col-md-6">
                <div class="row">
                  <div div class="col-md-4">
                    <DropzoneComponent id="dropzone1" />
                  </div>
                  <div class="col-md-8">
                    <div class="mb-3">
                      <label for="formGustInfoName" class="col-form-label">
                        Name</label>
                      <div class="input-group">
                        <select class="form-select" id="formGustInfoName">
                          <option value="" disabled selected>MR</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                        <input type="text" class="form-control w-50" aria-label="Text input with select list" id="formGustInfoName" />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="formGustInfoEmail" class="form-label">Email
                      </label>
                      <input type="email" class="form-control" id="formGustInfoEmail" placeholder="Use comma to add multiple Email Ids" aria-label="input email to Gust Email" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoPhone" class="col-form-label">Phone</label>
                      <input class="form-control" type="tel" value="Phone" id="formGustInfoPhone" aria-label="input tel to Gust Phone" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="formGustInfoMobile" class="col-form-label">Mobile</label>
                      <input class="form-control" type="tel" value="Mobile" id="formGustInfoMobile" aria-label="input tel to Gust Mobile" />
                    </div>
                  </div>
                </div>
                <div class="mb-0">
                  <label class="d-block form-label mb-3">Gender</label>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-check mb-2">
                        <input type="radio" id="formGustInfoMale" name="formGustInfoGender" class="form-check-input" aria-label="input radio to Gust Gender Male" />
                        <label class="form-check-label" for="formGustInfoMale">Male</label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-check">
                        <input type="radio" id="formGustInfoFemale" name="formGustInfoGender" class="form-check-input" aria-label="input radio to Gust Gender Female" />
                        <label class="form-check-label" for="formGustInfoFemale">Female</label>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-check">
                        <input type="radio" id="formGustInfoOther" name="formGustInfoGender" class="form-check-input" aria-label="input radio to Gust Gender Other" />
                        <label class="form-check-label" for="formGustInfoOther">Other</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-7">
                <label for="formGustInfoAddress" class="col-form-label">Address</label>
                <input class="form-control" type="text" id="formGustInfoAddress" placeholder="Address" aria-label="input Text to Gust Address" />
              </div>
              <div class="row">
                <div class="col-md-3">
                  <label for="countryGuest" class="col-form-label">Country</label>
                  <input class="form-control" type="text" id="countryGuest" placeholder="country" aria-label="input Text to Gust country" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoState" class="col-form-label">State</label>
                  <input class="form-control" type="text" id="formGustInfoState" placeholder="state" aria-label="input Text to Gust state" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoCity" class="col-form-label">City</label>
                  <input class="form-control" type="text" id="formGustInfoCity" placeholder="city" aria-label="input Text to Gust city" />
                </div>
                <div class="col-md-3">
                  <label for="formGustInfoZip" class="col-form-label">Zip</label>
                  <input class="form-control" type="text" id="formGustInfoZip" placeholder="Zip" aria-label="input Text to Gust Zip" />
                </div>
              </div>
            </div>

            <!-- other information -->
            <div class="accordion mt-3" id="accordionExample">
              <div class="card accordion-item active">
                <h2 class="accordion-header" id="headingOne">
                  <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">
                    Other Information
                  </button>
                </h2>

                <div id="accordionOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                  <!-- Identity Information -->
                  <div class="row accordion-body">
                    <div class="col-12 mb-3">Identity Information</div>

                    <div class="row p-3 mb-2">
                      <div class="col-md-6">
                        <div class="row">
                          <div div class="col-md-4">
                            <DropzoneComponent id="dropzone2" />
                          </div>
                          <div class="col-md-8">
                            <div class="mb-3">
                              <label for="formIdentityInfoId" class="col-form-label">ID Number</label>
                              <input class="form-control" type="text" id="formIdentityInfoId" placeholder="Enter ID Number" aria-label="Enter ID Number Guest" />
                            </div>
                            <div class="mb-3">
                              <label for="formGustIssuingCountry" class="col-form-label">Issuing Country</label>
                              <select class="form-select" id="formGustIssuingCountry" aria-label="select Issuing Country">
                                <option value="" disabled selected>
                                  Select option
                                </option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                                <option value="option4">Option 4</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label for="formGustIdentityIdType" class="col-form-label">ID Type</label>
                              <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                                <option value="" disabled selected>
                                  Select option
                                </option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                                <option value="option4">Option 4</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="mb-0">
                          <div class="row">
                            <div class="col-md-6">
                              <div class="mb-2">
                                <label for="formGustIssuingCity" class="col-form-label">Issuing City</label>
                                <input class="form-control" type="text" id="formGustIssuingCity" placeholder="City" aria-label="Enter Issuing City" />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <label for="flatpickr-date-04" class="col-form-label">Expiry Date</label>
                              <input type="text" class="form-control" placeholder="YYYY-MM-D " id="flatpickr-date-04" ref="datePicker4" aria-label="input Text to Expiry Date" />
                              <i class="fa-solid fa-calendar-days icon-date top"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Payment Method -->

                    <div class="col-12 mb-3">Payment Method</div>
                    <div class="row mb-3">
                      <div class="col-md-3">
                        <label for="PaymentMethod" class="col-form-label">Payment Method</label>
                        <select class="form-select" id="formGustPaymentMethod" aria-label="select Payment Method">
                          <option value="" disabled selected>
                            Select option
                          </option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="DirectBilling" class="col-form-label">Direct Billing A/C</label>
                        <select class="form-select" id="formGustDirectBilling" aria-label="select Direct Billing A/C">
                          <option value="" disabled selected>
                            Select option
                          </option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                      </div>
                    </div>
                    <!-- Personal Information part 1 -->
                    <div class="col-12 mb-3">Personal Information</div>
                    <div class="row mb-3">
                      <div class="col-md-3">
                        <label for="formGustPersonalInfoBirth " class="col-form-label">Birth Date</label>
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-05" ref="datePicker5" aria-label="input Text to Birth Date" />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="BirthCountry" class="col-form-label">Birth Country</label>
                        <select class="form-select" id="formGustBirthCountry" aria-label="select Birth Country">
                          <option value="" disabled selected>
                            Select option
                          </option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="NationalityGuest" class="col-form-label">Nationality</label>
                        <select class="form-select" id="formGustNationality" aria-label="select Nationality">
                          <option value="" disabled selected>
                            Select option
                          </option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="VIPGuest" class="col-form-label">VIP Status</label>
                        <select class="form-select" id="formGustVIP" aria-label="select VIP">
                          <option value="" disabled selected>
                            Select option
                          </option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                          <option value="option4">Option 4</option>
                        </select>
                      </div>
                    </div>
                    <!-- Personal Information part 2 -->

                    <div class="row">
                      <div class="col-md-3">
                        <label for="formGustSpouseBirth" class="col-form-label">Spouse Birth Date</label>
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-06" ref="datePicker6" aria-label="input Text to Spouse Birth Date" />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="flatpickr-date-07" class="col-form-label">Wedding Anniversary</label>
                        <input type="text" class="form-control flatpickr-input" placeholder="Select Date" id="flatpickr-date-07" ref="datePicker7" aria-label="input Text to Wedding Anniversary" />
                        <i class="fa-solid fa-calendar-days icon-date top"></i>
                      </div>
                      <div class="col-md-3">
                        <label for="formGustRegistration" class="col-form-label">Registration No</label>
                        <input class="form-control" type="text" id="formGustRegistration" placeholder="Registration No" aria-label="input Text to Gust Registration" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="scbuttons gap-2 d-flex justify-content-end">
              <button @click="$emit('close-sidebar')" class="btn btn-secondary waves-effect waves-light">
                Close
              </button>
              <button type="submit" class="btn btn-primary waves-effect waves-light">
                Save
              </button>
            </div>
          </form>
              </div>
            </div>
          </div>
          <!-- Room Charges  -->
          <div class="tab-pane fade" id="form-tabs-RoomCharges" role="tabpanel">
            <div class="d-flex">
              <button
                type="button"
                class="btn btn-outline-primary waves-effect mb-2 me-3"
              >
                Update Details
              </button>
              <button
                type="button"
                class="btn btn-outline-primary waves-effect mb-2"
              >
                Apply Discount
              </button>
            </div>

            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead class="table-light">
                  <tr>
                    <th>Stay</th>
                    <th>Room</th>
                    <th>Rate Type</th>
                    <th>Pax(A/C)</th>
                    <th>Charge</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Adjustment</th>
                    <th>Net Amount</th>
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0"></tbody>
              </table>
            </div>
          </div>
          <!--Credit Card  -->
          <div class="tab-pane fade" id="form-tabs-CreditCard" role="tabpanel">
            <button
              type="button"
              class="btn btn-outline-primary waves-effect mb-2"
            >
              Add Card
            </button>
            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead class="table-light">
                  <tr>
                    <th>Card Number</th>
                    <th>Card Type</th>
                    <th>Format</th>
                    <th>Room</th>
                    <th>Name</th>
                    <th>Expiry Date</th>
                    <th>VCC Balance</th>
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0"></tbody>
              </table>
            </div>
          </div>
          <!-- Audit Trail  -->
          <div class="tab-pane fade" id="form-tabs-AuditTrail" role="tabpanel">
            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead class="table-light">
                  <tr>
                    <th>Date/Time</th>
                    <th>Logs</th>
                    <th>User</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0"></tbody>
              </table>
            </div>
          </div>
        </template>
      </HeaderReservation>
    </div>
  </div>
</template>

<script>
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";

export default {
  name: "edits",
  layout: "main",
  components: {
    HeaderReservation,
  },
};
</script>

<style></style>
