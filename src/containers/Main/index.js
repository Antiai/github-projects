import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {Header} from 'semantic-ui-react';
import * as queries from '../../qraphql/queries';
import * as utils from '../../utils';
import ListRepos from '../../components/ListRepos';
import Layout from '../../components/Layout';
import FormFilter from '../../components/FormFilter';
import Preloader from '../../components/Preloader';

class Main extends Component {
  static propTypes = {
    query: PropTypes.string,
    first: PropTypes.number,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  getLicenseOptions() {
    const {
      dataLicenses: {licenses, loading},
    } = this.props;

    if (loading) return [];

    return licenses.map((license) => ({
      key: license.id,
      value: license.key,
      text: license.name,
    }));
  }

  handleChange = (field) => {
    const {
      match: {url},
      location: {search},
      history,
    } = this.props;
    const {name, value} = field;

    const searchQuery = value
      ? utils.urls.updateQueryParamByName(search, name, value)
      : utils.urls.deleteQueryParamByName(search, name);

    history.push({
      pathname: url,
      search: searchQuery.toString(),
    });
  };

  handleSubmit = (data) => {
    const {
      match: {url},
      location: {search},
      history,
    } = this.props;

    let searchQuery = new URLSearchParams(search);

    Object.keys(data).forEach((key) => {
      searchQuery = data[key]
        ? utils.urls.updateQueryParamByName(
            searchQuery.toString(),
            key,
            data[key]
          )
        : utils.urls.deleteQueryParamByName(searchQuery.toString(), key);
    });

    history.push({
      pathname: url,
      search: searchQuery.toString(),
    });
  };

  render() {
    const {
      dataRepos: {search, loading},
      location,
    } = this.props;

    if (loading && !search) return <Preloader />;

    const {items} = utils.queries.getSearchResults(search);
    const data = utils.urls.getQueryParams(location.search);

    return (
      <Layout>
        <Header as="h1">Популярные новинки месяца</Header>
        <FormFilter
          options={{licenses: this.getLicenseOptions()}}
          data={data}
          loading={loading}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <ListRepos items={items} />
      </Layout>
    );
  }
}

export default compose(
  graphql(queries.repos.FIND_REPOS, {
    name: 'dataRepos',
    options: (props) => {
      const queryParams = utils.urls.getQueryParams(props.location.search);
      const variables = utils.graphql.getVariables(queryParams);

      return {
        variables,
      };
    },
  }),
  graphql(queries.licenses.GET_LICENSES, {
    name: 'dataLicenses',
  })
)(Main);
