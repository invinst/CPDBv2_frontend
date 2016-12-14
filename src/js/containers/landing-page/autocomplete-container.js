import { connect } from 'react-redux';
import { get } from 'lodash';

import Autocomplete from 'components/landing-page/autocomplete';
import { getSuggestion, selectTag, toggleSearchMode } from 'actions/landing-page/suggestion';
import { suggestionGroupsSelector, isEmptySelector } from 'selectors/landing-page/autocomplete/suggestion-groups';


function mapStateToProps(state, ownProps) {
  const { isRequesting, contentType, tags } = state.landingPage.suggestionApp;
  return {
    tags,
    suggestionGroups: suggestionGroupsSelector(state),
    isRequesting,
    contentType,
    isEmpty: isEmptySelector(state),
    searchText: get(ownProps, 'location.state.searchText', '')
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag,
  toggleSearchMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
