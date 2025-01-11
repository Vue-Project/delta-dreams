<template>
  <div>
    <div class="row p-3">
      <!-- Billing imformation section  -->
      <div class="col-5">
        <h4 class="text-center fw-bold">Billing Information</h4>
        <form>
          <div class="row">
            <div class="col-6">
              <label for="BillTo" class="col-form-label">Bill To</label>
              <select class="form-select mb-2" id="BillTo">
                <option value="" disabled selected>select</option>
                <option value="option1">Company</option>
                <option value="option2">Guest</option>
                <option value="option3">Group Owner</option>
                <option value="option3">Room and Tax to Company, Extra to Guest</option>

              </select>

              <label>Payment Mode</label>
              <select class="form-select mb-2" id="PaymentMode">
                <option value="" disabled selected>
                  Select
                </option>
                <option value="0">Cash نقدي</option>
                <option value="1">Credit Card فيزا</option>
                <option value="2">تحويل بنكي</option>
              </select>

              <label for="ReservationType" class="col-form-label">Reservation Type</label>
              <select id="ReservationType" class="select2 form-select select2-hidden-accessible mb-2" disabled="" data-select2-id="select2Disabled" tabindex="-1" aria-hidden="true">
                <option value="" disabled selected>
                  حجز موكد </option>
                <option value="2" selected="" data-select2-id="10">
                  حجز غير موكد
                </option>
                <option value="3">حجز ملغي </option>
                <option value="4">غير مسموح بالحجز</option>
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

              </select>

              <label for="TravelAgent" class="col-form-label">Travel Agent</label>
              <div class="input-group mb-2">
                <select class="form-select" id="TravelAgent">
                  <option value="" disabled selected>
                    Select
                  </option>


                  <option value="0"> عبد الله سامى
                  </option>
                  <option value="1">samh ali</option>
                  <option value="2"> MOHAMED</option>
                  <option value="4">MOHAMED ABDOUMAHMOUD</option>
                  <option value="7">جابر عبد اللطيف الحل</option>
                  <option value="5">MOHAMED owner 85959</option>
                  <option value="6">MOHAMED ABDOUMAHMOUD</option>

                </select>
                <button class="btn btn-outline-primary waves-effect" type="button" @click="setOffcanvasContent('addtravel', 'Add Travel Agent', '2000')">
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
                  <option value="" disabled selected>
                    Select
                  </option>


                  <option value="0"> عبد الله سامى
                  </option>
                  <option value="1">samh ali</option>
                  <option value="2"> MOHAMED</option>
                  <option value="4">MOHAMED ABDOUMAHMOUD</option>
                  <option value="7">جابر عبد اللطيف الحل</option>
                  <option value="5">MOHAMED owner 85959</option>
                  <option value="6">MOHAMED ABDOUMAHMOUD</option>
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


                <option value="0"> عبد الله سامى
                </option>
                <option value="1">samh ali</option>
                <option value="2"> MOHAMED</option>
                <option value="4">MOHAMED ABDOUMAHMOUD</option>
                <option value="7">جابر عبد اللطيف الحل</option>
                <option value="5">MOHAMED owner 85959</option>
                <option value="6">MOHAMED ABDOUMAHMOUD</option>
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
                </option>


                <option value="0"> عبد الله سامى
                </option>
                <option value="1">samh ali</option>
                <option value="2"> MOHAMED</option>
                <option value="4">MOHAMED ABDOUMAHMOUD</option>
                <option value="7">جابر عبد اللطيف الحل</option>
                <option value="5">MOHAMED owner 85959</option>
                <option value="6">MOHAMED ABDOUMAHMOUD</option>
              </select>
            </div>
          </div>
        </form>
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
        <select id="MarketCode" class="form-select w-25" disabled>
          <option value="" disabled="disabled" selected="selected">
            -select-
          </option>


          <option value="0"> عبد الله سامى
          </option>
          <option value="1">samh ali</option>
          <option value="2"> MOHAMED</option>
          <option value="4">MOHAMED ABDOUMAHMOUD</option>
          <option value="7">جابر عبد اللطيف الحل</option>
          <option value="5">MOHAMED owner 85959</option>
          <option value="6">MOHAMED ABDOUMAHMOUD</option>
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





</template>


<script>

export default {
  name: "DefaultContentBooking",
  layout: "component",
  // props: {
  //   setOffcanvasContent: {
  //     type: Function,
  //     required: true, // Ensure the parent passes the method
  //   },

  // }
}
</script>
