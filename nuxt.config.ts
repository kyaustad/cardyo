// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-qrcode",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
  ],

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },
  pwa: {
    injectRegister: "auto",

    includeAssets: ["favicon.ico", "apple-touch-icon.png", "favicon.svg"],
    manifest: {
      name: "Cardyo",
      short_name: "Cardyo",
      description: "A simple, URL based, digital card system.",
      theme_color: "#000000",
      icons: [
        {
          src: "web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "favicon.svg",
          sizes: "512x512",
          type: "image/svg",
          purpose: "any",
        },
      ],
    },
  },

  compatibilityDate: "2024-11-27",
});
