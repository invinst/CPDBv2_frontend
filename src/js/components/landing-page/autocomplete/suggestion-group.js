import React, { Component, PropTypes } from 'react';
import { map, chunk } from 'lodash';

import {
  suggestionGroupStyle, groupHeaderStyle, loadMoreButtonStyle, suggestionTextStyle
} from './suggestion-group.style';
import SuggestionChunk from './suggestion-group/suggestion-chunk';


export default class SuggestionGroup extends Component {
  renderChunks() {
    return map(chunk(this.props.suggestions, 10), (suggestionChunk, key) => (
      <SuggestionChunk key={ key } suggestionChunk={ suggestionChunk } index={ key }/>
    ));
  }

  renderLoadMore() {
    const { suggestions, onLoadMore, header } = this.props;

    if (suggestions.length === 9) {
      return (
        <div style={ loadMoreButtonStyle } onClick={ onLoadMore.bind(null, header) }>
          <div style={ suggestionTextStyle }>Show more results</div>
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.props.suggestions.length > 0) {
      return (
        <div style={ suggestionGroupStyle }>
          <div style={ groupHeaderStyle }>{ this.props.header }</div>
          { this.renderChunks() }
          { this.renderLoadMore() }
        </div>
      );
    }
    return null;
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string,
  onLoadMore: PropTypes.func
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  header: ''
};
