import React, { Component, PropTypes } from 'react';

import RecentSuggestionItem from './recent-suggestion-item';
import { suggestionGroupStyle } from './recent-suggestion.style.js';
import BlockTitle from 'components/common/block-title';


export default class RecentSuggestion extends Component {
  render() {
    const { recentSuggestions } = this.props;

    const maxIndex = recentSuggestions.length - 1;
    return (
      <div
        style={ suggestionGroupStyle }
        className='recent-suggestions'>
        <BlockTitle>RECENT</BlockTitle>
        <div>
          {
          recentSuggestions.map((entry, index) => (
            <RecentSuggestionItem key={ index } entry={ entry } isLast={ index === maxIndex }/>
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
