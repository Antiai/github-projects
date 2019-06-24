import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {Header} from 'semantic-ui-react';
import gql from 'graphql-tag';
import * as utils from '../../utils';
import ListRepos from '../../components/ListRepos';
import Layout from '../../components/Layout';
import FormFilter from '../../components/FormFilter';
import Preloader from '../../components/Preloader';

const initialState = '';

function reducer(state, action) {
  const {
    location: {search},
  } = window;
  const {type} = action;

  switch (type) {
    case 'change':
      const {
        payload: {name, value},
      } = action;

      return value
        ? utils.urls.updateQueryParamByName(search, name, value)
        : utils.urls.deleteQueryParamByName(search, name);

    case 'submit':
      const {payload: data} = action;
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

      return searchQuery;
    default:
  }
}

function Main(props) {
  const {
    pageData: {licenses = [], refetch, search: userQuery, loading},
    match: {url},
  } = props;
  const {
    location: {search},
    history,
  } = window;

  const [licenseList, setLicenseList] = useState([]);
  const licenseListIsEmpty = !licenseList.length;

  useEffect(
    () => {
      if (licenses.length && !licenseList.length) {
        const licenseList = licenses.map((license) => ({
          key: license.id,
          value: license.key,
          text: license.name,
        }));
        setLicenseList(licenseList);
      }
    },
    [licenses]
  );

  const formFilterOptions = useMemo(
    () => ({
      licenses: licenseList,
    }),
    [licenseList]
  );

  const [searchQuery, dispatch] = useReducer(reducer, initialState);

  // refetch repos
  useEffect(
    () => {
      const queryParams = utils.urls.getQueryParams(searchQuery);
      const variables = utils.graphql.getVariables(queryParams);

      history.pushState({}, 'repos', `${url}?${searchQuery.toString()}`);

      refetch({...variables, licenseListIsEmpty});
    },
    [searchQuery]
  );

  const {items} = useMemo(() => utils.queries.getSearchResults(userQuery), [
    userQuery,
  ]);
  const data = useMemo(() => utils.urls.getQueryParams(search), [search]);
  const isLoading = useMemo(() => loading && !userQuery, [loading, userQuery]);

  if (loading && !userQuery) return <Preloader />;

  return isLoading ? (
    <Preloader />
  ) : (
    <Layout>
      <Header as="h1">Популярные новинки месяца</Header>
      <FormFilter
        options={formFilterOptions}
        data={data}
        loading={loading}
        dispatch={dispatch}
      />
      <ListRepos items={items} />
    </Layout>
  );
}

Main.propTypes = {
  query: PropTypes.string,
  first: PropTypes.number,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  pageData: PropTypes.object,
};

Main.defaultProps = {
  pageData: {},
};

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
