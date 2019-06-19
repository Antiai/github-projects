import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {Header} from 'semantic-ui-react';
import gql from 'graphql-tag';
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
    pageData: PropTypes.object,
  };

  static defaultProps = {
    pageData: {},
  };

  state = {
    licenseList: [],
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      pageData: {licenses = []},
    } = this.props;
    const {licenseList} = this.state;

    if (licenses.length && !licenseList.length)
      this.setState({licenseList: licenses});
  }

  getLicenseOptions() {
    const {licenseList: licenses} = this.state;

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
      location: {search},
      pageData: {refetch},
    } = this.props;
    const {licenseList} = this.state;

    const licenseListIsEmpty = !licenseList.length;
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

    const queryParams = utils.urls.getQueryParams(searchQuery);
    const variables = utils.graphql.getVariables(queryParams);

    refetch({...variables, licenseListIsEmpty});
  };

  render() {
    const {
      pageData: {search, loading},
      location,
    } = this.props;

    if (loading && !search) return <Preloader />;

    const {items} = utils.queries.getSearchResults(search);
    const data = utils.urls.getQueryParams(location.search);
    const formFilterOptions = {
      licenses: this.getLicenseOptions(),
    };

    return (
      <Layout>
        <Header as="h1">Популярные новинки месяца</Header>
        <FormFilter
          options={formFilterOptions}
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

export default graphql(
  gql`
    query MainPage(
      $query: String!
      $first: Int!
      $licenseListIsEmpty: Boolean!
    ) {
      search(type: REPOSITORY, query: $query, first: $first) {
        edges {
          node {
            ... on Repository {
              id
              url
              name
              description
              forkCount
              stargazers {
                totalCount
              }
              licenseInfo {
                id
                key
                name
              }
              updatedAt
              createdAt
            }
          }
        }
      }

      licenses @include(if: $licenseListIsEmpty) {
        id
        key
        name
      }
    }
  `,
  {
    name: 'pageData',
    options: (props) => {
      const queryParams = utils.urls.getQueryParams(props.location.search);
      const variables = utils.graphql.getVariables(queryParams);

      return {
        variables: {
          ...variables,
          licenseListIsEmpty: true,
        },
        partialRefetch: true,
      };
    },
  }
)(Main);
