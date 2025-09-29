<template>
    <div class="row mx-auto my-3">
        <div class="col-md-12">
            <div class="card mb-3 p-3">
                <TopHeader v-if="selectedReservationId !== null" ref="topHeader" :reservationsData="reservationsDataById" :reservationID="selectedReservationId" />
            </div>
            <div class="card mb-3">
                <div class="card-header p-4">
                    <!-- start  Tabs title -->
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
                        <OffcanvasSideBar />
                    </ul>
                </div>

                <div class="tab-content">
                    <!-- Start Booking Details Tab -->
                    <div class="tab-pane fade active show" id="form-tabs-BookingDetails" role="tabpanel">
                        <div class="row">
                            <div class="col-12">
                                <BookingDetails :reservationData="reservationsDataById[0]" :reservationId="selectedReservationId" @reservation-and-logs-updated="refreshReservationData" />
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
                        <RoomCharges :reservationData="reservationsDataById[0]" />
                    </div>
                    <!-- End  Room Charges Tab  -->

                    <!--  Start Audit Trail tab  -->
                    <div class="tab-pane fade" id="form-tabs-AuditTrail" role="tabpanel">
                        <AuditTrail :reservationData="reservationsDataById[0]" />
                    </div>
                    <!--  End Audit Trail tab  -->

                    <!--  Start Wallet tab  -->
                    <div class="tab-pane fade" id="form-tabs-Wallet" role="tabpanel">
                        <button class="btn btn-outline-secondary waves-effect mb-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setOffcanvasContent('addpayment', 'Add Payment')">Add payment</button>
                        <WalletDetails :reservation-id="selectedReservationId" :reservation-data="reservationsDataById[0]" @switch-content="currentContent = $event" @wallet-updated="refreshReservationData" />
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

    // import UpdateDetails from '../../components/SiderbarContentEdit/UpdateDetails.vue';
    // import DefaultComponentGuest from '../../components/SiderbarContentEdit/GuestDetailsComponents/DefaultComponentGuest.vue';
    // import DefaultContentBooking from '../../components/SiderbarContentEdit/BookingDetailsComponents/UpdateReservation.vue';
    // import SendInvoice from '../../components/SiderbarContentEdit/SendInvoice.vue';
    // import PrintInvoice from '../../components/SiderbarContentEdit/PrintInvoice.vue';
    // import AddPayment from '../../components/SiderbarContentEdit/AddPayment.vue';
    import { cancelReservation, getReservationDataById } from '../../Api/editResvertion';
    import moment from 'moment';
    import { dateMixin } from '../../components/Mixin/DateMixin';
    // import UpdateReservation from '../../components/SiderbarContentEdit/BookingDetailsComponents/UpdateReservation.vue';
    import { GetReservationItems } from '../../Api/addResvertionApi';
    import { showSuccessAlert, handleSubmissionError, showConfirmationAlertWithSelect } from '../../Api/MassageValidation/alertUtilities';
    import { showConfirmationAlert } from '../../Api/MassageValidation/alertUtilities';
    // import WalletDetails from '../../components/SiderbarContentEdit/WalletDetails.vue';
    import Swal from 'sweetalert2';
    import { postCancelReservation, postStatusChange } from '../../Api/editResvertion';
    // import UpdateDetailsAll from '../../components/SiderbarContentEdit/UpdateDetailsAll.vue';
    import { mapGetters } from 'vuex/dist/vuex.common.js';
    // import UpdateDetailsAll from '../../components/SiderbarContentEdit/UpdateDetailsAll.vue';
    import PrintReservation from '../../components/Helper/partial/PrintReservation.vue';
    import TopHeader from '../../components/EditReservation/TopHeader.vue';
    import RoomCharges from '../../components/EditReservation/Tabs/RoomCharges.vue';
    import BookingDetails from '../../components/EditReservation/Tabs/BookingDetails.vue';
    import GuestDetails from '../../components/EditReservation/Tabs/GuestDetails.vue';
    import AuditTrail from '../../components/EditReservation/Tabs/AuditTrail.vue';
    import UpdateRoomCharges from '../../components/EditReservation/Sidebar/RoomChargeTab/UpdateRoomCharges.vue';
    import OffcanvasSideBar from '../../components/Helper/partial/OffcanvasSideBar.vue';

    export default {
        name: 'EditsPage',
        layout: 'main',
        components: {
            TopHeader,
            // PrintInvoice,
            // SendInvoice,
            // AddPayment,
            // AddOperation,
            // UpdateReservation,
            // WalletDetails,
            PrintReservation,
            RoomCharges,
            BookingDetails,
            GuestDetails,
            AuditTrail,
            UpdateRoomCharges,
            OffcanvasSideBar,
        },
        data() {
            return {
                currentContent: null,
                roomChargesData: [],
                printComponentRef: null,
                logs: [],
                selectedRoomChargeIds: [], // Array to store multiple selected IDs
                offcanvasTitle: '',
                sidebarWidth: '400px',
                dynamicButtonText: 'Save',

                activeTab: null, // No tab is active by default
                reservationsDataById: [],
                selectedReservationId: null, // Initialize as null
                selectAll: false, // Tracks the state of the master checkbox
                selectedRowData: null, // Store the clicked row's data
                isRefreshing: false,

                rows: [
                    {
                        date: '08/12/2024 Sun',
                        room: '252-Test',
                        rateType: 'السعر شامل الافطار',
                        pax: '1/0',
                        charge: '100.00',
                        discount: '0.0',
                        tax: '0.00',
                        adjustment: '0.00',
                        netAmount: '100.00',
                        selected: false, // Tracks if this row is selected
                    },
                ],
            };
        },
        mounted() {
            this.roomChargesData = this.roomChargesData.map(item => ({
                ...item,
                selected: false,
            }));
        },
        methods: {
            handleCellClick(rowData) {
                // console.log("Clicked row data:", rowData); // Debugging: Log the row data
                this.$emit('show-update-details', rowData); // Emit the event
            },
            setActiveTab(tab) {
                this.activeTab = tab;
            },

            // setOffcanvasContent(content, title, buttonText = 'Save', width = '400px') {
            //     this.currentContent = content;
            //     this.offcanvasTitle = title;
            //     this.sidebarWidth = width;
            //     this.dynamicButtonText = buttonText;
            // },

            // clearOffcanvasContent() {
            //     this.currentContent = null; // Reset the content
            //     this.offcanvasTitle = ''; // Reset the title
            //     this.sidebarWidth = '400px'; // Reset the sidebar width
            // },
            // Load a new active component (specific for guest or another area)
            // loadComponent(componentName, target = 'activeComponent') {
            //     if (target === 'activeComponent') {
            //         this.activeComponent = componentName;
            //     } else if (target === 'bookingDetailsComponent') {
            //         this.bookingDetailsComponent = componentName;
            //     }
            // },
            // Reset each component independently
            // goBack(target = 'activeComponent') {
            //     if (target === 'activeComponent') {
            //         this.activeComponent = 'DefaultComponentGuest'; // Reset for activeComponent
            //     } else if (target === 'bookingDetailsComponent') {
            //         this.bookingDetailsComponent = 'DefaultContentBooking'; // Reset for bookingDetailsComponent
            //         console.log('Reset bookingDetailsComponent to DefaultContentBooking');
            //     } else {
            //         console.warn(`Invalid target: ${target}`);
            //     }
            // },
            // toggleAll() {
            //     // Toggle all row checkboxes based on the master checkbox
            //     this.rows.forEach(row => {
            //         row.selected = this.selectAll;
            //     });
            // },
            // updateSelectAll() {
            //     // Update master checkbox based on row checkboxes
            //     this.selectAll = this.rows.every(row => row.selected);
            // },

            statusBadgeClass(status) {
                return {
                    'bg-label-primary': status === 'pending', // Blue for pending/waiting
                    'bg-label-success': status === 'approved', // Green for approved
                    'bg-label-danger': status === 'cancelled', // Red for cancelled
                    'bg-label-info': status === 'check_in', // Light blue for check in
                    'bg-label-warning': status === 'check_out', // Orange/yellow for check out
                    'bg-label-secondary': status === 'finished', // Gray for finished
                };
            },
            handleShowUpdateDetails(rowData) {
                console.log('Received row data in parent:', rowData); // Debugging: Log the row data

                // Set the current content to 'updatedetails'
                this.currentContent = 'fefefeff34f';

                // Set the selected reservation ID and data
                this.selectedReservationId = rowData.reservation_id;
                this.reservationsDataById = [rowData]; // Wrap the row data in an array

                // Update the offcanvas title
                this.offcanvasTitle = 'Update Reservation Details';

                // Show the offcanvas
                const offcanvasElement = this.$refs.offcanvas;
                if (offcanvasElement) {
                    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                    offcanvas.show(); // Show the offcanvas
                    console.log('Offcanvas shown'); // Debugging: Confirm offcanvas is shown
                } else {
                    console.error('Offcanvas element not found'); // Debugging: Log an error if the element is missing
                }
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
            async cancelReservation() {
                // Show SweetAlert2 confirmation dialog
                const selectOptions = this.getReservationRejects;
                const result = await showConfirmationAlertWithSelect('Are you sure you want to cancel this Reservation?', 'Please select a reason for cancellation', Object.fromEntries(Object.entries(selectOptions).map(([key, value]) => [value.id, value.name])), 'Confirm', 'Cancel');

                // Proceed only if the user confirms
                if (result.isConfirmed) {
                    try {
                        const rejectedValue = result.value; // This will now be the key/id

                        const response = await postCancelReservation(this.selectedReservationId, rejectedValue);

                        // Show success alert
                        await showSuccessAlert(
                            'Reservation cancelled successfully!', // Custom message
                            this.$router,
                            'index', // Route name
                        );
                    } catch (error) {
                        handleSubmissionError(
                            error,
                            'Failed to cancel reservation', // Updated error message
                        );
                    }
                }
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
            handlePrint() {
                // Call the print method on the child component
                this.$refs.topHeader.print();
            },
        },

        mixins: [flatpickrMixin, dateMixin],

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
            // const offcanvas = document.getElementById('offcanvasEnd');
            // offcanvas.addEventListener('hidden.bs.offcanvas', this.resetSelections);
            // this.$nextTick(() => {
            //     const offcanvasElement = this.$refs.offcanvas;
            //     if (offcanvasElement) {
            //         offcanvasElement.addEventListener('hidden.bs.offcanvas', this.clearOffcanvasContent);
            //     } else {
            //         console.error('Offcanvas ref not found.');
            //     }
            // });
        },

        // beforeDestroy() {
        //     const offcanvasElement = this.$refs.offcanvas;
        //     if (offcanvasElement) {
        //         offcanvasElement.removeEventListener('hidden.bs.offcanvas', this.clearOffcanvasContent);
        //     } else {
        //         console.warn('Offcanvas ref not found during beforeDestroy.');
        //     }
        // },
        computed: {
            ...mapGetters(['getReservationRejects']),
        },
    };
</script>

<style>
    .badge {
        padding: 0.5em 0.75em;
        font-size: 0.875em;
    }

    .bg-label-primary {
        background-color: rgba(13, 110, 253, 0.1);
        color: #0d6efd;
    }

    .bg-label-success {
        background-color: rgba(25, 135, 84, 0.1);
        color: #198754;
    }

    .bg-label-danger {
        background-color: rgba(220, 53, 69, 0.1);
        color: #dc3545;
    }
</style>
