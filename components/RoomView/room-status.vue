<template>
    <div class="card mb-3">
        <!-- Date Picker -->

        <div class="card-header">
            <ul class="nav nav-tabs" role="tablist">
                <div class="col-md-3 col-lg-2 col-8 calendarDate mt-2">
                    <input type="text" class="form-control flatpickr-input" placeholder="YYYY-MM-DD" id="flatpickr-date-04" ref="datePicker4" aria-label="input for date" v-model="selectedDate" />
                    <i class="fa-solid fa-calendar-days date-icon"></i>
                </div>
                <div class="col-4 mt-2 d-block d-md-none">
                    <button
                        class="btn"
                        :class="{
                            'btn-primary': viewMode === 'card',
                            'btn-secondary': viewMode !== 'card',
                        }"
                        @click="setViewMode('card')"
                    >
                        <i class="fa-solid fa-grip"></i>
                    </button>
                    <button
                        class="btn"
                        :class="{
                            'btn-primary': viewMode === 'list',
                            'btn-secondary': viewMode !== 'list',
                        }"
                        @click="setViewMode('list')"
                    >
                        <i class="fa-solid fa-list"></i>
                    </button>
                </div>
                <li class="nav-item col-6 col-md" role="presentation" v-for="tab in tabs" :key="tab">
                    <button class="nav-link" :class="{ active: activeTab === tab }" @click="setActiveTab(tab)">
                        {{ tab }}
                        <span class="badge rounded-pill badge-center h-px-30 w-px-30 bg-label-danger ms-1 p-2">
                            {{ statisticsHeaderRoomView[tab] || 0 }}
                        </span>
                    </button>
                </li>
                <div class="ms-auto me-3 d-none d-md-block">
                    <button
                        class="btn"
                        :class="{
                            'btn-primary': viewMode === 'card',
                            'btn-secondary': viewMode !== 'card',
                        }"
                        @click="setViewMode('card')"
                    >
                        <i class="fa-solid fa-grip"></i>
                    </button>
                    <button
                        class="btn"
                        :class="{
                            'btn-primary': viewMode === 'list',
                            'btn-secondary': viewMode !== 'list',
                        }"
                        @click="setViewMode('list')"
                    >
                        <i class="fa-solid fa-list"></i>
                    </button>
                </div>
            </ul>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
            <div v-for="tab in tabs" :key="tab" class="tab-pane fade" :class="{ 'active show': activeTab === tab }">
                <!-- عرض البطاقات -->
                <div v-if="viewMode === 'card'" class="row">
                    <div class="col-12 col-md-6 col-lg-4 mb-4 cursor-pointer" v-for="room in tabData[tab].data" :key="room.id" @click="handleRoomClick(room)">
                        <div class="card h-100">
                            <div class="card-header d-flex align-items-center justify-content-between">
                                <div class="card-title mb-0 d-flex">
                                    <i class="text-primary fa-solid fa-hotel fs-3 mr-2 mb-2"></i>
                                    <h5 class="m-0 me-2">{{ room.reservation?.reserved_by?.name || 'No Guest' }}</h5>
                                </div>

                            </div>

                            <div class="card-body">
                                <div class="row d-flex align-items-center justify-content-center text-center mb-3">
                                    <div class="bg-light col-md-5">
                                        <div class="text-dark">{{ formatDate(room.reservation?.checkin_date) }}</div>
                                        <div>{{ room.reservation?.checkin_time || '00:00:00' }}</div>
                                    </div>
                                    <div class="bg-secondary col-md-2">
                                        <div class="text-dark">
                                            {{ (new Date(room.reservation?.checkout_date) - new Date(room.reservation?.checkin_date)) / (1000 * 3600 * 24) || 0 }}
                                        </div>
                                        <div>Nights</div>
                                    </div>
                                    <div class="bg-light col-md-5">
                                        <div class="text-dark">{{ formatDate(room.reservation?.checkout_date) }}</div>
                                        <div>{{ room.reservation?.checkout_time || '15:00:00' }}</div>
                                    </div>
                                </div>

                                <div class="row mb-5">
                                    <div class="col-md-10">
                                        <div>reservation type</div>
                                        <div>{{ room.reservation?.reservation_type_name || 'No Reservation' }}</div>
                                    </div>
                                    <div class="col-md-10">
                                        <div>Booking Date</div>
                                        <div>{{ formatDate(room.reservation?.booking_source?.created_at) }}</div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <i class="fa-solid fa-person"></i>
                                            {{ room.reservation?.children || '0' }}
                                            <i class="fa-solid fa-child"></i>
                                            {{ room.reservation?.adults || '0' }}
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div>building / unit / rooms</div>
                                        <div>{{ room.building?.name || 'No name' }} / {{ room.code || 'No code' }} / {{ room.rooms || "No room" }}</div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-10">Total</div>
                                    <div class="col-md-2">${{ room.reservation?.unit?.price || '0.00' }}</div>
                                    <div class="col-md-10">Paid</div>
                                    <div class="col-md-2">${{ room.reservation?.unit?.paid || '0.00' }}</div>
                                    <div class="col-md-10 text-danger">Balance</div>
                                    <div class="col-md-2 text-danger">${{ (room.reservation?.unit?.price || 0) - (room.reservation?.unit?.paid || 0) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- عرض القائمة -->
                <div v-else class="list-group">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="table-light">
                                <tr>
                                    <th>Guest Name</th>
                                    <th>Res. Type</th>
                                    <th>Arrival</th>
                                    <th>Departure</th>
                                    <th>Booking Info</th>
                                    <th>Total ($)</th>
                                    <th>Paid ($)</th>
                                    <th>Balance ($)</th>
                                </tr>
                            </thead>
                            <tbody class="table-border-bottom-0 cursor-pointer">
                                <tr @click="handleRoomClick(room)" v-for="room in tabData[tab].data" :key="room.id">
                                    <td>
                                        <h5 class="m-0 me-2">{{ room.reservation?.reserved_by?.name || 'No Guest' }}</h5>
                                        <div>
                                            <i class="fa-solid fa-person"></i>
                                            {{ room.reservation?.children || '0' }}
                                            <i class="fa-solid fa-child"></i>
                                            {{ room.reservation?.adults || '0' }}
                                        </div>
                                    </td>
                                    <td>
                                        <p class="m-0 me-2">{{ room.reservation?.reservation_type_name || 'No Reservation' }}</p>
                                    </td>
                                    <td>
                                        <p class="m-0 me-2">{{ formatDate(room.reservation?.checkin_date) }}</p>
                                        <p class="m-0 me-2">{{ room.reservation?.checkin_time || '00:00:00' }}</p>
                                    </td>
                                    <td>
                                        <p class="m-0 me-2">{{ formatDate(room.reservation?.checkout_date) }}</p>
                                        <p class="m-0 me-2">{{ room.reservation?.checkout_time || '15:00:00' }}</p>
                                    </td>
                                    <td>
                                        <p class="m-0 me-2">{{ room.building?.name || 'No name' }} / {{ room.code || 'No code' }} / {{ room.rooms || "No room"}}</p>
                                        <p class="m-0 me-2">Booking Date: {{ formatDate(room.reservation?.booking_source?.created_at) }}</p>
                                    </td>
                                    <td>
                                        <p class="m-0 me-2">${{ room.reservation?.unit?.price || '0.00' }}</p>
                                    </td>
                                    <td>
                                        <p class="m-0 me-2">${{ room.reservation?.unit?.paid || '0.00' }}</p>
                                    </td>
                                    <td class="d-flex justify-content-between border-bottom-0">
                                        <p class="m-0 me-2 text-danger">${{ (room.reservation?.unit?.price || 0) - (room.reservation?.unit?.paid || 0) }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
                hoveredMenu: {},
                selectedDate: null,
                statisticsHeaderRoomView: {},
                hoveredIcon: null,
                tabs: ['all', 'vacant', 'occupied', 'reserved', 'blocked', 'dueout', 'dirty'],
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
                viewMode: 'card',
            };
        },
        methods: {
            setActiveTab(tab) {
                this.activeTab = tab;
                this.fetchTabData(tab);
            },
            setViewMode(mode) {
                this.viewMode = mode;
            },
            toggleMenu(roomId, state) {
                this.$set(this.hoveredMenu, roomId, state);
            },
            formatDate(dateStr) {
                const date = new Date(dateStr);
                if (isNaN(date)) return 'Invalid date';
                return date.toLocaleDateString();
            },
            async fetchTabData(tab) {
                try {
                    const responseData = await getRooms(tab, this.selectedDate);
                    if (responseData?.data) {
                        const filteredData = this.filterDataByTab(responseData.data, tab);
                        this.tabData[tab].data = filteredData;

                        if (responseData.statistics) {
                            this.statisticsHeaderRoomView = responseData.statistics;
                        }
                    } else {
                        this.tabData[tab].error = 'Invalid response data';
                    }
                } catch (error) {
                    this.tabData[tab].error = error;
                    this.tabData[tab].data = [];
                    this.statisticsHeaderRoomView[tab] = 0;
                } finally {
                    this.tabData[tab].loading = false;
                }
            },
            filterDataByTab(data, tab) {
                if (tab === 'all') {
                    return data;
                }
                return data.filter(room => room.status === tab);
            },
            handleRoomClick(room) {
                if (room.status === 'blocked') {
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
                    this.$router.push(`/edit-reservation/${room.reservation.id}`);
                } else {
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
            selectedDate(newDate) {
                this.fetchTabData(this.activeTab);
            },
        },
        mounted() {
            this.selectedDate = new Date().toISOString().split('T')[0];
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
