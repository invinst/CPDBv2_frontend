import React, { Component, PropTypes } from 'react';
import { join, get } from 'lodash';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import { suggestionItemStyle, suggestionTextStyle, metaTextStyle, tagStyle } from './suggestion-item.style';


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
    const { suggestion, hovering } = this.props;
    const text = get(suggestion, 'payload.result_text', '');
    const href = get(suggestion, 'payload.url', '');
    const to = get(suggestion, 'payload.to', '');
    const extraText = get(suggestion, 'payload.result_extra_information', '');
    const tags = get(suggestion, 'payload.tags', []);

    const commonWrapperProps = {
      style: suggestionItemStyle,
      onClick: this.handleClick.bind(this, text, href, to)
    };
    const children = [
      <div
        key='suggestion'
        className='link--transition'
        style={ suggestionTextStyle(hovering) }>
        { text }
      </div>,
      <div
        key='meta'
        className='link--transition'
        style={ metaTextStyle(hovering) }>
        { extraText }
      </div>,
      <div
        key='tag'
        className='link--transition'
        style={ tagStyle(hovering) }>
        { join(tags, ', ') }
      </div>
    ];

    if (to) {
      return (
        <Link to={ to } { ...commonWrapperProps }>{ children }</Link>
      );
    }
    return (
      <a href={ href } { ...commonWrapperProps }>{ children }</a>
    );
  }
}

SuggestionItem.defaultProps = {
  suggestionClick: () => {}
};

SuggestionItem.propTypes = {
  suggestion: PropTypes.object,
  suggestionClick: PropTypes.func,
  hovering: PropTypes.bool,
  contentType: PropTypes.string
};

export default Hoverable(SuggestionItem);
