// Utility for accessing runtime config in Vue components
// Usage: import { getBaseUrl, getApiBaseUrl } from '@/utils/config'

export function getApiBaseUrl() {
    if (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) {
        return window.APP_CONFIG.API_BASE_URL;
    }
    return process.env.API_BASE_URL || '';
}

export function getBaseUrl() {
    if (typeof window !== 'undefined' && window.APP_CONFIG && window.APP_CONFIG.BASE_URL) {
        return window.APP_CONFIG.BASE_URL;
    }
    return process.env.BASE_URL || '';
}

export function getPusherConfig() {
    if (typeof window !== 'undefined' && window.APP_CONFIG) {
        return {
            key: window.APP_CONFIG.PUSHER_APP_KEY || process.env.PUSHER_APP_KEY,
            cluster: window.APP_CONFIG.PUSHER_APP_CLUSTER || process.env.PUSHER_APP_CLUSTER,
        };
    }
    return {
        key: process.env.PUSHER_APP_KEY || '',
        cluster: process.env.PUSHER_APP_CLUSTER || '',
    };
}