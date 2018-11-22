import get from 'lodash/get';

export default {
  getSearchResults: (search) => {
    return {
      items: get(search, 'edges', []).map((edge) => ({
        ...edge.node,
        cursor: edge.cursor,
      })),
    };
  },
};
