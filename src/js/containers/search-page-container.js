import { connect } from 'react-redux';

import SearchContent from 'components/search-page/search-content';
import { getSuggestion, selectTag, toggleSearchMode } from 'actions/search-page';
import { suggestionGroupsSelector, isEmptySelector } from 'selectors/search-page';


function mapStateToProps(state) {
  const { isRequesting, contentType, tags } = state.searchPage;

  return {
    tags,
    suggestionGroups: suggestionGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state)
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContent);
