import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import {
  resultWrapperStyle, plusWrapperStyle, plusSignStyle, columnWrapperStyle,
  suggestionResultsStyle, cancelButtonStyle, actionBarStyle,
  loadingStyle
} from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import * as constants from 'utils/constants';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import { SEARCH_PAGE_NAVIGATION_KEYS } from 'utils/constants';


export default class SuggestionResults extends Component {
  componentDidMount() {
    const { move } = this.props;

    SEARCH_PAGE_NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.bind(
      direction,
      (event) => {
        event.preventDefault && event.preventDefault();
        // totalItemCount cannot be declared in the "const" way as it needs updating
        move(direction, this.props.totalItemCount);
      }
    )));
  }

  componentWillUnmount() {
    SEARCH_PAGE_NAVIGATION_KEYS.map((direction) => (LayeredKeyBinding.unbind(direction)));

    this.props.resetNavigation();
  }

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
      focusedItem,
      getSuggestionWithContentType,
      hasMore,
      singleContent,
      nextParams
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
        showMoreButton={ group.canLoadMore }
        suggestionClick={ suggestionClick }
        header={ group.header }
        aliasEditModeOn={ aliasEditModeOn }
        getSuggestionWithContentType={ getSuggestionWithContentType }
        hasMore={ hasMore }
        searchText={ searchText }
        nextParams={ nextParams }
        singleContent={ singleContent }/>
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

    return (
      <div style={ suggestionResultsStyle(aliasEditModeOn) }>
        {
          isRequesting ?
            <div style={ loadingStyle }>
              Loading...
            </div> :
            <div style={ resultWrapperStyle }>
              <div className='content-wrapper' style={ columnWrapperStyle }>
                { editModeOn ? this.renderActionBar() : null }
                { this.renderGroups() }
              </div>
            </div>
        }
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
  focusedItem: PropTypes.object,
  getSuggestionWithContentType: PropTypes.func,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  singleContent: PropTypes.bool,
  move: PropTypes.func,
  totalItemCount: PropTypes.number,
};

SuggestionResults.defaultProps = {
  previewPaneInfo: {},
  getSuggestionWithContentType: () => {},
  resetNavigation: () => {},
};
