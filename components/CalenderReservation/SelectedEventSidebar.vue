<template>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasEndLabel" class="offcanvas-title w-100">
        <template v-if="selectedEvent">
          <!-- <h6>
            <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
            {{ selectedCard.reserved_by.name }}
          </h6> -->
          <!-- <div>
            <span class="mr-1"><i class="text-primary fa-solid fa-location-dot"></i> {{ selectedCard.location || "Egypt" }}</span>
            <span><i class="text-primary fa-solid fa-phone"></i> {{ selectedCard.phone || "03252" }}</span>
          </div> -->
          <div class="row mt-4">
            <div class="col-md-4">
              <button type="button" class="btn btn-primary waves-effect waves-light btn-block" @click="navigateToEditReservation(selectedCard.id)">
                Edit
              </button>
            </div>
            <!-- ... (other buttons and dropdowns) -->
          </div>
        </template>
        <template v-else> Search </template>
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
    selectedCard: {
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
