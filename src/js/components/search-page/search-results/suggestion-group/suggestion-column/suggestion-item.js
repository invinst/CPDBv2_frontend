import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classnames from 'classnames';
import { Link } from 'react-router';
import { Motion, spring, presets } from 'react-motion';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  suggestionItemStyle,
  suggestionTextStyle,
  metaTextStyle,
  reasonStyle,
  enterContainerStyle,
  enterBoxStyle,
  enterTextStyle
} from './suggestion-item.style';


class SuggestionItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      enteringFocusedState: false
    };
  }

  componentWillReceiveProps(nextProps) {
    /*
      When isFocused is changed from false to true, set `enteringFocusedState` to true
      then immediately set it back to false. This allows custom starting position
      for "enter" animations. See `textContainer` below for an example.
    */
    if (!this.props.isFocused && nextProps.isFocused) {
      this.setState({ enteringFocusedState: true });
      setTimeout(() => { this.setState({ enteringFocusedState: false }); }, 10);
    }
  }

  handleClick(text, href, to) {
    const { suggestionClick, contentType } = this.props;
    suggestionClick(contentType, text, href, to);
  }

  render() {
    const { suggestion, hovering, isFocused } = this.props;
    const text = get(suggestion, 'payload.result_text', '');
    const href = get(suggestion, 'payload.url', '');
    const to = get(suggestion, 'payload.to', '');
    const extraText = get(suggestion, 'payload.result_extra_information', '');
    const suggestionItemClassName = classnames('suggestion-item', { 'focused': isFocused });
    const reason = get(suggestion, 'payload.result_reason', '');

    const commonWrapperProps = {
      style: suggestionItemStyle,
      onClick: this.handleClick.bind(this, text, href, to)
    };

    const enter = (
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
                    height: `${style.height}px`,
                  } }
                >
                  <span style={ {
                    ...enterTextStyle,
                    opacity: style.opacity,
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

    const textContainer = (
      <Motion
        key='text-container'
        defaultStyle={ { translateY: 0 } }
        style={ {
          // "enter" transition effect: slide up from 15px under
          translateY: this.state.enteringFocusedState ? 15 : spring(0, presets.stiff)
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

    const children = [
      enter,
      textContainer
    ];

    const linkTag = (to ?
      <Link to={ to } { ...commonWrapperProps }>{ children }</Link> :
      <a href={ href } { ...commonWrapperProps } >{ children }</a>
    );

    return (
      <div className={ suggestionItemClassName } id={ this.props.id }>
        { linkTag }
      </div>
    );
  }
}

SuggestionItem.defaultProps = {
  suggestionClick: () => {}
};

SuggestionItem.propTypes = {
  id: PropTypes.string,
  isFocused: PropTypes.bool,
  suggestion: PropTypes.object,
  suggestionClick: PropTypes.func,
  hovering: PropTypes.bool,
  contentType: PropTypes.string
};

export default Hoverable(SuggestionItem);

export const UnwrappedSuggestionItem = SuggestionItem;
