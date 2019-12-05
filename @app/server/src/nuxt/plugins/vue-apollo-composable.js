import { DefaultApolloClient } from "@vue/apollo-composable";
import { provide } from "@vue/composition-api";
// import Vue from "vue";

export default (ctx, _inject) => {
  return {
    setup() {
      debugger;
      // const defaultClient = DefaultApolloClient.toString();
      const apolloClient = ctx.app.apolloProvider.defaultClient;
      ctx.app.provide(DefaultApolloClient, apolloClient);
    },
  };
};

/* export default (outside, inject) => {
  try {

  debugger;
  const defaultClient = DefaultApolloClient.toString();
  const apolloClient = app.apolloProvider.defaultClient;
  const dollarApolloClient = `$${defaultClient}`;
  // Vue.prototype[dollarApolloClient] = apolloClient;
  const app = outside.app;
  app.defaultClient = apolloClient;
  app[`$${defaultClient}`] = apolloClient;
  inject(defaultClient, apolloClient)
  debugger;
  } catch (e) {

  debugger;
  }
  // inject('myInjectedFunction', string => console.log('That was easy!', string))
}
 */
