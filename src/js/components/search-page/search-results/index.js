import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { resultWrapperStyle, columnWrapperStyle } from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import PreviewPane from 'components/search-page/search-results/preview-pane';


export default class SuggestionResults extends Component {
  renderGroups() {
    const {
      suggestionGroups,
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

    return map(suggestionGroups, (group) => {
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
          aliasEditModeOn={ aliasEditModeOn }/>
      );
    });
  }

  render() {
    const { isRequesting, focusedSuggestion } = this.props;
    let data;
    let previewPane = null;
    const shouldShowPreviewPane = focusedSuggestion.header === 'OFFICER';

    if (focusedSuggestion.payload && shouldShowPreviewPane) {
      const { payload, id, text } = focusedSuggestion;
      const currentYear = (new Date()).getFullYear();
      data = [
        ['unit', payload.unit],
        ['rank', payload.rank],
        [`${currentYear} salary`, payload.salary],
        ['race', payload.race],
        ['sex', payload.sex]
      ];
      previewPane = (
        <PreviewPane
          data={ data }
          officerId={ id }
          backgroundColor={ payload['visual_token_background_color'] }
          title={ text }
        />
      );
    }

    if (isRequesting) {
      return (
        <div style={ { ...resultWrapperStyle, marginTop: '38px' } }>
          Loading...
        </div>
      );
    }
    return (
      <div style={ resultWrapperStyle }>
        <div className='content-wrapper' style={ columnWrapperStyle(shouldShowPreviewPane) }>
          { this.renderGroups() }
        </div>
        { previewPane }
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
  aliasEditModeOn: PropTypes.bool,
  focusedSuggestion: PropTypes.object
};

SuggestionResults.defaultProps = {
  focusedSuggestion: {}
};
