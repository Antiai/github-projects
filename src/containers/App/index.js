import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import dayjs from 'dayjs';
import Main from '../Main';

const defaults = {
  query: `language:JavaScript stars:>0 query:"" created:>${dayjs()
    .subtract(1, 'month')
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
        <Router>
          <Route
            path="/"
            render={(props) => (
              <Main query={defaults.query} first={defaults.first} {...props} />
            )}
          />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
