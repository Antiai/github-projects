import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import * as queries from '../../qraphql/queries';
import * as utils from '../../utils';
import ListRepos from '../../components/ListRepos';
import Layout from '../../components/Layout';
import {Header} from 'semantic-ui-react';
import FormFilter from '../../components/FormFilter';

class Main extends Component {
  static propTypes = {
    query: PropTypes.string,
    first: PropTypes.number,
  };

  getLicenseOptions() {
    const {
      dataLicenses: {licenses, loading},
    } = this.props;

    if (loading) return [];

    return licenses.map((license) => ({
      key: license.id,
      value: license.id,
      text: license.name,
    }));
  }

  render() {
    const {
      data: {search, loading},
    } = this.props;

    if (loading) return <div>Загрузка...</div>;

    const {items} = utils.queries.getSearchResults(search);

    return (
      <Layout>
        <Header as="h1">Популярные новинки месяца</Header>
        <FormFilter options={{licenses: this.getLicenseOptions()}} />
        <ListRepos items={items} />
      </Layout>
    );
  }
}

export default compose(
  graphql(queries.repos.FIND_REPOS, {
    options: (props) => ({
      variables: {
        query: props.query,
        first: props.first,
      },
    }),
  }),
  graphql(queries.licenses.GET_LICENSES, {
    name: 'dataLicenses',
  })
)(Main);
