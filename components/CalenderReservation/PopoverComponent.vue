<template>
  <div v-if="isPopoverVisible" class="popover fade show bs-popover-top" role="tooltip" :style="popoverStyle">
    <div class="arrow" :style="{ left: popoverArrowLeft }"></div>
    <div class="popover-body">
      <div class="popoverContent text-center">
        <div class="row" style="row-gap: 0px">
          <div class="col-6">
            <div class="text-black fw-bold">Arrival</div>
            <div>{{ firstSelectedDate }}</div>
          </div>
          <div class="col-6">
            <div class="text-black fw-bold">Departure</div>
            <div>{{ lastSelectedDate }}</div>
          </div>
        </div>
        <div class="row ">
          <hr class="my-2 w-75 mx-auto" />
          <button class="btn btn-outline-primary waves-effect w-75" @click="goToAddReservation">Add Reservation</button>
          <button type="button" class="btn btn-outline-primary waves-effect mt-2 w-75" @click="toggleSidebar">
            <span>Maintenance Block</span>
          </button>
        </div>
        <span role="img" aria-label="close" class="popoverClose" @click="closePopover">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPopoverVisible: {
      type: Boolean,
      required: true,
    },
    popoverStyle: {
      type: Object,
      required: true,
    },
    popoverArrowLeft: {
      type: String,
      required: true,
    },
    firstSelectedDate: {
      type: String,
      required: true,
    },
    lastSelectedDate: {
      type: String,
      required: true,
    },
  },
  methods: {
    goToAddReservation() {
      this.$emit("go-to-add-reservation");
    },
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    closePopover() {
      this.$emit("close-popover");
    },
  },
};
</script>

<style scoped>

</style>
