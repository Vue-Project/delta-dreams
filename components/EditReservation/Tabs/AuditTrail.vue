<template>
    <div>
        <div class="table-responsive text-nowrap">
            <table class="table">
                <thead class="table-light">
                    <tr>
                        <th>Create At</th>
                        <th>User</th>
                        <th>KeyName</th>
                        <th>Value</th>
                        <th>OldValue</th>
                        <th>Device</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="log in logs" :key="log.id">
                        <!-- Update these cell click handlers to pass the specific ID -->
                        <td>
                            {{ formatTimeAndDate(log.created_at) }}
                        </td>
                        <td>
                            {{ log.user?.name }}
                        </td>
                        <!-- Add the same pattern to all other cells -->
                        <td>
                            {{ log.key_name }}
                        </td>
                        <td>
                            {{ log.value }}
                        </td>
                        <td>
                            {{ log.value_old }}
                        </td>
                        <td>
                            <span>{{ log.userDevice.ip }} / {{ log.userDevice.browser }} / {{ log.userDevice.platform }} /{{ log.userDevice.device }}</span>
                            <span></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RoomCharges',
        data() {
            return {};
        },
        methods: {
            async handleMultipleEdit() {
                // Get all selected room charge IDs
                const selectedIds = this.roomChargesData.filter(item => item.selected).map(item => item.id);

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
                    this.setOffcanvasContent('updatedetailsall', 'Update Multiple  Room Charges');

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
                this.setOffcanvasContent('updatedetails', 'Update Details');
            },
        },
        props: {
            reservationData: { type: Object, required: true },
        },
    };
</script>

<style lang="scss" scoped></style>
