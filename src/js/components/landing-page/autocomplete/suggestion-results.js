import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { resultWrapperStyle } from './suggestion-results.style';
import { suggestionGroups } from './suggestion-results.mock';
import SuggestionGroup from './suggestion-group';


export default class SuggestionResults extends Component {
  renderGroups() {
    return map(this.props._suggestionGroups, (group, key) => (
      <SuggestionGroup
        key={ 'suggestion-group-' + key }
        suggestions={ group }
        header={ key }/>
    ));
  }

  render() {
    return (
      <div style={ resultWrapperStyle }>
        <div className='content-wrapper'>
          { !this.props.isRequesting ? this.renderGroups() : 'Loading...' }
        </div>
      </div>
      );
  }
}

SuggestionResults.propTypes = {
  _suggestionGroups: PropTypes.object,
  isRequesting: PropTypes.bool
};

SuggestionResults.defaultProps = {
  _suggestionGroups: suggestionGroups
};
