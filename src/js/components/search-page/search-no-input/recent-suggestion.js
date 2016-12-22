import React, { Component, PropTypes } from 'react';
import S from 'string';

import {
  suggestionGroupStyle, groupHeaderStyle,
  suggestionItemStyle, metaTextStyle, suggestionTextStyle
} from './recent-suggestion.style.js';


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
            <div key={ key } style={ suggestionItemStyle }>
              <span style={ metaTextStyle }>{ S(entry.contentType).capitalize().s } </span>
              <a style={ suggestionTextStyle } href={ entry.url }>{ entry.text }</a>
            </div>
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
