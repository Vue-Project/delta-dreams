export default ({ app, store }) => {
    if (!app.$pusher) return;

    const globalChannel = app.$pusher.subscribe('global-channel');
    globalChannel.bind('global-event', data => {
        store.commit('notifications/ADD_NOTIFICATION', {
            message: data.message,
            timestamp: new Date(),
        });
    });
};
