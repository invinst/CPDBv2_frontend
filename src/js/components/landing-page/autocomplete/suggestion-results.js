import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { resultWrapperStyle } from './suggestion-results.style';
import SuggestionGroup from './suggestion-group';


export default class SuggestionResults extends Component {
  renderGroups() {
    const { suggestionGroups, onLoadMore } = this.props;

    return map(suggestionGroups, (suggestions, key) => (
      <SuggestionGroup
        onLoadMore={ onLoadMore }
        key={ 'suggestion-group-' + key }
        suggestions={ suggestions }
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
  suggestionGroups: PropTypes.object,
  isRequesting: PropTypes.bool,
  onLoadMore: PropTypes.func
};
