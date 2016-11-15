import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';


export default class SuggestionResults extends Component {
  renderSuggestions(suggestions) {
    return map(suggestions, (suggestion, key) => (
      <div key={ key }>
        { suggestion.text }
      </div>
      ));
  }

  renderGroup() {
    const that = this;

    return map(this.props.suggestionGroups, (group, key) => (
      <div key={ key }>
        { key }
        { that.renderSuggestions(group) }
      </div>
    ));
  }

  render() {
    return (
      <div>
        { !this.props.isRequesting ? this.renderGroup() : 'Loading...' }
      </div>
      );
  }
}

SuggestionResults.propTypes = {
  suggestionGroups: PropTypes.array,
  isRequesting: PropTypes.bool
};
