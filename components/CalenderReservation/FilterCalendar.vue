<template>
  <div>
    <HeaderCalender ref="headerCalender" @date-selected="handleDateSelected" :statistics="statistics" />

    <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle btn-block col-lg-12 col-sm-7" type="button" id="dropdownFilterButton" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-filter pe-2"></i>Filter Resources
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownFilterButton">
        <li>
          <a class="dropdown-item" href="#" @click.prevent="toggleSelectAll">
            <input type="checkbox" v-model="selectAll" class="form-check-input me-2" />
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
</template>

<script>
import HeaderCalender from "./HeaderCalender.vue";

export default {
  name: "FilterCalendar",
  components: {
    HeaderCalender,
  },
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
  data() {
    return {
      selectedBuildings: [], // Holds the selected buildings
      selectAll: false, // Controls the "Show All" checkbox
    };
  },
  methods: {
    handleDateSelected(selectedDate) {
      // Forward the selected date to the MainComponent
      this.$emit("date-selected", selectedDate);
    },
    // Toggle "Show All" checkbox
    toggleSelectAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        // If "Show All" is checked, clear selected buildings and emit "show-all-resources"
        this.selectedBuildings = [];
        this.$emit("show-all-resources");
      } else {
        // If "Show All" is unchecked, emit the current selected buildings
        this.$emit("show-building-resources", this.selectedBuildings);
      }
    },
    // Toggle individual building selection
    toggleBuilding(building) {
      if (this.selectedBuildings.includes(building)) {
        // If the building is already selected, remove it
        this.selectedBuildings = this.selectedBuildings.filter((b) => b !== building);
      } else {
        // If the building is not selected, add it
        this.selectedBuildings.push(building);
      }

      // Update "Show All" checkbox state
      this.selectAll = this.selectedBuildings.length === 0;

      // Emit the selected buildings
      this.$emit("show-building-resources", this.selectedBuildings);
    },
  },
  watch: {
    // Watch for changes in selectedBuildings to update "Show All" checkbox
    selectedBuildings(newVal) {
      if (newVal.length === 0) {
        this.selectAll = true; // If no buildings are selected, check "Show All"
      } else {
        this.selectAll = false; // If any buildings are selected, uncheck "Show All"
      }
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: absolute;
  left: 0px;
  width: 280px;
  max-width: 280px;
  margin: 0 9px ;
}

.dropdown-menu {
  padding: 10px;
  width: 280px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.form-check-input {
  margin-right: 8px;
}
</style>
