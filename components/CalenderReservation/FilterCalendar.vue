<template>
  <div>
    <HeaderCalender :statistics="statisticsHeaderCalender" />
    <div class="filter-buttons">
      <button class="btn btn-primary" @click="showAllResources">Show All</button>
      <button
        v-for="building in buildingNames"
        :key="building"
        class="btn btn-secondary mr-2"
        @click="showBuildingResources(building)"
      >
        Show {{ building }}
      </button>
    </div>
  </div>
</template>

<script>
import HeaderCalender from "./HeaderCalender.vue";
export default {
  name: "FilterCalendar",
  layout: "Component",
  components: {
    HeaderCalender,
  },
  props: {
    statisticsHeaderCalender: {
      type: Array,
      required: true,
    },
    buildingNames: {
      type: Array,
      required: true,
    },
  },
  methods: {
  // Show all resources (no filter)
    showAllResources() {
      this.$emit("show-all-resources");
    },

    showBuildingResources(building) {
      this.$emit("show-building-resources", building);
    },
  },
};
</script>
