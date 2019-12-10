// link.js
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'unfetch';
const httpLink = new HttpLink({
  uri: `http://localhost:5678/api/graphql`,
  credentials: 'same-origin',
  fetch,
});

const wsParams = {
 // TODO: use port from ENV
  uri: `ws://localhost:5678/api/graphql`,
  reconnect: true,
};

if (process.server) {
  wsParams.webSocketImpl = require('ws');
}

const wsLink = new WebSocketLink(wsParams);

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default link;
