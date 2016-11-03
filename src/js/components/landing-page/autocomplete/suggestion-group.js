import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';

import {
  suggestionGroupStyle, groupHeaderStyle, suggestionItemStyle,
  suggestionTextStyle, metaTextStyle, loadMoreButtonStyle
} from './suggestion-group.style';


export default class SuggestionGroup extends Component {
  renderSuggestions() {
    return map(this.props.suggestions, (suggestion, key) => (
      <div key={ key } style={ suggestionItemStyle }>
        <div style={ suggestionTextStyle }>{ suggestion.text }</div>
        <div style={ metaTextStyle }>{ get(suggestion, 'payload.meta', '') }</div>
      </div>
    ));
  }

  renderLoadMore() {
    if (this.props.suggestions.length === 9) {
      return (
        <div style={ loadMoreButtonStyle }>
          <div style={ suggestionTextStyle }>Show more results</div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div style={ suggestionGroupStyle }>
        <div style={ groupHeaderStyle }>{ this.props.header }</div>
        { this.renderSuggestions() }
        { this.renderLoadMore() }
      </div>
    );
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  header: ''
};
