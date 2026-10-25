// Plugin to provide runtime config throughout the app
// Uses window.APP_CONFIG from static/config.js (server-editable)
// Falls back to process.env values during SSR or if config.js not loaded

export default (context, inject) => {
    const getConfig = () => {
        // Runtime config from window (loaded from static/config.js)
        if (typeof window !== 'undefined' && window.APP_CONFIG) {
            return window.APP_CONFIG;
        }
        // Fallback to build-time env vars
        return {
            API_BASE_URL: process.env.API_BASE_URL || '',
            BASE_URL: process.env.BASE_URL || '',
            PUSHER_APP_KEY: process.env.PUSHER_APP_KEY || '',
            PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER || '',
        };
    };

    // Create a reactive config object
    const config = new Proxy({}, {
        get(target, prop) {
            const currentConfig = getConfig();
            return currentConfig[prop];
        }
    });

    // Inject into context - available as $config everywhere
    inject('config', config);

    // Also set on the app instance for easier access
    if (context.app) {
        context.app.$config = config;
    }
};