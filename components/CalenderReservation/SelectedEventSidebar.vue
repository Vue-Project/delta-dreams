<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
    <!-- Offcanvas Header -->
    <div class="offcanvas-header">
      <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">
        <template v-if="selectedEvent">
          <h6>
            <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
            {{ selectedEvent.user?.name }}
          </h6>
          <div>
            <span class="mr-1">
              <i class="text-primary fa-solid fa-location-dot"></i>
              {{ selectedEvent.guest_country || "Egypt" }}
            </span>
            <span>
              <i class="text-primary fa-solid fa-phone"></i>
              {{ selectedEvent.user?.phone || "0123456789" }}
            </span>
          </div>
          <div class="row mt-4">
            <div class="col-md-4">
              <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="navigateToEditReservation(selectedEvent.id)">
                Edit
              </button>
            </div>
            <div class="col-md-4">
              <div class="demo-inline-spacing">
                <div class="btn-group btn-block" id="dropdown-icon-demo">
                  <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-regular fa-credit-card mr-2"></i>Add Payment
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-solid fa-calendar-plus mr-2"></i>Amend Stay
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-regular fa-calendar mr-2"></i>Exchange Room
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-solid fa-bed mr-2"></i>Room Move
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-solid fa-arrow-right-arrow-left mr-2"></i>Exchange Room
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-solid fa-hand mr-2"></i>Stop Room Move
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-solid fa-utensils mr-2"></i>Inclusion List
                      </a>
                    </li>
                    <li>
                      <a href="#" class="dropdown-item d-flex align-items-center">
                        <i class="fa-regular fa-circle-xmark mr-2"></i>Void Reservation
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="btn-group ms-auto">
                <button type="button" class="btn btn-outline-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
                  Print/Send
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="javascript:void(0);">Print Invoice</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="javascript:void(0);">Send Invoice</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
      </h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>

    <!-- Offcanvas Body -->
    <hr />
    <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
      <template v-if="selectedEvent">
        <div class="row">
          <div class="col-md-6">
            <ul class="list-unstyled mb-0">
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Reservation Number</h6>
                      <small class="text-muted">{{
                        selectedEvent.id || "1025191591"
                      }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Arrival Date</h6>
                      <small class="text-muted">{{ formatDate(selectedEvent.checkin_date || "2024-10-21") }}
                        {{ selectedEvent.checkin_time || "12:00 PM" }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Booking Date</h6>
                      <small class="text-muted">{{ formatDate(selectedEvent.checkout_date || "2024-10-21") }}
                        {{ selectedEvent.checkout_time || "12:00 PM" }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Room Number</h6>
                      <small class="text-muted">
                        {{ selectedEvent.number_of_rooms || 5 }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">
                        <i class="fa-solid fa-person"></i>
                        <i class="fa-solid fa-child"></i>
                      </h6>
                      <small class="text-muted">{{ selectedEvent.adults }}
                        {{ selectedEvent.children }}</small>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-6">
            <ul class="list-unstyled mb-0">
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Departure Date</h6>
                      <small class="text-muted">{{ selectedEvent.departureDate || "2024-10-21" }}
                        {{ selectedEvent.departureTime || "12:00 PM" }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Status</h6>
                      <small class="badge" :class="statusBadgeClass(selectedEvent.status)">
                      {{ selectedEvent.status_name }}
                    </small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Room Type</h6>
                      <small class="text-muted">{{ selectedEvent.roomType || 'Suite شاليهات بخدمات فندقية غرفتين وصاله' }}
                      </small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Rate Plan</h6>
                      <small class="text-muted">
                        {{ selectedEvent.ratePlan || "السعر غير شامل" }}</small>
                    </div>
                  </div>
                </div>
              </li>
              <li class="mb-3 pb-1">
                <div class="d-flex align-items-start">
                  <div class="d-flex justify-content-between w-100 flex-wrap gap-2">
                    <div class="me-2">
                      <h6 class="mb-0">Avg. Daily Rate</h6>
                      <small class="text-muted">{{ selectedEvent.dailyRate || '£ 1,350.00' }}
                      </small>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="new-div mt-3 position-absolute right-0 w-100 px-4 bottom-1">
          <dl class=" row mb-0">
            <dt class="col-6 fw-normal text-heading">Total</dt>
            <dd class="col-6 text-end">{{ selectedEvent.total || "0.0 $" }} $</dd>

            <dt class="col-sm-6 fw-normal">Paid</dt>
            <dd class="col-sm-6 text-end">{{ selectedEvent.paid || "0.0 $" }}$</dd>

            <dt class="col-6 fw-normal text-danger">Balance</dt>
            <dd class="col-6 text-end text-danger">
              {{ selectedEvent.balance || "0.0 $" }}$
            </dd>
          </dl>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedEvent: {
      type: Object,
      default: null,
    },
  },
  methods: {
    navigateToEditReservation (id)
    {
      this.$emit("navigate-to-edit-reservation", id);
    },
    formatDate (isoString)
    {
      return new Date(isoString).toLocaleDateString('en-GB');
    },
    formatDateTime (isoString)
    {
      return new Date(isoString).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    // formatCurrency (amount)
    // {
    //   return new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //   }).format(amount);
    // },
    statusBadgeClass (status)
    {
      return {
        'bg-label-primary': status === 'pending',
        'bg-label-success': status === 'approved',
        'bg-label-danger': status === 'cancelled',
      };
    },
  },
};
</script>

<style scoped>
.badge {
  padding: 0.5em 0.75em;
  font-size: 0.875em;
}

.bg-label-primary {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.bg-label-success {
  background-color: rgba(25, 135, 84, 0.1);
  color: #198754;
}

.bg-label-danger {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}
</style>
