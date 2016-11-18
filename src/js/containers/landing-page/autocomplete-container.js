import { connect } from 'react-redux';

import Autocomplete from 'components/landing-page/autocomplete';
import { getSuggestion } from 'actions/landing-page/suggestion';
import { tagsSelector } from 'selectors/landing-page/autocomplete-selector';


function mapStateToProps(state) {
  const { suggestionGroups, isRequesting } = state.landingPage.suggestionApp;
  return {
    tags: tagsSelector(state),
    suggestionGroups,
    isRequesting
  };
}

const mapDispatchToProps = {
  getSuggestion
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
