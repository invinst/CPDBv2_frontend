import React, { Component, PropTypes } from 'react';
import S from 'string';

import Hoverable from 'components/common/higher-order/hoverable';
import { suggestionItemStyle, metaTextStyle, suggestionTextStyle } from './recent-suggestion-item.style.js';


class RecentSuggestionItem extends Component {
  render() {
    const { entry, hovering } = this.props;

    return (
      <a href={ entry.url } style={ suggestionItemStyle }>
        <span className='link--transition' style={ metaTextStyle(hovering) }>
          { S(entry.contentType).capitalize().s }
        </span>
        <span className='link--transition' style={ suggestionTextStyle(hovering) } >{ entry.text }</span>
      </a>
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
