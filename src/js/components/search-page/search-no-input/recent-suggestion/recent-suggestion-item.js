import React, { Component, PropTypes } from 'react';
import S from 'string';
import { Link } from 'react-router';

import Hoverable from 'components/common/higher-order/hoverable';
import { suggestionItemStyle, metaTextStyle, suggestionTextStyle } from './recent-suggestion-item.style.js';


class RecentSuggestionItem extends Component {
  render() {
    const { entry, hovering } = this.props;

    const children = [
      <span className='link--transition' style={ metaTextStyle(hovering) } key='meta'>
        { S(entry.contentType).capitalize().s }
      </span>,
      <span className='link--transition' style={ suggestionTextStyle(hovering) } key='suggestion'>
        { entry.text }
      </span>
    ];
    const wrapperProps = {
      style: suggestionItemStyle
    };

    if (entry.to) {
      return (
        <Link to={ entry.to } { ...wrapperProps }>{ children }</Link>
      );
    }
    return (
      <a href={ entry.url } style={ suggestionItemStyle }>{ children }</a>
    );
  }
}

RecentSuggestionItem.defaultProps = {
  entry: {}
};

RecentSuggestionItem.propTypes = {
  entry: PropTypes.object,
  hovering: PropTypes.bool
};

export default Hoverable(RecentSuggestionItem);
