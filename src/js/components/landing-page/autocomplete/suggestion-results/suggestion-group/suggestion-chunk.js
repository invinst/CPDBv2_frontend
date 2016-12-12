import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';

import {
  suggestionColumnStyle, suggestionItemStyle, suggestionTextStyle, metaTextStyle
} from './suggestion-chunk.style';


export default class SuggestionChunk extends Component {
  renderChunk() {
    return map(this.props.suggestionChunk, (suggestion, key) => (
      <div key={ key } style={ suggestionItemStyle }>
        <div style={ suggestionTextStyle }>
          { get(suggestion, 'payload.result_text', '') }
        </div>
        <div style={ metaTextStyle }>
          { get(suggestion, 'payload.result_extra_information', '') }
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div style={ suggestionColumnStyle(this.props.index === 0) }>
        {
          this.renderChunk()
        }
      </div>
    );
  }
}

SuggestionChunk.propTypes = {
  index: PropTypes.number,
  suggestionChunk: PropTypes.array
};
