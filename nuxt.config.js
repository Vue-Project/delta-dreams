const webpack = require('webpack');
const path = require('path');

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'systemira', // fallback
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
            {
                hid: 'csrf-token',
                name: 'csrf-token',
                content: process.env.CSRF_TOKEN || '',
            },
            // Add cache prevention meta tags
            { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
            { 'http-equiv': 'Pragma', content: 'no-cache' },
            { 'http-equiv': 'Expires', content: '0' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [
            {
                type: 'text/javascript',
                src: '/js/bootstrap/bootstrap.min.js',
                body: true,
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~/assets/css/bootstrap.css',
        '~/assets/css/core-dark.css',
        '~/assets/css/core.css',
        '~/assets/css/theme-bordered-dark.css',
        '~/assets/css/theme-bordered.css',
        '~/assets/css/theme-default-dark.css',
        '~/assets/css/theme-default.css',
        '~/assets/css/theme-raspberry-dark.css',
        '~/assets/css/theme-raspberry.css',
        '~/assets/css/theme-semi-dark-dark.css',
        '~/assets/css/theme-semi-dark.css',
        '~/assets/vendor/fonts/fontawesome.css',
        '~/assets/css/changes.css',
        '~/assets/css/Responsive.css',
    ],

    script: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: ['~/plugins/vue-wow-config', { src: '~/plugins/store-init.js', mode: 'client' }, { src: '~/plugins/vue-easy-lightbox.js', mode: 'client' }, { src: '~/plugins/pusher.client.js', mode: 'client' }],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        vendor: ['jquery', 'jPinning'],

        // Add file hashing for cache busting
        filenames: {
            app: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash:7].js'),
            chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash:7].js'),
            css: ({ isDev }) => (isDev ? '[name].css' : '[name].[contenthash:7].css'),
            img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]'),
            font: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]'),
            video: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'),
        },

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery',
            }),
        ],

        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    exclude: /(node_modules)/,
                });
            }

            // Add timestamp to prevent caching in production
            if (!isDev) {
                config.output.filename = '[name].[contenthash].js';
                config.output.chunkFilename = '[name].[contenthash].js';
            }
        },

        // Enable source maps for better debugging
        // extractCSS: true, // Extract CSS into separate files

        hardSource: true,
    },

    // Add render configuration for cache headers
    render: {
        static: {
            maxAge: 0, // Disable static file caching
        },
        http2: {
            push: false, // Disable HTTP/2 push for immediate updates
        },
    },

    // Server middleware for cache headers
    serverMiddleware: ['~/middleware/no-cache.js'],

    static: {
        prefix: false, // Ensures static files are served as-is
    },

    ignoredPaths: [''],

    publicRuntimeConfig: {
        baseURL: process.env.BASE_URL,
        pusherAppKey: process.env.PUSHER_APP_KEY || '',
        pusherAppCluster: process.env.PUSHER_APP_CLUSTER || 'mt1'
    },

    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },

    // Generate configuration for static deployment
    generate: {
        fallback: true,
        // Add timestamp to generated files
        dir: 'dist',
    },

    // Add router configuration
    router: {
        middleware: ['forceParams'],

        // Add cache busting for routes
        extendRoutes(routes, resolve) {
            // Optional: add version parameter to routes
        },
    },
};
