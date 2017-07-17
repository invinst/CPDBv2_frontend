import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';
import {
  enterContainerStyle,
  enterBoxStyle,
  enterTextStyle
} from './suggestion-item.style';


class SuggestionEnterBadge extends Component {
  render() {
    const { isFocused } = this.props;

    return (
      <Motion
        key='enter'
        defaultStyle={ { height: 0, opacity: 0 } }
        style={ {
          height: spring(isFocused ? 24 : 0, presets.stiff),
          opacity: spring(isFocused ? 1 : 0)
        } }
      >
        { (style) => {
          if (!isFocused) {
            return null;
          } else {
            return (
              <div style={ enterContainerStyle }>
                <div
                  className='link--transition'
                  style={ {
                    ...enterBoxStyle,
                    height: `${style.height}px`
                  } }
                >
                  <span style={ {
                    ...enterTextStyle,
                    opacity: style.opacity
                  } }>
                    enter
                  </span>
                </div>
              </div>
            );
          }
        } }
      </Motion>
    );
  }
}

SuggestionEnterBadge.propTypes = {
  isFocused: PropTypes.bool
};

export default SuggestionEnterBadge;
