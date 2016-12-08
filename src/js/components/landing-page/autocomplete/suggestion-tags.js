import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';
import S from 'string';

import { tagStyle, tagsWrapperStyle } from './suggestion-tags.style';


class SuggestionTags extends Component {
  render() {
    const { selected, onSelect } = this.props;

    return (
      <div style={ tagsWrapperStyle } className='suggestion-tags' >
        {
          map(this.props.tags, (tag, key) => (
            <span style={ tagStyle(selected === tag) } key={ key } onClick={ onSelect.bind(this, tag) }>
              { S(tag).capitalize().s }
            </span>
          ))
        }
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
