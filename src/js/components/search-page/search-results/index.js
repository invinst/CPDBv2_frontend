import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import {
  actionBarStyle,
  cancelButtonStyle,
  columnWrapperStyle,
  loadingStyle,
  plusSignStyle,
  plusWrapperStyle,
  resultWrapperStyle,
  suggestionResultsStyle
} from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import * as constants from 'utils/constants';
import { SEARCH_PAGE_NAVIGATION_KEYS } from 'utils/constants';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import ScrollIntoView from 'components/common/scroll-into-view';


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

    this.props.resetNavigation(0);
  }

  renderGroups() {
    const {
      suggestionGroups,
      searchText,
      isEmpty,
      navigation,
      onLoadMore,
      aliasEditModeOn,
      setAliasAdminPageContent,
      focusedItem,
      getSuggestionWithContentType,
      hasMore,
      singleContent,
      nextParams,
      setSearchNavigation,
      addOrRemoveItemInPinboard,
    } = this.props;

    if (isEmpty) {
      return (
        <SuggestionNoResult searchText={ searchText }/>
      );
    }

    return map(suggestionGroups, (group) => (
      <SuggestionGroup
        setSearchNavigation={ setSearchNavigation }
        focusedItem={ focusedItem }
        onLoadMore={ onLoadMore }
        key={ `suggestion-group-${group.header}` }
        navigation={ navigation }
        setAliasAdminPageContent={ setAliasAdminPageContent }
        suggestions={ group.items }
        showMoreButton={ group.canLoadMore }
        header={ group.header }
        aliasEditModeOn={ aliasEditModeOn }
        getSuggestionWithContentType={ getSuggestionWithContentType }
        hasMore={ hasMore }
        searchText={ searchText }
        nextParams={ nextParams }
        singleContent={ singleContent }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }/>
    ));
  }

  renderActionBar() {
    const { aliasEditModeOn } = this.props;

    if (aliasEditModeOn) {
      return (
        <div style={ actionBarStyle }>
          <Link
            to={ `/edit/${constants.SEARCH_PATH}` }
            style={ cancelButtonStyle }
            className='test--cancel-alias-button'>
            Cancel
          </Link>
        </div>
      );
    } else {
      return (
        <div style={ plusWrapperStyle } className='test--plus-sign'>
          <Link to={ `/edit/${constants.SEARCH_ALIAS_EDIT_PATH}` } style={ plusSignStyle }>[+]</Link>
        </div>
      );
    }
  }

  renderContent() {
    const { singleContent, editModeOn, focusedItem } = this.props;

    if (singleContent)
      return (
        <div className='content-wrapper' style={ columnWrapperStyle }>
          { editModeOn ? this.renderActionBar() : null }
          { this.renderGroups() }
        </div>
      );
    else {
      return (
        <div className='content-wrapper' style={ columnWrapperStyle }>
          <ScrollIntoView focusedClassName={ `suggestion-item-${focusedItem.uniqueKey}` }>
            { editModeOn ? this.renderActionBar() : null }
            { this.renderGroups() }
          </ScrollIntoView>
        </div>
      );
    }
  }

  render() {
    const { isRequesting, aliasEditModeOn, previewPaneInfo } = this.props;

    return (
      <div style={ suggestionResultsStyle(aliasEditModeOn) }>
        {
          isRequesting ?
            <div style={ loadingStyle }>
              Loading...
            </div> :
            <div style={ resultWrapperStyle }>
              { this.renderContent() }
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
  editModeOn: PropTypes.bool,
  onLoadMore: PropTypes.func,
  resetNavigation: PropTypes.func,
  setAliasAdminPageContent: PropTypes.func,
  isEmpty: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  previewPaneInfo: PropTypes.object,
  focusedItem: PropTypes.object,
  getSuggestionWithContentType: PropTypes.func,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  singleContent: PropTypes.bool,
  move: PropTypes.func,
  totalItemCount: PropTypes.number,
  setSearchNavigation: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
};

SuggestionResults.defaultProps = {
  previewPaneInfo: {},
  focusedItem: {},
  getSuggestionWithContentType: () => {},
  resetNavigation: () => {},
};
