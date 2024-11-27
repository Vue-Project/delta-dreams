<template>
  <div class="row align-items-baseline p-2 position-relative">
    <div class="col-md-1 col-12">
      <input
        type="text"
        class="form-control flatpickr-input"
        placeholder="YYYY-MM-DD"
        id="flatpickr-date-04"
        ref="datePicker4"
      />
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
        <div class="input-group">
          <label class="input-group-text" for="inputGroupSelect01"
            >Reservation Type</label
          >
          <select class="form-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <label class="switch">
          <input type="checkbox" class="switch-input" v-model="isOn" />
          <span class="switch-toggle-slider">
            <span class="switch-on">Copy</span>
            <span class="switch-off">compact</span>
          </span>
          <!-- Dynamic text changes based on isOn
          <span class="switch-label">{{ isOn ? 'Switch is ON' : 'Switch is OFF' }}</span> -->
        </label>

        <div @mouseenter="isHovered = true" @mouseleave="isHovered = false">
          <button type="button" class="btn btn-outline-primary waves-effect">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <!-- Hover Menu -->
          <div
            v-show="isHovered"
            class="position-absolute left-0 mt-2 w-40 bg-white shadow-lg"
          >
            <div
              class="ant-popover ant-popover-placement-bottomRight ant-popover-hidden"
              style="left: 586px; top: -999px; transform-origin: 319px -4px"
            >
              <div class="ant-popover-content">
                <div class="ant-popover-arrow">
                  <span class="ant-popover-arrow-content"></span>
                </div>
                <div class="ant-popover-inner" role="tooltip">
                  <div class="ant-popover-inner-content">
                    <div class="sc-dbbhXq fNPngb">
                      <div>
                        <label class="title" for="BOOKING_STATUS"
                          >Booking Status</label
                        >
                        <ul id="BOOKING_STATUS">
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(255, 102, 102)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Arrived</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(51, 102, 255)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Checked Out</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(102, 102, 102)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Due Out</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(51, 204, 0)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Confirmed Reservation</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(0, 0, 102)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Maintenance Block</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(255, 102, 102)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Stayover</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(51, 204, 0)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Dayuse Reservation</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(102, 51, 0)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Dayuse</span
                              ></span
                            >
                          </li>
                        </ul>
                      </div>
                      <div>
                        <label class="title" for="BOOKING_INDI"
                          >Booking Indicators</label
                        >
                        <ul id="BOOKING_INDI">
                          <li>
                            <img
                              id="info_ico_group_owner"
                              src="/frontoffice/static/media/ico_group_owner.8da38dcc.svg"
                              alt="Group Owner"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_ico_group_owner"
                              class="sc-fytwQQ fgpPoR"
                              >Group Owner</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_ico_group"
                              src="/frontoffice/static/media/ico_group.8fc4a4a3.svg"
                              alt="Group Booking"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_ico_group"
                              class="sc-fytwQQ fgpPoR"
                              >Group Booking</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_payment-pending"
                              src="/frontoffice/static/media/payment-pending.115d2a87.svg"
                              alt="Payment Pending"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_payment-pending"
                              class="sc-fytwQQ fgpPoR"
                              >Payment Pending</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_stop-room-move"
                              src="/frontoffice/static/media/stop-room-move.92562199.svg"
                              alt="Stop Room Move"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_stop-room-move"
                              class="sc-fytwQQ fgpPoR"
                              >Stop Room Move</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_ico_single_lady"
                              src="/frontoffice/static/media/ico_single_lady.3cc07a8c.svg"
                              alt="Single Lady"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_ico_single_lady"
                              class="sc-fytwQQ fgpPoR"
                              >Single Lady</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_ico_VIP"
                              src="/frontoffice/static/media/ico_VIP.85e6595a.svg"
                              alt="VIP Guest"
                              class="sc-gYMRRK gAGlQu"
                            /><label for="info_ico_VIP" class="sc-fytwQQ fgpPoR"
                              >VIP Guest</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_Split_Reservation"
                              src="/frontoffice/static/media/Split_Reservation.d6592bed.svg"
                              alt="Split Reservation"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_Split_Reservation"
                              class="sc-fytwQQ fgpPoR"
                              >Split Reservation</label
                            >
                          </li>
                        </ul>
                      </div>
                      <div>
                        <label class="title" for="ROOMINDI"
                          >Room Indicators</label
                        >
                        <ul id="ROOMINDI">
                          <li>
                            <img
                              id="info_nonsmoking"
                              src="/frontoffice/static/media/nonsmoking.c5bbc91d.svg"
                              alt="No Smoking"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_nonsmoking"
                              class="sc-fytwQQ fgpPoR"
                              >No Smoking</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_smoking"
                              src="/frontoffice/static/media/smoking.0f4a6c1a.svg"
                              alt="Smoking"
                              class="sc-gYMRRK gAGlQu"
                            /><label for="info_smoking" class="sc-fytwQQ fgpPoR"
                              >Smoking</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_dirty"
                              src="/frontoffice/static/media/dirty.f7a48a81.svg"
                              alt="Dirty"
                              class="sc-gYMRRK gPNaum"
                            /><label for="info_dirty" class="sc-fytwQQ fgpPoR"
                              >Dirty</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_connected-rooms"
                              src="/frontoffice/static/media/connected-rooms.fabc173c.svg"
                              alt="Connected Rooms"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_connected-rooms"
                              class="sc-fytwQQ fgpPoR"
                              >Connected Rooms</label
                            >
                          </li>
                          <li>
                            <img
                              id="info_workorder"
                              src="/frontoffice/static/media/workorder.6707db3b.svg"
                              alt="Work Order"
                              class="sc-gYMRRK gAGlQu"
                            /><label
                              for="info_workorder"
                              class="sc-fytwQQ fgpPoR"
                              >Work Order</label
                            >
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(189, 216, 255)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Unassigned Room</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(255, 207, 207)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Inventory</span
                              ></span
                            >
                          </li>
                          <li>
                            <span
                              class="ant-badge ant-badge-status ant-badge-not-a-wrapper"
                              ><span
                                class="ant-badge-status-dot"
                                style="background: rgb(255, 83, 83)"
                              ></span
                              ><span class="ant-badge-status-text"
                                >Unconfirm Bookings</span
                              ></span
                            >
                          </li>
                        </ul>
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

  data() {
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
    openSidebar() {
      this.isSidebarOpen = true;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
  mounted() {
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

.switch {
  width: 200px;
}

.switch .switch-toggle-slider {
  width: 5.5rem;
  height: 30px;
  line-height: 26px;
  top: 0;
  left: 0;
}

.switch .switch-toggle-slider::after {
  top: 8px;
}
</style>
