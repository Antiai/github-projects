import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const GET_VIEWER = gql`
  query($numberOfRepos: Int!) {
    viewer {
      name
      repositories(last: $numberOfRepos) {
        nodes {
          name
        }
      }
    }
  }
`;

class Main extends Component {
  static propTypes = {
    numberOfRepos: PropTypes.number,
  };

  render() {
    return (
      <Query
        query={GET_VIEWER}
        variables={{numberOfRepos: this.props.numberOfRepos}}
      >
        {({loading, error, data}) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return <div>{data.viewer.name}</div>;
        }}
      </Query>
    );
  }
}

export default Main;
