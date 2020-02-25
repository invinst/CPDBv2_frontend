import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { map, isEmpty } from 'lodash';

import { tagStyle, tagsWrapperStyle, dataToolTagStyle } from './search-tags.style';


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
    return (
      <div style={ tagsWrapperStyle } className='suggestion-tags' >
        { this.renderTags() }
      </div>
    );
  }
}

SearchTags.propTypes = {
  tags: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  isRequesting: PropTypes.bool,
};

export default SearchTags;
