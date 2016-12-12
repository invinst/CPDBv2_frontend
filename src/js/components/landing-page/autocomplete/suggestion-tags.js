import React, { Component, PropTypes } from 'react';
import { map, isEmpty } from 'lodash';
import S from 'string';

import { tagStyle, tagsWrapperStyle, dataToolTagStyle } from './suggestion-tags.style';


class SuggestionTags extends Component {
  renderTags() {
    const { tags, selected, onSelect } = this.props;

    if (isEmpty(tags)) {
      return (
        <span style={ dataToolTagStyle }>Data Tool</span>
      );
    }

    return map(tags, (tag, key) => (
      <span style={ tagStyle(selected === tag) } key={ key } onClick={ onSelect.bind(this, tag) }>
        { S(tag).capitalize().s }
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

SuggestionTags.propTypes = {
  tags: PropTypes.array,
  selected: PropTypes.string,
  onSelect: PropTypes.func
};

export default SuggestionTags;
