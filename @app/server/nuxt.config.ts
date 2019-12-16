import path from "path";
export default {
  modulesDir: [
    path.resolve(__dirname, "../../node_modules/"),
    path.resolve(__dirname, "../../@app/"), // TODO: (more testing) let's nuxt see @app after hot-reload
  ],
  server: {
    port: parseInt(process.env.PORT || "", 10) || 3000, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
  srcDir: "src/nuxt",
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
  css: [
    "src/nuxt/assets/css/main.css",
    {
      src: "ant-design-vue/dist/antd.less",
      lang: "less",
    },
  ],
  build: {
    extend(config: any, ctx: any) {
      // adds nuxt debug
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        /*         modifyVars: {
          "primary-color": "rgba(222, 12, 101, 1.0)",
          "component-background": "#ffffff",
        }, */
      },
    },
    babel: {
      plugins: ["@babel/plugin-proposal-optional-chaining","@babel/plugin-proposal-nullish-coalescing-operator"],
    },
  },
  buildModules: ["@nuxt/typescript-build"],
  modules: ["@nuxtjs/axios", "~/modules/nuxt-postgraphile", "@nuxtjs/apollo"],
  plugins: ["~/plugins/composition-api","~/plugins/provide-apollo-client"],
  axios: {},
  // Give apollo module options
  apollo: {
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: "http://localhost:5678",
        // optional
        // override HTTP endpoint in browser only
        browserHttpEndpoint: "/api/graphql",
      },
    },
  },
  // TODO: import config from @app/config or similar
  postgraphile: {
    options: {
      // appendPlugins: [PgSimplifyInflectorPlugin],
      graphiql: true,
      // Optional customisation
      graphileBuildOptions: {
        /*
         * Uncomment if you are using `simpleCollections: 'only'` and you never
         * want relay connections
         */
        // pgOmitListSuffix: true,
        /*
         * Uncomment if you want 'userPatch' instead of 'patch' in update
         * mutations.
         */
        // pgSimplifyPatch: false,
        /*
         * Uncomment if you want 'allUsers' instead of 'users' at root level.
         */
        // pgSimplifyAllRows: false,
      },
    },
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
};
