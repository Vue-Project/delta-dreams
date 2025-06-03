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
    /* Screen styles - hide print content on screen */
    .print-only-wrapper {
        display: none;
    }

    /* Print styles */
    @media print {
        /* Hide everything except print content */
        body * {
            visibility: hidden;
        }

        /* Show only print section */
        .print-only-wrapper,
        .print-only-wrapper * {
            visibility: visible;
            display: block !important;
        }

        .print-only-wrapper {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: block !important;
        }

        /* Hide non-print elements */
        .no-print {
            display: none !important;
            visibility: hidden !important;
        }

        /* Print specific styles */
        .print-wrapper {
            width: 100%;
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #000;
            background: white;
        }

        .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 20px;
        }

        .logo {
            max-height: 60px;
            margin-bottom: 10px;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
        }

        .section {
            margin-bottom: 30px;
            break-inside: avoid;
        }

        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #000;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }

        .details-table,
        .payment-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 12px;
        }

        .details-table td,
        .payment-table th,
        .payment-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }

        .details-table td:first-child {
            font-weight: bold;
            background-color: #f5f5f5;
            width: 40%;
        }

        .payment-table th {
            background-color: #000;
            color: white;
            font-weight: bold;
        }

        .balance-label {
            font-weight: bold;
            background-color: #e8f4f8;
        }

        .balance-value {
            font-weight: bold;
            background-color: #e8f4f8;
            font-size: 14px;
        }

        /* Ensure proper page breaks */
        .section {
            page-break-inside: avoid;
        }

        /* Force print styles to override */
        @page {
            margin: 1cm;
            size: A4;
        }
    }

    /* Alternative approach - use !important for critical styles */
    @media print {
        .print-only-wrapper {
            display: block !important;
            visibility: visible !important;
        }
    }
</style>
