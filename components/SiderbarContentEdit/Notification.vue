<template>
    <div class="notifications">
        <div v-for="(notification, index) in notifications" :key="index" class="notification">
            <span class="info-icon">ℹ️</span>
            <span class="message link" @click="goToReservation(notification.message)" style="cursor: pointer; text-decoration: underline; color: #3498db">
                {{ typeof notification.message === 'object' ? JSON.stringify(notification.message) : notification.message }}
            </span>
            <span class="timestamp">{{ notification.timestamp }}</span>
            <button class="close" @click="remove(index)">×</button>
            <div class="progress-bar" :style="{ width: progressWidths[index] + '%' }"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                progressWidths: [],
                timers: [],
            };
        },
        computed: {
            userRole() {
                return this.$store.state.type;
            },
            notifications() {
                const allowedRoles = ['super_admin', 'admin', 'sub_admin', 'manger', 'sub_manger'];
                return allowedRoles.includes(this.userRole) ? this.$store.state.notifications.items : [];
            },
        },
        watch: {
            notifications: {
                handler(newVal) {
                    // Clear old timers
                    this.timers.forEach(timer => clearInterval(timer));
                    this.timers = [];
                    // Reset progress bars for new notifications
                    this.progressWidths = newVal.map(() => 100);
                    // Start progress bar animation for each notification
                    newVal.forEach((_, idx) => this.startProgress(idx));
                },
                immediate: true,
            },
        },
        methods: {
            remove(index) {
                this.$store.commit('notifications/REMOVE_NOTIFICATION', index);
                if (this.timers[index]) {
                    clearInterval(this.timers[index]);
                    this.timers[index] = null;
                }
            },
            goToReservation(id) {
                if (id) {
                    this.$router.push(`/edit-reservation/${id}`);
                }
            },
            startProgress(index) {
                const duration = 2000; // 4 seconds
                const interval = 20; // update every 40ms for smoothness
                let elapsed = 0;
                this.$set(this.progressWidths, index, 100);
                const timer = setInterval(() => {
                    elapsed += interval;
                    const percent = Math.max(100 - (elapsed / duration) * 100, 0);
                    this.$set(this.progressWidths, index, percent);
                    if (elapsed >= duration) {
                        clearInterval(timer);
                        this.remove(index);
                    }
                }, interval);
                this.timers[index] = timer;
            },
        },
        beforeDestroy() {
            this.timers.forEach(timer => clearInterval(timer));
        },
    };
</script>

<style scoped>
    .notifications {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 350px;
        z-index: 9999;
    }
    .notification {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 12px 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: hidden;
    }
    .info-icon {
        font-size: 1.3em;
        margin-right: 8px;
    }
    .message {
        flex: 1;
        margin-right: 10px;
        word-break: break-all;
    }
    .timestamp {
        color: #aaa;
        font-size: 0.8em;
        margin-right: 10px;
    }
    .close {
        background: none;
        border: none;
        font-size: 1.2em;
        cursor: pointer;
        color: #888;
    }
    .close:hover {
        color: #e74c3c;
    }
    .progress-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        background: linear-gradient(90deg, #3498db, #6dd5fa);
        transition: width 0.04s linear;
    }
</style>
