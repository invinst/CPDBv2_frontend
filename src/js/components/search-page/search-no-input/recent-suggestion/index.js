import React, { Component, PropTypes } from 'react';

import RecentSuggestionItem from './recent-suggestion-item';
import { suggestionGroupStyle, groupHeaderStyle } from './recent-suggestion.style.js';


export default class RecentSuggestion extends Component {
  render() {
    const { recentSuggestions } = this.props;

    return (
      <div
        style={ suggestionGroupStyle }
        className='recent-suggestions'>
        <div style={ groupHeaderStyle }>RECENT</div>
        <div>
        {
          recentSuggestions.map((entry, key) => (
            <RecentSuggestionItem key={ key } entry={ entry }/>
          ))
        }
        </div>
      </div>
    );
  }
}

RecentSuggestion.defaultProps = {
  recentSuggestions: []
};

RecentSuggestion.propTypes = {
  recentSuggestions: PropTypes.array
};
