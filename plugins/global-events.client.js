export default ({ app, store }) => {
    if (!app.$pusher) return;

    const globalChannel = app.$pusher.subscribe('reservation-channel');
    globalChannel.bind('request-reservation', data => {
        store.commit('notifications/ADD_NOTIFICATION', {
            message: data.message,
            timestamp: new Date(),
        });
    });
};
