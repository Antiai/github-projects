import gql from 'graphql-tag';

export default {
  FIND_REPOS: gql`
    query FIND_REPOS($query: String!, $first: Int!, $after: String) {
      search(type: REPOSITORY, query: $query, first: $first, after: $after) {
        edges {
          cursor
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
    }
  `,
};
