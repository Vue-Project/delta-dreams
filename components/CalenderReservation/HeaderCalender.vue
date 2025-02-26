<template>
  <div class="row d-flex justify-content-between p-2 position-relative">

    <div class="col-lg-2 col-12 calendarDate">
      <input type="text" class="form-control flatpickr-input mb-sm-2" placeholder="YYYY-MM-DD" id="flatpickr-date-04" ref="datePicker4" aria-label="input for date" />
      <i class="fa-solid fa-calendar-days date-icon"></i>
    </div>

    <div class="col-lg-4 col-12">
      <div v-if="hasSelections">
        <button class="btn btn-success float-end" @click="applyFilters">
          Apply Filters
        </button>
      </div>
    </div>
    <!-- <div class="d-flex items-center gap-4">
        <div v-for="(count, label) in statistics" :key="label">
          <span>{{ label }}</span>
          <span class="statistics-count">
            {{ count }}
          </span>
        </div>
      </div> -->
    <div class="col-lg-6 col-12">
      <div class="d-flex items-center justify-content-end gap-4">
        <div class="w-100">
          <div class="row">
            <div class="col-md-4">
              <div class="dropdown w-100 ">
                <button class="btn  btn-primary  dropdown-toggle w-100" type="button" id="buildingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-filter pe-2"></i>Filter Buildings
                </button>
                <ul class="dropdown-menu" aria-labelledby="buildingsDropdown">
                  <li>
                    <a class="dropdown-item" href="#" @click.prevent="toggleSelectAllBuildings">
                      <input type="checkbox" v-model="selectAllBuildings" class="form-check-input me-2" />
                      <span>Show All</span>
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li v-for="building in buildingNames" :key="building">
                    <a class="dropdown-item" href="#" @click.prevent="toggleBuilding(building)">
                      <input type="checkbox" v-model="selectedBuildings" :value="building" class="form-check-input me-2" />
                      <span>{{ building }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <div class="dropdown w-100">
                <button class="btn btn-primary dropdown-toggle w-100" type="button" id="rateTypesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-filter pe-2"></i>Filter Rate Types
                  <span v-if="selectedRateTypes.length" class="badge bg-light text-dark ms-1">
                    {{ selectedRateTypes.length }}
                  </span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="rateTypesDropdown">
                  <!-- <li>
                    <a class="dropdown-item" href="#" @click.prevent="toggleSelectAllRateTypes">
                      <input type="checkbox" v-model="selectAllRateTypes" class="form-check-input me-2">
                      <span>Show All</span>
                    </a>
                  </li> -->
                  <!-- <li><hr class="dropdown-divider"></li> -->
                  <li v-for="(type, index) in getRateTypes" :key="index">
                    <a class="dropdown-item" href="#" @click.prevent="toggleRateType(index)">
                      <input type="checkbox" :value="index" v-model="selectedRateTypes" class="form-check-input me-2">
                      <span>{{ type }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-4">
              <div class="dropdown w-100 ">
                <button class="btn btn-primary dropdown-toggle w-100" type="button" id="projectsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-filter pe-2"></i>Filter Projects
                  <span v-if="selectedProjects.length" class="badge bg-light text-dark ms-1">
                    {{ selectedProjects.length }}
                  </span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="projectsDropdown">
                  <!-- <li>
                    <a class="dropdown-item" href="#" @click.prevent="toggleSelectAllProjects">
                      <input type="checkbox" v-model="selectAllProjects" class="form-check-input me-2">
                      <span>Show All</span>
                    </a>
                  </li> -->
                  <!-- <li><hr class="dropdown-divider"></li> -->
                  <li v-for="project in getProjects" :key="project.id">
                    <a class="dropdown-item" href="#" @click.prevent="toggleProject(project.id)">
                      <input type="checkbox" :value="project.id" v-model="selectedProjects" class="form-check-input me-2">
                      <span>{{ project.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>


          </div>


        </div>
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
import { mapState, mapGetters } from 'vuex';
import _ from 'lodash';
import { handleSubmissionError, showSuccessAlert } from "../../Api/MassageValidation/alertUtilities";

export default {
  name: "HeaderCalender",
  layout: "Component",

  data ()
  {
    return {
      isHovered: false,
      sidebarVisible: false,
      isOn: false,
      isSidebarOpen: false,
      selectedRateTypes: [],
      selectedProjects: [],
      showRateTypesDropdown: false,
      showProjectsDropdown: false,
      selectAllRateTypes: false,
      selectAllProjects: false,
      selectedBuildings: [],
      selectAllBuildings: true,
    };
  },

  methods: {
    filterCalenderByDate ()
    {
      const flatpickrInstance = flatpickr(this.$refs.datePicker4, {
        dateFormat: "Y-m-d", // Format the date as YYYY-MM-DD
        onChange: (selectedDates) =>
        {
          if (selectedDates.length > 0) {
            const selectedDate = selectedDates[0];
            this.$emit("date-selected", selectedDate); // Emit the selected date
          }
        },
      });
    },
    updateFlatpickr (date)
    {
      if (this.$refs.datePicker4 && this.$refs.datePicker4._flatpickr) {
        this.$refs.datePicker4._flatpickr.setDate(date); // Update Flatpickr with the new date
      }
    },
    toggleRateTypesDropdown ()
    {
      this.showRateTypesDropdown = !this.showRateTypesDropdown;
      this.showProjectsDropdown = false;
    },
    toggleProjectsDropdown ()
    {
      this.showProjectsDropdown = !this.showProjectsDropdown;
      this.showRateTypesDropdown = false;
    },
    toggleSelectAllRateTypes ()
    {
      this.selectAllRateTypes = !this.selectAllRateTypes;
      if (this.selectAllRateTypes) {
        this.selectedRateTypes = this.getRateTypes.map((_, index) => index);
      } else {
        this.selectedRateTypes = [];
      }
    },
    toggleSelectAllProjects ()
    {
      this.selectAllProjects = !this.selectAllProjects;
      if (this.selectAllProjects) {
        this.selectedProjects = this.getProjects.map(project => project.id);
      } else {
        this.selectedProjects = [];
      }
    },
    async toggleRateType (index)
    {
      const idx = this.selectedRateTypes.indexOf(index);
      if (idx === -1) {
        this.selectedRateTypes.push(index);
      } else {
        this.selectedRateTypes.splice(idx, 1);
      }
      this.selectAllRateTypes = this.selectedRateTypes.length === this.getRateTypes.length;
      await this.sendSelectionsToServer();
    },
    async toggleProject (projectId)
    {
      const idx = this.selectedProjects.indexOf(projectId);
      if (idx === -1) {
        this.selectedProjects.push(projectId);
      } else {
        this.selectedProjects.splice(idx, 1);
      }
      this.selectAllProjects = this.selectedProjects.length === this.getProjects.length;
      await this.sendSelectionsToServer();
    },
    toggleSelectAllBuildings ()
    {
      this.selectAllBuildings = !this.selectAllBuildings;
      if (this.selectAllBuildings) {
        this.selectedBuildings = [];
        this.$emit("show-all-resources");
      } else {
        this.$emit("show-building-resources", this.selectedBuildings);
      }
    },
    async toggleBuilding (building)
    {
      if (this.selectedBuildings.includes(building)) {
        this.selectedBuildings = this.selectedBuildings.filter((b) => b !== building);
      } else {
        this.selectedBuildings.push(building);
      }
      this.selectAllBuildings = this.selectedBuildings.length === 0;
      this.$emit("show-building-resources", this.selectedBuildings);
      await this.sendSelectionsToServer();
    },
    async sendSelectionsToServer ()
    {

      try {
        const payload = {
          project_id: this.selectedProjects,
          rate_types: this.selectedRateTypes,
        };
        console.log(payload);

        // await showSuccessAlert(
        //     "Reservation cancelled successfully!", // Custom message

        //   );

      } catch (error) {
        // handleSubmissionError(
        //     error,
        //     "Failed to cancel reservation" // Updated error message
        //   );
        }
    },
    async applyFilters ()
    {
      await this.sendSelectionsToServer();

    },
  },

  mounted ()
  {
    this.filterCalenderByDate();

    // Set the default date in Flatpickr (e.g., 2 days before today)
    const today = new Date();
    const defaultDate = new Date(today);
    defaultDate.setDate(today.getDate() - 2); // Subtract 2 days from today
    this.updateFlatpickr(defaultDate); // Update Flatpickr with the default date
    this.$emit("date-selected", defaultDate); // Emit the default date
  },
  computed: {

    ...mapGetters([
      'getRateTypes',
      'getProjects',
      'getProjects'
    ]),
    hasSelections ()
    {
      return this.selectedRateTypes.length > 0 || this.selectedProjects.length > 0;
    }


  },

  mixins: [flatpickrMixin],
  props: {
    statistics: {
      type: Object,
      required: true,
    },
    buildingNames: {
      type: Array,
      required: true,
    },
  },
  // watch: {
  //   selectedBuildings(newVal) {
  //     if (newVal.length === 0) {
  //       this.selectAllBuildings = true;
  //     } else {
  //       this.selectAllBuildings = false;
  //     }
  //   },
  //   selectedRateTypes: {
  //     handler: _.debounce(async function(newVal) {
  //       await this.sendSelectionsToServer();
  //     }, 500),
  //     deep: true
  //   },
  //   selectedProjects: {
  //     handler: _.debounce(async function(newVal) {
  //       await this.sendSelectionsToServer();
  //     }, 500),
  //     deep: true
  //   },
  //   selectedBuildings: {
  //     handler: _.debounce(async function(newVal) {
  //       await this.sendSelectionsToServer();
  //     }, 500),
  //     deep: true
  //   }
  // },
};
</script>

<style scoped>

</style>
