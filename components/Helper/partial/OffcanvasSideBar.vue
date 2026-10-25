<template>
    <div>
        <div class="btn-group ms-auto">
            <!--  Start  offcanvas Menu -->

            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel" :style="{ width: sidebarWidth }" ref="offcanvas">
                <div class="offcanvas-header">
                    <h5 id="offcanvasEndLabel" class="offcanvas-title">
                        {{ offcanvasTitle }}
                    </h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <hr />
                <div class="offcanvas-body mx-0 flex-grow-0 pt-0">
                    <!--  start sidebar content for Add Payment -->
                    <div v-if="currentContent === 'addpayment'">
                        <!-- <AddPayment :reservationId="selectedReservationId" @payment-added="refreshReservationData" @close-offcanvas="hideOffcanvas" /> -->
                    </div>

                    <!--  start sidebar content for Update Room Charges -->
                    <div v-if="currentContent === 'updateroomcharges'">
                        <!-- <UpdateRoomCharges :reservationData="reservationsDataById[0]" :roomChargeId="selectedRoomChargeId" @update-success="refreshReservationData" @close-offcanvas="hideOffcanvas" /> -->
                    </div>

                    <!--  start sidebar content for Update Details All -->
                    <div v-if="currentContent === 'updatedetailsall'">
                        <!-- <UpdateDetailsAll :reservationData="reservationsDataById[0]" :roomChargeId="selectedRoomChargeId" :selectedIds="selectedRoomChargeIds" @update-success="refreshReservationData" @close-offcanvas="hideOffcanvas" /> -->
                    </div>

                    <!-- Fallback message when no content is set -->
                    <div v-if="!currentContent" class="text-center text-muted py-5">
                        <p>No content selected</p>
                    </div>
                </div>
            </div>
            <!--  End  offcanvas Menu -->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'OffcanvasSideBar',
        components: {
            // Make sure to import your components
            // AddPayment: () => import('./AddPayment.vue'),
            // UpdateRoomCharges: () => import('./UpdateRoomCharges.vue'),
            // UpdateDetailsAll: () => import('./UpdateDetailsAll.vue'),
        },
        data() {
            return {
                currentContent: null, // Tracks the current content to display
                offcanvasTitle: '',
                sidebarWidth: '400px',
                dynamicButtonText: 'Save',
                selectedReservationId: null,
                selectedRoomChargeId: null,
                selectedRoomChargeIds: [], // For multiple selection
                reservationsDataById: [], // Fixed: Added missing data property
                offcanvasInstance: null, // Store Bootstrap offcanvas instance
            };
        },
        methods: {
            /**
             * Set the content to display in the offcanvas
             * @param {string} content - Content type identifier
             * @param {string} title - Offcanvas title
             * @param {string} buttonText - Button text (default: 'Save')
             * @param {string} width - Sidebar width (default: '400px')
             */
            setOffcanvasContent(content, title, buttonText = 'Save', width = '4000px') {
                this.currentContent = content;
                this.offcanvasTitle = title;
                this.sidebarWidth = width;
                this.dynamicButtonText = buttonText;
            },

            /**
             * Show the offcanvas with specific content
             * @param {string} content - Content type identifier
             * @param {string} title - Offcanvas title
             * @param {object} options - Additional options (reservationId, roomChargeId, etc.)
             */
            showOffcanvas(content, title, options = {}) {
                // Set content
                this.setOffcanvasContent(content, title, options.buttonText, options.width);

                // Set IDs if provided
                if (options.reservationId) {
                    this.selectedReservationId = options.reservationId;
                }
                if (options.roomChargeId) {
                    this.selectedRoomChargeId = options.roomChargeId;
                }
                if (options.roomChargeIds) {
                    this.selectedRoomChargeIds = options.roomChargeIds;
                }
                if (options.reservationsData) {
                    this.reservationsDataById = options.reservationsData;
                }

                // Show offcanvas
                if (this.offcanvasInstance) {
                    this.offcanvasInstance.show();
                }
            },

            /**
             * Clear offcanvas content
             */
            clearOffcanvasContent() {
                this.currentContent = null;
                this.offcanvasTitle = '';
                this.sidebarWidth = '400px';
                this.selectedReservationId = null;
                this.selectedRoomChargeId = null;
                this.selectedRoomChargeIds = [];
                this.reservationsDataById = [];
            },

            /**
             * Hide the offcanvas
             */
            hideOffcanvas() {
                if (this.offcanvasInstance) {
                    this.offcanvasInstance.hide();
                } else {
                    console.error('Offcanvas instance not found.');
                }
            },

            /**
             * Refresh reservation data (implement based on your needs)
             */
            refreshReservationData() {
                // Emit event to parent component to refresh data
                this.$emit('refresh-data');

                // Or implement your data refresh logic here
                // Example:
                // this.fetchReservationData(this.selectedReservationId);
            },

            /**
             * Reset selections when offcanvas is hidden
             */
            resetSelections() {
                this.clearOffcanvasContent();
            },
        },
        mounted() {
            this.$nextTick(() => {
                const offcanvasElement = this.$refs.offcanvas;

                if (offcanvasElement) {
                    // Initialize Bootstrap Offcanvas
                    this.offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);

                    // Add event listener for when offcanvas is hidden
                    offcanvasElement.addEventListener('hidden.bs.offcanvas', this.resetSelections);
                } else {
                    console.error('Offcanvas ref not found.');
                }
            });
        },
        beforeUnmount() {
            // Vue 3 uses beforeUnmount instead of beforeDestroy
            const offcanvasElement = this.$refs.offcanvas;

            if (offcanvasElement) {
                offcanvasElement.removeEventListener('hidden.bs.offcanvas', this.resetSelections);

                // Dispose of Bootstrap offcanvas instance
                if (this.offcanvasInstance) {
                    this.offcanvasInstance.dispose();
                }
            }
        },
        // For Vue 2, use beforeDestroy instead
        beforeDestroy() {
            const offcanvasElement = this.$refs.offcanvas;

            if (offcanvasElement) {
                offcanvasElement.removeEventListener('hidden.bs.offcanvas', this.resetSelections);

                // Dispose of Bootstrap offcanvas instance
                if (this.offcanvasInstance) {
                    this.offcanvasInstance.dispose();
                }
            }
        },
    };
</script>

<style scoped>
    /* Add any custom styles here */
    .offcanvas-body {
        overflow-y: auto;
    }
</style>
