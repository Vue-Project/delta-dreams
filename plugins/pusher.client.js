import Pusher from 'pusher-js'

export default ({ store, $config }, inject) => {
  if (!$config.pusherAppKey) {
    console.error('Pusher App Key is not configured!')
    return
  }

  // Initialize Pusher with connection options
  const pusher = new Pusher($config.pusherAppKey, {
    cluster: $config.pusherAppCluster,
    encrypted: true,
    enabledTransports: ['ws', 'wss'], // Force WebSocket transport
    disabledTransports: ['xhr_streaming', 'xhr_polling'],
    activityTimeout: 30000, // 30 seconds
    pongTimeout: 5000, // 5 seconds
    maxReconnectionAttempts: 5,
    maxReconnectGap: 10
  })

  // Handle connection events
  pusher.connection.bind('state_change', (states) => {
    console.log('Pusher connection state changed:', states)
  })

  pusher.connection.bind('error', (err) => {
    console.error('Pusher connection error:', err)
    store.dispatch('notifications/notify', {
      message: 'Connection error. Trying to reconnect...',
      type: 'error'
    })
  })

  pusher.connection.bind('connected', () => {
    console.log('Pusher connected successfully')
    store.dispatch('notifications/notify', {
      message: 'Real-time connection established',
      type: 'success'
    })
  })

  // Subscribe to channels with error handling
  const channels = {
    notifications: pusher.subscribe('notifications'),
    updates: pusher.subscribe('updates'),
    chat: pusher.subscribe('chat')
  }

  // Handle notifications with error handling
  channels.notifications.bind('notification', (data) => {
    try {
      store.dispatch('notifications/notify', {
        message: data.message,
        type: data.type || 'info'
      })
    } catch (error) {
      console.error('Error handling notification:', error)
    }
  })

  // Handle updates with error handling
  channels.updates.bind('update', (data) => {
    try {
      store.dispatch('updates/handleUpdate', data)
    } catch (error) {
      console.error('Error handling update:', error)
    }
  })

  // Handle chat messages with error handling
  channels.chat.bind('message', (data) => {
    try {
      store.dispatch('chat/handleMessage', data)
    } catch (error) {
      console.error('Error handling chat message:', error)
    }
  })

  // Make pusher available in components
  inject('pusher', pusher)
  inject('channels', channels)
}
