<template>
    <div class="notifications">
        <div v-for="(notification, index) in notifications" :key="index" class="notification" :class="getNotificationClass(notification.message)">
            <span class="info-icon">{{ getNotificationIcon(notification.message) }}</span>
            <span class="message link" @click="goToReservation(getId(notification.message))" style="cursor: pointer; text-decoration: underline; color: #3498db">
                {{ getDisplayMessage(notification.message) }}
            </span>
            <span class="timestamp">{{ notification.timestamp }}</span>
            <button class="close" @click="remove(index)">×</button>
            <div class="progress-bar" :style="{ width: progressWidths[index] + '%' }" :class="getProgressBarClass(notification.message)"></div>
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
            getId(message) {
                if (typeof message === 'object' && message !== null && message.id) {
                    return message.id;
                }
                return message;
            },
            getDisplayMessage(message) {
                if (typeof message === 'object' && message !== null) {
                    if (message.is_new === true) {
                        return `New Reservation Created: ${message.text || message.id || 'New reservation added'}`;
                    } else if (message.is_updated === true) {
                        return `Reservation Updated: ${message.text || message.id || 'Reservation has been updated'}`;
                    } else {
                        return message.text || message.id || JSON.stringify(message);
                    }
                } else {
                    return message;
                }
            },
            getNotificationIcon(message) {
                if (typeof message === 'object' && message !== null) {
                    if (message.is_new === true) {
                        return '🆕'; // New icon
                    } else if (message.is_updated === true) {
                        return '✏️'; // Edit/Update icon
                    } else {
                        return 'ℹ️'; // Info icon
                    }
                }
                return 'ℹ️';
            },
            getNotificationClass(message) {
                if (typeof message === 'object' && message !== null) {
                    if (message.is_new === true) {
                        return 'new-reservation';
                    } else if (message.is_updated === true) {
                        return 'update-reservation';
                    } else {
                        return 'general-notification';
                    }
                }
                return 'general-notification';
            },
            getProgressBarClass(message) {
                if (typeof message === 'object' && message !== null) {
                    if (message.is_new === true) {
                        return 'progress-new';
                    } else if (message.is_updated === true) {
                        return 'progress-update';
                    } else {
                        return 'progress-general';
                    }
                }
                return 'progress-general';
            },
            startProgress(index) {
                const duration = 8000; // 8 seconds
                const interval = 50; // update every 50ms for smoothness
                let elapsed = 0;
                this.$set(this.progressWidths, index, 100);
                const timer = setInterval(() => {
                    elapsed += interval;
                    const percent = Math.max(100 - (elapsed / duration) * 100, 0);
                    this.$set(this.progressWidths, index, percent);
                    if (percent <= 0) {
                        clearInterval(timer);
                        // Add small delay after reaching 0% before removing
                        setTimeout(() => {
                            this.remove(index);
                        }, 200);
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

    /* Different styles for different notification types */
    .notification.new-reservation {
        border-left: 4px solid #10b981;
        background: #f0fff4;
    }

    .notification.update-reservation {
        border-left: 4px solid #3498db;
        background: #f0f8ff;
    }

    .notification.general-notification {
        border-left: 4px solid #6b7280;
        background: #f9fafb;
    }

    .info-icon {
        font-size: 1.3em;
        margin-right: 8px;
    }
    .message {
        flex: 1;
        margin-right: 10px;
        word-break: break-all;
        font-weight: 500;
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
        transition: color 0.2s;
    }
    .close:hover {
        color: #e74c3c;
    }
    .progress-bar {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        transition: width 0.05s linear;
    }

    /* Different progress bar colors */
    .progress-new {
        background: linear-gradient(90deg, #10b981, #34d399);
    }

    .progress-update {
        background: linear-gradient(90deg, #3498db, #6dd5fa);
    }

    .progress-general {
        background: linear-gradient(90deg, #6b7280, #9ca3af);
    }
</style>
