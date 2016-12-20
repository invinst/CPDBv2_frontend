import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';

import {
  suggestionColumnStyle, suggestionItemStyle, suggestionTextStyle, metaTextStyle
} from './suggestion-column.style';


export default class SuggestionColumn extends Component {
  renderSuggestions() {
    return map(this.props.suggestions, (suggestion, key) => (
      <a key={ key }
        href={ suggestion.payload.url }
        style={ suggestionItemStyle }>
        <div style={ suggestionTextStyle }>
          { get(suggestion, 'payload.result_text', '') }
        </div>
        <div style={ metaTextStyle }>
          { get(suggestion, 'payload.result_extra_information', '') }
        </div>
      </a>
    ));
  }

  render() {
    return (
      <div style={ suggestionColumnStyle(this.props.index === 0) }>
        {
          this.renderSuggestions()
        }
      </div>
    );
  }
}

SuggestionColumn.propTypes = {
  index: PropTypes.number,
  suggestions: PropTypes.array
};
