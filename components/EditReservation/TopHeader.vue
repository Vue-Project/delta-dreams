<template>
    <div>
        reservationID: {{ reservationID }}
        <div class="row align-items-center" v-for="reservationData in reservationsData" :key="reservationData.id">
            <div class="col-md-6">
                <div class="row">
                    <div class="col-12 col-md-4 col-xl-4 mb-3 mb-md-0">
                        <div class="me-2 py-2 d-flex">
                            <NuxtLink to="/"><i class="fa-solid fa-angle-left pr-2" style="color: #6f6b7d"></i></NuxtLink>
                            <i class="ps-3 pr-2 text-primary fs-3 fa-solid fa-user"></i>

                            {{ reservationData.client?.name || reservationData.user?.name }}

                            <small class="text-muted ml-3 text-primary">
                                <i class="fa-solid fa-person pr-2 text-primary"></i>
                                {{ reservationData.adults }}
                                <i class="fa-solid fa-baby pr-2 text-primary"></i>
                                {{ reservationData.children }}
                            </small>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 col-xl-3 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Arrival Date</h6>
                            <small class="text-muted">{{ formatDate(reservationData.checkin_date) }} {{ reservationData.checkin_time }}</small>
                        </div>
                    </div>

                    <div class="col-6 col-md-3 col-xl-3 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Booking Date</h6>
                            <small class="text-muted">
                                {{ formatDate(reservationData.checkout_date) }}
                                {{ reservationData.checkout_time }}
                            </small>
                        </div>
                    </div>
                    <div class="col-6 col-md-2 col-xl-2 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Create At</h6>
                            <small class="text-muted">
                                {{ formatTimeAndDate(reservationData.created_at) }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row align-items-center">
                    <div class="col-6 col-md-4 col-xl-2 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Room Number/Room Type</h6>
                            <small class="text-muted">{{ reservationData.unit.rooms }}/{{ reservationData.rate_type_name || 'Suite الفندق غرفتين وصاله' }}</small>
                        </div>
                    </div>
                    <div class="col-6 col-md-4 col-xl-2 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Nights</h6>
                            <small class="text-muted">
                                {{ (new Date(reservationData.checkout_date) - new Date(reservationData.checkin_date)) / (1000 * 3600 * 24) }}
                            </small>
                        </div>
                    </div>
                    <div class="col-6 col-md-4 col-xl-2 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Reservation Name</h6>
                            <small class="text-muted">{{ reservationData.name || '14541' }}</small>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 col-xl-2 mb-3 mb-md-0">
                        <div class="me-2">
                            <h6>Status</h6>
                            <small class="badge" :style="{ backgroundColor: reservationData.status_color }">
                                {{ reservationData.status_name }}
                            </small>
                        </div>
                    </div>
                    <div class="col-6 col-md-5 col-xl-2 text-center text-md-center" v-if="reservationData?.is_cancel">
                        <button type="button" class="btn btn-label-danger waves-effect mt-3" title="Cancel Reservation" @click="cancelReservation">Cancel</button>
                    </div>
                    <div class="col-6 col-md-5 col-xl-2 text-center text-md-center">
                        <PrintReservation ref="printReservation" :reservationData="reservationsData[0]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { postCancelReservation } from '../../Api/editResvertion';
    import { handleSubmissionError, showConfirmationAlertWithSelect, showSuccessAlert } from '../../Api/MassageValidation/alertUtilities';
    import PrintReservation from '../Helper/partial/PrintReservation.vue';
    import { dateMixin } from '../../components/Mixin/DateMixin';
    import { mapGetters } from 'vuex/dist/vuex.common.js';

    export default {
        name: 'TopHeader',
        data() {
            return {};
        },
        components: {
            PrintReservation,
        },
        methods: {
            handlePrint() {
                // Call the print method on the child component
                this.$refs.printReservation.print();
            },
            async cancelReservation() {
                // Show SweetAlert2 confirmation dialog
                const selectOptions = this.getReservationRejects;
                const result = await showConfirmationAlertWithSelect('Are you sure you want to cancel this Reservation?', 'Please select a reason for cancellation', Object.fromEntries(Object.entries(selectOptions).map(([key, value]) => [value.id, value.name])), 'Confirm', 'Cancel');

                // Proceed only if the user confirms
                if (result.isConfirmed) {
                    try {
                        const rejectedValue = result.value;
                        await postCancelReservation(this.reservationID, rejectedValue);

                        // Show success alert
                        await showSuccessAlert('Reservation cancelled successfully!');
                        // Navigate to index page
                        this.$router.push({ name: 'index' });
                    } catch (error) {
                        handleSubmissionError(error, 'Failed to cancel reservation');
                    }
                }
            },
            // goBack() {
            //     this.$router.go(-1);
            // },
        },
        props: {
            reservationsData: {
                type: Object,
                required: true,
            },
            reservationID: {
                type: [String, Number],
                required: true,
                default: '', // or default: 0
            },
        },
        mixins: [dateMixin],
        computed: {
            ...mapGetters(['getReservationRejects']),
        },
    };
</script>

<style lang="scss" scoped></style>
