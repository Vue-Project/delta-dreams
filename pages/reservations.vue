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
              ggg
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
            class="tab-pane fade"
            id="form-tabs-FolioOperation"
            role="tabpanel"
          ></div>
          <!-- Booking Details  -->
          <div
            class="tab-pane fade"
            id="form-tabs-BookingDetails"
            role="tabpanel"
          ></div>
          <!-- Guest Details  -->
          <div
            class="tab-pane fade"
            id="form-tabs-GuestDetails"
            role="tabpanel"
          ></div>
          <!-- Room Charges  -->
          <div
            class="tab-pane fade"
            id="form-tabs-RoomCharges"
            role="tabpanel"
          ></div>
          <!--Credit Card  -->
          <div
            class="tab-pane fade"
            id="form-tabs-CreditCard"
            role="tabpanel"
          ></div>
          <!-- Audit Trail  -->
          <div
            class="tab-pane fade"
            id="form-tabs-AuditTrail"
            role="tabpanel"
          ></div>
        </template>
      </HeaderReservation>
    </div>
  </div>
</template>

<script>
import HeaderReservation from "../components/AllReservation/HeaderReservation.vue";

export default {
  name: "reservations",
  layout: "main",
  components: {
    HeaderReservation,
  },
};
</script>

<style></style>
