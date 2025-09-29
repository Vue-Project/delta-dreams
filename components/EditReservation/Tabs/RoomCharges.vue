<template>
    <div>
        <!-- {{ reservationData.items }} -->
        <button type="button" class="btn btn-outline-secondary waves-effect mb-2" @click="handleMultipleEdit">Multiple Edit</button>
        <div class="table-responsive text-nowrap">
            <table class="table">
                <thead class="table-light">
                    <tr>
                        <th>
                            <div class="form-check text-left">
                                <input class="form-check-input" type="checkbox" @change="toggleAllCheckboxes" v-model="selectAll" />
                            </div>
                        </th>
                        <th>bookingDate</th>
                        <th>Room</th>
                        <th>Rate Type</th>
                        <th>Adults</th>
                        <th>children</th>
                        <th>Net Amount</th>
                        <th>Setting</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                    <tr v-for="roomChargeData in reservationData.items" :key="roomChargeData.id">
                        <td>
                            <div class="form-check text-left">
                                <input class="form-check-input" type="checkbox" v-model="roomChargeData.selected" aria-label="..." />
                            </div>
                        </td>
                        <!-- Update these cell click handlers to pass the specific ID -->
                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                            {{ formatDate(roomChargeData.booking_date) }}
                        </td>
                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                            {{ roomChargeData.unit.code }}
                        </td>
                        <!-- Add the same pattern to all other cells -->
                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                            {{ roomChargeData.rate_type_name }}
                        </td>
                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">{{ roomChargeData.adults }}</td>
                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                            {{ roomChargeData.children }}
                        </td>
                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                            {{ roomChargeData.price }}
                        </td>

                        <td data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" @click="setSelectedRoomCharge(roomChargeData.id)">
                            <button type="button" class="btn btn-outline-secondary waves-effect">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import flatpickrMixin from '../../Mixin/flatpickrMixin';
    import { dateMixin } from '../../Mixin/DateMixin';
    export default {
        name: 'RoomCharges',
        data() {
            return {
                selectAll: false, // Tracks the state of the master checkbox
            };
        },
        methods: {
            async handleMultipleEdit() {
                // Get all selected room charge IDs
                const selectedIds = this.reservationData.items.filter(item => item.selected).map(item => item.id);

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
                this.reservationData.items.forEach(item => {
                    item.selected = this.selectAll;
                });
            },
            setSelectedRoomCharge(roomChargeId) {
                this.selectedRoomChargeId = roomChargeId;
                this.setOffcanvasContent('updatedetails', 'Update Details');
            },
            toggleAll() {
                // Toggle all row checkboxes based on the master checkbox
                this.rows.forEach(row => {
                    row.selected = this.selectAll;
                });
            },
            updateSelectAll() {
                // Update master checkbox based on row checkboxes
                this.selectAll = this.rows.every(row => row.selected);
            },
            setOffcanvasContent(content, title, buttonText = 'Save', width = '400px') {
                this.currentContent = content;
                this.offcanvasTitle = title;
                this.sidebarWidth = width;
                this.dynamicButtonText = buttonText;
            },

            clearOffcanvasContent() {
                this.currentContent = null; // Reset the content
                this.offcanvasTitle = ''; // Reset the title
                this.sidebarWidth = '400px'; // Reset the sidebar width
            },
        },

        props: {
            reservationData: {
                type: Object,
                default: () => ({}),
            },
        },
        mixins: [flatpickrMixin, dateMixin],
    };
</script>

<style lang="scss" scoped></style>
