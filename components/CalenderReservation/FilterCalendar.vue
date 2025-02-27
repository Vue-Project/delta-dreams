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
    <button type="button" class="btn btn-primary waves-effect waves-light position-absolute top-5 start-0 ml-2" @click="quickReservation">
      <i class="fa-solid fa-hotel pr-2"></i>Quick Reservation
                          </button>
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
    quickReservation() {
      this.$router.push("/add-reservation");
    },
  },
};
</script>

<style scoped>



</style>
