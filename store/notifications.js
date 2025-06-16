export const state = () => ({
  notifications: []
})

export const mutations = {
  showNotification(state, { message, type = 'info' }) {
    state.notifications.push({
      id: Date.now(),
      message,
      type,
      show: true
    })
  },
  hideNotification(state, id) {
    const notification = state.notifications.find(n => n.id === id)
    if (notification) {
      notification.show = false
    }
  }
}

export const actions = {
  notify({ commit }, { message, type }) {
    commit('showNotification', { message, type })
  }
}
