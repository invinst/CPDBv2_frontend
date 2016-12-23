import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import { resultWrapperStyle, helperTextStyle, recentRandomWrapperStyle } from './search-no-input.style';
import RecentSuggestion from './recent-suggestion';


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
    return (
      <div style={ resultWrapperStyle }>
        <div style={ helperTextStyle } className='search-hint'>
          Search by officer name, badge number, or neighborhood.
        </div>
        <div style={ recentRandomWrapperStyle }>
          { this.renderRecentSuggestion() }
        </div>
      </div>
    );
  }
}

SuggestionNoInput.propTypes = {
  recentSuggestions: PropTypes.array
};
