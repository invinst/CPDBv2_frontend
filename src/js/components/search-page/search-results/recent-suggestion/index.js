import React, { Component, PropTypes } from 'react';

import RecentSuggestionItem from './recent-suggestion-item';
import { suggestionGroupStyle } from './recent-suggestion.style';
import BlockTitle from 'components/common/block-title';


export default class RecentSuggestion extends Component {
  render() {
    const { recentSuggestions } = this.props;
    return (
      <div
        style={ suggestionGroupStyle }
        className='recent-suggestions'>
        <BlockTitle>RECENT</BlockTitle>
        <div>
          {
            recentSuggestions.map((entry, index) => (
              <RecentSuggestionItem key={ index } entry={ entry } />
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
