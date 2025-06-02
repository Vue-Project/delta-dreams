<template>
    <div>
        <button v-print="'#printSection'" class="btn btn-primary">
            <i class="fas fa-print"></i>
            Print
        </button>

        <div id="printSection" class="print-wrapper" style="display: none">
            <!-- {{ settingsData }} -->
            <!-- Header -->
            <div class="print-header">
                <img class="logo" :src="`${$nuxt.$config.baseURL}/${settingsData.site_logo}`" />
                <h1 class="title">{{ settingsData.site_title }}</h1>
            </div>

            <!-- Reservation Details -->
            <div class="section">
                <h2 class="section-title">Reservation Details</h2>
                <table class="details-table">
                    <tr>
                        <td>ReservationNumber:</td>
                        <td>#{{ reservationData.name }}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>{{ reservationData.client?.name }}</td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>{{ reservationData.client?.phone }}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{{ reservationData.status_name }}</td>
                    </tr>
                    <tr>
                        <td>Arrival Date:</td>
                        <td>{{ reservationData.checkin_date }}/{{ reservationData.checkin_time }}</td>
                    </tr>
                    <tr>
                        <td>Booking Date:</td>
                        <td>{{ reservationData.checkout_date }}/{{ reservationData.checkout_time }}</td>
                    </tr>
                    <tr>
                        <td>Unit Code:</td>
                        <td>{{ reservationData.unit?.code }}</td>
                    </tr>
                    <tr>
                        <td>Room Number:</td>
                        <td>{{ reservationData.rooms }}</td>
                    </tr>
                    <tr>
                        <td>Avg. Daily Rate:</td>
                        <td>{{ reservationData.price }} EGP</td>
                    </tr>
                    <tr>
                        <td>Travel Agent:</td>
                        <td>{{ reservationData.travel_agent?.name }}</td>
                    </tr>
                    <tr>
                        <td>Business Source:</td>
                        <td>{{ reservationData.business_source?.name }}</td>
                    </tr>
                    <tr>
                        <td>User:</td>
                        <td>{{ reservationData.user?.name }}</td>
                    </tr>
                    <tr>
                        <td>Insurance:</td>
                        <td>{{ reservationData.insurance }}</td>
                    </tr>
                    <tr>
                        <td>InsuranceRefund:</td>
                        <td>{{ reservationData.insurance_refund }}</td>
                    </tr>
                    <tr>
                        <td>InsuranceRemaining:</td>
                        <td>{{ reservationData.insurance_remaining }}</td>
                    </tr>
                    <tr>
                        <td>TotalServices</td>
                        <td>{{ reservationData.service_price }}</td>
                    </tr>
                    <tr>
                        <td>UnitPrice(Nights)</td>
                        <td>{{ reservationData.price }} ({{ reservationData.nights }} Nights)</td>
                    </tr>

                    <tr>
                        <td>Total:</td>
                        <td>{{ reservationData.total }} EGP</td>
                    </tr>
                    <tr>
                        <td>Paid:</td>
                        <td>{{ reservationData.paid }} EGP</td>
                    </tr>
                    <tr>
                        <td class="balance-label">Balance:</td>
                        <td class="balance-value">{{ reservationData.remaining }} EGP</td>
                    </tr>
                </table>
            </div>

            <!-- Payment Details -->
            <div class="section" v-if="reservationData.wallets && approvedPayments.length > 0">
                <h2 class="section-title">Payment Details</h2>
                <table class="payment-table">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(approvedPayment, index) in approvedPayments" :key="index">
                            <td>{{ approvedPayment.payment.name }}</td>
                            <td>{{ approvedPayment.paymentType.name }}</td>
                            <td>{{ approvedPayment.type_name }}</td>
                            <td>{{ approvedPayment.date_at }}</td>
                            <!-- <td class="status-approved">{{ payment.status }}</td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import print from 'vue-print-nb';
    import { getSettingsSite } from '../../Api/CalenderApi';

    export default {
        name: 'PrintReservation',
        data() {
            return {
                settingsData: {},
            };
        },
        props: {
            reservationData: {
                type: Object,
            },
        },
        directives: {
            print,
        },
        async mounted() {
            this.isLoading = true;
            try {
                const [settingsDataResponse] = await Promise.all([getSettingsSite()]);
                this.settingsData = settingsDataResponse;

                // Dynamically update favicon
            } catch (error) {
                console.error('Error loading data:', error);
            }
        },
        computed: {
            approvedPayments() {
                return this.reservationData.wallets.filter(payment => payment.status === 'Approved');
            },
        },
    };
</script>

<style scoped>
    /* Page Border */
    .print-wrapper {
        border: 4px solid #333;
        padding: 20px;
        margin: 20px auto;
        max-width: 100%;
        font-family: 'Arial', sans-serif;
        background: #fff;
    }

    /* Header Styles */
    .print-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 3px solid #555;
        padding-bottom: 15px;
        margin-bottom: 20px;
    }

    .logo {
        height: 80px;
    }

    .title {
        font-size: 28px;
        color: #333;
        text-align: right;
        flex: 1;
    }

    /* Section Titles */
    .section-title {
        font-size: 22px;
        color: #444;
        border-bottom: 2px solid #ccc;
        margin-bottom: 12px;
        padding-bottom: 5px;
    }

    /* Details Table */
    .details-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
    }

    .details-table td {
        padding: 10px 5px;
        border-bottom: 1px solid #eee;
    }

    .balance-label {
        font-weight: bold;
    }

    .balance-value {
        color: red;
        font-weight: bold;
    }

    /* Payment Table */
    .payment-table {
        width: 100%;
        border-collapse: collapse;
    }

    .payment-table th,
    .payment-table td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
    }

    /* Print Specific Styles */
    @media print {
        body > *:not(#printSection) {
            display: none !important;
        }
        #printSection {
            display: block !important;
        }
    }
</style>
