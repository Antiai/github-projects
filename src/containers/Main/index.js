import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import * as queries from '../../qraphql/queries';
import * as utils from '../../utils';
import ListRepos from '../../components/ListRepos';
import Layout from '../../components/Layout';
import {Header} from 'semantic-ui-react';

class Main extends Component {
  static propTypes = {
    query: PropTypes.string,
    first: PropTypes.number,
  };

  render() {
    const {
      data: {search, loading},
    } = this.props;

    if (loading) return <div>Загрузка...</div>;

    const {items} = utils.queries.getSearchResults(search);

    return (
      <Layout>
        <Header as="h1">Популярные новинки месяца</Header>
        <ListRepos items={items} />
      </Layout>
    );
  }
}

export default graphql(queries.repos.FIND_REPOS, {
  options: (props) => ({
    variables: {
      query: props.query,
      first: props.first,
    },
  }),
})(Main);
