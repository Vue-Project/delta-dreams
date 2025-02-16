<template>
  <div class="row d-flex justify-content-between p-2 position-relative">
    <div class="col-lg-2 col-12 calendarDate">
      <input
        type="text"
        class="form-control flatpickr-input mb-sm-2"
        placeholder="YYYY-MM-DD"
        id="flatpickr-date-04"
        ref="datePicker4"
        aria-label="input for date"
      />
      <i class="fa-solid fa-calendar-days date-icon"></i>
    </div>
    <div class="col-lg-6 col-12">
      <div class="d-flex items-center gap-4">
        <div v-for="(count, label) in statistics" :key="label">
          <span>{{ label }}</span>
          <span class="statistics-count">
            {{ count }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-12">
      <div class="d-flex items-center justify-content-end gap-4">
        <!-- <div class="w-100">
          <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
            <option selected>السعر غير شامل</option>
            <option value="1">السعر شامل الافطار</option>
          </select>
        </div> -->
        <!-- <label class="switch">
          <input type="checkbox" class="switch-input" v-model="isOn" aria-label="switch input to copy and compact" />
          <span class="switch-toggle-slider">
            <span class="switch-on">Copy</span>
            <span class="switch-off">compact</span>
          </span>
        </label> -->

        <div @mouseenter="isHovered = true" @mouseleave="isHovered = false">
          <button type="button" class="btn btn-outline-primary waves-effect">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <!-- Hover Menu -->
          <div v-show="isHovered" class="position-absolute  ">
            <!-- start ul -->
            <div class="fullbox">
              <div class="row">
                <h5>Booking Status</h5>
                <hr />
                <div class="col-6">
                  <ul class="Booking-Status-First">
                    <li><i class="fas fa-square"></i>Arrived</li>
                    <li><i class="fas fa-square"></i>Due Out</li>
                    <li><i class="fas fa-square"></i>Maintenance Block</li>
                    <li><i class="fas fa-square"></i>Dayuse Reservation</li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="Booking-Status-Secound">
                    <li><i class="fas fa-square"></i>Checked Out</li>
                    <li><i class="fas fa-square"></i>Confirmed Reservation</li>
                    <li><i class="fas fa-square"></i>Stayover</li>
                    <li><i class="fas fa-square"></i>Dayuse</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <h5>Booking Indicators</h5>
                <hr />
                <div class="col-6">
                  <ul class="Booking-Indicators-First">
                    <li><i class="fa-solid fa-crown"></i>Group Owner</li>
                    <li>
                      <i class="fa-solid fa-dollar-sign"></i>Payment Pending
                    </li>
                    <li><i class="fa-solid fa-user"></i>Single Lady</li>
                    <li>
                      <i class="fa-solid fa-arrows-split-up-and-left"></i>Split
                      Reservation
                    </li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="Booking-Indicators-Secound">
                    <li><i class="fa-solid fa-user-group"></i>Group Booking</li>
                    <li><i class="fa-solid fa-hand"></i>Stop Room Move</li>
                    <li><i class="fa-solid fa-star"></i>Vip Guest</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <h5>Room Indicators</h5>
                <hr />
                <div class="col-6">
                  <ul class="Room-Indicators-First">
                    <li><i class="fa-solid fa-ban-smoking"></i>No Smoking</li>
                    <li><i class="fa-solid fa-broom"></i>Dirty</li>
                    <li>
                      <i class="fa-solid fa-clipboard-check"></i>Work Order
                    </li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="Room-Indicators-Secound">
                    <li><i class="fa-solid fa-smoking"></i>Smoking</li>
                    <li><i class="fa-solid fa-link"></i>Connected Rooms</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <hr />
                <div class="col-6">
                  <ul class="Unclassified-First">
                    <li><i class="fas fa-square"></i>Unassigned Room</li>
                    <li><i class="fas fa-square"></i>Unconfirm Bookings</li>
                  </ul>
                </div>
                <div class="col-6">
                  <ul class="Unclassified-Secound">
                    <li><i class="fas fa-square"></i>Inventory</li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- end ul -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
export default {
  name: "HeaderCalender",
  layout: "Component",

  data() {
    return {
      isHovered: false,
      sidebarVisible: false,
      isOn: false,
      isSidebarOpen: false,
    };
  },

  methods: {
    filterCalenderByDate() {
      const flatpickrInstance = flatpickr(this.$refs.datePicker4, {
        dateFormat: "Y-m-d", // Format the date as YYYY-MM-DD
        onChange: (selectedDates) => {
          if (selectedDates.length > 0) {
            const selectedDate = selectedDates[0];
            this.$emit("date-selected", selectedDate); // Emit the selected date
          }
        },
      });
    },
    updateFlatpickr(date) {
      if (this.$refs.datePicker4 && this.$refs.datePicker4._flatpickr) {
        this.$refs.datePicker4._flatpickr.setDate(date); // Update Flatpickr with the new date
      }
    },
  },

  mounted() {
    this.filterCalenderByDate();

    // Set the default date in Flatpickr (e.g., 2 days before today)
    const today = new Date();
    const defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() - 2); // Subtract 2 days from today
    this.updateFlatpickr(defaultDate); // Update Flatpickr with the default date
    this.$emit("date-selected", defaultDate); // Emit the default date
  },

  mixins: [flatpickrMixin],
  props: {
    statistics: {
      type: Object,
      required: true,
    },
  },
};
</script>
