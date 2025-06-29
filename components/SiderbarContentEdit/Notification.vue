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
            notifications() {
                return this.$store.state.notifications.items;
            },
        },
        methods: {
            remove(index) {
                this.$store.commit('notifications/REMOVE_NOTIFICATION', index);
            },
        },
    };
</script>
