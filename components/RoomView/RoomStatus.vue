<template>
  <div class="card mb-3">
    <!-- Date Picker -->

    <div class="card-header">
      <ul class="nav nav-tabs " role="tablist">
        <div class="col-md-2 col-12 calendarDate mt-2">
      <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04" ref="datePicker4" aria-label="input for date" v-model="selectedDate" />
      <i class="fa-solid fa-calendar-days date-icon"></i>
    </div>
        <li class="nav-item" role="presentation" v-for="tab in tabs" :key="tab">
          <button class="nav-link" :class="{ active: activeTab === tab }" @click="setActiveTab(tab)">
            {{ tab }}
            <span class="badge rounded-pill badge-center h-px-30 w-px-30 bg-label-danger ms-1 p-2">
              {{ statisticsHeaderRoomView[tab] || 0 }}
            </span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <div v-for="tab in tabs" :key="tab" class="tab-pane fade" :class="{ 'active show': activeTab === tab }">
        <div class="room-grid">
          <div class="card mb-3 text-left" v-for="room in tabData[tab].data" :key="room.id" :class="['room', room.status]">
            <div class="card-header cursor-move p-1">
              <div class="icon-wrapper float-end" @mouseenter="hoveredIcon = { type: 'smoking', id: room.id }" @mouseleave="hoveredIcon = null">
                <i class="fa-solid" :class="room.is_smooking === 1 ? 'fa-smoking' : 'fa-ban-smoking'
                  " style="color: #9f9ca8"></i>

                <div v-if="
                  hoveredIcon &&
                  hoveredIcon.type === 'smoking' &&
                  hoveredIcon.id === room.id
                " class="popover-content position-absolute p-2 bg-light shadow rounded" style="top: 10px; right: 60px">
                  <span>
                    {{
                      room.is_smooking === 1
                        ? "Smoking allowed"
                        : "No smoking allowed"
                    }}
                  </span>
                </div>
              </div>
              {{ room.name }}
            </div>
            <div class="card-body p-1 position-relative">
              <p class="fs-5">
                (Single الفندق غرفه وصاله)
              </p>
              <div class="icon-wrapper" @mouseenter="hoveredIcon = { type: 'clean', id: room.id }" @mouseleave="hoveredIcon = null">
                <i class="fa-solid" :class="room.is_clean === 1 ? 'fa-broom' : 'fa-dust'" style="color: #9f9ca8"></i>

                <div v-if="
                  hoveredIcon &&
                  hoveredIcon.type === 'clean' &&
                  hoveredIcon.id === room.id
                " class="popover-content position-absolute p-2 bg-light shadow rounded" style="bottom: 15px; left: 20px">
                  <span>
                    {{
                      room.is_clean === 1
                        ? "This room needs cleaning"
                        : " This room is clean"
                    }}
                  </span>
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
import { getRooms } from '../../Api/roomViewApi';
export default {
  name: "reservations",
  layout: "component",

  data ()
  {
    return {
      activeTab: "all",
      selectedDate: null,
      statisticsHeaderRoomView: {},
      hoveredIcon: null,// To track the hovered icon
      tabs: ["all", "vacant", "occupied", "reserved", "blocked", "dueout", "dirty"], // List of tabs
      tabData: {
        all: { data: [], loading: false, error: null },
        vacant: { data: [], loading: false, error: null },
        occupied: { data: [], loading: false, error: null },
        reserved: { data: [], loading: false, error: null },
        blocked: { data: [], loading: false, error: null },
        dueout: { data: [], loading: false, error: null },
        dirty: { data: [], loading: false, error: null },
      },
    };
  },
  methods: {
    setActiveTab (tab)
    {
      this.activeTab = tab;
      this.fetchTabData(tab);
    },

    // Fetch data for a specific tab
    async fetchTabData (tab)
    {


      try {
        console.log(`Fetching data for tab: ${tab} with date: ${this.selectedDate}`); // Log the tab and date
        const responseData = await getRooms(tab, this.selectedDate); // Pass tab and date to API
        console.log(`API response for tab ${tab}:`, responseData); // Log the API response

        const filteredData = this.filterDataByTab(responseData.data.data, tab);
        this.tabData[tab].data = filteredData;

        // Update statistics (if needed)
        this.statisticsHeaderRoomView = responseData.data.statistics;
      } catch (error) {
        this.tabData[tab].error = error;
        console.error(`Error fetching data for ${tab}:`, error); // Log the error
      } finally {
        this.tabData[tab].loading = false;
      }
    },

    // Filter data to show only relevant rooms for the tab
    filterDataByTab (data, tab)
    {
      if (tab === "all") {
        return data; // Show all data for the "all" tab
      }
      return data.filter((room) => room.status === tab); // Filter by status
    },
  },
  watch: {
    // Watch for changes in the selected date
    selectedDate (newDate)
    {
      // Fetch data for the active tab only when the date changes
      this.fetchTabData(this.activeTab);
    },
  },
  mounted ()
  {
    this.selectedDate = new Date().toISOString().split('T')[0]; // Set default date to today
    flatpickr(this.$refs.datePicker4, {
      dateFormat: 'Y-m-d',
      defaultDate: this.selectedDate,
      onChange: (selectedDates, dateStr) =>
      {
        this.selectedDate = dateStr;
      },
    });

    this.fetchTabData(this.activeTab);
  },
};
</script>

<style></style>
