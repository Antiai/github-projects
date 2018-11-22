import gql from 'graphql-tag';

export default {
  GET_LICENSES: gql`
    query GET_LICENSES {
      licenses {
        id
        key
        name
      }
    }
  `,
};
