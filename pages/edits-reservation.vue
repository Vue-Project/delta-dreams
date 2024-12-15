<template>
  <div class="row mx-auto my-3">
    <div class="col-md-12">
      <div class="card mb-3 p-3">
        <div v-if="card">
          <div class="row">
            <div class="col">
              <div class="me-2 py-2 d-flex">
                <NuxtLink to="/reservations-data"><i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d; float: left; font-size: 20px"></i>
                </NuxtLink>
                <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                {{ card.guestName }}
                <small class="text-muted">
                  <i class="fa-solid fa-person pr-2"></i>{{ card.adults }}
                  <i class="fa-solid fa-child pr-2"></i>{{ card.children }}</small>
              </div>
            </div>
            <div class="col">
              <div class="me-2">
                <h6>Arrival Date</h6>
                <small class="text-muted">{{ card.arrivalDate }} {{ card.arrivalTime }}</small>
              </div>
            </div>
            <div class="col">
              <div class="me-2">
                <h6>Booking Date</h6>
                <small class="text-muted">{{ card.bookingDate }} {{ card.bookingTime }}</small>
              </div>
            </div>
            <div class="col">
              <div class="me-2">
                <h6>Room Number/Room Type</h6>
                <small class="text-muted">{{ card.roomNumber }}/{{ card.roomType }}</small>
              </div>
            </div>
            <div class="col">
              <div class="me-2">
                <h6>Nights</h6>
                <small class="text-muted">{{ card.nights }}</small>
              </div>
            </div>
            <div class="col">
              <div class="me-2">
                <h6>Reservation Number</h6>
                <small class="text-muted">{{ card.reservationNo }}</small>
              </div>
            </div>
            <div class="col">
              <div class="me-2">
                <h6>Status</h6>
                <small class="text-muted badge bg-label-danger">{{
                  card.status
                  }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeaderReservation>
      <template #button>
        <li class="nav-item" role="presentation">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#form-tabs-FolioOperation" role="tab" aria-selected="false" tabindex="-1">
            Folio Operations
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-BookingDetails" role="tab" aria-selected="false" tabindex="-1">
            Booking Details
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-GuestDetails" role="tab" aria-selected="true">
            Guest Details
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-RoomCharges" role="tab" aria-selected="true">
            Room Charges
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-CreditCard" role="tab" aria-selected="true">
            Credit Card
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-AuditTrail" role="tab" aria-selected="true">
            Audit Trail
          </button>
        </li>
        <div class="btn-group ms-auto">
          <button type="button" class="btn btn-outline-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
            print/Send
          </button>
          <ul class="dropdown-menu" style="">
            <li>
              <a class="dropdown-item" href="#;">Print invoice</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Send invoice</a>
            </li>
          </ul>

          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" :style="{ width: sidebarWidth }">
            <div class="offcanvas-header">
              <h5 id="offcanvasEndLabel" class="offcanvas-title">
                {{ offcanvasTitle }}
              </h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr />
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
              <div v-if="currentContent === 'payment'">
                <h1>Add Payment</h1>
                <p>Content for adding payment.</p>
              </div>
              <div v-if="currentContent === 'charges'">
                <h1>Add Charges</h1>
                <p>Content for adding charges.</p>
              </div>
              <div v-if="currentContent === 'discount'">
                <h1>Apply Discount</h1>
                <p>Content for applying discount.</p>
              </div>
              <div v-if="currentContent === 'operation'">
                <h1>Folio Operation</h1>
                <p>Content for folio operation.</p>
              </div>

              <div v-if="currentContent === 'addcard'">
                <AddCard />
              </div>
              <div v-if="currentContent === 'updatedetails'">
                <UpdateDetails />
              </div>
              <div v-if="currentContent === 'applydiscount'">
                <ApplyDiscount />
              </div>

              <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 0">
                <button class="btn btn-secondary" data-bs-dismiss="offcanvas">
                  Close
                </button>
                <button class="btn btn-primary">{{ dynamicButtonText }}</button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <!-- Folio Operation  -->
        <div class="tab-pane fade active show" id="form-tabs-FolioOperation" role="tabpanel">
          <div class="row">
            <div class="col-3 p-0" style="border-right: 1px solid #e1e0e3">
              <div class="d-flex justify-content-between">
                <h6>Room/Folio</h6>
                <button type="button" class="btn btn-outline-primary waves-effect mb-2 me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('payment', 'Add Payment')">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <hr class="m-0" />
            </div>

            <div class="col-9">
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('payment', 'Add Payment')">
                    Add payment
                  </button>

                  <button type="button" class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('charges', 'Add Charges')">
                    Add Charges
                  </button>

                  <button type="button" class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('discount', 'Apply Discount')">
                    Apply Discount
                  </button>

                  <button type="button" class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('operation', 'Folio Operation')">
                    Folio Operation
                  </button>
                </div>
              </div>
              <hr class="m-0" />
            </div>
          </div>
        </div>
        <!-- Booking Details  -->
        <div class="tab-pane fade" id="form-tabs-BookingDetails" role="tabpanel">
          <div class="row">
            <!-- inside tabs  -->
            <div class="col-12">
              <!-- header  -->
              <div class="card-header pt-2">
                <ul class="nav nav-tabs card-header-tabs justify-content-end" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#form-tabs-Remark" role="tab" aria-selected="false" tabindex="-1">
                      <span>Remark</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Task" role="tab" aria-selected="false" tabindex="-1">
                      <span>Task</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Message" role="tab" aria-selected="true">
                      <span>Message</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Preference" role="tab" aria-selected="true">
                      <span>Preference</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                </ul>
              </div>

              <!-- content  -->
              <div class="tab-content d-none">
                <!-- remark  -->
                <div class="tab-pane fade active show" id="form-tabs-Remark" role="tabpanel">
                  <div class="d-flex">
                    <i class="fa-solid fa-chevron-left mt-1 me-3"></i>
                    <p>Remarks</p>
                  </div>
                  <hr class="m-0 text-secondary" />
                  <table class="table">
                    <thead class="table-light">
                      <tr>
                        <th>Type</th>
                        <th>Description</th>
                        <th>User</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <td></td>
                    </tbody>
                  </table>
                </div>
                <!-- task  -->
                <div class="tab-pane fade" id="form-tabs-Task" role="tabpanel">
                  <div class="d-flex">
                    <i class="fa-solid fa-chevron-left mt-1 me-3"></i>
                    <p>Tasks</p>
                  </div>
                  <hr class="m-0 text-secondary" />
                  <table class="table">
                    <thead class="table-light">
                      <tr>
                        <th>Task</th>
                        <th>Task For</th>
                        <th>Room</th>
                        <th>Alert</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <td></td>
                    </tbody>
                  </table>
                </div>
                <!-- message  -->
                <div class="tab-pane fade" id="form-tabs-Message" role="tabpanel">
                  <div class="d-flex">
                    <i class="fa-solid fa-chevron-left mt-1 me-3"></i>
                    <p>Messages</p>
                  </div>
                  <hr class="m-0 text-secondary" />
                  <table class="table">
                    <thead class="table-light">
                      <tr>
                        <th class="w-50">Message</th>
                        <th>Guest Name</th>
                        <th>Room</th>
                        <th>status</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <td></td>
                    </tbody>
                  </table>
                </div>
                <!-- pereference  -->
                <div class="tab-pane fade" id="form-tabs-Preference" role="tabpanel">
                  <div class="d-flex">
                    <i class="fa-solid fa-chevron-left mt-1 me-3"></i>
                    <p>Preferences</p>
                  </div>
                  <hr class="m-0 text-secondary" />
                  <table class="table">
                    <thead class="table-light">
                      <tr>
                        <th class="w-50">Preference</th>
                        <th>room</th>
                        <th>Preference Type</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      <td></td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <hr />

            <div class="row" style="height: 60vh">
              <!-- Billing imformation section  -->
              <div class="col-5">
                <h4 class="text-center fw-bold">Billing Information</h4>
                <form>
                  <div class="row">
                    <div class="col-6">
                      <label for="BillTo" class="col-form-label">Bill To</label>
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

                      <label for="ReservationType" class="col-form-label">Reservation Type</label>
                      <select id="ReservationType" class="select2 form-select select2-hidden-accessible mb-2" disabled="" data-select2-id="select2Disabled" tabindex="-1" aria-hidden="true">
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
                          <input name="default-radio-1" class="form-check-input" type="radio" value="" id="defaultRadio2" checked="" />
                          <label class="form-check-label" for="defaultRadio2">
                            Cash/Bank
                          </label>
                        </div>
                        <div class="form-check">
                          <input name="default-radio-1" class="form-check-input" type="radio" value="" id="defaultRadio2" checked="" />
                          <label class="form-check-label" for="defaultRadio2">City Ledger</label>
                        </div>
                      </div>
                      <div>
                        <label for="defaultFormControlInput" class="form-label mb-3">Registration No</label>
                        <input type="text" class="form-control" id="defaultFormControlInput" placeholder="Registration No" aria-describedby="defaultFormControlHelp" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <!-- horizintal line  -->
              <div class="col-1 d-flex justify-content-center">
                <span style="border-left: 1px solid #e1e0e3; height: auto"></span>
              </div>

              <!-- source information section  -->
              <div class="col-6">
                <h4 class="text-center fw-bold">Source Information</h4>
                <form>
                  <div class="row">
                    <div class="col-6">
                      <label for="MarketCode" class="col-form-label">Market Code</label>
                      <select class="form-select mb-2" id="MarketCode">
                        <option value="" disabled selected>-select-</option>
                        <option value="option1">item</option>
                        <option value="option2">item</option>
                      </select>

                      <label for="TravelAgent" class="col-form-label">Travel Agent</label>
                      <div class="input-group mb-2">
                        <select class="form-select" id="TravelAgent">
                          <option selected="">-select-</option>
                          <option value="1">name 1</option>
                          <option value="2">name 2</option>
                          <option value="3">name 3</option>
                        </select>
                        <button class="btn btn-outline-primary waves-effect" type="button" @click="toggleSidebar('sidebar2')">
                          <i class="fa-solid fa-user"></i>
                        </button>
                      </div>
                      <!--sidebartest -->
                      <Side :isSidebarOpen="activeSidebar === 'sidebar2'" @close-sidebar="toggleSidebar('sidebar2')" :width="'50%'">
                        <template #SidebarContent>
                          <h4 class="p-1">Travel Agent</h4>
                          <hr my-2 />
                          <div class="row px-2">
                            <div class="col">
                              <div>
                                <label for="AgentName" class="form-label">Agent Name</label>
                                <input type="text" class="form-control mb-3" id="AgentName" placeholder="Agent Name" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <label for="ContactPerson" class="form-label">Contact Person</label>
                              <div class="input-group">
                                <button class="btn btn-outline-secondary dropdown-toggle waves-effect" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Mr.
                                </button>
                                <ul class="dropdown-menu" style="">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">DR.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Jn.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mam.</a>
                                  </li>
                                  <li>
                                    <hr class="dropdown-divider" />
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mr.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mrs.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Ms.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Sir.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Sr.</a>
                                  </li>
                                </ul>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Contact Person" />
                              </div>
                            </div>
                            <div class="col">
                              <div class="form-check mt-4">
                                <input type="checkbox" value="" id="defaultCheck5" checked="checked" class="form-check-input" />
                                <label for="defaultCheck5" class="form-check-label">
                                  Create User
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="row px-2">
                            <div class="col">
                              <div>
                                <label for="AgentEmail" class="form-label">Email</label>
                                <input type="email" class="form-control mb-3" id="AgentEmail" placeholder="Email" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="AgentPhone" class="form-label">Phone</label>
                                <input type="text" class="form-control mb-3" id="AgentPhone" placeholder="Phone" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="AgentMobile" class="form-label">Mobile</label>
                                <input type="text" class="form-control mb-3" id="AgentMobile" placeholder="Mobile" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="ShortCode" class="form-label">Short Code</label>
                                <input type="text" class="form-control mb-3" id="ShortCode" placeholder="ShortCode" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                          </div>
                          <h5 class="fw-b p-1">Account Details</h5>
                          <div class="row px-2">
                            <div class="col-3">
                              <div>
                                <label for="RegistrationNo" class="form-label">Registration No</label>
                                <input type="text" class="form-control mb-3" id="RegistrationNo" placeholder="Registration No" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-3">
                              <div>
                                <label for="TaxID" class="form-label">Tax ID</label>
                                <input type="text" class="form-control mb-3" id="TaxID" placeholder="Tax ID" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-6"></div>
                          </div>
                          <div class="row px-2">
                            <div class="col-3">
                              <div>
                                <label for="OpeningBalance" class="form-label">Opening Balance</label>
                                <div class="input-group">
                                  <button class="btn btn-outline-secondary waves-effect" type="button" id="OpeningBalance">
                                    <i class="fa-solid fa-sterling-sign"></i>
                                  </button>
                                  <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                              </div>
                            </div>
                            <div class="col-3">
                              <div>
                                <label for="CreditLimit" class="form-label">Credit Limit</label>
                                <div class="input-group">
                                  <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                    <i class="fa-solid fa-sterling-sign"></i>
                                  </button>
                                  <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                              </div>
                            </div>
                            <div class="col-6"></div>
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
                                    <div class="row">
                                      <div class="col-md-3">
                                        <label for="formGustIdentityIdType" class="col-form-label">Gender</label>
                                        <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                                          <option value="" disabled selected>
                                            -Select-
                                          </option>
                                          <option value="option1">Male</option>
                                          <option value="option2">
                                            Female
                                          </option>
                                          <option value="option3">Other</option>
                                        </select>
                                      </div>
                                      <div class="col-md-3">
                                        <label for="CreditLimit" class="form-label">Credit Limit</label>
                                        <div class="input-group">
                                          <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                          <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                            <i class="fa-solid fa-sterling-sign"></i>
                                          </button>
                                        </div>
                                      </div>
                                      <div class="col-md-3">
                                        <label for="CreditLimit" class="form-label">Credit Limit</label>
                                        <div class="input-group">
                                          <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                          <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                            <i class="fa-solid fa-sterling-sign"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-7">
                                      <label for="addressGuest" class="col-form-label">Address</label>
                                      <input class="form-control" type="text" id="addressGuest" placeholder="Address" />
                                    </div>
                                    <div class="row">
                                      <div class="col-md-3">
                                        <label for="countryGuest" class="col-form-label">Country</label>
                                        <input class="form-control" type="text" id="countryGuest" placeholder="country" />
                                      </div>
                                      <div class="col-md-3">
                                        <label for="stateGuest" class="col-form-label">State</label>
                                        <input class="form-control" type="text" id="stateGuest" placeholder="state" />
                                      </div>
                                      <div class="col-md-3">
                                        <label for="cityGuest" class="col-form-label">City</label>
                                        <input class="form-control" type="text" id="cityGuest" placeholder="city" />
                                      </div>
                                      <div class="col-md-3">
                                        <label for="ZipGuest" class="col-form-label">Zip</label>
                                        <input class="form-control" type="text" id="ZipGuest" placeholder="Zip" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </Side>

                      <label for="CommissionPlan" class="col-form-label">Commission Plan</label>
                      <select id="CommissionPlane" class="select2 form-select select2-hidden-accessible mb-2" disabled="" data-select2-id="select2Disabled" tabindex="-1" aria-hidden="true">
                        <option value="1">Option1</option>
                        <option value="2" selected="" data-select2-id="10">
                          -select-
                        </option>
                        <option value="3">Option3</option>
                        <option value="4">Option4</option>
                      </select>

                      <label for="Company" class="col-form-label">Company</label>
                      <div class="input-group">
                        <select class="form-select" id="Company" aria-label="Example select with button addon">
                          <option selected="">-select-</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                        <button class="btn btn-outline-primary waves-effect" type="button" @click="toggleSidebar('sidebar1')">
                          <i class="fa-solid fa-building"></i>
                        </button>
                      </div>
                      <Side :isSidebarOpen="activeSidebar === 'sidebar1'" @close-sidebar="toggleSidebar('sidebar1')" :width="'50%'">
                        <template #SidebarContent>
                          <h4 class="p-1">Add Company</h4>
                          <hr my-2 />
                          <div class="row px-2">
                            <div class="col">
                              <label for="AgentName" class="form-label">Agent Name</label>
                              <input type="text" class="form-control mb-3" id="AgentName" placeholder="Agent Name" aria-describedby="defaultFormControlHelp" />
                            </div>
                            <div class="col">
                              <label for="ContactPerson" class="form-label">Contact Person</label>
                              <div class="input-group">
                                <button class="btn btn-outline-secondary dropdown-toggle waves-effect" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Mr.
                                </button>
                                <ul class="dropdown-menu" style="">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">DR.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Jn.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mam.</a>
                                  </li>
                                  <li>
                                    <hr class="dropdown-divider" />
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mr.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mrs.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Ms.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Sir.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Sr.</a>
                                  </li>
                                </ul>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Contact Person" />
                              </div>
                            </div>
                            <div class="col">
                              <div class="form-check mt-4">
                                <input type="checkbox" value="" id="defaultCheck5" checked="checked" class="form-check-input" />
                                <label for="defaultCheck5" class="form-check-label">
                                  Create User
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="row px-2">
                            <div class="col">
                              <div>
                                <label for="AgentEmail" class="form-label">Email</label>
                                <input type="email" class="form-control mb-3" id="AgentEmail" placeholder="Email" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="AgentPhone" class="form-label">Phone</label>
                                <input type="text" class="form-control mb-3" id="AgentPhone" placeholder="Phone" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="AgentMobile" class="form-label">Mobile</label>
                                <input type="text" class="form-control mb-3" id="AgentMobile" placeholder="Mobile" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="ShortCode" class="form-label">Short Code</label>
                                <input type="text" class="form-control mb-3" id="ShortCode" placeholder="ShortCode" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                          </div>
                          <h5 class="fw-b p-1">Account Details</h5>
                          <div class="row px-2">
                            <div class="col-3">
                              <div>
                                <label for="RegistrationNo" class="form-label">Registration No</label>
                                <input type="text" class="form-control mb-3" id="RegistrationNo" placeholder="Registration No" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-3">
                              <div>
                                <label for="TaxID" class="form-label">Tax ID</label>
                                <input type="text" class="form-control mb-3" id="TaxID" placeholder="Tax ID" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-6"></div>
                          </div>
                          <div class="row px-2">
                            <div class="col-3">
                              <div>
                                <label for="OpeningBalance" class="form-label">Opening Balance</label>
                                <div class="input-group">
                                  <button class="btn btn-outline-secondary waves-effect" type="button" id="OpeningBalance">
                                    <i class="fa-solid fa-sterling-sign"></i>
                                  </button>
                                  <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                              </div>
                            </div>
                            <div class="col-3">
                              <div>
                                <label for="CreditLimit" class="form-label">Credit Limit</label>
                                <div class="input-group">
                                  <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                    <i class="fa-solid fa-sterling-sign"></i>
                                  </button>
                                  <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                              </div>
                            </div>
                            <div class="col-6"></div>
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
                                    <div class="row">
                                      <div class="col-md-3">
                                        <label for="formGustIdentityIdType" class="col-form-label">Gender</label>
                                        <select class="form-select" id="formGustIdentityIdType" aria-label="select ID Type">
                                          <option value="" disabled selected>
                                            -Select-
                                          </option>
                                          <option value="option1">Male</option>
                                          <option value="option2">
                                            Female
                                          </option>
                                          <option value="option3">Other</option>
                                        </select>
                                      </div>
                                      <div class="col-md-3">
                                        <label for="CreditLimit" class="form-label">Credit Limit</label>
                                        <div class="input-group">
                                          <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                          <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                            <i class="fa-solid fa-sterling-sign"></i>
                                          </button>
                                        </div>
                                      </div>
                                      <div class="col-md-3">
                                        <label for="CreditLimit" class="form-label">Credit Limit</label>
                                        <div class="input-group">
                                          <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                          <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                            <i class="fa-solid fa-sterling-sign"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-md-7">
                                      <label for="addressGuest" class="col-form-label">Address</label>
                                      <input class="form-control" type="text" id="addressGuest" placeholder="Address" />
                                    </div>
                                    <div class="row">
                                      <div class="col-md-3">
                                        <label for="countryGuest" class="col-form-label">Country</label>
                                        <input class="form-control" type="text" id="countryGuest" placeholder="country" />
                                      </div>
                                      <div class="col-md-3">
                                        <label for="stateGuest" class="col-form-label">State</label>
                                        <input class="form-control" type="text" id="stateGuest" placeholder="state" />
                                      </div>
                                      <div class="col-md-3">
                                        <label for="cityGuest" class="col-form-label">City</label>
                                        <input class="form-control" type="text" id="cityGuest" placeholder="city" />
                                      </div>
                                      <div class="col-md-3">
                                        <label for="ZipGuest" class="col-form-label">Zip</label>
                                        <input class="form-control" type="text" id="ZipGuest" placeholder="Zip" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                      </Side>

                      <Side :isSidebarOpen="activeSidebar === 'sidebar1'" @close-sidebar="toggleSidebar('sidebar1')" :width="'50%'">
                        <template #SidebarContent>
                          <h4 class="p-1">Add Company</h4>
                          <hr my-2 />
                          <div class="row px-2">
                            <div class="col">
                              <label for="AgentName" class="form-label">Agent Name</label>
                              <input type="text" class="form-control mb-3" id="AgentName" placeholder="Agent Name" aria-describedby="defaultFormControlHelp" />
                            </div>
                            <div class="col">
                              <label for="ContactPerson" class="form-label">Contact Person</label>
                              <div class="input-group">
                                <button class="btn btn-outline-secondary dropdown-toggle waves-effect" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  Mr.
                                </button>
                                <ul class="dropdown-menu" style="">
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">DR.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Jn.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mam.</a>
                                  </li>
                                  <li>
                                    <hr class="dropdown-divider" />
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mr.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Mrs.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Ms.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Sir.</a>
                                  </li>
                                  <li>
                                    <a class="dropdown-item" href="javascript:void(0);">Sr.</a>
                                  </li>
                                </ul>
                                <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Contact Person" />
                              </div>
                            </div>
                            <div class="col">
                              <div class="form-check mt-4">
                                <input type="checkbox" value="" id="defaultCheck5" checked="checked" class="form-check-input" />
                                <label for="defaultCheck5" class="form-check-label">
                                  Create User
                                </label>
                              </div>
                            </div>
                          </div>
                          <div class="row px-2">
                            <div class="col">
                              <div>
                                <label for="AgentEmail" class="form-label">Email</label>
                                <input type="email" class="form-control mb-3" id="AgentEmail" placeholder="Email" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="AgentPhone" class="form-label">Phone</label>
                                <input type="text" class="form-control mb-3" id="AgentPhone" placeholder="Phone" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="AgentMobile" class="form-label">Mobile</label>
                                <input type="text" class="form-control mb-3" id="AgentMobile" placeholder="Mobile" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col">
                              <div>
                                <label for="ShortCode" class="form-label">Short Code</label>
                                <input type="text" class="form-control mb-3" id="ShortCode" placeholder="ShortCode" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                          </div>
                          <h5 class="fw-b p-1">Account Details</h5>
                          <div class="row px-2">
                            <div class="col-3">
                              <div>
                                <label for="RegistrationNo" class="form-label">Registration No</label>
                                <input type="text" class="form-control mb-3" id="RegistrationNo" placeholder="Registration No" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-3">
                              <div>
                                <label for="TaxID" class="form-label">Tax ID</label>
                                <input type="text" class="form-control mb-3" id="TaxID" placeholder="Tax ID" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-6"></div>
                          </div>
                          <div class="row px-2">
                            <div class="col-3">
                              <div>
                                <label for="OpeningBalance" class="form-label">Opening Balance</label>
                                <div class="input-group">
                                  <button class="btn btn-outline-secondary waves-effect" type="button" id="OpeningBalance">
                                    <i class="fa-solid fa-sterling-sign"></i>
                                  </button>
                                  <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                              </div>
                            </div>
                            <div class="col-3">
                              <div>
                                <label for="CreditLimit" class="form-label">Credit Limit</label>
                                <div class="input-group">
                                  <button class="btn btn-outline-secondary waves-effect" type="button" id="CreditLimit">
                                    <i class="fa-solid fa-sterling-sign"></i>
                                  </button>
                                  <input type="text" class="form-control" placeholder="0.00" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                </div>
                              </div>
                            </div>
                            <div class="col-6"></div>
                          </div>
                          <div class="row px-2">
                            <div class="col d-flex justify-content-end">
                              <button type="button" class="btn btn-outline-primary waves-effect">
                                <i class="fa-solid fa-plus me-2"></i> Add Card
                              </button>
                            </div>
                          </div>
                          <h5 class="fw-b p-1">Credit Card Details</h5>
                          <div class="row px-2">
                            <!-- Card Number Field -->
                            <div class="col-5 position-relative input-with-icon">
                              <label for="CardNumber" class="form-label">Card Number</label>
                              <div class="input-wrapper">
                                <i class="fa-regular fa-credit-card input-icon"></i>
                                <input type="text" class="form-control icon-input" id="CardNumber" placeholder="Card Number" />
                                <i class="fa-solid fa-check input-icon-right"></i>
                              </div>
                            </div>

                            <!-- Card Holder Name Field -->
                            <div class="col-5 position-relative input-with-icon">
                              <label for="CardHolderName" class="form-label">Card Holder Name</label>
                              <div class="input-wrapper">
                                <input type="text" class="form-control icon-input" id="CardHolderName" placeholder="Card Holder Name" />
                                <i class="fa-solid fa-user input-icon-right"></i>
                              </div>
                            </div>

                            <!-- Delete Icon -->
                            <div class="col-1 d-flex align-items-center justify-content-center d-none">
                              <i class="fa-solid fa-trash-can bg-danger p-2 rounded-1 text-white mt-4"></i>
                            </div>
                          </div>
                          <div class="row px-2">
                            <div class="col-5">
                              <div class="row mt-2">
                                <div class="col-6">
                                  <label for="CardHolderName" class="form-label">Expiry Date</label>
                                  <select class="form-select" id="Company" aria-label="Example select with button addon">
                                    <option selected="">-select-</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                </div>
                                <div class="col-6">
                                  <select class="form-select mt-4" id="Company" aria-label="Example select with button addon">
                                    <option selected="">-select-</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class="col-5 mt-2">
                              <label for="multicol-password" class="form-label">CVV</label>
                              <div class="input-group input-group-merge">
                                <input type="password" id="multicol-password" class="form-control" placeholder="CVV" aria-describedby="multicol-password2" />
                                <span class="input-group-text cursor-pointer" id="multicol-password2"><i class="fa-solid fa-eye-slash fs-5"></i></span>
                              </div>
                            </div>
                            <div class="col-1 d-flex align-items-center justify-content-center d-none">
                              <i class="fa-solid fa-trash-can bg-danger p-2 rounded-1 text-white mt-4"></i>
                            </div>
                          </div>
                          <h5 class="fw-b p-1 mt-4">Address</h5>
                          <div class="row px-2">
                            <div class="col-8">
                              <label for="multicol-password" class="form-label">Address</label>
                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                            </div>
                          </div>
                          <div class="row px-2 mt-3">
                            <div class="col-2">
                              <label for="Country" class="form-label">Country</label>
                              <select class="form-select" id="Country" aria-label="Example select with button addon">
                                <option selected="">-select-</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            <div class="col-2">
                              <div>
                                <label for="State" class="form-label">State</label>
                                <input type="text" class="form-control mb-3" id="State" placeholder="State" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-2">
                              <div>
                                <label for="City" class="form-label">City</label>
                                <input type="text" class="form-control mb-3" id="City" placeholder="City" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                            <div class="col-2">
                              <div>
                                <label for="Zip" class="form-label">Zip</label>
                                <input type="text" class="form-control mb-3" id="Zip" placeholder="Zip" aria-describedby="defaultFormControlHelp" />
                              </div>
                            </div>
                          </div>
                          <div class="row px-2 mt-3">
                            <div class="col-4">
                              <div class="form-check me-3">
                                <input type="checkbox" value="" id="defaultCheck3" checked="checked" class="form-check-input" />
                                <label for="defaultCheck3" class="form-check-label">
                                  Add To Business Source
                                </label>
                              </div>
                            </div>
                            <div class="col-7">
                              <div class="form-check me-3">
                                <input type="checkbox" value="" id="defaultCheck3" checked="checked" class="form-check-input" />
                                <label for="defaultCheck3" class="form-check-label">
                                  Don't count in city ledger. Consider only for
                                  stock purchase.
                                </label>
                              </div>
                            </div>
                          </div>
                        </template>
                      </Side>
                    </div>

                    <div class="col-6">
                      <label for="BusinessSource" class="col-form-label">Business Source</label>
                      <select id="BusinessSource" class="select2 form-select select2-hidden-accessible mb-3" disabled="" data-select2-id="select2Disabled" tabindex="-1" aria-hidden="true">
                        <option value="1">Option1</option>
                        <option value="2" selected="" data-select2-id="10">
                          Option2
                        </option>
                        <option value="3">Option3</option>
                        <option value="4">Option4</option>
                      </select>
                      <div>
                        <label for="VoucherNO" class="form-label">Voucher No.</label>
                        <input type="text" class="form-control mb-3" id="VoucherNO" placeholder="VoucherNO" aria-describedby="defaultFormControlHelp" />
                      </div>
                      <label for="PlanValue" class="col-form-label">Plan Value</label>
                      <div class="input-group mb-2">
                        <input id="PlanValue" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" disabled input />
                        <button class="btn btn-outline-primary waves-effect" type="button" id="valueIcon">
                          <i class="fa-solid fa-sterling-sign"></i>
                        </button>
                      </div>

                      <label for="SalesPerson" class="col-form-label">Sales Person</label>
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

          <!-- booking footer  -->
          <div class="row">
            <div class="bottom d-flex justify-content-between col-6">
              <button type="button" class="btn btn-outline-primary waves-effect">
                Send Email
              </button>

              <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" />
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
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" />
                  <label class="form-check-label" for="defaultCheck3">
                    Supress Rate on GR Card
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck3" checked="" />
                  <label class="form-check-label" for="defaultCheck3">
                    Access Guest Portal
                  </label>
                </div>
              </div>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button type="button" class="btn btn-outline-primary waves-effect" disabled>
                Save
              </button>
            </div>
          </div>
        </div>

        <!-- Guest Details  -->
        <div class="tab-pane fade" id="form-tabs-GuestDetails" role="tabpanel">
          <div class="row">
            <!-- Sidebar -->
            <div class="col-3 px-0" style="border-right: 1px solid #e1e0e3">
              <div class="d-flex justify-content-between">
                <h6>Guest</h6>
                <div v-if="activeComponent === 'DefaultContent'" class="pe-2">

                  <div class="pe-2">
                    <button type="button" class="btn btn-outline-primary waves-effect mb-2 border-0">
                      <i class="fa-solid fa-user"></i>
                    </button>
                    <button type="button" class="btn btn-outline-primary waves-effect mb-2" @click="loadComponent('NewGuest')">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <hr class="m-0" />
            </div>

            <!-- Main Content -->
            <div class="col-9">
              <component :is="activeComponent" @goBack="goBack" />
            </div>
          </div>
        </div>
        <!-- Room Charges  -->
        <div class="tab-pane fade" id="form-tabs-RoomCharges" role="tabpanel">
          <div class="d-flex">
            <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('updatedetails', 'Updatedetails')"> Update Details
            </button>
            <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('applydiscount', 'ApplyDiscount', '1200px')">
              Apply Discount
            </button>

          </div>

          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th>
                    <div class="form-check text-left">
                      <input class="form-check-input" type="checkbox" id="userManagementRead">
                      <label class="form-check-label" for="userManagementRead"> 08/12/2024 Sun </label>
                    </div>
                  </th>
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
              <tbody class="table-border-bottom-0">
                <tr>
                  <td>
                    <div class="form-check me-3 me-lg-5">
                      <input class="form-check-input" type="checkbox" id="userManagementRead">
                      <label class="form-check-label" for="userManagementRead"> 08/12/2024 Sun </label>
                    </div>
                  </td>
                  <td>252-Test</td>
                  <td> السعر شامل الافطار</td>
                  <td>1/0</td>
                  <td>100.00</td>
                  <td> 0.0</td>
                  <td>
                    0.00

                  </td>
                  <td>
                    0.00

                  </td>
                  <td>
                    100.00

                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
        <!--Credit Card  -->
        <div class="tab-pane fade" id="form-tabs-CreditCard" role="tabpanel">
          <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('addcard', 'Merchant')">
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
              <tbody>
                <tr>
                  <td>
                    <p class="fw-medium"> 14/12/2024</p>
                    <p class="fw-medium">12:23:48 PM</p>
                  </td>
                  <td>
                    <p>Amend Stay
                    </p>
                    <p>Old Stay Arrival : 02/12/2024 Departure : 07/12/2024 , New Stay Arrival : 02/12/2024 Departure : 13/12/2024 </p>
                  </td>
                  <td>
                    <p>eslam</p>
                  </td>
                  <td>
                    <p>45.240.157.99</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p class="fw-medium"> 14/12/2024</p>
                    <p class="fw-medium">12:23:48 PM</p>
                  </td>
                  <td>
                    <p>Amend Stay
                    </p>
                    <p>Old Stay Arrival : 02/12/2024 Departure : 07/12/2024 , New Stay Arrival : 02/12/2024 Departure : 13/12/2024</p>
                  </td>
                  <td>
                    <p>eslam</p>
                  </td>
                  <td>
                    <p>45.240.157.99</p>
                  </td>
                </tr>
                <tr>
                  <td>


                    <p class="fw-medium"> 14/12/2024</p>
                    <p class="fw-medium">12:23:48 PM</p>
                  </td>
                  <td>
                    <p>Amend Stay
                    </p>
                    <p>Old Stay Arrival : 02/12/2024 Departure : 07/12/2024 , New Stay Arrival : 02/12/2024 Departure : 13/12/2024

                    </p>
                  </td>

                  <td>
                    <p>eslam
                    </p>
                  </td>
                  <td>
                    <p>45.240.157.99
                    </p>

                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </template>
    </HeaderReservation>
  </div>
</template>





<script>
import flatpickrMixin from "../components/Mixin/flatpickrMixin";
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";
import SidebarReservation from "../components/AllReservation/SidebarReservation.vue";
import AddCard from "../components/SiderbarContentEdit/AddCard.vue";
import UpdateDetails from "../components/SiderbarContentEdit/UpdateDetails.vue";
import ApplyDiscount from "../components/SiderbarContentEdit/ApplyDiscount.vue";
import DefaultContent from "../components/SiderbarContentEdit/LoadingComponents/DefaultContent.vue";
import NewGuest from "../components/SiderbarContentEdit/LoadingComponents/NewGuest.vue";

export default {
  name: "EditsPage",
  layout: "main",
  components: {
    HeaderReservation,
    SidebarReservation,
    AddCard,
    UpdateDetails,
    ApplyDiscount,
    DefaultContent,
    NewGuest,
  },
  data ()
  {
    return {
      card: null,
      currentContent: null,
      offcanvasTitle: "",
      sidebarWidth: '400px',
      dynamicButtonText: 'Save',
      activeComponent: "DefaultContent",



    };
  },
  methods: {
    toggleSidebar (sidebarName)
    {
      this.activeSidebar =
        this.activeSidebar === sidebarName ? null : sidebarName;
    },

    setOffcanvasContent (content, title, width = '400px', buttonText = 'Save')
    {
      this.currentContent = content; // Set the content type
      this.offcanvasTitle = title; // Set the title for the offcanvas
      this.sidebarWidth = width; // Set the sidebar width
      this.dynamicButtonText = buttonText; // Set the button text dynamically


    },
    loadComponent (componentName)
    {
      this.activeComponent = componentName;
    },
    goBack ()
    {
      this.activeComponent = "DefaultContent";
    },

  },
  mixins: [flatpickrMixin],
  mounted ()
  {
    const cardData = this.$route.query.cardData
      ? JSON.parse(this.$route.query.cardData)
      : null;
    this.card = cardData;
  },
};
</script>

<style>
/* حقل الإدخال مع أيقونات */
/* الحقل مع الأيقونات */
.input-with-icon .icon-input {
  padding-left: 35px;
  padding-right: 35px;
  /* مساحة للأيقونة اليمنى */
  height: 40px;
  font-size: 1rem;
}

/* تصميم الحاوية */
.input-with-icon .input-wrapper {
  position: relative;
}

/* الأيقونة في البداية */
.input-with-icon .input-icon {
  position: absolute;
  left: 10px;
  /* ضعها في الجانب الأيسر */
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

/* الأيقونة في النهاية */
.input-with-icon .input-icon-right {
  position: absolute;
  right: 10px;
  /* ضعها في الجانب الأيمن */
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
  /* يمنع تفاعل المستخدم مع الأيقونة */
}

.me-2 h6 {
  margin-bottom: 5px;
}
</style>
