export default {
  env: {},
  head: {
    title: "graphile-starter",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "graphile starter using nuxt.js w/ TS",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  loading: { color: "#3B8070" },
  css: ["~/assets/css/main.css"],
  build: {
    extend(config: any, _ctx: any) {
      return Object.assign({}, config, {
        devtool: "source-map",
      });
    },
  },
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "~/modules/nuxt-postgraphile",
    "@nuxtjs/axios",
    /* "@nuxtjs/apollo", */
  ],
  axios: {},
};
