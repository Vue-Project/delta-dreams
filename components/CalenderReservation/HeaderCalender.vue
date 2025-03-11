<template>
  <div class="row justify-content-between p-2 position-relative ">
    <!-- Left Column - Date and Building Filter -->
    <div class=" col-lg-6 col-md-8 col-md-12 mb-2 ">
      <div class="row ">
        <!-- Date Picker -->
        <div class="col-lg-4 col-md-6 col-12">
          <div class="position-relative">
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04" ref="datePicker4" aria-label="Select date" />
            <i class="fa-solid fa-calendar-days date-icon"></i>
          </div>
        </div>

        <!-- Building Filter -->
        <div class="col-md-6 col-12 ">
          <div class="dropdown w-100">
            <button class="btn btn-primary dropdown-toggle w-100" type="button" id="buildingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter pe-2"></i>Filter Buildings
            </button>
            <ul class="dropdown-menu  w-100" aria-labelledby="buildingsDropdown">
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
        <div class=" d-block col-6 d-sm-none">
          <button type="button" class="btn w-100 btn-primary waves-effect waves-light" @click="quickReservation">
            <i class="fa-solid fa-hotel pr-2"></i>Quick Reservation
          </button>
        </div>
      </div>
    </div>

    <!-- Right Column - Filters and Info -->
    <div class="col-lg-6 col-md-12 pt-5 pt-md-0">
      <div class="row g-2">
        <!-- Apply Button -->
        <div class="col-xl-3 col-lg-4 col-md-6 col-12 order-md-1">
          <button class="btn btn-primary w-100" @click="applyFilters">
            Apply Filters
          </button>
        </div>
        <div class="col-xl-3 col-lg-4 col-md-4 col-6 order-md-1 order-sm-2 quick-reservation">
          <button class="btn btn-primary w-100" @click="quickReservation">
            Quick Reservation
          </button>
        </div>

        <!-- Rate Types Filter -->
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 pt-2 pt-md-0 order-md-2">
          <div class="dropdown w-100">
            <button class="btn btn-primary dropdown-toggle w-100" type="button" id="rateTypesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter pe-2"></i>Filter Rate Types
              <span v-if="selectedRateTypes.length" class="badge bg-light text-dark ms-1">
                {{ selectedRateTypes.length }}
              </span>
            </button>
            <ul class="dropdown-menu   w-100" aria-labelledby="rateTypesDropdown">
              <li v-for="(type, index) in getRateTypes" :key="index">
                <a class="dropdown-item" href="#" @click.prevent="toggleRateType(index)">
                  <input type="checkbox" :value="index" v-model="selectedRateTypes" class="form-check-input me-2" />
                  <span>{{ type }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Projects Filter -->
        <div class="col-xl-4 col-lg-4 col-md-6 col-12 order-md-3 pt-5 pt-md-0">
          <div class="dropdown w-100 ps-lg-2">
            <button class="btn btn-primary dropdown-toggle w-100" type="button" id="projectsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter pe-2"></i>Filter Projects
              <span v-if="selectedProjects.length" class="badge bg-light text-dark ms-1">
                {{ selectedProjects.length }}
              </span>
            </button>
            <ul class="dropdown-menu w-100" aria-labelledby="projectsDropdown">
              <li v-for="project in getProjects" :key="project.id">
                <a class="dropdown-item" href="#" @click.prevent="toggleProject(project.id)">
                  <input type="checkbox" :value="project.id" v-model="selectedProjects" class="form-check-input me-2" />
                  <span>{{ project.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Apply Button -->
        <div class=" pt-5 col-md-6 d-block d-sm-none col-12 ">
          <button class="btn btn-primary w-100" @click="applyFilters">
            Apply Filters
          </button>
        </div>



        <!-- Info Button with Hover Menu -->

      </div>
    </div>

  </div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
import { mapState, mapGetters } from 'vuex';
import { handleSubmissionError, showSuccessAlert } from "../../Api/MassageValidation/alertUtilities";
import { getCalenderFilter, postCalenderFilter } from "../../Api/CalenderApi";

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
      // await this.getFilterData();
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
      // await this.getFilterData();
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
      await this.getFilterData();
    },
    async getFilterData ()
    {
      try {
        const filterCalender = {
          project_ids: this.selectedProjects,
          rate_types: this.selectedRateTypes,
        };
        const response = await getCalenderFilter(filterCalender);
        this.data = response.data;
        // location.reload();
        // Emit the updated data to BookingCalendar
        this.$root.$emit('calendar-data-updated', response.data);

      } catch (error) {
        console.log(error);
      }
    },
    async applyFilters ()
    {
      await this.getFilterData();
    },
    quickReservation ()
    {
      this.$router.push("/add-reservation");
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
  //       await this.getFilterData();
  //     }, 500),
  //     deep: true
  //   },
  //   selectedProjects: {
  //     handler: _.debounce(async function(newVal) {
  //       await this.getFilterData();
  //     }, 500),
  //     deep: true
  //   },
  //   selectedBuildings: {
  //     handler: _.debounce(async function(newVal) {
  //       await this.getFilterData();
  //     }, 500),
  //     deep: true
  //   }
  // },
};
</script>

<style scoped>
@media (max-width: 768px) {
  /* .dropdown-menu {
    position: fixed !important;
    left: 50% !important;
    transform: translateX(-50%);
    min-width: 90vw;
    max-width: 95vw;
  } */

  .btn {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 576px) {
  .btn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .badge {
    font-size: 10px;
    padding: 4px 6px;
  }

  .position-absolute {
    position: fixed !important;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
  }
}

.z-3 {
  z-index: 1000;
}

.list-unstyled li {
  padding: 3px 0;
}
</style>
