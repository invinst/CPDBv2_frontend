import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map, noop, get } from 'lodash';
import cx from 'classnames';

import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import * as constants from 'utils/constants';
import { SEARCH_PAGE_NAVIGATION_KEYS } from 'utils/constants';
import * as LayeredKeyBinding from 'utils/layered-key-binding';
import SearchTags from 'components/search-page/search-tags';
import PinboardButtonContainer from 'containers/search-page/pinboard-button-container';
import ScrollIntoView from 'components/common/scroll-into-view';
import style from './search-results.sass';


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
        <div className='action-bar'>
          <Link
            to={ `/edit/${constants.SEARCH_PATH}` }
            className='cancel-alias-button'>
            Cancel
          </Link>
        </div>
      );
    } else {
      return (
        <div className='plus-sign-wrapper'>
          <Link to={ `/edit/${constants.SEARCH_ALIAS_EDIT_PATH}` } className='plus-sign'>[+]</Link>
        </div>
      );
    }
  }

  renderContent() {
    const { singleContent, editModeOn, focusedItem } = this.props;

    if (singleContent)
      return (
        <div className='content-wrapper'>
          { editModeOn ? this.renderActionBar() : null }
          { this.renderGroups() }
        </div>
      );
    else {
      return (
        <div className='content-wrapper'>
          <ScrollIntoView focusedItemClassName={ `suggestion-item-${get(focusedItem, 'uniqueKey', '')}` }>
            { editModeOn ? this.renderActionBar() : null }
            { this.renderGroups() }
          </ScrollIntoView>
        </div>
      );
    }
  }

  render() {
    const {
      isRequesting,
      aliasEditModeOn,
      previewPaneInfo,
      tags,
      onSelect,
      contentType,
      onEmptyPinboardButtonClick,
      addOrRemoveItemInPinboard,
    } = this.props;

    return (
      <div className={ style.searchResults }>
        <div className='buttons-wrapper'>
          <SearchTags
            tags={ tags }
            onSelect={ onSelect }
            selected={ contentType }
            isRequesting={ isRequesting }
          />
          <PinboardButtonContainer
            emptyText={ true }
            onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
          />
        </div>
        <div className={ cx('suggestion-results', { 'edit-mode-on': aliasEditModeOn }) }>
          {
            isRequesting ?
              <div className='loading'>
                Loading...
              </div> :
              <div className='result-wrapper'>
                { this.renderContent() }
              </div>
          }
          <PreviewPane { ...previewPaneInfo } addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }/>
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
  editModeOn: PropTypes.bool,
  onLoadMore: PropTypes.func,
  onSelect: PropTypes.func,
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
  tags: PropTypes.array,
  contentType: PropTypes.string,
  onEmptyPinboardButtonClick: PropTypes.func,
};

SuggestionResults.defaultProps = {
  previewPaneInfo: {},
  focusedItem: {},
  getSuggestionWithContentType: noop,
  resetNavigation: noop,
  onEmptyPinboardButtonClick: noop,
};
