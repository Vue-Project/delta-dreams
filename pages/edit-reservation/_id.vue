<template>
    <div class="row mx-auto my-3">
        <div class="col-md-12">
            <div class="card mb-3 p-3">
                <TopHeader v-if="selectedReservationId !== null" ref="topHeader" :reservationsData="reservationsDataById" :reservationID="selectedReservationId" />
            </div>
            <div class="card mb-3">
                <div class="card-header p-4">
                    <ul class="nav nav-tabs card-header-tabs pb-2" role="tablist">
                        <li class="nav-item col-12 col-md" role="presentation">
                            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#form-tabs-BookingDetails" role="tab" aria-selected="false" tabindex="-1">Booking Details</button>
                        </li>
                        <li class="nav-item col-12 col-md" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-GuestDetails" role="tab" aria-selected="true">Guest Details</button>
                        </li>
                        <li class="nav-item col-12 col-md" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-RoomCharges" role="tab" aria-selected="true">Room Charges</button>
                        </li>

                        <li class="nav-item col-12 col-md" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-AuditTrail" role="tab" aria-selected="true">Audit Trail</button>
                        </li>
                        <li class="nav-item col-12 col-md" role="presentation">
                            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#form-tabs-Wallet" role="tab" aria-selected="true">Wallet</button>
                        </li>
                        <!--  End Nav Tabs -->
                    </ul>
                    <!--  Start  offcanvas Menu  -->
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" :style="{ width: sidebarWidth }" ref="offcanvas">
                        <div class="offcanvas-header">
                            <h5 id="offcanvasEndLabel" class="offcanvas-title">
                                {{ offcanvasTitle }}
                            </h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <hr />
                        <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
                            <div v-if="currentContent === 'UpdateRoomCharges'">
                                <UpdateRoomCharges :reservationData="reservationsDataById[0]" :roomChargeId="selectedRoomChargeId" @update-success="refreshReservationData" @close-offcanvas="hideOffcanvas" />
                            </div>

                            <div v-if="currentContent === 'UpdateRoomChargesAll'">
                                <UpdateRoomChargesAll :reservationData="reservationsDataById[0]" :selectedIds="selectedRoomChargeIds" @update-success="refreshReservationData" @close-offcanvas="hideOffcanvas" />
                            </div>
                            <div v-if="currentContent === 'addpayment'">
                                <AddPayment :reservationId="selectedReservationId" @payment-added="refreshReservationData" @close-offcanvas="hideOffcanvas" />
                            </div>
                        </div>
                    </div>
                    <!--  End  offcanvas Menu -->
                </div>
                <div class="tab-content">
                    <!-- Start Booking Details Tab -->
                    <div class="tab-pane fade active show" id="form-tabs-BookingDetails" role="tabpanel">
                        <div class="row">
                            <div class="col-12">
                                <BookingDetails v-if="selectedReservationId !== null" :reservationData="reservationsDataById[0]" :reservationId="selectedReservationId" @reservation-and-logs-updated="refreshReservationData" />
                            </div>
                        </div>
                    </div>
                    <!-- End Booking Details Tab -->

                    <!-- Start Guest Details Tab -->
                    <div class="tab-pane fade" id="form-tabs-GuestDetails" role="tabpanel">
                        <div class="row">
                            <div v-if="selectedReservationId">
                                <GuestDetails :reservationId="selectedReservationId" :reservationData="reservationsDataById[0]" @guest-updated="refreshReservationData" />
                            </div>
                        </div>
                    </div>
                    <!-- End Guest Details Tab -->

                    <!-- Start Room Charges Tab  -->
                    <div class="tab-pane fade" id="form-tabs-RoomCharges" role="tabpanel">
                        <button type="button" class="btn btn-outline-secondary waves-effect mb-2" @click="handleMultipleEdit">Multiple Edit</button>
                        <div class="table-responsive text-nowrap">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th>
                                            <div class="form-check text-left">
                                                <input class="form-check-input" type="checkbox" @change="toggleAllCheckboxes" v-model="selectAll" aria-label="Select all" />
                                            </div>
                                        </th>
                                        <th>bookingDate</th>
                                        <th>Room</th>
                                        <th>Rate Type</th>
                                        <th>Adults</th>
                                        <th>Children</th>
                                        <th>Net Amount</th>
                                        <th>Setting</th>
                                    </tr>
                                </thead>

                                <tbody class="table-border-bottom-0">
                                    <tr v-for="roomChargeData in roomChargesData" :key="roomChargeData.id">
                                        <td>
                                            <div class="form-check text-left">
                                                <input class="form-check-input" type="checkbox" v-model="roomChargeData.selected" @change="toggleSelection(index, $event)" aria-label="Select room charge" />
                                            </div>
                                        </td>
                                        <!-- Update these cell click handlers to pass the specific ID -->
                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                                            {{ formatDate(roomChargeData.booking_date) }}
                                        </td>
                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                                            {{ roomChargeData.unit.code }}
                                        </td>
                                        <!-- Add the same pattern to all other cells -->
                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                                            {{ roomChargeData.rate_type_name }}
                                        </td>
                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">{{ roomChargeData.adults }}</td>
                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                                            {{ roomChargeData.children }}
                                        </td>
                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                                            {{ roomChargeData.price }}
                                        </td>

                                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                                            <button type="button" class="btn btn-outline-secondary waves-effect">Edit</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <RoomCharges :roomChargesData="roomChargesData" :setOffcanvasContent="setOffcanvasContent" :setSelectedRoomCharge="setSelectedRoomCharge" @update:roomChargesData="roomChargesData = $event" /> -->
                    </div>
                    <!-- End  Room Charges Tab  -->

                    <!--  Start Audit Trail tab  -->
                    <div class="tab-pane fade" id="form-tabs-AuditTrail" role="tabpanel">
                        <AuditTrail :logs="logs" />
                    </div>
                    <!--  End Audit Trail tab  -->

                    <!--  Start Wallet tab  -->
                    <div class="tab-pane fade" id="form-tabs-Wallet" role="tabpanel">
                        <button class="btn btn-outline-secondary waves-effect mb-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('addpayment', 'Add Payment')">Add payment</button>
                        <Wallet v-if="selectedReservationId !== null" :reservation-id="selectedReservationId" :reservation-data="reservationsDataById[0]" @switch-content="currentContent = $event" @wallet-updated="refreshReservationData" />
                    </div>
                    <!--  end Wallet tab  -->
                </div>
            </div>
        </div>

        <!-- <div v-if="isRefreshing" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background: rgba(0, 0, 0, 0.3); z-index: 1050">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div> -->
    </div>
