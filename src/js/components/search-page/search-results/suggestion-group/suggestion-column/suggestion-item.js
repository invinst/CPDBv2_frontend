import React, { Component, PropTypes } from 'react';
import { join, get } from 'lodash';
import classnames from 'classnames';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  suggestionItemStyle,
  suggestionTextStyle,
  metaTextStyle,
  tagStyle,
  suggestionEnterStyle
} from './suggestion-item.style';


class SuggestionItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
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
    const tags = get(suggestion, 'payload.tags', []);
    const suggestionItemClassName = classnames('suggestion-item', { 'focused': isFocused });

    const commonWrapperProps = {
      style: suggestionItemStyle,
      onClick: this.handleClick.bind(this, text, href, to)
    };

    const children = [
      <div
        key='enter'
        className='link--transition'
        style={ suggestionEnterStyle(isFocused) }
      >
        enter
      </div>,
      <div
        key='suggestion'
        className='link--transition test--suggestion-item-text'
        style={ suggestionTextStyle(hovering, isFocused) }>
        { text }
      </div>,
      <div
        key='meta'
        className='link--transition test--suggestion-item-extra-text'
        style={ metaTextStyle(hovering, isFocused) }>
        { extraText }
      </div>,
      <div
        key='tag'
        className='link--transition test--suggestion-item-tag'
        style={ tagStyle(hovering, isFocused) }>
        { join(tags, ', ') }
      </div>
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
