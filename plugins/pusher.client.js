import Pusher from 'pusher-js';

export default ({ app }, inject) => {
    // Get Pusher config from runtime config (server-editable) or fallback to build-time env
    const config = (typeof window !== 'undefined' && window.APP_CONFIG) || {
        PUSHER_APP_KEY: process.env.PUSHER_APP_KEY || app.$config?.pusherKey,
        PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER || app.$config?.pusherCluster,
    };

    // Initialize Pusher with credentials from runtime config
    const pusher = new Pusher(config.PUSHER_APP_KEY, {
        cluster: config.PUSHER_APP_CLUSTER,
        encrypted: true,
    });

    // Inject pusher into:
    // - Vue components (this.$pusher)
    // - Context (ctx.app.$pusher)
    // - Vuex store (this.app.$pusher)
    inject('pusher', pusher);
};
