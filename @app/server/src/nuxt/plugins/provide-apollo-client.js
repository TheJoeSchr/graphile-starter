// plugins/provide-apollo-client.js
import {provide} from '@vue/composition-api'
import {DefaultApolloClient} from '@vue/apollo-composable'
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import link from './link';

export default function ({app}) {
  app.setup = () => {
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      // Provide required constructor fields
      cache,
      link,
      // Provide some optional constructor fields
      name: 'apollo-client',
      queryDeduplication: false,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
      },
    });

    provide(DefaultApolloClient, client)
  }

}
