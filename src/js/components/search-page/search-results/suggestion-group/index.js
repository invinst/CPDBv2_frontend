import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { map, noop } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import { groupHeaderStyle, wrapperStyle } from './suggestion-group.style';
import SuggestionItem from './suggestion-item';
import LoadMoreButton from './load-more-button';
import { MORE_BUTTON } from 'utils/constants';

export default class SuggestionGroup extends Component {
  componentDidMount() {
    this.fetchSingleResults();
  }

  componentDidUpdate(prevProps) {
    const { singleContent } = this.props;

    if (singleContent && singleContent !== prevProps.singleContent) {
      this.fetchSingleResults();
    }
  }

  fetchSingleResults() {
    const { getSuggestionWithContentType, searchText, singleContent, header } = this.props;

    if (singleContent) {
      getSuggestionWithContentType(searchText, { contentType: header }).catch(noop);
    }
  }

  renderHeader() {
    return (<div style={ groupHeaderStyle }>{ this.props.header }</div>);
  }

  renderResults() {
    const {
      suggestions,
      focusedItem,
      aliasEditModeOn,
      setAliasAdminPageContent,
      hasMore,
      searchText,
      nextParams,
      getSuggestionWithContentType,
      setSearchNavigation,
      addOrRemoveItemInPinboard,
    } = this.props;

    return (
      <InfiniteScroll
        loadMore={ () => getSuggestionWithContentType(searchText, { ...nextParams }) }
        initialLoad={ true }
        hasMore={ hasMore }
        useWindow={ true }>
        {
          map(suggestions, (suggestion) => (
            <SuggestionItem
              selectItem={ () => setSearchNavigation({ itemIndex: suggestion.itemIndex }) }
              key={ suggestion.itemIndex }
              aliasEditModeOn={ aliasEditModeOn }
              setAliasAdminPageContent={ setAliasAdminPageContent }
              suggestion={ suggestion }
              isFocused={ focusedItem.uniqueKey === suggestion.uniqueKey }
              addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }/>
          ))
        }
      </InfiniteScroll>
    );
  }

  renderMoreButton() {
    const { singleContent, header, focusedItem, onLoadMore, showMoreButton } = this.props;

    if (!singleContent && showMoreButton)
      return (
        <LoadMoreButton
          onLoadMore={ onLoadMore }
          header={ header }
          isFocused={ focusedItem.uniqueKey === `${MORE_BUTTON}-${header}` }
        />);
    else
      return null;
  }

  render() {
    const { singleContent } = this.props;

    return (
      <div style={ wrapperStyle(singleContent) } className='test--suggestion-group'>
        { this.renderHeader() }
        { this.renderResults() }
        { this.renderMoreButton() }
      </div>
    );
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string,
  showMoreButton: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  onLoadMore: PropTypes.func,
  setAliasAdminPageContent: PropTypes.func,
  focusedItem: PropTypes.object,
  getSuggestionWithContentType: PropTypes.func,
  hasMore: PropTypes.bool,
  searchText: PropTypes.string,
  nextParams: PropTypes.object,
  singleContent: PropTypes.bool,
  setSearchNavigation: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  focusedItem: {},
  header: '',
  getSuggestionWithContentType: () => ({
    catch: noop,
  }),
};
