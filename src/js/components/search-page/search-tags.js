import React, { Component, PropTypes } from 'react';
import { map, isEmpty } from 'lodash';

import { tagStyle, tagsWrapperStyle, dataToolTagStyle } from './search-tags.style';
import PinboardButton from './pinboard-button';


class SearchTags extends Component {
  renderTags() {
    const { tags, selected, onSelect, isRequesting } = this.props;

    if (isEmpty(tags) && !isRequesting) {
      return (
        <span style={ dataToolTagStyle }>Data Tool</span>
      );
    }

    return map(tags, (tag, key) => (
      <span style={ tagStyle(selected === tag) } key={ key } onClick={ onSelect.bind(this, tag) }>
        { tag.toUpperCase() }
      </span>
    ));
  }

  render() {
    const { pinboard } = this.props;
    return (
      <div style={ tagsWrapperStyle } className='suggestion-tags' >
        { this.renderTags() }
        <PinboardButton pinboard={ pinboard }/>
      </div>
    );
  }
}

SearchTags.propTypes = {
  tags: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  isRequesting: PropTypes.bool,
  pinboard: PropTypes.object,
};

export default SearchTags;
