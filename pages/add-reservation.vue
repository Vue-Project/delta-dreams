<template>
    <div class="row p-3">
        <div class="col-xl-8 col-md-12">
            <button class="btn btn-danger waves-effect waves-light countdownButton">
                {{ formattedTime }}
            </button>
            <CheckIn :paymentData="paymentData" @change="changeRoomCharges" :selectedDates="selectedDates" :selectedResourceName="selectedResourceName" />
        </div>
        <div class="col-xl-4 col-md-12">
            <BillingSummary v-model="paymentData" :selectedDates="selectedDates" @payment-image-upload="handlePaymentImageUpload" />
        </div>
    </div>
</template>

<script>
    import CheckIn from '../components/AddReservation/CheckIn.vue';
    import BillingSummary from '../components/AddReservation/BillingSummary.vue';

    export default {
        name: 'AddReservation',
        layout: 'main',
        components: {
            CheckIn,
            BillingSummary,
        },
        data() {
            const duration = 1800000;
            return {
                timeoutDuration: duration,
                remainingTime: duration / 1000,
                timer: null,
                paymentData: {
                    roomCharges: 0.0,
                    taxes: 0.0,
                    dueAmount: 0.0,
                    billTo: '',
                    taxExempt: false,
                    paymentMode: false,
                    paymentMethod: '',
                    selectedPaymentMethod: '',
                    selectedPaymentType: '',
                    selectedTravelAgent: '',
                    selectedBusinessSource: '',
                    Image: null,
                },
                redirectTimeout: null,
            };
        },
        methods: {
            changeRoomCharges(charges) {
                this.paymentData.roomCharges = charges;
                // console.log(charges);
            },

            handlePaymentImageUpload(file) {
                // Validate file type
                if (file) {
                    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
                    if (!allowedTypes.includes(file.type)) {
                        alert('The image must be a file of type: jpeg, png, jpg, gif.');
                        return;
                    }
                    this.paymentData.Image = file;
                }
            },
            startTimer() {
                // التأكد من عدم بدء عدة مؤقتات في نفس الوقت
                if (this.timer !== null) return;

                this.timer = setInterval(() => {
                    if (this.remainingTime > 0) {
                        this.remainingTime--;
                    } else {
                        // عند الوصول للصفر يتم إيقاف التايمر
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            },
        },
        computed: {
            selectedDates() {
                return this.$store.state.selectedDates;
            },
            selectedResourceName() {
                return this.$store.state.selectedResourceName;
            },
            formattedTime() {
                const minutes = Math.floor(this.remainingTime / 60);
                const seconds = this.remainingTime % 60;
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            },
        },
        // beforeMount() {
        //   this.$store.dispatch('resetAccess')
        // }
        mounted() {
            this.startTimer();
            this.redirectTimeout = setTimeout(() => {
                this.$router.go(-1);
            }, this.timeoutDuration); // 30 minutes in milliseconds
        },
        beforeDestroy() {
            if (this.redirectTimeout) {
                clearTimeout(this.redirectTimeout);
            }
        },
    };
</script>

<style></style>
