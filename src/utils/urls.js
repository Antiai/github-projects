export default {
  getQueryParamByName: (searchQuery, name) => new URLSearchParams(searchQuery).get(name),

  updateQueryParamByName: (searchQuery, name, data) => {
    const currentUrlParams = new URLSearchParams(searchQuery);
    currentUrlParams.set(name, data);

    return currentUrlParams;
  },

  deleteQueryParamByName: (searchQuery, name) => {
    const currentUrlParams = new URLSearchParams(searchQuery);
    currentUrlParams.delete(name);

    return currentUrlParams;
  },

  getQueryParams: (searchQuery) => {
    const currentUrlParams = new URLSearchParams(searchQuery);
    const params = {};

    for (const pair of currentUrlParams.entries()) {
      params[pair[0]] = pair[1];
    }

    return params;
  }
};
