import { connect } from 'react-redux';

import Autocomplete from 'components/landing-page/autocomplete';
import { getSuggestion, selectTag } from 'actions/landing-page/suggestion';


function mapStateToProps(state) {
  const { suggestionGroups, isRequesting, contentType, tags } = state.landingPage.suggestionApp;
  return {
    tags,
    suggestionGroups,
    isRequesting,
    contentType
  };
}

const mapDispatchToProps = {
  getSuggestion,
  selectTag
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
