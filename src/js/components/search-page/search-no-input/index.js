import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import RecentSuggestion from './recent-suggestion';
import SuggestedCards from 'components/search-page/search-no-input/suggested-cards';
import { horizontallyScrollableStyle } from './search-no-input.style';


export default class SuggestionNoInput extends Component {
  renderRecentSuggestion() {
    const { recentSuggestions } = this.props;

    if (!isEmpty(recentSuggestions)) {
      return (
        <RecentSuggestion recentSuggestions={ recentSuggestions }/>
      );
    }

    return null;
  }

  render() {
    const { officerCards, requestActivityGrid } = this.props;
    return (
      <div style={ horizontallyScrollableStyle }>
        { this.renderRecentSuggestion() }
        <SuggestedCards
          cards={ officerCards }
          requestActivityGrid={ requestActivityGrid }
        />
      </div>
    );
  }
}

SuggestionNoInput.propTypes = {
  recentSuggestions: PropTypes.array,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func
};
