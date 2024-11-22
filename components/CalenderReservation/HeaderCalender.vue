<template>
  <div class="row align-items-baseline p-2 position-relative">
    <div class="col-md-1 col-12 ">
      <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04"
        ref="datePicker4" />
    </div>
    <div class="col-md-7 col-12 ">
      <div class="d-flex items-center gap-4  ">
        <div v-for="(item, index) in categories" :key="index">
          <span>{{ item.label }}</span>
          <span class="circle-shape">
            {{ item.count }}
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-12 ">
      <div class="d-flex items-center gap-4   ">
        <div class="input-group">
          <label class="input-group-text" for="inputGroupSelect01">Reservation Type</label>
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
        <!-- Sidebar -->
        <div>
          <!-- Button to open the sidebar -->
          <button @click="openSidebar" type="button" class="btn btn-outline-primary waves-effect">
            <i class="fa-solid fa-bed"></i>
          </button>

          <!-- Sidebar Component -->
          <Sidebar :isSidebarOpen="isSidebarOpen" :title="'My Dynamic Sidebar'" :width="'400px'"
            @close-sidebar="closeSidebar">
            <!-- Custom content inside the sidebar -->
            <div>
              <h4>Custom Sidebar Content</h4>
              <p>This content was passed using a slot!</p>
            </div>
          </Sidebar>
        </div>

        <div  @mouseenter="isHovered = true" @mouseleave="isHovered = false">
          <button type="button" class="btn btn-outline-primary waves-effect">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <!-- Hover Menu -->
          <div v-show="isHovered" class=" position-absolute right-0 mt-2 w-40 bg-white shadow-lg ">
            <ul>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
              <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul>
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

.switch {
  width: 200px;
}

.switch .switch-toggle-slider {
  width: 5.5rem;
  height: 2.35rem;
  line-height: 2.35rem;
  top: 0;
}

.switch .switch-toggle-slider::after {
  top: 8px;

}
</style>
