<template>
  <div class="row mx-auto my-3">
    <div v-if="loading" class="col-md-12 text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="col-md-12">
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
    </div>

    <div v-else class="col-md-12">
      <div class="card mb-3 p-3">
        <div v-if="card">
          <div class="row">
            <div class="col">
              <div class="me-2 py-2 d-flex">
                <NuxtLink to="/reservations-data">
                  <i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d; float: left; font-size: 20px"></i>
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
                <small class="text-muted badge bg-label-danger">{{ card.status }}</small>
              </div>
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
              <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('printinvoice', 'Print Invoice', 'Send Email')">Print invoice</a>
            </li>
            <li>
              <a class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('sendinvoice', 'Send Invoice', 'Send Email')">Send invoice</a>
            </li>
          </ul>
        </div>

        <!-- Start offcanvas -->
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" :style="{ width: sidebarWidth }" ref="offcanvas">
          <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">
              {{ offcanvasTitle }}
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <hr />
          <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
            <!-- Sidebar content components -->
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
            <div v-if="currentContent === 'addcard'">
              <AddCard />
            </div>
            <div v-if="currentContent === 'updatedetails'">
              <UpdateDetails />
            </div>
            <div v-if="currentContent === 'applydiscount'">
              <ApplyDiscount />
            </div>
            <div v-if="currentContent === 'printinvoice'">
              <print-invoice />
            </div>
            <div v-if="currentContent === 'sendinvoice'">
              <send-invoice />
            </div>

            <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 0">
              <button class="btn btn-secondary" data-bs-dismiss="offcanvas">
                Close
              </button>
              <button class="btn btn-primary">{{ dynamicButtonText }}</button>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <!-- Tab content for Folio Operation -->
        <div class="tab-pane fade active show" id="form-tabs-FolioOperation" role="tabpanel">
          <!-- Your existing Folio Operation content -->
          <div class="row">
            <!-- Room/Folio sidebar -->
            <div class="col-3 p-0" style="border-right: 1px solid #e1e0e3">
              <!-- Your existing Room/Folio sidebar content -->
            </div>

            <!-- Main content area -->
            <div class="col-9">
              <!-- Your existing buttons and table -->
            </div>
          </div>
        </div>

        <!-- Other tab contents -->
        <div class="tab-pane fade" id="form-tabs-BookingDetails" role="tabpanel">
          <!-- Your existing Booking Details content -->
        </div>

        <div class="tab-pane fade" id="form-tabs-GuestDetails" role="tabpanel">
          <!-- Your existing Guest Details content -->
        </div>

        <div class="tab-pane fade" id="form-tabs-RoomCharges" role="tabpanel">
          <!-- Your existing Room Charges content -->
        </div>

        <div class="tab-pane fade" id="form-tabs-CreditCard" role="tabpanel">
          <!-- Your existing Credit Card content -->
        </div>

        <div class="tab-pane fade" id="form-tabs-AuditTrail" role="tabpanel">
          <!-- Your existing Audit Trail content -->
        </div>
      </template>
    </HeaderReservation>
  </div>
</template>

<script>
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";
import SidebarReservation from "../components/AllReservation/SidebarReservation.vue";
import AddCard from "../components/SiderbarContentEdit/AddCard.vue";
import AddTravel from "../components/SiderbarContentEdit/AddTravel.vue";
import UpdateDetails from "../components/SiderbarContentEdit/UpdateDetails.vue";
import ApplyDiscount from "../components/SiderbarContentEdit/ApplyDiscount.vue";
import DefaultComponentGuest from "../components/SiderbarContentEdit/GuestDetailsComponents/DefaultComponentGuest.vue";
import AddRoomSharer from "../components/SiderbarContentEdit/GuestDetailsComponents/AddRoomSharer.vue";
import AddMasterProfile from "../components/SiderbarContentEdit/GuestDetailsComponents/AddMasterProfile.vue";
import DefaultContentBooking from "../components/SiderbarContentEdit/BookingDetailsComponents/DefaultContentBooking.vue";
import MessageContent from "../components/SiderbarContentEdit/BookingDetailsComponents/MessageContent.vue";
import PreferenceContent from "../components/SiderbarContentEdit/BookingDetailsComponents/PreferenceContent.vue";
import RemarksContent from "../components/SiderbarContentEdit/BookingDetailsComponents/RemarksContent.vue";
import TaskContent from "../components/SiderbarContentEdit/BookingDetailsComponents/TaskContent.vue";
import SendInvoice from "../components/SiderbarContentEdit/SendInvoice.vue";
import PrintInvoice from "../components/SiderbarContentEdit/PrintInvoice.vue";
import NewFolio from "../components/SiderbarContentEdit/NewFolio.vue";
import AddPayment from "../components/SiderbarContentEdit/AddPayment.vue";
import AddCharges from "../components/SiderbarContentEdit/AddCharges.vue";
import AddDiscount from "../components/SiderbarContentEdit/AddDiscount.vue";
import AddOperation from "../components/SiderbarContentEdit/AddOperation.vue";

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
    NewFolio,
    AddPayment,
    AddCharges,
    AddOperation,
    AddDiscount,
  },

  data ()
  {
    return {
      card: null,
      loading: true,
      error: null,
      currentContent: null,
      offcanvasTitle: "",
      sidebarWidth: "400px",
      dynamicButtonText: "Save",
      activeComponent: "DefaultComponentGuest",
      bookingDetailsComponent: "DefaultContentBooking",
      activeTab: null,
    };
  },

  methods: {
    async fetchReservationData ()
    {
      this.loading = true;
      this.error = null;

      try {
        // Get the ID from the route params
        const id = this.$route.params.id;

        // Make API call to fetch reservation data
        const response = await this.$axios.get(`https://deltadream.swevey.com/public/api/reservations/${id}`);
        this.card = response.data;
      } catch (error) {
        console.error('Error fetching reservation:', error);
        this.error = 'Failed to load reservation data';
      } finally {
        this.loading = false;
      }
    },

    setActiveTab (tab)
    {
      this.activeTab = tab;
    },

    setOffcanvasContent (content, title, buttonText = "Save", width = "400px")
    {
      this.currentContent = content;
      this.offcanvasTitle = title;
      this.sidebarWidth = width;
      this.dynamicButtonText = buttonText;
    },

    clearOffcanvasContent ()
    {
      this.currentContent = null;
      this.offcanvasTitle = "";
      this.sidebarWidth = "400px";
    },

    loadComponent (componentName, target = "activeComponent")
    {
      if (target === "activeComponent") {
        this.activeComponent = componentName;
      } else if (target === "bookingDetailsComponent") {
        this.bookingDetailsComponent = componentName;
      }
    },

    goBack (target = "activeComponent")
    {
      if (target === "activeComponent") {
        this.activeComponent = "DefaultComponentGuest";
      } else if (target === "bookingDetailsComponent") {
        this.bookingDetailsComponent = "DefaultContentBooking";
      }
    }
  },

  async mounted ()
  {
    // Fetch reservation data when component mounts
    await this.fetchReservationData();

    // Add event listener for offcanvas
    this.$nextTick(() =>
    {
      const offcanvasElement = this.$refs.offcanvas;
      if (offcanvasElement) {
        offcanvasElement.addEventListener(
          "hidden.bs.offcanvas",
          this.clearOffcanvasContent
        );
      }
    });
  },

  beforeDestroy ()
  {
    // Clean up event listener
    const offcanvasElement = this.$refs.offcanvas;
    if (offcanvasElement) {
      offcanvasElement.removeEventListener(
        "hidden.bs.offcanvas",
        this.clearOffcanvasContent
      );
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
