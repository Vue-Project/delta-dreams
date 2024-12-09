<template>
  <div class="row mx-auto my-3 overflow-y-auto">
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
          <div class="btn-group ms-auto">
            <button
              type="button"
              class="btn btn-primary dropdown-toggle waves-effect waves-light"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              print/Send
            </button>
            <ul class="dropdown-menu" style="">
              <li>
                <a class="dropdown-item" href="javascript:void(0);">Print invoice</a>
              </li>
              <li>
                <a class="dropdown-item" href="javascript:void(0);">Send invoice</a>
              </li>
            </ul>
          </div>
        </template>
        <template #content>
          <!-- Folio Operation  -->
          <div
            class="tab-pane fade active show"
            id="form-tabs-FolioOperation"
            role="tabpanel"
          >
            <div class="row">
              <div class="col-3 p-0" style="border-right: 1px solid #e1e0e3">
                <div class="d-flex justify-content-between">
                  <h6>Room/Folio</h6>
                  <button
                    type="button"
                    class="btn btn-outline-primary waves-effect mb-2 me-2"
                    @click="toggleSidebar('sidebar4')"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <Side
                  :isSidebarOpen="activeSidebar === 'sidebar4'"
                  @close-sidebar="toggleSidebar('sidebar4')"
                >
                  <template #SidebarContent>
                    <p>test</p>
                  </template>
                </Side>

                <hr class="m-0" />
              </div>

              <!-- <div class="col-1 d-flex align-items-stretch ">
                <div style="border-left: 2px solid #e1e0e3; height: auto"></div>
              </div> -->

              <div class="col-9">
                <div class="d-flex justify-content-between">
                  <div class="d-flex">
                    <button
                      type="button"
                      class="btn btn-outline-secondary waves-effect me-1"
                      @click="toggleSidebar('sidebar5')"
                    >
                      Add Payment
                    </button>
                    <Side
                      :isSidebarOpen="activeSidebar === 'sidebar5'"
                      @close-sidebar="toggleSidebar('sidebar5')"
                    >
                      <template #SidebarContent>
                        <p>ff</p>
                        >
                      </template>
                    </Side>

                    <button
                      type="button"
                      class="btn btn-outline-secondary waves-effect me-1"
                      @click="toggleSidebar('sidebar6')"
                    >
                      Add Charges
                    </button>
                    <Side
                      :isSidebarOpen="activeSidebar === 'sidebar6'"
                      @close-sidebar="toggleSidebar('sidebar6')"
                    >
                      <template #SidebarContent>
                        <h5>Content for Sidebar 6</h5>
                      </template>
                    </Side>

                    <button
                      type="button"
                      class="btn btn-outline-secondary waves-effect me-1"
                      @click="toggleSidebar('sidebar7')"
                    >
                      Apply Discount
                    </button>
                    <Side
                      :isSidebarOpen="activeSidebar === 'sidebar7'"
                      @close-sidebar="toggleSidebar('sidebar7')"
                    >
                      <template #SidebarContent>
                        <h5>Content for Sidebar 7</h5>
                      </template>
                    </Side>

                    <button
                      type="button"
                      class="btn btn-outline-secondary waves-effect me-1"
                      @click="toggleSidebar('sidebar8')"
                    >
                      Folio Operation
                    </button>
                    <Side
                      :isSidebarOpen="activeSidebar === 'sidebar8'"
                      @close-sidebar="toggleSidebar('sidebar8')"
                    >
                      <template #SidebarContent>
                        <h5>Content for Sidebar 8</h5>
                      </template>
                    </Side>

                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-outline-secondary dropdown-toggle waves-effect me-1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        More
                      </button>
                      <ul class="dropdown-menu" style="">
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);"
                            >Adjustment</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);"
                            >Room Charges</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);">Transfer</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);"
                            >Split Folio</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);"
                            >Upload Files</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);"
                            >Meal Plan</a
                          >
                        </li>
                        <li>
                          <a class="dropdown-item" href="javascript:void(0);"
                            >Inclusion</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="d-flex justify-content-end mt-2">
                    <span class="me-2"
                      ><i class="fa-solid fa-square me-2" style="color: #ffd43b"></i
                      >UnPosted</span
                    >
                    <span class="me-2"
                      ><i class="fa-solid fa-square me-2" style="color: #c3c6d1"></i
                      >Posted</span
                    >
                    <i class="fa-solid fa-list-ul me-2 mt-1"></i>
                    <i class="fa-solid fa-eye-slash me-2 mt-1"></i>
                    <i class="fa-solid fa-layer-group me-2 mt-1"></i>
                  </div>
                </div>
                <table
                  class="datatables-basic table dataTable no-footer dtr-column mt-3"
                  id="DataTables_Table_0"
                  aria-describedby="DataTables_Table_0_info"
                  style="height: 60vh"
                >
                  <thead>
                    <tr style="background-color: #ebedf0">
                      <th>
                        <input type="checkbox" class="form-check-input" />
                      </th>
                      <th>Day</th>
                      <th>Ref No.</th>
                      <th>Particulars</th>
                      <th>Description</th>
                      <th>User</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" class="form-check-input" />
                      </td>
                      <td>02/12/2024 Monday</td>
                      <td></td>
                      <td>Room Charges</td>
                      <td></td>
                      <td>Eslam</td>
                      <td>0.00</td>
                      <td><i class="fa-solid fa-ellipsis-vertical"></i></td>
                    </tr>
                  </tbody>
                </table>
                <hr class="m-0" />
                <div class="Foliofooter px-3" style="background-color: #ebedf0">
                  <div class="row">
                    <div class="col-7"></div>
                    <div class="col-5">
                      <div class="d-flex justify-content-between">
                        <p class="text-danger mt-2">Balance</p>
                        <p class="text-danger mt-2">0.00</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <ul
                    class="nav nav-tabs card-header-tabs justify-content-end"
                    role="tablist"
                  >
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#form-tabs-Remark"
                        role="tab"
                        aria-selected="false"
                        tabindex="-1"
                      >
                        <span>Remark</span>
                        <span
                          class="badge badge-center rounded-pill bg-label-primary ms-1"
                          >0</span
                        >
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#form-tabs-Task"
                        role="tab"
                        aria-selected="false"
                        tabindex="-1"
                      >
                        <span>Task</span>
                        <span
                          class="badge badge-center rounded-pill bg-label-primary ms-1"
                          >0</span
                        >
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#form-tabs-Message"
                        role="tab"
                        aria-selected="true"
                      >
                        <span>Message</span>
                        <span
                          class="badge badge-center rounded-pill bg-label-primary ms-1"
                          >0</span
                        >
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#form-tabs-Preference"
                        role="tab"
                        aria-selected="true"
                      >
                        <span>Preference</span>
                        <span
                          class="badge badge-center rounded-pill bg-label-primary ms-1"
                          >0</span
                        >
                      </button>
                    </li>
                  </ul>
                </div>

                <!-- content  -->
                <div class="tab-content d-none">
                  <!-- remark  -->
                  <div
                    class="tab-pane fade active show"
                    id="form-tabs-Remark"
                    role="tabpanel"
                  >
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
                  <div
                    class="tab-pane fade"
                    id="form-tabs-Task"
                    role="tabpanel"
                  >
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
                  <div
                    class="tab-pane fade"
                    id="form-tabs-Message"
                    role="tabpanel"
                  >
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
                  <div
                    class="tab-pane fade"
                    id="form-tabs-Preference"
                    role="tabpanel"
                  >
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
                          <label for="defaultFormControlInput" class="form-label mb-3"
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
                            @click="toggleSidebar('sidebar2')"
                          >
                            <i class="fa-solid fa-user"></i>
                          </button>
                        </div>
                        <Side
                          :isSidebarOpen="activeSidebar === 'sidebar2'"
                          @close-sidebar="toggleSidebar('sidebar2')"
                          :width="'50%'"
                        >
                          <template #SidebarContent>
                            <h4 class="p-1">Travel Agent</h4>
                            <hr my-2 />
                            <div class="row px-2">
                              <div class="col">
                                <div>
                                  <label for="AgentName" class="form-label"
                                    >Agent Name</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="AgentName"
                                    placeholder="Agent Name"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <label for="ContactPerson" class="form-label"
                                  >Contact Person</label
                                >
                                <div class="input-group">
                                  <button
                                    class="btn btn-outline-secondary dropdown-toggle waves-effect"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Mr.
                                  </button>
                                  <ul class="dropdown-menu" style="">
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >DR.</a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Jn.</a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Mam.</a
                                      >
                                    </li>
                                    <li>
                                      <hr class="dropdown-divider" />
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Mr.</a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Mrs.</a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Ms.</a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Sir.</a
                                      >
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        href="javascript:void(0);"
                                        >Sr.</a
                                      >
                                    </li>
                                  </ul>
                                  <input
                                    type="text"
                                    class="form-control"
                                    aria-label="Text input with dropdown button"
                                    placeholder="Contact Person"
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div class="form-check mt-4">
                                  <input
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck5"
                                    checked="checked"
                                    class="form-check-input"
                                  />
                                  <label
                                    for="defaultCheck5"
                                    class="form-check-label"
                                  >
                                    Create User
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="row px-2">
                              <div class="col">
                                <div>
                                  <label for="AgentEmail" class="form-label"
                                    >Email</label
                                  >
                                  <input
                                    type="email"
                                    class="form-control mb-3"
                                    id="AgentEmail"
                                    placeholder="Email"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div>
                                  <label for="AgentPhone" class="form-label"
                                    >Phone</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="AgentPhone"
                                    placeholder="Phone"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div>
                                  <label for="AgentMobile" class="form-label"
                                    >Mobile</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="AgentMobile"
                                    placeholder="Mobile"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                              <div class="col">
                                <div>
                                  <label for="ShortCode" class="form-label"
                                    >Short Code</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="ShortCode"
                                    placeholder="ShortCode"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                            </div>
                            <h5 class="fw-b p-1">Account Details</h5>
                            <div class="row px-2">
                              <div class="col-3">
                                <div>
                                  <label for="RegistrationNo" class="form-label"
                                    >Registration No</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="RegistrationNo"
                                    placeholder="Registration No"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                              <div class="col-3">
                                <div>
                                  <label for="TaxID" class="form-label"
                                    >Tax ID</label
                                  >
                                  <input
                                    type="text"
                                    class="form-control mb-3"
                                    id="TaxID"
                                    placeholder="Tax ID"
                                    aria-describedby="defaultFormControlHelp"
                                  />
                                </div>
                              </div>
                              <div class="col-6"></div>
                            </div>
                            <div class="row px-2">
                              <div class="col-3">
                                <div>
                                  <label for="OpeningBalance" class="form-label"
                                    >Opening Balance</label
                                  >
                                  <div class="input-group">
                                    <button
                                      class="btn btn-outline-secondary waves-effect"
                                      type="button"
                                      id="OpeningBalance"
                                    >
                                      <i class="fa-solid fa-sterling-sign"></i>
                                    </button>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="0.00"
                                      aria-label="Example text with button addon"
                                      aria-describedby="button-addon1"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-3">
                                <div>
                                  <label for="CreditLimit" class="form-label"
                                    >Credit Limit</label
                                  >
                                  <div class="input-group">
                                    <button
                                      class="btn btn-outline-secondary waves-effect"
                                      type="button"
                                      id="CreditLimit"
                                    >
                                      <i class="fa-solid fa-sterling-sign"></i>
                                    </button>
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="0.00"
                                      aria-label="Example text with button addon"
                                      aria-describedby="button-addon1"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div class="col-6"></div>
                            </div>
                          </template>
                        </Side>

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

                        <label for="Company" class="col-form-label">Company</label>
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
                            @click="toggleSidebar('sidebar1')"
                          >
                            <i class="fa-solid fa-building"></i>
                          </button>
                        </div>
                        <Side
                          :isSidebarOpen="activeSidebar === 'sidebar1'"
                          @close-sidebar="toggleSidebar('sidebar1')"
                        >
                          <template #SidebarContent>
                            <p>hil</p>
                          </template>
                        </Side>
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
                          <label for="VoucherNO" class="form-label">Voucher No.</label>
                          <input
                            type="text"
                            class="form-control mb-3"
                            id="VoucherNO"
                            placeholder="VoucherNO"
                            aria-describedby="defaultFormControlHelp"
                          />
                        </div>
                        <label for="PlanValue" class="col-form-label">Plan Value</label>
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

            <!-- booking footer  -->
            <div class="row">
              <div class="bottom d-flex justify-content-between col-6">
                <button
                  type="button"
                  class="btn btn-outline-primary waves-effect"
                >
                  Send Email
                </button>
                <Side
                  :isSidebarOpen="activeSidebar === 'sidebar3'"
                  @close-sidebar="toggleSidebar('sidebar3')"
                >
                  <template #SidebarContent>
                    <p>nljb/</p>
                  </template>
                </Side>

                <div class="form-check mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck3"
                    checked=""
                  />
                  <label class="form-check-label" for="defaultCheck3"> Checked </label>
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
          <div class="tab-pane fade" id="form-tabs-GuestDetails" role="tabpanel">
            <div class="row">
              <div class="col-3 px-0" style="border-right: 1px solid #e1e0e3">
                <div class="d-flex justify-content-between">
                  <h6>Guest</h6>
                  <div class="pe-2">
                    <button
                      type="button"
                      class="btn btn-outline-primary waves-effect mb-2 border-0"
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
                <div class="accordion mt-3" id="accordionExample">
                  <div class="card accordion-item active">
                    <h2 class="accordion-header" id="headingOne">
                      <button
                        type="button"
                        class="accordion-button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionfour"
                        aria-expanded="true"
                        aria-controls="accordionfour"
                      >
                        Suite الفندق غرفتين وصاله
                      </button>
                    </h2>

                    <div
                      id="accordionfour"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                      style=""
                    >
                      <!-- Identity Information -->
                      <div class="row accordion-body">
                        <div class="accordion mt-3" id="accordionExample">
                          <div class="card accordion-item active">
                            <h2 class="accordion-header" id="headingOne">
                              <button
                                type="button"
                                class="accordion-button"
                                data-bs-toggle="collapse"
                                data-bs-target="#accordionfour"
                                aria-expanded="true"
                                aria-controls="accordionfour"
                              >
                                105
                              </button>
                            </h2>

                            <div
                              id="accordionfour"
                              class="accordion-collapse collapse show"
                              data-bs-parent="#accordionExample"
                              style=""
                            >
                              <!-- Identity Information -->
                              <div class="row accordion-body">
                                <div>
                                  <div>
                                    <i class="fa-solid fa-hexagon -nodes"></i>Mr. مستر
                                    شريف ضيافه محمد ذكى
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="m-0" />
              </div>
              <div class="col-9">
                <form id="formGustInfo">
                  <div class="row p-3 mb-5">
                    <div class="col-md-6">
                      <div class="row">
                        <div div class="col-md-4">
                          <DropzoneComponent id="dropzone3" />
                        </div>
                        <div class="col-md-8 mb-1">
                          <div class="mb-4">
                            <label for="formGustInfoName" class="col-form-label">
                              Name</label
                            >
                            <div class="input-group">
                              <select class="form-select" id="formGustInfoName">
                                <option value="" disabled selected>MR</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                                <option value="option4">Option 4</option>
                              </select>
                              <input
                                type="text"
                                class="form-control w-50"
                                aria-label="Text input with select list"
                                id="formGustInfoName"
                              />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="formGustInfoEmail" class="form-label"
                              >Email
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="formGustInfoEmail"
                              placeholder="Use comma to add multiple Email Ids"
                              aria-label="input email to Gust Email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="row">
                        <!-- Phone Field (Half width) -->
                        <div class="col-md-6">
                          <div class="">
                            <label for="formGustInfoPhone" class="col-form-label"
                              >Phone</label
                            >
                            <input
                              class="form-control"
                              type="tel"
                              value="Phone"
                              id="formGustInfoPhone"
                              aria-label="input tel to Gust Phone"
                            />
                          </div>
                        </div>

                        <!-- Mobile Field (Half width) -->
                        <div class="col-md-6 mb-3">
                          <div class="">
                            <label for="formGustInfoMobile" class="col-form-label"
                              >Mobile</label
                            >
                            <input
                              class="form-control"
                              type="tel"
                              value="Mobile"
                              id="formGustInfoMobile"
                              aria-label="input tel to Gust Mobile"
                            />
                          </div>
                        </div>

                        <!-- ID Type Field (Half width) -->
                        <div class="col-md-3">
                          <div class="mb-3">
                            <label for="formGustIdentityIdType" class="col-form-label"
                              >Gender</label
                            >
                            <select
                              class="form-select"
                              id="formGustIdentityIdType"
                              aria-label="select ID Type"
                            >
                              <option value="" disabled selected>-Select-</option>
                              <option value="option1">Male</option>
                              <option value="option2">Female</option>
                              <option value="option3">Other</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="mb-3">
                            <label for="formGustIdentityIdType" class="col-form-label"
                              >Guest Type</label
                            >
                            <select
                              class="form-select"
                              id="formGustIdentityIdType"
                              aria-label="select ID Type"
                            >
                              <option value="" disabled selected>-Select-</option>
                              <option value="option1">Adult</option>
                              <option value="option2">Child</option>
                            </select>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="mb-3">
                            <label for="formGustIdentityIdType" class="col-form-label">
                              VIP Status</label
                            >
                            <select
                              class="form-select"
                              id="formGustIdentityIdType"
                              aria-label="select ID Type"
                            >
                              <option value="" disabled selected>-Select-</option>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                              <option value="option4">Option 4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <label for="formGustInfoAddress" class="col-form-label"
                        >Address</label
                      >
                      <input
                        class="form-control"
                        type="text"
                        id="formGustInfoAddress"
                        placeholder="Address"
                        aria-label="input Text to Gust Address"
                      />
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-3">
                        <label for="countryGuest" class="col-form-label">Country</label>
                        <input
                          class="form-control"
                          type="text"
                          id="countryGuest"
                          placeholder="country"
                          aria-label="input Text to Gust country"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="formGustInfoState" class="col-form-label"
                          >State</label
                        >
                        <input
                          class="form-control"
                          type="text"
                          id="formGustInfoState"
                          placeholder="state"
                          aria-label="input Text to Gust state"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="formGustInfoCity" class="col-form-label">City</label>
                        <input
                          class="form-control"
                          type="text"
                          id="formGustInfoCity"
                          placeholder="city"
                          aria-label="input Text to Gust city"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="formGustInfoZip" class="col-form-label">Zip</label>
                        <input
                          class="form-control"
                          type="text"
                          id="formGustInfoZip"
                          placeholder="Zip"
                          aria-label="input Text to Gust Zip"
                        />
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-3">
                        <label for="countryGuest" class="col-form-label"
                          >Nationality</label
                        >
                        <input
                          class="form-control"
                          type="text"
                          id="countryGuest"
                          placeholder="country"
                          aria-label="input Text to Gust country"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="formGustInfoState" class="col-form-label"
                          >Company</label
                        >
                        <input
                          class="form-control"
                          type="text"
                          id="formGustInfoState"
                          placeholder="state"
                          aria-label="input Text to Gust state"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="formGustInfoCity" class="col-form-label">Fax</label>
                        <input
                          class="form-control"
                          type="text"
                          id="formGustInfoCity"
                          placeholder="city"
                          aria-label="input Text to Gust city"
                        />
                      </div>
                      <div class="col-md-3">
                        <label for="formGustInfoZip" class="col-form-label"
                          >Registration No
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          id="formGustInfoZip"
                          placeholder="Zip"
                          aria-label="input Text to Gust Zip"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- other information -->
                  <div class="accordion mt-3" id="accordionExample">
                    <div class="card accordion-item active">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          type="button"
                          class="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#accordionOne"
                          aria-expanded="true"
                          aria-controls="accordionOne"
                        >
                          Other Information
                        </button>
                      </h2>

                      <div
                        id="accordionOne"
                        class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                        style=""
                      >
                        <!-- Identity Information -->
                        <div class="row accordion-body">
                          <div class="col-12 mb-3">Identity Information</div>

                          <div class="row p-3 mb-2">
                            <div class="col-md-6">
                              <div class="row">
                                <div div class="col-md-4">
                                  <DropzoneComponent id="dropzone4" />
                                </div>
                                <div class="col-md-8">
                                  <div class="mb-3">
                                    <label for="formIdentityInfoId" class="col-form-label"
                                      >ID Number</label
                                    >
                                    <input
                                      class="form-control"
                                      type="text"
                                      id="formIdentityInfoId"
                                      placeholder="Enter ID Number"
                                      aria-label="Enter ID Number Guest"
                                    />
                                  </div>
                                  <div class="mb-3">
                                    <label
                                      for="formGustIssuingCountry"
                                      class="col-form-label"
                                      >Issuing Country</label
                                    >
                                    <select
                                      class="form-select"
                                      id="formGustIssuingCountry"
                                      aria-label="select Issuing Country"
                                    >
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
                                    <label
                                      for="formGustIdentityIdType"
                                      class="col-form-label"
                                      >ID Type</label
                                    >
                                    <select
                                      class="form-select"
                                      id="formGustIdentityIdType"
                                      aria-label="select ID Type"
                                    >
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
                                      <label
                                        for="formGustIssuingCity"
                                        class="col-form-label"
                                        >Issuing City</label
                                      >
                                      <input
                                        class="form-control"
                                        type="text"
                                        id="formGustIssuingCity"
                                        placeholder="City"
                                        aria-label="Enter Issuing City"
                                      />
                                    </div>
                                  </div>
                                  <div class="col-md-6">
                                    <label for="flatpickr-date-04" class="col-form-label"
                                      >Expiry Date</label
                                    >
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="YYYY-MM-D "
                                      id="flatpickr-date-04"
                                      ref="datePicker4"
                                      aria-label="input Text to Expiry Date"
                                    />
                                    <i
                                      class="fa-solid fa-calendar-days icon-date top"
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion mt-3" id="accordionExample">
                    <div class="card accordion-item active">
                      <h2 class="accordion-header" id="headingOne">
                        <button
                          type="button"
                          class="accordion-button"
                          data-bs-toggle="collapse"
                          data-bs-target="#accordionOne"
                          aria-expanded="true"
                          aria-controls="accordionOne"
                        >
                          Other Information
                        </button>
                      </h2>

                      <div
                        id="accordionOne"
                        class="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                        style=""
                      >
                        <!-- Identity Information -->
                        <div class="row accordion-body">
                          <!-- Personal Information part 1 -->
                          <div class="col-12 mb-3">Personal Information</div>
                          <div class="row mb-3">
                            <div class="col-md-3">
                              <label
                                for="formGustPersonalInfoBirth "
                                class="col-form-label"
                                >Birth Date</label
                              >
                              <input
                                type="text"
                                class="form-control flatpickr-input"
                                placeholder="Select Date"
                                id="flatpickr-date-05"
                                ref="datePicker5"
                                aria-label="input Text to Birth Date"
                              />
                              <i class="fa-solid fa-calendar-days icon-date top"></i>
                            </div>
                            <div class="col-md-3">
                              <label for="BirthCity" class="col-form-label"
                                >Birth City</label
                              >
                              <input
                                class="form-control"
                                type="text"
                                id="formGustIssuingCity"
                                placeholder="City"
                                aria-label="Enter Issuing City"
                              />
                            </div>
                            <div class="col-md-3">
                              <label for="BirthCountry" class="col-form-label"
                                >Birth Country</label
                              >
                              <select
                                class="form-select"
                                id="formGustBirthCountry"
                                aria-label="select Birth Country"
                              >
                                <option value="" disabled selected>Select option</option>
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
                              <label for="formGustSpouseBirth" class="col-form-label"
                                >Spouse Birth Date</label
                              >
                              <input
                                type="text"
                                class="form-control flatpickr-input"
                                placeholder="Select Date"
                                id="flatpickr-date-06"
                                ref="datePicker6"
                                aria-label="input Text to Spouse Birth Date"
                              />
                              <i class="fa-solid fa-calendar-days icon-date top"></i>
                            </div>
                            <div class="col-md-3">
                              <label for="flatpickr-date-07" class="col-form-label"
                                >Wedding Anniversary</label
                              >
                              <input
                                type="text"
                                class="form-control flatpickr-input"
                                placeholder="Select Date"
                                id="flatpickr-date-07"
                                ref="datePicker7"
                                aria-label="input Text to Wedding Anniversary"
                              />
                              <i class="fa-solid fa-calendar-days icon-date top"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="scbuttons gap-2 d-flex justify-content-end">
                    <button
                      @click="$emit('close-sidebar')"
                      class="btn btn-secondary waves-effect waves-light"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary waves-effect waves-light"
                    >
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
                class="btn btn-outline-secondary waves-effect mb-2 me-3"
                @click="toggleSidebar('sidebar9')"
              >
                Update Details
              </button>
              <Side
                :isSidebarOpen="activeSidebar === 'sidebar9'"
                @close-sidebar="toggleSidebar('sidebar9')"
              >
                <template #SidebarContent>
                  <h5>Content for Sidebar 9</h5>
                </template>
              </Side>

              <button
                type="button"
                class="btn btn-outline-secondary waves-effect mb-2"
                @click="toggleSidebar('sidebar10')"
              >
                Apply Discount
              </button>
              <Side
                :isSidebarOpen="activeSidebar === 'sidebar10'"
                @close-sidebar="toggleSidebar('sidebar10')"
              >
                <template #SidebarContent>
                  <h5>Content for Sidebar 10</h5>
                </template>
              </Side>
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
              class="btn btn-outline-secondary waves-effect mb-2"
            >
              Add Card
              
            </button>
            <Side
              :isSidebarOpen="activeSidebar === 'sidebar11'"
              @close-sidebar="toggleSidebar('sidebar11')"
            >
              <template #SidebarContent>
                <h5>Content for Sidebar 11</h5>
              </template>
            </Side>
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
import Side from "../components/AllReservation/SidebarReservation.vue";

export default {
  name: "edits",
  layout: "main",
  components: {
    HeaderReservation,
    Side,
  },

  data() {
    return {
      activeSidebar: null,
    };
  },
  methods: {
    toggleSidebar(sidebarName) {
      this.activeSidebar =
        this.activeSidebar === sidebarName ? null : sidebarName;
    },
  },
  mixins: [flatpickrMixin],
};
</script>

<style></style>
