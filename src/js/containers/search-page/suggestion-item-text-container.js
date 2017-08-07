import { connect } from 'react-redux';
import React from 'react';

import { setAliasAdminPageContent } from 'actions/inline-alias-admin-page';
import
  SuggestionItemText
from 'components/search-page/search-results/suggestion-group/suggestion-column/suggestion-item-text';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}

const mapDispatchToProps = {
  setAliasAdminPageContent
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionItemText);
