<template>
  <div class="row align-items-baseline p-2 position-relative">
    <div class="col-md-1 col-12 calendarDate">
      <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04"
        ref="datePicker4" />
      <i class="fa-solid fa-calendar-days date-icon"></i>
    </div>
    <div class="col-md-7 col-12">
      <div class="d-flex items-center gap-4">
        <div v-for="(item, index) in categories" :key="index">
          <span>{{ item.label }}</span>
          <span class="circle-shape">
            {{ item.count }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-12">
      <div class="d-flex items-center gap-4">
        <div class="w-100">
          <select class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
            <option selected>The price is not included</option>
            <option value="1">The price includes breakfast</option>
          </select>
        </div>
        <label class="switch">
          <input type="checkbox" class="switch-input" v-model="isOn" aria-label="switch input to copy and compact" />
          <span class="switch-toggle-slider">
            <span class="switch-on">Copy</span>
            <span class="switch-off">compact</span>
          </span>
        </label>

        <div @mouseenter="isHovered = true" @mouseleave="isHovered = false">
          <button type="button" class="btn btn-outline-primary waves-effect">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <!-- Hover Menu -->
          <div v-show="isHovered" class="position-absolute left-0 mt-2 w-40 bg-white shadow-lg">
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
                    <li><i class="fa-solid fa-dollar-sign"></i>Payment Pending</li>
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
                    <li><i class="fa-solid fa-clipboard-check"></i>Work Order</li>
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
            <!-- out side box -->
            <div class="ant-popover ant-popover-placement-bottomRight ant-popover-hidden"
              style="left: 586px; top: -999px; transform-origin: 319px -4px">
              <div class="ant-popover-content">
                <div class="ant-popover-arrow">
                  <span class="ant-popover-arrow-content"></span>
                </div>
                <div class="ant-popover-inner" role="tooltip">
                  <div class="ant-popover-inner-content"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Sidebar from "../layout/Sidebar.vue";
export default {
  name: "HeadlerCalender",
  layout: "Component",
  components: { Sidebar },

  data ()
  {
    return {
      isHovered: false,
      sidebarVisible: false,
      categories: [
        { label: "All", count: 3 },
        { label: "Vacant", count: 3 },
        { label: "Occupied", count: 0 },
        { label: "Reserved", count: 0 },
        { label: "Blocked", count: 0 },
        { label: "Due Out", count: 0 },
        { label: "Dirty", count: 3 },
      ],
      isOn: false,
      isSidebarOpen: false,
    };
  },
  methods: {
    openSidebar ()
    {
      this.isSidebarOpen = true;
    },
    closeSidebar ()
    {
      this.isSidebarOpen = false;
    },
  },
  mounted ()
  {
    flatpickr(this.$refs.datePicker4, {
      dateFormat: "Y-m-d",
    });
  },
};
</script>

<style scoped>
.circle-shape {
  display: inline-block;
  text-align: center;
  background-color: rgb(236, 243, 248);
  height: 24px;
  border-radius: 12px;
  min-width: 24px;
  line-height: 24px;
}
</style>
