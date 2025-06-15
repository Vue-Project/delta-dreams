<template>
  <div class="pusher-status" :class="status">
    <span class="status-dot"></span>
    {{ statusMessage }}
  </div>
</template>

<script>
export default {
  name: 'PusherStatus',
  data() {
    return {
      status: 'disconnected',
      statusMessage: 'Disconnected'
    }
  },
  mounted() {
    if (this.$pusher) {
      this.$pusher.connection.bind('state_change', (states) => {
        this.status = states.current
        this.updateStatusMessage(states.current)
      })
    }
  },
  methods: {
    updateStatusMessage(state) {
      const messages = {
        connecting: 'Connecting...',
        connected: 'Connected',
        disconnecting: 'Disconnecting...',
        disconnected: 'Disconnected',
        failed: 'Connection Failed'
      }
      this.statusMessage = messages[state] || state
    }
  }
}
</script>

<style scoped>
.pusher-status {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  background: #f5f5f5;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 1000;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
}

.pusher-status.connected .status-dot {
  background: #4caf50;
}

.pusher-status.connecting .status-dot {
  background: #ff9800;
}

.pusher-status.disconnected .status-dot {
  background: #f44336;
}

.pusher-status.failed .status-dot {
  background: #f44336;
}
</style>
