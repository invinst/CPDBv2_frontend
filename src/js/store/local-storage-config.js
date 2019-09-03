export default {
  slicer(paths) {
    /* istanbul ignore next */
    return (state) => ({
      searchPage: {
        recentSuggestions: state.searchPage.recentSuggestions,
      },
    });
  },
};
