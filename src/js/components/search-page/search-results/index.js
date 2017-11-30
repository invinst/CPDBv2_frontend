import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import {
  resultWrapperStyle, plusWrapperStyle, plusSignStyle, columnWrapperStyle,
  suggestionResultsStyle
} from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import { previewPaneInfoSelector } from 'selectors/search-page';
import * as constants from 'utils/constants';


export default class SuggestionResults extends Component {
  renderGroups() {
    const {
      suggestionGroups,
      searchText,
      isEmpty,
      suggestionClick,
      navigation,
      onLoadMore,
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
    const { isRequesting, focusedSuggestion, editModeOn, aliasEditModeOn } = this.props;
    let previewPane = null;
    const shouldShowPreviewPane = focusedSuggestion.header === 'OFFICER';

    if (focusedSuggestion.payload && shouldShowPreviewPane) {
      const { data, visualTokenBackgroundColor, id, text } = previewPaneInfoSelector(focusedSuggestion);
      previewPane = (
        <PreviewPane
          data={ data }
          officerId={ id }
          backgroundColor={ visualTokenBackgroundColor }
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
      <div style={ suggestionResultsStyle }>
        { editModeOn && !aliasEditModeOn ?
          <div style={ plusWrapperStyle }>
            <Link to={ `/edit/${constants.SEARCH_ALIAS_EDIT_PATH}` } style={ plusSignStyle }>[+]</Link>
          </div> :
          null
        }
        <div style={ resultWrapperStyle(shouldShowPreviewPane) }>
          <div className='content-wrapper' style={ columnWrapperStyle }>
            { this.renderGroups() }
          </div>
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
  suggestionClick: PropTypes.func,
  editModeOn: PropTypes.bool,
  getSuggestion: PropTypes.func,
  onLoadMore: PropTypes.func,
  resetNavigation: PropTypes.func,
  isEmpty: PropTypes.bool,
  contentType: PropTypes.string,
  aliasEditModeOn: PropTypes.bool,
  focusedSuggestion: PropTypes.object
};

SuggestionResults.defaultProps = {
  focusedSuggestion: {}
};
