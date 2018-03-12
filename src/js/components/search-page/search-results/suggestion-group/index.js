import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import { groupHeaderStyle, scrollerStyle } from './suggestion-group.style';
import SuggestionItem from './suggestion-item';
import LoadMoreButton from './load-more-button';
import { MORE_BUTTON } from 'utils/constants';
import MinimalScrollBars from 'components/common/minimal-scroll-bar';


export default class SuggestionGroup extends Component {
  componentDidMount() {
    const { getSuggestionWithContentType, searchText, singleContent, header } = this.props;
    if (singleContent) {
      getSuggestionWithContentType(searchText, { contentType: header }).catch(() => {});
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
      suggestionClick,
      hasMore,
      searchText,
      nextParams,
      getSuggestionWithContentType,
    } = this.props;

    return (
      <InfiniteScroll
        loadMore={ () => getSuggestionWithContentType(searchText, { ...nextParams }) }
        initialLoad={ false }
        hasMore={ hasMore }
        useWindow={ false }>
        {
          map(suggestions, (suggestion) => (
            <SuggestionItem
              key={ suggestion.uniqueKey }
              aliasEditModeOn={ aliasEditModeOn }
              setAliasAdminPageContent={ setAliasAdminPageContent }
              suggestionClick={ suggestionClick }
              suggestion={ suggestion }
              isFocused={ focusedItem.uniqueKey === suggestion.uniqueKey } />
          ))
        }
      </InfiniteScroll>
    );
  }

  renderMoreButton() {
    const { header, focusedItem, onLoadMore, showMoreButton, } = this.props;

    if (showMoreButton)
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
    const {
      singleContent
    } = this.props;

    if (singleContent) {
      return (
        <MinimalScrollBars style={ scrollerStyle(singleContent) } className='test--suggestion-group'>
          { this.renderHeader() }
          { this.renderResults() }
        </MinimalScrollBars>
      );
    }
    else {
      return (
        <div style={ scrollerStyle(singleContent) } className='test--suggestion-group'>
          { this.renderHeader() }
          { this.renderResults() }
          { this.renderMoreButton() }
        </div>
      );
    }
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string,
  showMoreButton: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  setAliasAdminPageContent: PropTypes.func,
  focusedItem: PropTypes.object,
  getSuggestionWithContentType: PropTypes.func,
  hasMore: PropTypes.bool,
  searchText: PropTypes.string,
  nextParams: PropTypes.object,
  singleContent: PropTypes.bool
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  focusedItem: {},
  header: ''
};
