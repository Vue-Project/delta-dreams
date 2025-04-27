<template>
    <div class="card mb-3">
        <!-- Date Picker -->

        <div class="card-header">
            <ul class="nav nav-tabs" role="tablist">
                <div class="col-md-2 col-12 calendarDate mt-2">
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04" ref="datePicker4" aria-label="input for date" v-model="selectedDate" />
                    <i class="fa-solid fa-calendar-days date-icon"></i>
                </div>
                <li class="nav-item col-6 col-md" role="presentation" v-for="tab in tabs" :key="tab">
                    <button class="nav-link" :class="{ active: activeTab === tab }" @click="setActiveTab(tab)">
                        {{ tab }}
                        <span class="badge rounded-pill badge-center h-px-30 w-px-30 bg-label-danger ms-1 p-2">
                            {{ statisticsHeaderRoomView[tab] }}
                        </span>
                    </button>
                </li>
            </ul>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
            <div v-for="tab in tabs" :key="tab" class="tab-pane fade" :class="{ 'active show': activeTab === tab }">
                <div class="room-grid">
                    <div class="card mb-3 text-left cursor-pointer" v-for="room in tabData[tab].data" :key="room.id" :class="['room', room.status]" @click="handleRoomClick(room)">
                        <div class="card-header cursor-move p-1">
                            <div class="icon-wrapper float-end" @mouseenter="hoveredIcon = { type: 'smoking', id: room.id }" @mouseleave="hoveredIcon = null">
                                <i class="fa-solid" :class="room.is_smooking === 1 ? 'fa-smoking' : 'fa-ban-smoking'" style="color: #9f9ca8"></i>

                                <div v-if="hoveredIcon && hoveredIcon.type === 'smoking' && hoveredIcon.id === room.id" class="popover-content position-absolute p-2 bg-light shadow rounded" style="top: 10px; right: 60px">
                                    <span>
                                        {{ room.is_smooking === 1 ? 'Smoking allowed' : 'No smoking allowed' }}
                                    </span>
                                </div>
                            </div>
                            <p class="fs-5">unit Code: {{ room?.building.name }} / {{ room.code }}</p>
                        </div>
                        <div class="card-body p-1 position-relative">
                            <div class="d-flex justify-content-start align-items-start">
                                <!-- Reservation details on the left -->
                                <div class="reservation-details">
                                    <!-- Show reservation details only if reservation exists -->
                                    <template v-if="room.reservation">
                                        <p class="fs-5">Reservation Number: {{ room.reservation.id }}</p>
                                        <p class="fs-5">Checkin Date: {{ room.reservation.checkin_date }}</p>
                                        <p class="fs-5">Checkout Date: {{ room.reservation.checkout_date }}</p>
                                        <p class="fs-5">Rate Type : {{ room.reservation.rate_type_name }}</p>
                                    </template>
                                </div>

                                <!-- Availability Status Indicator on the right -->
                                <div v-if="!room.reservation" class="availability-status p-2 text-center bg-success text-white rounded h-25">
                                    <i class="fa-solid fa-check-circle me-1"></i>
                                    <span>Room Available</span>
                                </div>
                            </div>

                            <div class="icon-wrapper" @mouseenter="hoveredIcon = { type: 'clean', id: room.id }" @mouseleave="hoveredIcon = null">
                                <i class="fa-solid" :class="room.is_clean === 1 ? 'fa-broom' : 'fa-dust'" style="color: #9f9ca8"></i>

                                <div v-if="hoveredIcon && hoveredIcon.type === 'clean' && hoveredIcon.id === room.id" class="popover-content position-absolute p-2 bg-light shadow rounded" style="bottom: 15px; left: 20px">
                                    <span>
                                        {{ room.is_clean === 1 ? 'This room needs cleaning' : ' This room is clean' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Room Details Sidebar -->
        <!-- <RoomDetailsSidebar
      :is-open="selectedRoom !== null"
      :room="selectedRoom || {}"
      @close="selectedRoom = null"
      @book-room="handleBookRoom"
      @view-history="handleViewHistory"
    /> -->
    </div>
</template>

<script>
    import { getRooms } from '../../Api/roomViewApi';
    import Swal from 'sweetalert2';
    import flatpickrMixin from '../Mixin/flatpickrMixin';

    export default {
        name: 'reservations',
        layout: 'component',

        data() {
            return {
                activeTab: 'all',
                selectedDate: null,
                statisticsHeaderRoomView: {},
                hoveredIcon: null, // To track the hovered icon
                tabs: ['all', 'vacant', 'occupied', 'reserved', 'blocked', 'dueout', 'dirty'], // List of tabs
                tabData: {
                    all: { data: [], loading: false, error: null },
                    vacant: { data: [], loading: false, error: null },
                    occupied: { data: [], loading: false, error: null },
                    reserved: { data: [], loading: false, error: null },
                    blocked: { data: [], loading: false, error: null },
                    dueout: { data: [], loading: false, error: null },
                    dirty: { data: [], loading: false, error: null },
                },
                selectedRoom: null,
            };
        },
        methods: {
            setActiveTab(tab) {
                this.activeTab = tab;
                this.fetchTabData(tab);
            },

            // Fetch data for a specific tab
            async fetchTabData(tab) {
                try {
                    // console.log(`Fetching data for tab: ${tab} with date: ${this.selectedDate}`);
                    const responseData = await getRooms(tab, this.selectedDate);
                    // console.log(`API response for tab ${tab}:`, responseData);

                    if (responseData?.data) {
                        const filteredData = this.filterDataByTab(responseData.data, tab);
                        this.tabData[tab].data = filteredData;

                        if (responseData.statistics) {
                            this.statisticsHeaderRoomView = responseData.statistics;
                        }
                    } else {
                        // console.error('Invalid response structure:', responseData);
                        this.tabData[tab].error = 'Invalid response data';
                    }
                } catch (error) {
                    this.tabData[tab].error = error;
                    // console.error(`Error fetching data for ${tab}:`, error);
                    // Initialize empty data on error to prevent undefined errors
                    this.tabData[tab].data = [];
                    this.statisticsHeaderRoomView[tab] = 0;
                } finally {
                    this.tabData[tab].loading = false;
                }
            },

            // Filter data to show only relevant rooms for the tab
            filterDataByTab(data, tab) {
                if (tab === 'all') {
                    return data; // Show all data for the "all" tab
                }
                return data.filter(room => room.status === tab); // Filter by status
            },

            handleRoomClick(room) {
                if (room.status === 'blocked') {
                    // Show block details with SweetAlert
                    Swal.fire({
                        title: 'Room is Blocked',
                        html: `
            <div class="text-left">
              <p><strong>From:</strong> ${room.block?.start_date || 'N/A'}</p>
              <p><strong>To:</strong> ${room.block?.end_date || 'N/A'}</p>
              <p><strong>Reason:</strong> ${room.block?.reason.name || 'No reason specified'}</p>
            </div>
          `,
                        icon: 'info',
                        confirmButtonText: 'Close',
                        showClass: {
                            popup: 'animate__animated animate__bounceIn',
                        },
                        hideClass: {
                            popup: 'animate__animated animate__bounceOut',
                        },
                    });
                } else if (room.reservation?.id) {
                    // Navigate to edit reservation if reservation exists
                    this.$router.push(`/edit-reservation/${room.reservation.id}`);
                } else {
                    // Show no reservation alert with SweetAlert
                    Swal.fire({
                        title: 'No Reservation',
                        text: 'No reservation data available for this room',
                        icon: 'info',
                        confirmButtonText: 'OK',
                        showClass: {
                            popup: 'animate__animated animate__bounceIn',
                        },
                        hideClass: {
                            popup: 'animate__animated animate__bounceOut',
                        },
                    });
                }
            },
        },
        watch: {
            // Watch for changes in the selected date
            selectedDate(newDate) {
                // Fetch data for the active tab only when the date changes
                this.fetchTabData(this.activeTab);
            },
        },
        mounted() {
            this.selectedDate = new Date().toISOString().split('T')[0]; // Set default date to today
            flatpickr(this.$refs.datePicker4, {
                dateFormat: 'Y-m-d',
                defaultDate: this.selectedDate,
                onChange: (selectedDates, dateStr) => {
                    this.selectedDate = dateStr;
                },
            });

            this.fetchTabData(this.activeTab);
        },
        mixins: [flatpickrMixin],
    };
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }

    .room:hover {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>
