import { connect } from 'react-redux';

import Autocomplete from 'components/landing-page/autocomplete';
import { getSuggestion } from 'actions/landing-page/suggestion';
import { suggestionsSelector } from 'selectors/landing-page/autocomplete-selector';


function mapStateToProps(state) {
  return {
    suggestionGroups: suggestionsSelector(state),
    isRequesting: state.landingPage.suggestionApp.isRequesting
  };
}

const mapDispatchToProps = {
  getSuggestion
};

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);
