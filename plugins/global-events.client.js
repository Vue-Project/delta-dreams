export default ({ app, store }) => {
    // console.log('global-events loaded', !!app.$pusher);
    if (!app.$pusher) return;

    const globalChannel = app.$pusher.subscribe('reservation-channel');
    globalChannel.bind('request-reservation', data => {
        // console.log('Received reservation event:', data);
        store.commit('notifications/ADD_NOTIFICATION', {
            message: data.id,
            // timestamp: new Date(),
        });
    });
};
