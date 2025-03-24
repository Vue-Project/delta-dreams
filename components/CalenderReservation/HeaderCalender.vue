<template>
  <div class="row justify-content-between p-2 position-relative">
    <!-- Left Column - Date and Building Filter -->
    <div class="col-lg-6 col-md-8 col-md-12 mb-2">
      <div class="row">
        <!-- Date Picker -->
        <div class="col-lg-4 col-md-6 col-12">
          <div class="position-relative">
            <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04" ref="datePicker4" aria-label="Select date" />
            <i class="fa-solid fa-calendar-days date-icon"></i>
          </div>
        </div>

        <!-- Building Filter - Always Visible -->
        <div class="col-lg-4 col-md-6 col-12">
          <div class="dropdown w-100">
            <button class="btn btn-primary dropdown-toggle w-100" type="button" id="buildingsDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter pe-2"></i>filter types
              <span v-if="selectedBuildings.length" class="badge bg-light text-dark ms-1">
                {{ selectedBuildings.length }}
              </span>
            </button>
            <ul class="dropdown-menu w-100" aria-labelledby="buildingsDropdown">
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
                <a class="dropdown-item" href="#" @click.stop.prevent="toggleBuilding(building, $event)">
                  <input
                    type="checkbox"
                    :checked="selectedBuildings.includes(building)"
                    class="form-check-input me-2"
                    @click.stop
                  />
                  <span>{{ building }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Filters and Info -->
    <div class="col-lg-6 col-md-12">
      <div class="row g-2">
        <!-- Quick Reservation - Always Visible -->
        <div class="col-6 col-lg-4 order-1 quick-reservation">
          <button class="btn btn-primary w-100" @click="quickReservation">
            Quick Reservation
          </button>
        </div>

        <!-- Mobile Filter Button -->
        <div class="col-6 col-lg-4 order-2 d-lg-none">
          <button class="btn btn-primary w-100" @click="toggleSidebar">
            <i class="fa-solid fa-filter pe-2"></i>More Filters
          </button>
        </div>

        <!-- Desktop Only Filters -->
        <div class="d-none d-lg-block col-lg-4 order-2">
          <button class="btn btn-primary w-100" @click="applyFilters">
            Apply Filters
          </button>
        </div>

        <!-- Rate Types Filter - Desktop Only -->
        <div class="d-none d-lg-block col-lg-4 order-3">
          <div class="dropdown w-100">
            <button class="btn btn-primary dropdown-toggle w-100" type="button" id="rateTypesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-filter pe-2"></i>Filter Rate Types
              <span v-if="selectedRateTypes.length" class="badge bg-light text-dark ms-1">
                {{ selectedRateTypes.length }}
              </span>
            </button>
            <ul class="dropdown-menu w-100" aria-labelledby="rateTypesDropdown">
              <li v-for="(type, index) in getRateTypes" :key="index">
                <a class="dropdown-item" href="#" @click.prevent="toggleRateType(index)">
                  <input type="checkbox" :value="index" v-model="selectedRateTypes" class="form-check-input me-2" />
                  <span>{{ type }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Projects Filter - Desktop Only -->
        <div class="d-none d-lg-block col-lg-4 order-4">
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
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div
      class="mobile-sidebar"
      :class="{ 'show': isSidebarOpen }"
    >
      <div class="sidebar-header">
        <h5>Filters</h5>
        <button class="btn-close" @click="toggleSidebar"></button>
      </div>
      <div class="sidebar-content">
        <!-- Rate Types Filter -->
        <div class="mb-3">
          <label class="form-label">Rate Types</label>
          <div class="filter-list">
            <div v-for="(type, index) in getRateTypes" :key="index" class="form-check">
              <input type="checkbox" :value="index" v-model="selectedRateTypes" class="form-check-input" :id="'rate-'+index" />
              <label class="form-check-label" :for="'rate-'+index">{{ type }}</label>
            </div>
          </div>
        </div>

        <!-- Projects Filter -->
        <div class="mb-3">
          <label class="form-label">Projects</label>
          <div class="filter-list">
            <div v-for="project in getProjects" :key="project.id" class="form-check">
              <input type="checkbox" :value="project.id" v-model="selectedProjects" class="form-check-input" :id="'project-'+project.id" />
              <label class="form-check-label" :for="'project-'+project.id">{{ project.name }}</label>
            </div>
          </div>
        </div>

        <button class="btn btn-primary w-100" @click="applyFiltersAndCloseSidebar">
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Add this right before the mobile-sidebar div -->
    <div
      class="sidebar-overlay"
      v-if="isSidebarOpen"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script>
import flatpickrMixin from "../Mixin/flatpickrMixin";
import { mapState, mapGetters } from 'vuex';
import { handleSubmissionError, showSuccessAlert } from "../../Api/MassageValidation/alertUtilities";
import { getCalenderFilter, postCalenderFilter } from "../../Api/CalenderApi";
import _ from 'lodash'; // Add this import for Lodash


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
    toggleSelectAllBuildings() {
      this.selectAllBuildings = !this.selectAllBuildings;
      if (this.selectAllBuildings) {
        this.selectedBuildings = [];
        this.$emit("show-all-resources");
      } else {
        // When unchecking "Show All", don't select any buildings by default
        this.$emit("show-building-resources", this.selectedBuildings);
      }
    },

    async toggleBuilding(building, event) {
  // Prevent event bubbling
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Manually handle the checkbox state
  const index = this.selectedBuildings.indexOf(building);
  let newSelectedBuildings = [...this.selectedBuildings];

  if (index !== -1) {
    // Remove if already selected
    newSelectedBuildings.splice(index, 1);
  } else {
    // Add if not selected
    newSelectedBuildings.push(building);
    // Turn off "Show All" when selecting a specific building
    this.selectAllBuildings = false;
  }

  // Update the array
  this.selectedBuildings = newSelectedBuildings;

  // Only set selectAllBuildings to true if no buildings are selected
  if (this.selectedBuildings.length === 0) {
    this.selectAllBuildings = true;
    this.$emit("show-all-resources");
  } else {
    this.$emit("show-building-resources", this.selectedBuildings);
  }

  // IMPORTANT: Don't call getFilterData() here as it might be overriding your building selection
  // Instead, let the parent component handle the building filter
},
async getFilterData() {
  try {
    const filterCalender = {
      project_ids: this.selectedProjects,
      rate_types: this.selectedRateTypes,
      building_ids: this.selectedBuildings.length > 0 ? this.selectedBuildings : null
    };

    const response = await getCalenderFilter(filterCalender);
    this.data = response.data;

    // Emit the updated data to BookingCalendar
    this.$root.$emit('calendar-data-updated', response.data);

    // IMPORTANT: Make sure to preserve building filter after data is updated
    if (this.selectedBuildings.length > 0) {
      this.$emit("show-building-resources", this.selectedBuildings);
    }
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
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      if (this.isSidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    applyFiltersAndCloseSidebar() {
      this.getFilterData();
      this.toggleSidebar();
    }
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
  watch: {
  selectedBuildings(newVal) {
    if (newVal.length === 0) {
      this.selectAllBuildings = true;
    } else {
      this.selectAllBuildings = false;
    }
    // Don't call getFilterData here for buildings - let the parent handle it
  },
  selectedRateTypes: {
    handler: _.debounce(async function(newVal) {
      await this.getFilterData();
    }, 500),
    deep: true
  },
  selectedProjects: {
    handler: _.debounce(async function(newVal) {
      await this.getFilterData();
    }, 500),
    deep: true
  }
}
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

.mobile-sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 85%;
  height: 100vh;
  background-color: white;
  z-index: 1050;
  transition: right 0.3s ease;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  overflow-y: auto;
}

.mobile-sidebar.show {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.filter-list {
  max-height: 200px;
  overflow-y: auto;
}

.sidebar-content {
  padding: 1rem 0;
}

@media (min-width: 992px) {
  .mobile-sidebar {
    display: none;
  }
}

@media (max-width: 991px) {
  .mobile-sidebar {
    top: 0;
    height: 100vh;
    padding-top: 1rem;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    display: none;
  }

  .sidebar-overlay.show {
    display: block;
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1049;
}
</style>
