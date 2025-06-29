<template>
    <div>
        <button @click="printReservation" class="btn btn-primary">
            <i class="fas fa-print"></i>
            Print
        </button>

        <div id="printSection" class="print-wrapper" :class="{ 'print-mode': isPrintMode }">
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
                        <td>{{ reservationData.unit_price }} EGP</td>
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
                        <td>{{ reservationData.unit_price }} ({{ reservationData.nights }} Nights)</td>
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
                            <th>Payment</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(approvedPayment, index) in approvedPayments" :key="index">
                            <td>{{ approvedPayment.payment.name }}</td>
                            <td>{{ approvedPayment.paymentType.name }}</td>
                            <td>{{ approvedPayment.type_name }}</td>
                            <td>{{ approvedPayment.price }}</td>
                            <td>{{ approvedPayment.date_at }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="section" v-if="reservationData && reservationData.reservationServices && reservationData.reservationServices.length > 0">
                <h2 class="section-title">Services Details</h2>
                <table class="payment-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(reservationService, index) in reservationData.reservationServices" :key="index">
                            <td>{{ reservationService.service.name }}</td>
                            <td>{{ reservationService.service_price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getSettingsSite } from '../../Api/CalenderApi';

    export default {
        name: 'PrintReservation',
        data() {
            return {
                settingsData: {},
                isPrintMode: false,
            };
        },
        props: {
            reservationData: {
                type: Object,
            },
        },
        async mounted() {
            this.isLoading = true;
            try {
                const [settingsDataResponse] = await Promise.all([getSettingsSite()]);
                this.settingsData = settingsDataResponse;
            } catch (error) {
                console.error('Error loading data:', error);
            }
        },
        computed: {
            approvedPayments() {
                return this.reservationData.wallets?.filter(payment => payment.status === 'Approved') || [];
            },
        },
        methods: {
            printReservation() {
                // Check if it's a mobile device
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                if (isMobile) {
                    // For mobile devices, open in a new window
                    this.printOnMobile();
                } else {
                    // For desktop, use regular print
                    this.printOnDesktop();
                }
            },

            printOnDesktop() {
                // Hide all other elements
                const originalContents = document.body.innerHTML;
                const printContents = document.getElementById('printSection').innerHTML;

                // Create a new window for printing
                const printWindow = window.open('', '_blank', 'width=800,height=600');
                printWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                      <title>Reservation Print</title>
                      <style>
                          ${this.getPrintStyles()}
                      </style>
                  </head>
                  <body>
                      <div class="print-wrapper">
                          ${printContents}
                      </div>
                  </body>
                  </html>
              `);

                printWindow.document.close();
                printWindow.focus();

                // Wait for content to load then print
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            },

            printOnMobile() {
                // For mobile, create a dedicated print page
                const printContents = document.getElementById('printSection').innerHTML;

                // Create blob with HTML content
                const htmlContent = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Reservation Print</title>
                      <style>
                          ${this.getPrintStyles()}
                          body { padding: 10px; }
                          .print-wrapper {
                              display: block !important;
                              border: 2px solid #333;
                              padding: 15px;
                              max-width: 100%;
                          }
                      </style>
                  </head>
                  <body>
                      <div class="print-wrapper">
                          ${printContents}
                      </div>
                      <div style="text-align: center; margin-top: 20px;">
                          <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; background: #7367f0!important; color: white; border: none; border-radius: 5px;">
                              Print Document
                          </button>
                      </div>
                  </body>
                  </html>
              `;

                // Open in new tab
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');

                // Clean up
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 1000);
            },

            getPrintStyles() {
                return `
                  * { box-sizing: border-box; }
                  body {
                      font-family: 'Arial', sans-serif;
                      margin: 0;
                      padding: 0;
                      background: white;
                  }
                  .print-wrapper {
                      border: 4px solid #333;
                      padding: 20px;
                      margin: 0 auto;
                      max-width: 100%;
                      font-family: 'Arial', sans-serif;
                      background: #fff;
                      display: block;
                  }
                  .print-header {
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      border-bottom: 3px solid #555;
                      padding-bottom: 15px;
                      margin-bottom: 20px;
                      flex-wrap: wrap;
                  }
                  .logo {
                      height: 60px;
                      max-width: 200px;
                      object-fit: contain;
                  }
                  .title {
                      font-size: 24px;
                      color: #333;
                      text-align: right;
                      flex: 1;
                      margin: 0;
                      margin-left: 20px;
                  }
                  .section {
                      margin-bottom: 25px;
                      page-break-inside: avoid;
                  }
                  .section-title {
                      font-size: 20px;
                      color: #444;
                      border-bottom: 2px solid #ccc;
                      margin-bottom: 12px;
                      padding-bottom: 5px;
                      margin-top: 0;
                  }
                  .details-table {
                      width: 100%;
                      border-collapse: collapse;
                      margin-bottom: 20px;
                  }
                  .details-table td {
                      padding: 8px 5px;
                      border-bottom: 1px solid #eee;
                      vertical-align: top;
                  }
                  .details-table td:first-child {
                      font-weight: bold;
                      width: 40%;
                  }
                  .balance-label {
                      font-weight: bold;
                  }
                  .balance-value {
                      color: #d32f2f;
                      font-weight: bold;
                  }
                  .payment-table {
                      width: 100%;
                      border-collapse: collapse;
                  }
                  .payment-table th,
                  .payment-table td {
                      border: 1px solid #ccc;
                      padding: 8px;
                      text-align: center;
                      font-size: 14px;
                  }
                  .payment-table th {
                      background-color: #f5f5f5;
                      font-weight: bold;
                  }
                  @media print {
                      body { margin: 0; }
                      .print-wrapper {
                          border: 2px solid #333 !important;
                          margin: 0 !important;
                          padding: 15px !important;
                      }
                      .logo { height: 50px; }
                      .title { font-size: 20px; }
                      .section-title { font-size: 18px; }
                  }
                  @media screen and (max-width: 768px) {
                      .print-header {
                          flex-direction: column;
                          text-align: center;
                      }
                      .title {
                          text-align: center;
                          margin-left: 0;
                          margin-top: 10px;
                      }
                      .details-table td {
                          padding: 6px 3px;
                          font-size: 14px;
                      }
                      .payment-table th,
                      .payment-table td {
                          padding: 6px 4px;
                          font-size: 12px;
                      }
                  }
              `;
            },
        },
    };
</script>

<style scoped>
    /* Screen display styles */
    .print-wrapper {
        border: 4px solid #333;
        padding: 20px;
        margin: 20px auto;
        max-width: 100%;
        font-family: 'Arial', sans-serif;
        background: #fff;
        display: none;
    }

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

    .section-title {
        font-size: 22px;
        color: #444;
        border-bottom: 2px solid #ccc;
        margin-bottom: 12px;
        padding-bottom: 5px;
    }

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

    .no-data-message {
        text-align: center;
        padding: 20px;
        color: #666;
        font-style: italic;
        background: #f5f5f5;
        border-radius: 4px;
        margin: 10px 0;
    }
</style>
