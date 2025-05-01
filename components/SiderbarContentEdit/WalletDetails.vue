<template>
    <section class="summary position-sticky top-0">
        <div class="card">
            <div class="offcanvas offcanvas-end event-sidebar" tabindex="-1" id="Sidebar" aria-labelledby="SidebarLabel" aria-modal="true">
                <div class="offcanvas-header my-1">
                    <h5 class="offcanvas-title" id="SidebarLabel">{{ sidebarTitle }}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr class="mt-0" />
                <div class="offcanvas-body pt-0">
                    <EditPayment :selectedWallet="selectedWallet" />
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive text-nowrap">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Payment image</th>
                                <th>Payment Method</th>
                                <th>Payment Type</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Comment</th>
                                <!-- <th>Accounts</th> -->
                                <th>status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="wallet in reservationData.wallets" :key="wallet.id">
                                <td>
                                    <img
                                        :src="`https://testdeltadream.swevey.com/${wallet.image}`"
                                        style="width: 50px; height: 50px; cursor: pointer"
                                        @click="showImg(`https://testdeltadream.swevey.com/${wallet.image}`)"
                                        />


                                </td>
                                <td>{{ wallet.payment.name }}</td>
                                <td>{{ wallet.paymentType.name }}</td>
                                <td>{{ wallet.type_name }}</td>
                                <td>{{ wallet.price }}</td>
                                <td>{{ wallet.date_at }}</td>
                                <td>
                                    <template v-if="wallet.note">
                                        <div>{{ wallet.note }}</div>
                                    </template>
                                </td>
                                <!-- <td>{{ wallet.assigned.name || 'Not specified' }}</td> -->
                                <td>
                                    <span :class="wallet.active === 1 ? 'badge bg-label-success' : 'badge bg-label-danger'">
                                        {{ wallet.status }}
                                    </span>
                                </td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <div class="dropdown-menu" v-if="wallet.active !== 0">
                                            <!-- <a
                           class="dropdown-item"
                           data-bs-toggle="offcanvas"
                           data-bs-target="#Sidebar"
                           data-title="Edit Payment"
                           @click="updateWallet(wallet)"
                        >
                          <i class="fa-regular fa-pen-to-square me-1"></i> Edit
                        </a> -->
                                            <a class="dropdown-item" @click="deletedWallet(wallet.id)">
                                                <i class="fa-regular fa-trash-can me-1"></i>
                                                cancel
                                            </a>
                                            <a class="dropdown-item" @click="openTransferModal(wallet.id, wallet.price)">
                                                <i class="fa-solid fa-coins me-1"></i>
                                                transfer
                                            </a>

                                            <!-- modal -->
                                        </div>
                                    </div>
                                </td>
                                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" tabindex="-1">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content rounded-4 shadow-lg border-0">
                                            <div class="modal-header border-0">
                                                <h5 class="modal-title mx-auto" id="loginModalLabel">Transfer</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body px-4 py-3">
                                                <div class="mb-4">
                                                    <h6 class="fw-semibold">Reservation Number:</h6>
                                                    <p class="mb-0 text-muted">{{ reservationData?.id }}</p>
                                                </div>
                                                <!-- <div class="mb-4">
                                                    <h6 class="fw-semibold">Wallet Number:</h6>
                                                    <p class="mb-0 text-muted">{{ walletId || 'N/A' }}</p>
                                                </div> -->
                                                <div class="mb-4">
                                                    <h6 class="fw-semibold">Amount:</h6>
                                                    <p class="mb-0 text-success fw-bold">{{ walletPrice || '0.00' }}</p>
                                                </div>
                                                <div class="mb-4">
                                                    <h6 class="fw-semibold">Transfer:</h6>
                                                    <p class="mb-0 text-success fw-bold">{{ walletTransfer || '0.00' }}</p>
                                                </div>
                                                <div class="mb-4">
                                                    <h6 class="fw-semibold">Total:</h6>
                                                    <p class="mb-0 text-success fw-bold">{{ walletTotal || '0.00' }}</p>
                                                </div>
                                                <div class="mb-4">
                                                    <label for="paymentInput" class="form-label fw-semibold">Payment</label>
                                                    <input type="text" id="paymentInput" class="form-control rounded-3" placeholder="Enter payment amount" v-model="paymentAmount" />
                                                </div>
                                                <div class="mb-4">
                                                    <label for="reservationinput" class="form-label fw-semibold">Reservation Id</label>
                                                    <input type="text" id="reservationinput" class="form-control rounded-3" placeholder="Enter Reservation Id" v-model="reservationsId" />
                                                </div>
                                                <div class="text-center">
                                                    <!-- Call transferWallet when clicked -->
                                                    <button type="button" class="btn btn-primary px-4 rounded-pill" @click="transferWallet(walletId)">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </tr>
                            <vue-easy-lightbox
                                    :visible="visible"
                                    :imgs="imgs"
                                    :index="index"
                                    @hide="handleHide"
                                />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { getPaymentMethods } from '../../Api/addResvertionApi';
    import { putDeleteWallet } from '../../Api/editResvertion';
    import { showSuccessAlert, handleSubmissionError, showConfirmationAlert } from '../../Api/MassageValidation/alertUtilities';
    import EditPayment from './EditPayment.vue';

    export default {
        name: 'WalletDetails',
        layout: 'component',
        props: {
            reservationId: {
                type: [String, Number],
                required: true, // Ensure the prop is provided
            },
            reservationData: {
                type: Object,
                default: () => ({}),
            },
        },
        components: {
            EditPayment, // تسجيل المكون هنا
        },
        data() {
            return {
                paymentMethods: [],
                paymentTypes: [],
                paymentDetails: {
                    roomCharges: 0.0,
                    taxes: 0.0,
                    dueAmount: 0.0,
                    amount: null,
                    bankName: '',
                    accountNumber: '',
                    transferDate: '',
                    phoneNumber: '',
                    transactionId: '',
                    cardNumber: '',
                    date: new Date().toISOString().split('T')[0],
                    cvv: '',
                    comment: '',
                },
                selectedPaymentType: '',
                formAddPayment: {
                    date: '',
                    method: '',
                    type: '',
                    comment: '',
                    reservation_id: null,
                },
                sidebarTitle: '',
                selectedWallet: null,
                walletId: null,
                walletPrice: null,
                walletTransfer: null,
                walletTotal: null,
                paymentAmount: '',
                reservationsId: null,
                visible: false,
                index: 0,
                imgs: [],
            };
        },
        methods: {
            showImg(img) {
                this.imgs = [img];
                this.index = 0;
                this.visible = true;
            },
            handleHide() {
                this.visible = false;
            },
            async deletedWallet(id) {
                const result = await showConfirmationAlert('Are you sure?', 'cancel this payment reservation', 'Yes, cancel it!');

                if (result.isConfirmed) {
                    try {
                        const walletStatus = {
                            status: 'cancelled',
                            wallet_id: id,
                        };

                        const response = await putDeleteWallet(walletStatus.wallet_id, walletStatus);

                        await showSuccessAlert('Payment Details Is Cancelled Successfully!');

                        // Emit event to parent component instead of reloading
                        this.$emit('wallet-updated');
                    } catch (error) {
                        handleSubmissionError(error, 'Failed to delete wallet');
                    }
                }
            },
            async transferWallet(id) {
                // Validate the entered payment amount
                const payment = parseFloat(this.paymentAmount);
                if (isNaN(payment)) {
                    await showErrorAlert('Please enter a valid numeric payment.');
                    return;
                }
                // Allow payment if it's less than or equal to the wallet amount
                if (payment > this.walletPrice) {
                    await showErrorAlert('Payment amount must not be greater than the wallet amount.');
                    return;
                }

                // Show confirmation alert (just like in deletedWallet)
                const result = await showConfirmationAlert('Are you sure?', 'transfer this payment reservation', 'Yes, transfer it!');

                if (result.isConfirmed) {
                    try {
                        const walletStatus = {
                            price: payment, // using the validated payment amount
                            wallet_id: id,
                        };

                        // Call your transfer API using the wallet id and payment amount
                        const response = await postTransferWallet(walletStatus.wallet_id, walletStatus.price);

                        await showSuccessAlert('Payment Details Are Cancelled Successfully!');
                        // Emit event to parent component instead of reloading
                        this.$emit('wallet-updated');
                    } catch (error) {
                        handleSubmissionError(error, 'Failed to transfer wallet');
                    }
                }
            },
            maskCardNumber(cardNumber) {
                if (!cardNumber) return 'Not specified';
                return `****-****-****-${cardNumber.slice(-4)}`;
            },
            fillWalletsData(data) {
                if (data.wallets && data.wallets.length > 0) {
                    const wallet = data.wallets[0]; // Getting the first wallet

                    // Fill payment details
                    this.paymentDetails = {
                        ...this.paymentDetails,
                        amount: wallet.price || null,
                        date: wallet.date_at || new Date().toISOString().split('T')[0],
                        comment: wallet.note || '',
                    };

                    // Set payment method (using the payment ID)
                    if (wallet.payment_id) {
                        const select = document.getElementById('businessSource');
                        if (select) {
                            select.value = wallet.payment_id;
                        }
                    }

                    // Set payment type
                    if (wallet.type) {
                        this.selectedPaymentType = wallet.type;
                    }
                }
            },
            submitPayment() {
                this.$emit('add-payment', {
                    ...this.formAddPayment,
                    reservation_id: this.selectedEvent.id,
                });
                this.cancelPayment();
            },
            cancelPayment() {
                this.resetPaymentForm();
            },
            resetPaymentForm() {
                this.formAddPayment = {
                    date: '',
                    method: '',
                    type: '',
                    comment: '',
                    reservation_id: null,
                };
            },
            async FormUpdateWallet() {
                try {
                    const walletData = {
                        wallet_id: this.reservationData.wallets[0]?.id, // Get wallet ID from the first wallet
                        payment_id: document.getElementById('businessSource').value,
                        type: this.selectedPaymentType,
                        price: this.paymentDetails.amount,
                        date_at: this.paymentDetails.date,
                        note: this.paymentDetails.comment,
                    };

                    // You'll need to import and call your API function here
                    // const response = await updateWallet(walletData);

                    // Show success message
                    await showSuccessAlert(
                        'Wallet updated successfully!', // Custom message
                        this.$router,
                        'index', // Route name
                    );
                } catch (error) {
                    handleSubmissionError(
                        error,
                        'There was an issue with your update.', // Custom default error
                    );
                }
            },
            openTransferModal(id, price, transfer, total) {
                this.walletId = id;
                this.walletPrice = price;
                this.walletTransfer = transfer;
                this.walletTotal = total;
                this.paymentAmount = ''; // Clear any previous input
                this.reservationsId = ''; // Set the reservation ID

                const modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
                modal.show();
            },
        },
        watch: {
            reservationData: {
                immediate: true,
                handler(newData) {
                    if (newData && typeof newData === 'object') {
                        this.fillWalletsData(newData);
                    }
                },
            },
        },

        async mounted() {
            try {
                const [paymentMethodsResponse] = await Promise.all([getPaymentMethods()]);

                this.paymentMethods = paymentMethodsResponse.data.data;
                this.paymentTypes = paymentMethodsResponse.data.payment_type;
            } catch (error) {
                console.error('Error loading data:', error);
            }
            // Listen for offcanvas show event
            const offcanvas = document.getElementById('Sidebar');
            offcanvas.addEventListener('show.bs.offcanvas', event => {
                // Get the clicked trigger element
                const trigger = event.relatedTarget;
                // Get the title from data-title attribute
                this.sidebarTitle = trigger.getAttribute('data-title');
            });
        },
        watch: {
            reservationData: {
                immediate: true,
                handler(newData) {
                    if (newData && typeof newData === 'object') {
                        this.fillWalletsData(newData);
                    }
                },
            },
        },

        provide() {
            return {
                selectedWallet: () => this.selectedWallet,
            };
        },
    };
</script>
