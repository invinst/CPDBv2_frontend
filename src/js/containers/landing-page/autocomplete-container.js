import { connect } from 'react-redux';

import Autocomplete from 'components/landing-page/autocomplete';
import { getSuggestion, selectTag } from 'actions/landing-page/suggestion';
import { suggestionGroupsSelector, isEmptySelector } from 'selectors/landing-page/autocomplete/suggestion-groups';


function mapStateToProps(state) {
  const { isRequesting, contentType, tags } = state.landingPage.suggestionApp;
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
  selectTag
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
