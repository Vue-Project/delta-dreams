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
    import { dateMixin } from '../../Mixin/DateMixin';
    export default {
        name: 'RoomCharges',
        props: {
            logs: { type: Array, required: true },
        },
        mixins: [dateMixin],
    };
</script>

<style lang="scss" scoped></style>
