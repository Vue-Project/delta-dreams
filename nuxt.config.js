const webpack = require("webpack");
const path = require("path");

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  head: {
    title: "delta Dreams",

    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        type: "text/javascript",
        src: "/js/jquery/jquery.min.js",
        body: true,
      },
      {
        type: "text/javascript",
        src: "/js/bootstrap/bootstrap.min.js",
        body: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/bootstrap.css",
    //! Start  main Css Files
    "~/assets/css/core-dark.css",
    "~/assets/css/core.css",
    "~/assets/css/theme-bordered-dark.css",
    "~/assets/css/theme-bordered.css",
    "~/assets/css/theme-default-dark.css",
    "~/assets/css/theme-default.css",
    "~/assets/css/theme-raspberry-dark.css",
    "~/assets/css/theme-raspberry.css",
    "~/assets/css/theme-semi-dark-dark.css",
    "~/assets/css/theme-semi-dark.css",
    // "~/assets/css/main.css",
    // "~/assets/scss/style.scss",
    //! End Css Files

    //! Start  libs Css Files
    "~/assets/vendor/libs/flatpickr/flatpickr.css",
    "~/assets/vendor/fonts/fontawesome.css",
    //! end  libs Css Files

    // !  changes styles
    "~/assets/css/changes.css",
    "~/assets/css/Edits.css",
    // !  changes styles
  ],

  script: [
    {
      src: "https://code.jquery.com/jquery-1.11.0.min.js",
      type: "text/javascript",
    },
    {
      src: "https://code.jquery.com/jquery-migrate-1.2.1.min.js",
      type: "text/javascript",
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/vue-wow-config"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["jquery", "jPinning"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery",
      }),
    ],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
