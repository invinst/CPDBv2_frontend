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
      isRequesting,
      suggestionClick,
      isShowingSingleContentType
    } = this.props;

    if (isRequesting) {
      return 'Loading...';
    }

    if (isEmpty) {
      return (
        <SuggestionNoResult searchText={ searchText }/>
      );
    }

    return map(suggestionGroups, (suggestions, key) => (
      <SuggestionGroup
        onLoadMore={ onLoadMore }
        key={ 'suggestion-group-' + key }
        suggestions={ suggestions }
        suggestionClick={ suggestionClick }
        isShowingSingleContentType={ isShowingSingleContentType }
        header={ key }/>
    ));
  }

  render() {
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
  searchText: PropTypes.string,
  suggestionGroups: PropTypes.object,
  isRequesting: PropTypes.bool,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  isEmpty: PropTypes.bool,
  isShowingSingleContentType: PropTypes.bool
};
