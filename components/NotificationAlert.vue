<template>
  <div class="notifications">
    <transition-group name="slide">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        v-show="notification.show"
        class="notification"
        :class="notification.type"
      >
        {{ notification.message }}
        <button @click="hide(notification.id)" class="close">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NotificationAlert',
  computed: {
    ...mapState('notifications', ['notifications'])
  },
  methods: {
    ...mapMutations('notifications', ['hideNotification']),
    hide(id) {
      this.hideNotification(id)
    }
  }
}
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  background: white;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 250px;
}

.notification.success {
  background: #4caf50;
  color: white;
}

.notification.error {
  background: #f44336;
  color: white;
}

.notification.info {
  background: #2196f3;
  color: white;
}

.notification.warning {
  background: #ff9800;
  color: white;
}

.close {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  opacity: 0.7;
}

.close:hover {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
