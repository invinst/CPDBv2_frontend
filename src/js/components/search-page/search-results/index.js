import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { resultWrapperStyle } from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';


export default class SuggestionResults extends Component {
  renderGroups() {
    const { suggestionGroups,
      onLoadMore,
      searchText,
      isEmpty,
      suggestionClick,
      navigation,
      aliasEditModeOn
    } = this.props;

    if (isEmpty) {
      return (
        <SuggestionNoResult searchText={ searchText }/>
      );
    }
    // FIXME: Refactor it by a more convenient way
    let i = -1;

    return map(suggestionGroups, (group, index) => {
      i = i + 1;

      return (
        <SuggestionGroup
          onLoadMore={ onLoadMore }
          key={ `suggestion-group-${group.header}` }
          navigation={ navigation }
          suggestions={ group.columns }
          canLoadMore={ group.canLoadMore }
          suggestionClick={ suggestionClick }
          header={ group.header }
          columnIndex={ i }
          aliasEditModeOn={ aliasEditModeOn } />
      );
    });
  }

  render() {
    const { isRequesting } = this.props;
    if (isRequesting) {
      return (
        <div style={ resultWrapperStyle }>
          Loading...
        </div>
      );
    }
    return (
      <div style={ resultWrapperStyle }>
        <div className='content-wrapper'>
          { this.renderGroups() }
        </div>
      </div>
    );
  }
}

SuggestionResults.propTypes = {
  navigation: PropTypes.object,
  searchText: PropTypes.string,
  suggestionGroups: PropTypes.array,
  isRequesting: PropTypes.bool,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  isEmpty: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool
};
