import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

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
      <div>
        { this.renderRecentSuggestion() }
      </div>
    );
  }
}

SuggestionNoInput.propTypes = {
  recentSuggestions: PropTypes.array
};
