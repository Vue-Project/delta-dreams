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
              <div v-if="currentContent === 'addtravel'">
                <AddTravel />
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
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Remark" role="tab" aria-selected="false" tabindex="-1" @click="
                      loadComponent('RemarksContent');
                    setActiveTab('Remark');
                    " :class="{ active: activeTab === 'Remark' }">
                      <span>Remark</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Task" role="tab" aria-selected="false" tabindex="-1" :class="{ active: activeTab === 'Task' }" @click="
                      setActiveTab('Task');
                    loadComponent('TaskContent');
                    ">
                      <span>Task</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Message" role="tab" aria-selected="true" :class="{ active: activeTab === 'Message' }" @click="
                      setActiveTab('Message');
                    loadComponent('MessageContent');
                    ">
                      >
                      <span>Message</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Preference" role="tab" aria-selected="true" :class="{ active: activeTab === 'Preference' }" @click="
                      setActiveTab('Preference');
                    loadComponent('PreferenceContent');
                    ">
                      >
                      <span>Preference</span>
                      <span class="badge badge-center rounded-pill bg-label-primary ms-1">0</span>
                    </button>
                  </li>
                </ul>
              </div>

              <!-- content  -->
              <div class="tab-content d-none">
                <!-- remark  -->
                <div class="tab-pane fade" id="form-tabs-Remark" role="tabpanel" :style="{
                  display: activeTab === 'Remark' ? 'block' : 'none',
                }"></div>
                <!-- task  -->
                <div class="tab-pane fade" id="form-tabs-Task" role="tabpanel" :class="{ 'show active': activeTab === 'Task' }"></div>
                <!-- message  -->
                <div class="tab-pane fade" id="form-tabs-Message" role="tabpanel" :class="{ 'show active': activeTab === 'Message' }"></div>
                <!-- pereference  -->
                <div class="tab-pane fade" id="form-tabs-Preference" role="tabpanel" :class="{ 'show active': activeTab === 'Preference' }"></div>
              </div>
              <component :is="bookingDetailsComponent" @goBack="goBack" :setOffcanvasContent="setOffcanvasContent" />
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
                    <button type="button" class="btn btn-outline-primary waves-effect mb-2" @click="loadComponent('AddMasterProfile')">
                      <i class="fa-solid fa-user"></i>
                    </button>
                    <button type="button" class="btn btn-outline-primary waves-effect mb-2" @click="loadComponent('NewGuest')">
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
              <component :is="activeComponent" @goBack="goBack" />
            </div>
          </div>
        </div>
        <!-- Room Charges  -->
        <div class="tab-pane fade" id="form-tabs-RoomCharges" role="tabpanel">
          <div class="d-flex">
            <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('updatedetails', 'Updatedetails')">
              Update Details
            </button>
            <button class="btn btn-outline-secondary waves-effect me-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="
              setOffcanvasContent('applydiscount', 'ApplyDiscount', '1200px')
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
      </template>
    </HeaderReservation>
  </div>
</template>





<script>
import flatpickrMixin from "../components/Mixin/flatpickrMixin";
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";
import SidebarReservation from "../components/AllReservation/SidebarReservation.vue";
import AddCard from "../components/SiderbarContentEdit/AddCard.vue";
import AddTravel from "../components/SiderbarContentEdit/AddTravel.vue";
import UpdateDetails from "../components/SiderbarContentEdit/UpdateDetails.vue";
import ApplyDiscount from "../components/SiderbarContentEdit/ApplyDiscount.vue";
import DefaultContent from "../components/SiderbarContentEdit/LoadingComponents/DefaultContent.vue";
import NewGuest from "../components/SiderbarContentEdit/LoadingComponents/NewGuest.vue";
import AddMasterProfile from "../components/SiderbarContentEdit/LoadingComponents/AddMasterProfile.vue";
import MainComponent from "../components/SiderbarContentEdit/BookingDetailsComponents/DefualtContent.vue";
import MessageContent from "../components/SiderbarContentEdit/BookingDetailsComponents/MessageContent.vue";
import PreferenceContent from "../components/SiderbarContentEdit/BookingDetailsComponents/PreferenceContent.vue";
import RemarksContent from "../components/SiderbarContentEdit/BookingDetailsComponents/RemarksContent.vue";
import TaskContent from "../components/SiderbarContentEdit/BookingDetailsComponents/TaskContent.vue";
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
    AddMasterProfile,
    MainComponent,
    MessageContent,
    PreferenceContent,
    RemarksContent,
    TaskContent,
    AddTravel
  },
  data ()
  {
    return {
      card: null,
      currentContent: null,
      offcanvasTitle: "",
      sidebarWidth: "400px",
      dynamicButtonText: "Save",
      activeComponent: "DefaultContent",
      bookingDetailsComponent: "MainComponent",
      activeTab: null, // No tab is active by default
    };
  },
  methods: {
    setActiveTab (tab)
    {
      this.activeTab = tab;
    },
    setOffcanvasContent (content, title, width = "400px", buttonText = "Save")
    {
      this.currentContent = content; // Set the content type
      this.offcanvasTitle = title; // Set the title for the offcanvas
      this.sidebarWidth = width; // Set the sidebar width
      this.dynamicButtonText = buttonText; // Set the button text dynamically
    },
    loadComponent (componentName)
    {
      this.activeComponent = componentName;
      this.bookingDetailsComponent = componentName;
    },
    goBack ()
    {
      this.activeComponent = "DefaultContent";
      this.bookingDetailsComponent = "MainComponent";
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
