<template>
  <div class="row mx-auto my-3">
    <div class="col-md-12">

      <div class="card mb-3 p-3">
        <div class="row" v-for="reservationDataById in reservationsDataById" :key="reservationDataById.id">
          <div class="col">
            <div class="me-2 py-2 d-flex">
              <NuxtLink to="/reservations-data"><i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d; float: left; font-size: 20px"></i>
              </NuxtLink>
              <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
              {{ reservationDataById.reserved_by.name }}
              {{ reservationDataById.id }}
              <small class="text-muted ml-3">
                <i class="fa-solid fa-person pr-2"></i>{{ reservationDataById.adults }}
                <i class="fa-solid fa-child pr-2"></i>{{ reservationDataById.children }}</small>
            </div>
          </div>
          <div class="col">
            <div class="me-2">
              <h6>Arrival Date</h6>
              <small class="text-muted">{{ reservationDataById.checkin_date }} {{ reservationDataById.checkin_time }}</small>
            </div>
          </div>

          <div class="col">
            <div class="me-2">
              <h6>Booking Date</h6>
              <small class="text-muted">{{ reservationDataById.booking_source.created_at || "02/12/2024"}} </small>
            </div>
          </div>
          <div class="col">
            <div class="me-2">
              <h6>Room Number/Room Type</h6>
              <small class="text-muted">{{ reservationDataById.number_of_rooms }}/{{ reservationDataById.rate_type || "Suite الفندق غرفتين وصاله" }}</small>
            </div>
          </div>
          <div class="col">
            <div class="me-2">
              <h6>Nights</h6>
              <small class="text-muted">

                {{ (new Date(reservationDataById.checkout_date) - new Date(reservationDataById.checkin_date)) / (1000 * 3600 * 24) }}
              </small>
            </div>
          </div>
          <div class="col">
            <div class="me-2">
              <h6>Reservation Number</h6>
              <small class="text-muted">{{ reservationDataById.reservation_number || "14541" }}</small>
            </div>
          </div>
          <div class="col">
            <div class="me-2">
              <h6>Status</h6>
              <small class="text-danger badge bg-label-danger">{{
                reservationDataById.status || "Stayove"
                }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeaderReservation>
      <template #button>
        <!--  Start Nav Tabs -->

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
        <!--  End Nav Tabs -->

        <!--  Start print/Send Menu -->
        <div class="btn-group ms-auto">
          <button type="button" class="btn btn-outline-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
            print/Send
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="
                setOffcanvasContent(
                  'printinvoice',
                  'Print Invoice',
                  'Send Email'
                )
                ">Print invoice</a>
            </li>
            <li>
              <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="
                setOffcanvasContent(
                  'sendinvoice',
                  'Send Invoice',
                  'Send Email'
                )
                ">Send invoice</a>
            </li>
          </ul>

          <!--  End print/Send Menu -->

          <!--  Start  offcanvas Menu -->

          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" :style="{ width: sidebarWidth }" ref="offcanvas">
            <div class="offcanvas-header">
              <h5 id="offcanvasEndLabel" class="offcanvas-title">
                {{ offcanvasTitle }}
              </h5>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr />
            <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
              <!--  start sidebar content for tap Folio Operation -->
              <div v-if="currentContent === 'newfolio'">
                <NewFolio />
              </div>
              <div v-if="currentContent === 'addpayment'">
                <AddPayment />
              </div>
              <div v-if="currentContent === 'addcharges'">
                <AddCharges />
              </div>
              <div v-if="currentContent === 'adddiscount'">
                <AddDiscount />
              </div>
              <div v-if="currentContent === 'addoperation'">
                <AddOperation />
              </div>
              <!--  end sidebar content for tap Folio Operation -->

              <!--  start sidebar content for tap Credit Card -->

              <div v-if="currentContent === 'addcard'">
                <AddCard />
              </div>
              <!--  End sidebar content for tap Credit Card -->

              <!--  start sidebar content for tap Room Charges -->
              <div v-if="currentContent === 'updatedetails'">
                <UpdateDetails />
              </div>
              <div v-if="currentContent === 'applydiscount'">
                <ApplyDiscount />
              </div>
              <!--  End sidebar content for tap Room Charges -->

              <!--  start sidebar content for PRint and send menu -->

              <div v-if="currentContent === 'printinvoice'">
                <print-invoice />
              </div>
              <div v-if="currentContent === 'sendinvoice'">
                <send-invoice />
              </div>
              <!--  End  sidebar content for PRint and send menu -->

              <!-- <div v-if="currentContent === 'addtravel'">
                <AddTravel />
              </div>
              <div v-if="currentContent === 'applydiscount'">
                <ApplyDiscount />
              </div> -->

              <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 0">
                <button class="btn btn-secondary" data-bs-dismiss="offcanvas">
                  Close
                </button>
                <button class="btn btn-primary">{{ dynamicButtonText }}</button>
              </div>
            </div>
          </div>
          <!--  End  offcanvas Menu -->
        </div>
      </template>
      <template #content>
        <!-- Start Folio Operation Tab  -->
        <div class="tab-pane fade active show" id="form-tabs-FolioOperation" role="tabpanel">
          <div class="row">
            <div class="col-3 p-0" style="border-right: 1px solid #e1e0e3">
              <div class="d-flex justify-content-between">
                <h6>Room/Folio</h6>
                <button type="button" class="btn btn-outline-primary waves-effect mb-2 me-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('newfolio', 'New folio')">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="accordion mt-3" id="accordionExample">
                <div class="card accordion-item active">
                  <h2 class="accordion-header" id="headingOne">
                    <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionfour" aria-expanded="true" aria-controls="accordionfour">
                      Suite الفندق غرفتين وصاله
                    </button>
                  </h2>

                  <div id="accordionfour" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                    <!-- Identity Information -->
                    <div class="row accordion-body">
                      <div class="accordion mt-3" id="accordionExample">
                        <div class="card accordion-item active">
                          <h2 class="accordion-header" id="headingOne">
                            <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionfour" aria-expanded="true" aria-controls="accordionfour">
                              105
                            </button>
                          </h2>

                          <div id="accordionfour" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                            <!-- Identity Information -->
                            <div class="row accordion-body">
                              <div>
                                <div>
                                  <i class="fa-solid fa-hexagon -nodes"></i>Mr.
                                  مستر شريف ضيافه محمد ذكى
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
              <div class="d-flex mb-2">
                <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('addpayment', 'Add Payment')">
                  Add payment
                </button>

                <button type="button" class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('addcharges', 'Add Charges')">
                  Add Charges
                </button>

                <button type="button" class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('adddiscount', 'Apply Discount')">
                  Apply Discount
                </button>

                <button type="button" class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('addoperation', 'Add Operation')">
                  Folio Operation
                </button>
              </div>

              <div class="table-responsive text-nowrap">
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th>
                        <div class="form-check text-left">
                          <!-- Master Checkbox -->
                          <input class="form-check-input" type="checkbox" id="selectAll" v-model="selectAll" @change="toggleAll" />
                          <label class="form-check-label" for="selectAll">
                            08/12/2024 Sun
                          </label>
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
                    <tr v-for="(row, index) in rows" :key="index">
                      <td>
                        <div class="form-check me-3 me-lg-5">
                          <!-- Row Checkbox -->
                          <input class="form-check-input" type="checkbox" :id="'rowCheckbox' + index" v-model="row.selected" @change="updateSelectAll" />
                          <label class="form-check-label" :for="'rowCheckbox' + index">
                            {{ row.date }}
                          </label>
                        </div>
                      </td>
                      <td>{{ row.room }}</td>
                      <td>{{ row.rateType }}</td>
                      <td>{{ row.pax }}</td>
                      <td>{{ row.charge }}</td>
                      <td>{{ row.discount }}</td>
                      <td>{{ row.tax }}</td>
                      <td>{{ row.adjustment }}</td>
                      <td>{{ row.netAmount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- End Folio Operation Tab   -->

        <!-- Start Booking Details Tab -->
        <div class="tab-pane fade" id="form-tabs-BookingDetails" role="tabpanel">
          <div class="row">
            <!-- inside tabs  -->
            <!-- header  -->
            <div class="card-header pt-2">
              <div v-if="bookingDetailsComponent === 'DefaultContentBooking'" class="pe-2">
                <ul class="nav nav-tabs card-header-tabs justify-content-end" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Remark" role="tab" aria-selected="false" tabindex="-1" @click="
                      setActiveTab('Remark');
                    loadComponent('RemarksContent', 'bookingDetailsComponent');
                    " :class="{ active: activeTab === 'Remark' }">
                      <span>Remark</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Task" role="tab" aria-selected="false" tabindex="-1" :class="{ active: activeTab === 'Task' }" @click="
                      setActiveTab('Preference');
                    loadComponent(
                      'TaskContent',
                      'bookingDetailsComponent'
                    );
                    ">
                      <span>Task</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Message" role="tab" aria-selected="true" :class="{ active: activeTab === 'Message' }" @click="
                      setActiveTab('Message');
                    loadComponent('MessageContent', 'bookingDetailsComponent');
                    ">
                      <span>Message</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Preference" role="tab" aria-selected="true" @click="
                      setActiveTab('Preference'),
                      loadComponent('PreferenceContent', 'bookingDetailsComponent')
                      ">
                      <span>Preference</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <!-- <div class="col-9">
                <component :is="activeComponent" @goBack="goBack" />
              </div> -->
            <div class="col-12">
              <component :is="bookingDetailsComponent" @goBack="goBack" />
            </div>
            <!-- content  -->
            <div class="tab-content">
              <div class="tab-pane fade" id="form-tabs-Remark" role="tabpanel" :class="{ 'show active': activeTab === 'Remark' }"></div>
              <!-- task  -->
              <div class="tab-pane fade" id="form-tabs-Task" role="tabpanel" :class="{ 'show active': activeTab === 'Task' }"></div>
              <!-- message  -->
              <div class="tab-pane fade" id="form-tabs-Message" role="tabpanel" :class="{ 'show active': activeTab === 'Message' }"></div>
              <!-- pereference  -->
              <div class="tab-pane fade" id="form-tabs-Preference" role="tabpanel" :class="{ 'show active': activeTab === 'Preference' }"></div>
            </div>
          </div>
        </div>
        <!-- End Booking Details Tab -->

        <!-- Start Guest Details Tab -->
        <div class="tab-pane fade" id="form-tabs-GuestDetails" role="tabpanel">
          <div class="row">
            <!-- Sidebar -->
            <div class="col-3 px-0" style="border-right: 1px solid #e1e0e3">
              <div class="d-flex justify-content-between">
                <h6>Guest</h6>
                <div v-if="activeComponent === 'DefaultComponentGuest'" class="pe-2">
                  <div class="pe-2">
                    <button type="button" class="btn btn-outline-primary waves-effect mb-2" @click="loadComponent('AddMasterProfile')">
                      <i class="fa-solid fa-user"></i>
                    </button>
                    <button type="button" class="btn btn-outline-primary waves-effect mb-2" @click="loadComponent('AddRoomSharer')">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="accordion mt-3" id="accordionExample">
                <div class="card accordion-item active">
                  <h2 class="accordion-header" id="headingOne">
                    <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionfour" aria-expanded="true" aria-controls="accordionfour">
                      Suite الفندق غرفتين وصاله
                    </button>
                  </h2>

                  <div id="accordionfour" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                    <!-- Identity Information -->
                    <div class="row accordion-body">
                      <div class="accordion mt-3" id="accordionExample">
                        <div class="card accordion-item active">
                          <h2 class="accordion-header" id="headingOne">
                            <button type="button" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#accordionfour" aria-expanded="true" aria-controls="accordionfour">
                              105
                            </button>
                          </h2>

                          <div id="accordionfour" class="accordion-collapse collapse show" data-bs-parent="#accordionExample" style="">
                            <!-- Identity Information -->
                            <div class="row accordion-body">
                              <div>
                                <div>
                                  <i class="fa-solid fa-hexagon -nodes"></i>Mr.
                                  مستر شريف ضيافه محمد ذكى
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

            <!-- Main Content -->
            <div class="col-9">
              <div v-if="selectedReservationId">

              <component :is="activeComponent" @goBack="goBack" :reservationId="selectedReservationId"  />
              </div>
            </div>
          </div>
        </div>
        <!-- End Guest Details Tab -->

        <!-- Start Room Charges Tab  -->
        <div class="tab-pane fade" id="form-tabs-RoomCharges" role="tabpanel">
          <div class="d-flex mb-2">
            <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('updatedetails', 'Updatedetails')">
              Update Details
            </button>
            <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="
              setOffcanvasContent(
                'applydiscount',
                'ApplyDiscount',
                'save',
                '1200px'
              )
              ">
              Apply Discount
            </button>
          </div>

          <div class="table-responsive text-nowrap">
            <table class="table">
              <thead class="table-light">
                <tr>
                  <th>
                    <div class="form-check text-left">
                      <input class="form-check-input" type="checkbox" id="userManagementRead" />
                      <label class="form-check-label" for="userManagementRead">
                        08/12/2024 Sun
                      </label>
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
                      <input class="form-check-input" type="checkbox" id="userManagementRead" />
                      <label class="form-check-label" for="userManagementRead">
                        08/12/2024 Sun
                      </label>
                    </div>
                  </td>
                  <td>252-Test</td>
                  <td>السعر شامل الافطار</td>
                  <td>1/0</td>
                  <td>100.00</td>
                  <td>0.0</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>100.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- End  Room Charges Tab  -->

        <!-- Start Credit Card  tab -->
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
        <!-- eND Credit Card  tab -->

        <!--  Start Audit Trail tab  -->
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
                    <p class="fw-medium">14/12/2024</p>
                    <p class="fw-medium">12:23:48 PM</p>
                  </td>
                  <td>
                    <p>Amend Stay</p>
                    <p>
                      Old Stay Arrival : 02/12/2024 Departure : 07/12/2024 , New
                      Stay Arrival : 02/12/2024 Departure : 13/12/2024
                    </p>
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
                    <p class="fw-medium">14/12/2024</p>
                    <p class="fw-medium">12:23:48 PM</p>
                  </td>
                  <td>
                    <p>Amend Stay</p>
                    <p>
                      Old Stay Arrival : 02/12/2024 Departure : 07/12/2024 , New
                      Stay Arrival : 02/12/2024 Departure : 13/12/2024
                    </p>
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
                    <p class="fw-medium">14/12/2024</p>
                    <p class="fw-medium">12:23:48 PM</p>
                  </td>
                  <td>
                    <p>Amend Stay</p>
                    <p>
                      Old Stay Arrival : 02/12/2024 Departure : 07/12/2024 , New
                      Stay Arrival : 02/12/2024 Departure : 13/12/2024
                    </p>
                  </td>

                  <td>
                    <p>eslam</p>
                  </td>
                  <td>
                    <p>45.240.157.99</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--  End Audit Trail tab  -->
      </template>
    </HeaderReservation>
  </div>
</template>

<script>
import flatpickrMixin from "../../components/Mixin/flatpickrMixin";
import HeaderReservation from "../../components/AllReservation/HeaderReservation.vue";
import SidebarReservation from "../../components/AllReservation/SidebarReservation.vue";
import AddCard from "../../components/SiderbarContentEdit/AddCard.vue";
import AddTravel from "../../components/SiderbarContentEdit/AddTravel.vue";
import UpdateDetails from "../../components/SiderbarContentEdit/UpdateDetails.vue";
import ApplyDiscount from "../../components/SiderbarContentEdit/ApplyDiscount.vue";
import DefaultComponentGuest from "../../components/SiderbarContentEdit/GuestDetailsComponents/DefaultComponentGuest.vue";
import AddRoomSharer from "../../components/SiderbarContentEdit/GuestDetailsComponents/AddRoomSharer.vue";
import AddMasterProfile from "../../components/SiderbarContentEdit/GuestDetailsComponents/AddMasterProfile.vue";
import DefaultContentBooking from "../../components/SiderbarContentEdit/BookingDetailsComponents/DefaultContentBooking.vue";
import MessageContent from "../../components/SiderbarContentEdit/BookingDetailsComponents/MessageContent.vue";
import PreferenceContent from "../../components/SiderbarContentEdit/BookingDetailsComponents/PreferenceContent.vue";
import RemarksContent from "../../components/SiderbarContentEdit/BookingDetailsComponents/RemarksContent.vue";
import TaskContent from "../../components/SiderbarContentEdit/BookingDetailsComponents/TaskContent.vue";
import SendInvoice from "../../components/SiderbarContentEdit/SendInvoice.vue";
import PrintInvoice from "../../components/SiderbarContentEdit/PrintInvoice.vue";
import NewFolio from "../../components/SiderbarContentEdit/NewFolio.vue";
import AddPayment from "../../components/SiderbarContentEdit/AddPayment.vue";
import AddCharges from "../../components/SiderbarContentEdit/AddCharges.vue";
import AddDiscount from "../../components/SiderbarContentEdit/AddDiscount.vue";
import AddOperation from "../../components/SiderbarContentEdit/AddOperation.vue";
import { getReservationDataById } from "../../components/Api/api";
export default {
  name: "EditsPage",
  layout: "main",
  components: {
    HeaderReservation,
    SidebarReservation,
    AddCard,
    UpdateDetails,
    ApplyDiscount,
    DefaultComponentGuest,
    AddRoomSharer,
    AddMasterProfile,
    DefaultContentBooking,
    MessageContent,
    PreferenceContent,
    RemarksContent,
    TaskContent,
    AddTravel,
    SendInvoice,
    PrintInvoice,
    PrintInvoice,
    SendInvoice,
    NewFolio,
    AddPayment,
    AddCharges,
    AddOperation,
    AddDiscount,
  },
  data ()
  {
    return {
      currentContent: null,
      offcanvasTitle: "",
      sidebarWidth: "400px",
      dynamicButtonText: "Save",
      activeComponent: "DefaultComponentGuest",
      bookingDetailsComponent: "DefaultContentBooking",
      activeTab: null, // No tab is active by default
      reservationsDataById: [],
      selectedReservationId: null, // Initialize as null
      selectAll: false, // Tracks the state of the master checkbox
      rows: [
        {
          date: "08/12/2024 Sun",
          room: "252-Test",
          rateType: "السعر شامل الافطار",
          pax: "1/0",
          charge: "100.00",
          discount: "0.0",
          tax: "0.00",
          adjustment: "0.00",
          netAmount: "100.00",
          selected: false, // Tracks if this row is selected
        },
      ],

    };
  },
  methods: {
    setActiveTab (tab)
    {
      this.activeTab = tab;
    },
    setOffcanvasContent (content, title, buttonText = "Save", width = "400px")
    {
      this.currentContent = content; // Set the content type
      this.offcanvasTitle = title; // Set the title for the offcanvas
      this.sidebarWidth = width; // Set the sidebar width
      this.dynamicButtonText = buttonText; // Set the button text dynamically
    },
    clearOffcanvasContent ()
    {
      this.currentContent = null; // Reset the content
      this.offcanvasTitle = ""; // Reset the title
      this.sidebarWidth = "400px"; // Reset the sidebar width
    },
    // Load a new active component (specific for guest or another area)
    loadComponent (componentName, target = "activeComponent")
    {
      if (target === "activeComponent") {
        this.activeComponent = componentName;
      } else if (target === "bookingDetailsComponent") {
        this.bookingDetailsComponent = componentName;
      }
    },
    // Reset each component independently
    goBack (target = "activeComponent")
    {
      if (target === "activeComponent") {
        this.activeComponent = "DefaultComponentGuest"; // Reset for activeComponent
      } else if (target === "bookingDetailsComponent") {
        this.bookingDetailsComponent = "DefaultContentBooking"; // Reset for bookingDetailsComponent
        console.log("Reset bookingDetailsComponent to DefaultContentBooking");
      } else {
        console.warn(`Invalid target: ${target}`);
      }
    },
    toggleAll ()
    {
      // Toggle all row checkboxes based on the master checkbox
      this.rows.forEach((row) =>
      {
        row.selected = this.selectAll;
      });
    },
    updateSelectAll ()
    {
      // Update master checkbox based on row checkboxes
      this.selectAll = this.rows.every((row) => row.selected);
    },
  },


  mixins: [flatpickrMixin],

  async mounted ()
  {
    const id = this.$route.params.id; // Get the dynamic ID from the route

    try {
      const [
        ReservationDataByIdResponse,

      ] = await Promise.all([
        getReservationDataById(id),

      ]);

      this.reservationsDataById = [ReservationDataByIdResponse.data.data];
      if (this.reservationsDataById.length > 0) {
        this.selectedReservationId = this.reservationsDataById[0].id; // Set to the first reservation's ID
      }

    } catch (error) {
      console.error("Error loading data:", error);
    }
    const offcanvas = document.getElementById("offcanvasEnd");
    offcanvas.addEventListener("hidden.bs.offcanvas", this.resetSelections);
    this.$nextTick(() =>
    {
      const offcanvasElement = this.$refs.offcanvas;
      if (offcanvasElement) {
        offcanvasElement.addEventListener(
          "hidden.bs.offcanvas",
          this.clearOffcanvasContent
        );
      } else {
        console.error("Offcanvas ref not found.");
      }
    });
  },

  beforeDestroy ()
  {
    const offcanvasElement = this.$refs.offcanvas;
    if (offcanvasElement) {
      offcanvasElement.removeEventListener(
        "hidden.bs.offcanvas",
        this.clearOffcanvasContent
      );
    } else {
      console.warn("Offcanvas ref not found during beforeDestroy.");
    }
  },

};
</script>

<style>
/* Add styles as needed */
</style>
