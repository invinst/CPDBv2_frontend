import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import {
  resultWrapperStyle, plusWrapperStyle, plusSignStyle, columnWrapperStyle,
  suggestionResultsStyle, cancelButtonStyle, actionBarStyle
} from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import PreviewPane from 'components/search-page/search-results/preview-pane';
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
      aliasEditModeOn,
      setAliasAdminPageContent,
      focusedItem
    } = this.props;

    if (isEmpty) {
      return (
        <SuggestionNoResult searchText={ searchText }/>
      );
    }

    return map(suggestionGroups, (group) => (
      <SuggestionGroup
        focusedItem={ focusedItem }
        onLoadMore={ onLoadMore }
        key={ `suggestion-group-${group.header}` }
        navigation={ navigation }
        setAliasAdminPageContent={ setAliasAdminPageContent }
        suggestions={ group.items }
        canLoadMore={ group.canLoadMore }
        suggestionClick={ suggestionClick }
        header={ group.header }
        aliasEditModeOn={ aliasEditModeOn }/>
      ));
  }

  renderActionBar() {
    const { aliasEditModeOn } = this.props;

    return (
      aliasEditModeOn ?
        <div style={ actionBarStyle }>
          <Link
            to={ `/edit/${constants.SEARCH_PATH}` }
            style={ cancelButtonStyle }
            className='test--cancel-alias-button'>
            Cancel
          </Link>
        </div> :
        <div style={ plusWrapperStyle }>
          <Link to={ `/edit/${constants.SEARCH_ALIAS_EDIT_PATH}` } style={ plusSignStyle }>[+]</Link>
        </div>
    );
  }

  render() {
    const { isRequesting, editModeOn, aliasEditModeOn, previewPaneInfo } = this.props;

    if (isRequesting) {
      return (
        <div style={ { ...resultWrapperStyle, marginTop: '38px' } }>
          Loading...
        </div>
      );
    }
    return (
      <div style={ suggestionResultsStyle(aliasEditModeOn) }>
        <div style={ resultWrapperStyle }>
          <div className='content-wrapper' style={ columnWrapperStyle }>
            { editModeOn ? this.renderActionBar() : null }
            { this.renderGroups() }
          </div>
        </div>
        <PreviewPane { ...previewPaneInfo }/>
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
  setAliasAdminPageContent: PropTypes.func,
  isEmpty: PropTypes.bool,
  contentType: PropTypes.string,
  aliasEditModeOn: PropTypes.bool,
  previewPaneInfo: PropTypes.object,
  focusedItem: PropTypes.object
};

SuggestionResults.defaultProps = {
  previewPaneInfo: {}
};
