import React, { Component, PropTypes } from 'react';

import RecentSuggestionItem from './recent-suggestion-item';
import BlockTitle from 'components/common/block-title';
import './recent-suggestion.sass';


export default class RecentSuggestion extends Component {
  render() {
    const { recentSuggestions } = this.props;
    return (
      <div
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
