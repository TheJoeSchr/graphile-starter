import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import link from './link';

export default function apolloClient(_, inject) {
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

  inject('apollo', client);
}
