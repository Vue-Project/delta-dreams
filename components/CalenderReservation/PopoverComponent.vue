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
        <div class="row">
          <hr class="my-2 w-75 mx-auto" />
          <button @click="goToAddReservation">Go to Add Reservation</button>
          <hr class="my-2 w-75 mx-auto" />
          <button type="button" class="ant-btn ant-btn-link ant-btn-block" @click="toggleSidebar">
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
.popover{
  border-radius:5px ;
}
.popoverContent button {
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 4px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: 500;
  max-width: 250px;
  margin:auto;
}

.popoverContent button:hover {
  /* color: #0c7bdc; */
  transform: scale(1.08);
  background-color: rgba(43, 146, 250, 0.1);
  color: #1a73e8;

}
.popover {
  transition: all 0.3s ease-in-out;
  max-width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

</style>