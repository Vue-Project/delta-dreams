import Pusher from 'pusher-js';

export default ({ $config }, inject) => {
    // Initialize Pusher with your credentials
    const pusher = new Pusher($config.pusherKey, {
        cluster: $config.pusherCluster,
        encrypted: true,
    });

    // Inject pusher into:
    // - Vue components (this.$pusher)
    // - Context (ctx.app.$pusher)
    // - Vuex store (this.app.$pusher)
    inject('pusher', pusher);
};
