<template>
  <div>
    <HeaderCalender
      ref="headerCalender"
      @date-selected="handleDateSelected"
      @show-all-resources="$emit('show-all-resources')"
      @show-building-resources="$emit('show-building-resources', $event)"
      :statistics="statistics"
      :buildingNames="buildingNames"
    />
    <!-- <div class="dropdown">
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
    </div> -->
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
  methods: {
    handleDateSelected(selectedDate) {
      this.$emit("date-selected", selectedDate);
    },
  },
};
</script>

<style scoped>



</style>