</template>

<script>
    import flatpickrMixin from '../../components/Mixin/flatpickrMixin';
    // import AddPayment from '../../components/SiderbarContentEdit/AddPayment.vue';
    import { getReservationDataById } from '../../Api/editResvertion';
    // import moment from 'moment';
    import { dateMixin } from '../../components/Mixin/DateMixin';
    // import WalletDetails from '../../components/SiderbarContentEdit/WalletDetails.vue';
    import Swal from 'sweetalert2';
    import { mapGetters } from 'vuex/dist/vuex.common.js';
    import PrintReservation from '../../components/Helper/partial/PrintReservation.vue';
    import TopHeader from '../../components/EditReservation/TopHeader.vue';
    import RoomCharges from '../../components/EditReservation/Tabs/RoomCharges.vue';
    import BookingDetails from '../../components/EditReservation/Tabs/BookingDetails.vue';
    import GuestDetails from '../../components/EditReservation/Tabs/GuestDetails.vue';
    import AuditTrail from '../../components/EditReservation/Tabs/AuditTrail.vue';
    import UpdateRoomCharges from '../../components/EditReservation/Sidebar/RoomChargeTab/UpdateRoomCharges.vue';
    import OffcanvasSideBar from '../../components/Helper/partial/OffcanvasSideBar.vue';
    import UpdateRoomChargesAll from '../../components/EditReservation/Sidebar/RoomChargeTab/UpdateRoomChargesAll.vue';
    import Wallet from '../../components/EditReservation/Tabs/Wallet.vue';
    import AddPayment from '../../components/EditReservation/Sidebar/WalletTab/AddPayment.vue';

    export default {
        name: 'EditReservation',
        layout: 'main',
        components: {
            TopHeader,
            // PrintInvoice,
            // SendInvoice,
            AddPayment,
            // AddOperation,
            // UpdateReservation,
            Wallet,
            PrintReservation,
            RoomCharges,
            BookingDetails,
            GuestDetails,
            AuditTrail,
            UpdateRoomCharges,
            OffcanvasSideBar,
            UpdateRoomChargesAll,
        },
        data() {
            return {
                currentContent: null,
                offcanvasTitle: '',
                sidebarWidth: '400px',
                dynamicButtonText: 'Save',
                selectedRoomChargeId: null, // Single selected ID for individual edit
                selectedRoomChargeIds: [], // Array to store multiple selected IDs
                roomChargesData: [],
                printComponentRef: null,
                logs: [],
                reservationsDataById: [],
                selectedReservationId: null, // Initialize as null
                selectAll: false, // Tracks the state of the master checkbox
                isRefreshing: false,
            };
        },
        methods: {
            // Method to set the content of the offcanvas
            setOffcanvasContent(content, title, buttonText = 'Save', width = '400px') {
                this.currentContent = content;
                this.offcanvasTitle = title;
                this.sidebarWidth = width;
                this.dynamicButtonText = buttonText;
            },
            clearOffcanvasContent() {
                this.currentContent = null; // Reset the content
                this.offcanvasTitle = ''; // Reset the title
                this.sidebarWidth = '400px'; // Reset the sidebar width
            },
            hideOffcanvas() {
                // Use Bootstrap's Offcanvas API to hide the offcanvas
                const offcanvasElement = this.$refs.offcanvas;
                if (offcanvasElement) {
                    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                    if (offcanvas) {
                        offcanvas.hide();
                    } else {
                        console.error('Offcanvas instance not found.');
                    }
                } else {
                    console.error('Offcanvas element not found.');
                }
            },
            // Method to set the content of the offcanvas

            async handleMultipleEdit() {
                // Get all selected room charge IDs
                const selectedIds = this.roomChargesData.filter(item => item.selected).map(item => item.id);

                // console.log('Selected IDs for multiple edit:', selectedIds); // Debugging: Log selected IDs
                // Check if any items are selected
                if (selectedIds.length === 0) {
                    // Show an alert if no items are selected
                    this.$toast?.error('Please select at least one room charge to edit');
                    return;
                }

                try {
                    // You can either:
                    // 2. Or open an offcanvas with the selected IDs for further editing
                    this.selectedRoomChargeIds = selectedIds;
                    this.setOffcanvasContent('UpdateRoomChargesAll', 'Update Multiple Room Charges');

                    // Show the offcanvas
                    const offcanvasElement = document.getElementById('offcanvasEnd');
                    if (offcanvasElement) {
                        const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                        offcanvas.show();
                    }
                } catch (error) {
                    console.error('Error processing multiple edit:', error);
                    this.$toast?.error('Failed to process multiple edit request');
                }
            },
            toggleAllCheckboxes() {
                this.roomChargesData.forEach(item => {
                    item.selected = this.selectAll;
                });
            },
            setSelectedRoomCharge(roomChargeId) {
                this.selectedRoomChargeId = roomChargeId;
                this.setOffcanvasContent('UpdateRoomCharges', 'Update Room Charges');
            },

            async refreshReservationData() {
                this.isRefreshing = true;
                try {
                    const id = this.$route.params.id;
                    const response = await getReservationDataById(id);
                    this.reservationsDataById = [response.data.data];
                    this.roomChargesData = response.data.data.items;
                    this.logs = response.data.logs.data;
                } catch (error) {
                    console.error('Error refreshing reservation data:', error);
                } finally {
                    this.isRefreshing = false;
                }
            },
        },

        async mounted() {
            const id = this.$route.params.id; // Get the dynamic ID from the route

            try {
                const [ReservationDataByIdResponse] = await Promise.all([getReservationDataById(id)]);

                this.reservationsDataById = [ReservationDataByIdResponse.data.data];
                this.roomChargesData = ReservationDataByIdResponse.data.data.items;
                this.logs = ReservationDataByIdResponse.data.logs.data;
                if (this.reservationsDataById.length > 0) {
                    this.selectedReservationId = this.reservationsDataById[0].id; // Set to the first reservation's ID
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
            const offcanvas = document.getElementById('offcanvasEnd');
            offcanvas.addEventListener('hidden.bs.offcanvas', this.resetSelections);
            this.$nextTick(() => {
                const offcanvasElement = this.$refs.offcanvas;
                if (offcanvasElement) {
                    offcanvasElement.addEventListener('hidden.bs.offcanvas', this.clearOffcanvasContent);
                } else {
                    console.error('Offcanvas ref not found.');
                }
            });
            // this.roomChargesData = this.roomChargesData.map(item => ({
            //     ...item,
            //     selected: false,
            // }));
        },

        beforeDestroy() {
            const offcanvasElement = this.$refs.offcanvas;
            if (offcanvasElement) {
                offcanvasElement.removeEventListener('hidden.bs.offcanvas', this.clearOffcanvasContent);
            } else {
                console.warn('Offcanvas ref not found during beforeDestroy.');
            }
        },
        computed: {
            ...mapGetters(['getReservationRejects']),
        },
        mixins: [flatpickrMixin, dateMixin],
    };
</script>

<style></style>
