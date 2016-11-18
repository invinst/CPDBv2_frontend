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
        <div style={ suggestionTextStyle }>{ get(suggestion, 'payload.result_text', '') }</div>
        <div style={ metaTextStyle }>{ get(suggestion, 'payload.result_extra_information', '') }</div>
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
    if (this.props.suggestions.length > 0) {
      return (
        <div style={ suggestionGroupStyle }>
          <div style={ groupHeaderStyle }>{ this.props.header }</div>
          { this.renderSuggestions() }
          { this.renderLoadMore() }
        </div>
      );
    }
    return null;
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
