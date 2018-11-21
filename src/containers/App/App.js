import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import Main from '../Main/Main';

const defaults = {
  numberOfRepos: 3,
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
        <Main numberOfRepos={defaults.numberOfRepos} />
      </ApolloProvider>
    );
  }
}

export default App;
