<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
    <div class="offcanvas-header">
                <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">
                  <template v-if="selectedCard">
                    <h6>
                      <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                      {{ selectedCard.reserved_by.name }}
                    </h6>
                    <div>
                      <span class="mr-1"><i class="text-primary fa-solid fa-location-dot"></i>
                        {{ selectedCard.location || "Egypt"
                        }}</span>
                      <span><i class="text-primary fa-solid fa-phone"></i>
                        {{ selectedCard.phone || "03252" }}</span>
                    </div>
                    <div class="row mt-4">
                      <div class="col-md-4">

                        <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="navigateToEditReservation(selectedCard.id)"> Edit</button>


                      </div>
                      <div class="col-md-4">
                        <div class="demo-inline-spacing">
                          <div class="btn-group btn-block" id="dropdown-icon-demo">
                            <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
                              OPtion
                            </button>
                            <ul class="dropdown-menu" style="">
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-regular fa-credit-card mr-2"></i>Add Payment</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-calendar-plus mr-2"></i>Amend Stay</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-regular fa-calendar mr-2"></i>Exchange Room</a>
                              </li>

                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-bed mr-2"></i>Room
                                  Move</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-arrow-right-arrow-left mr-2"></i>
                                  Exchange Room</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-hand mr-2"></i>Stop
                                  Room Move</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-solid fa-utensils mr-2"></i>
                                  Inclusion List</a>
                              </li>
                              <li>
                                <a href="#" class="dropdown-item d-flex align-items-center"><i class="fa-regular fa-circle-xmark mr-2"></i>Void Reservation</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="btn-group ms-auto">
                          <button type="button" class="btn btn-outline-primary dropdown-toggle waves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
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
                      </div>
                    </div>
                  </template>
                </h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
    <hr />
    <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
      <p v-if="selectedEvent">Title: {{ selectedEvent.title }}</p>
      <p v-if="selectedEvent">Start: {{ selectedEvent.start }}</p>
      <p v-if="selectedEvent">End: {{ selectedEvent.end }}</p>
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
    navigateToEditReservation(id) {
      this.$emit("navigate-to-edit-reservation", id);
    },
  },
};
</script>
