import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from '../Main';

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
        <Router>
          <Route
            path="/"
            component={Main}
          />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
