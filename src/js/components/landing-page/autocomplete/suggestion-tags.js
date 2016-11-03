import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';

import { tagStyle, tagsWrapperStyle } from './suggestion-tags.style';


class SuggestionTags extends Component {
  render() {
    return (
      <div style={ tagsWrapperStyle }>
        {
          map(this.props.tags, (tag, key) => (
            <span style={ tagStyle } key={ key }>{ tag }</span>
          ))
        }
      </div>
    );
  }
}

SuggestionTags.propTypes = {
  tags: PropTypes.array
};

SuggestionTags.defaultProps = {
  tags: [
    'Officers', 'Police District', 'Ward',
    'Police Beat', 'Final Outcome', 'Recommended Outcome',
    'Officer Rank'
  ]
};

export default SuggestionTags;
