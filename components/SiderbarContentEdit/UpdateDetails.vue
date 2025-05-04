<template>
    <form @submit.prevent="updatingReservationItems" ref="emptyForm">
        <div class="row g-3">
            <div class="col-md-12">
                <label for="updateDetailsRateType" class="col-form-label">Rate Type</label>
                <div class="input-group">
                    <select class="form-select" id="updateDetailsRateType" v-model="formUpdateReservationItems.rateType">
                        <option disabled selected>select</option>
                        <option v-for="(type, index) in getRateTypes" :key="index" :value="index">
                            {{ type }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <label for="updateDetailsChildren" class="col-form-label">children</label>
                <input id="updateDetailsChildren" type="number" class="form-control" placeholder="Number of children" aria-label="Number of adults" min="0" v-model="formUpdateReservationItems.children" />
            </div>
            <div class="col-12 col-md-6">
                <label for="updateDetailsAdults" class="col-form-label">adults</label>
                <input id="updateDetailsAdults" type="number" class="form-control" placeholder="Number of adults" aria-label="Number of adults" min="0" v-model="formUpdateReservationItems.adults" />
            </div>
            <div class="col-md-12">
                <label for="updateDetailsRateAmount" class="col-form-label">Rate Amount</label>
                <input id="updateDetailsRateAmount" type="text" class="form-control" placeholder="00.00" aria-label="rate amount" min="00.00" v-model="formUpdateReservationItems.rateAmount" />
            </div>
        </div>
        <p>{{ reservationData.items.id }}</p>

        <div class="gap-2 d-flex" style="position: absolute; bottom: 15px; right: 15px">
            <button type="submit" class="btn btn-primary">Update</button>
        </div>
    </form>
</template>

<script>
    import flatpickrMixin from '../Mixin/flatpickrMixin';
    import { PostReservationItems } from '../../Api/addResvertionApi';
    import { showSuccessAlert, handleSubmissionError } from '../../Api/MassageValidation/alertUtilities';
    import { mapGetters } from 'vuex/';

    export default {
        name: 'UpdateDetails',
        layout: 'component',
        mixins: [flatpickrMixin],
        props: {
            reservationId: {
                type: [String, Number],
                required: true,
            },
            reservationData: {
                type: Object,
                default: () => ({}),
            },
            hideOffcanvas: {
                type: Function,
                required: true,
            },
            roomChargeId: {
                type: [String, Number],
                required: true,
            },
        },
        data() {
            return {
                // Form Data
                formUpdateReservationItems: {
                    startDate: '',
                    adults: '',
                    children: '',
                    rateAmount: '',
                    rateType: '',
                },
            };
        },
        watch: {
            'reservationData.items': {
                immediate: true,
                handler(newItems) {
                    if (newItems && newItems.length > 0) {
                        // Find the item where `id` matches `roomChargeId`
                        const item = newItems.find(item => item.id == this.roomChargeId);
                        if (item) {
                            this.formUpdateReservationItems = {
                                startDate: item.start_date || '',
                                adults: item.adults || '',
                                children: item.children || '',
                                rateAmount: item.rate_amount || '',
                                rateType: item.rate_type || '',
                            };
                        }
                    }
                },
            },
            // roomChargeId: {
            //     immediate: true,
            //     handler() {
            //         // Re-run the logic when roomChargeId changes
            //         this.handler(this.reservationData.items);
            //     },
            // },
        },
        methods: {
            async updatingReservationItems() {
                try {
                    // Find the item by roomChargeId
                    const item = this.reservationData.items.find(item => item.id == this.roomChargeId);

                    if (!item) {
                        throw new Error('Reservation item not found');
                    }

                    // Use the found item's data
                    const updateReservationItems = {
                        id: item.id,
                        unit_id: item.unit_id,
                        reservation_id: item.reservation_id,
                        adults: this.formUpdateReservationItems.adults,
                        children: this.formUpdateReservationItems.children,
                        rate_type: this.formUpdateReservationItems.rateType,
                        rate_amount: this.formUpdateReservationItems.rateAmount,
                    };

                    // Submit the data
                    const response = await PostReservationItems(this.reservationId, updateReservationItems);

                    // Show success message and close the form
                    await showSuccessAlert('Reservation Items updated successfully.');
                    this.$emit('update-success');
                    this.$emit('close-offcanvas');
                } catch (error) {
                    handleSubmissionError(error, 'Failed to update reservation items.');
                }
            },
        },
        computed: {
            ...mapGetters(['getRateTypes']),
        },
    };
</script>
