import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';

import {
  suggestionTextStyle,
  metaTextStyle,
  reasonStyle,
} from './suggestion-item.style';


class SuggestionItemText extends Component {
  render() {
    const { text, extraText, reason, hovering, isFocused, enteringFocusedState } = this.props;

    return (
      <Motion
        key='text-container'
        defaultStyle={ { translateY: 0 } }
        style={ {
          // "enter" transition effect: slide up from 15px under
          translateY: enteringFocusedState ? 15 : spring(0, presets.stiff)
        } }
      >
        {
          (style) => (
            <div style={ {
              transform: `translateY(${style.translateY}px)`,
            } }>
              <div
                key='suggestion'
                className='link--transition test--suggestion-item-text'
                style={ suggestionTextStyle(hovering, isFocused) }>
                { text }
              </div>
              <div
                key='meta'
                className='link--transition test--suggestion-item-extra-text'
                style={ metaTextStyle(hovering, isFocused) }>
                { extraText }
              </div>
              <div
                key='reason'
                className='link--transition test--suggestion-item-reason'
                style={ reasonStyle(hovering, isFocused) }>
                { reason }
              </div>
            </div>
          )
        }
      </Motion>
    );
  }
}

SuggestionItemText.propTypes = {
  text: PropTypes.string,
  extraText: PropTypes.string,
  reason: PropTypes.string,
  hovering: PropTypes.bool,
  isFocused: PropTypes.bool,
  enteringFocusedState: PropTypes.bool
};

export default SuggestionItemText;
