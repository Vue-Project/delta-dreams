<template>
    <div class="notifications">
        <div v-for="(notification, index) in notifications" :key="index" class="notification">
            {{ notification }}
            {{ notification.message }}
            <button @click="remove(index)">×</button>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            userRole() {
                if (process.client) {
                    const params = new URLSearchParams(window.location.search);
                    return params.get('type') || '';
                }
                return '';
            },
            notifications() {
                const userAdmins = ['super_admin', 'admin', 'sub_admin', 'manger', 'sub_manger'];
                if (userAdmins.includes(this.userRole)) {
                    return this.$store.state.notifications.items;
                }
                return [];
            },
        },
        methods: {
            remove(index) {
                this.$store.commit('notifications/REMOVE_NOTIFICATION', index);
            },
        },
    };
</script>
