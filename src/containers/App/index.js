import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Main from '../Main';
import moment from 'moment';

const defaults = {
  query: `language:JavaScript stars:>0 created:>${moment()
    .subtract(1, 'months')
    .format('YYYY-MM-DD')}`,
  first: 10,
};

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: async (operation) => {
    operation.setContext({
      headers: {
        authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
      },
    });
  },
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Main query={defaults.query} first={defaults.first} />
      </ApolloProvider>
    );
  }
}

export default App;
