import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import { groupHeaderStyle, scrollerStyle } from './suggestion-group.style';
import SuggestionItem from './suggestion-item';
import LoadMoreButton from './load-more-button';


export default class SuggestionGroup extends Component {
  componentDidMount() {
    const { getSuggestionWithContentType, searchText, singleContent, header } = this.props;
    if (singleContent) {
      getSuggestionWithContentType(searchText, { contentType: header });
    }
  }

  render() {
    const {
      suggestions,
      header,
      showMoreButton,
      onLoadMore,
      focusedItem,
      aliasEditModeOn,
      setAliasAdminPageContent,
      suggestionClick,
      hasMore,
      searchText,
      nextParams,
      getSuggestionWithContentType,
      singleContent
    } = this.props;

    return (
      <div style={ scrollerStyle(singleContent) } className='test--suggestion-group'>
        <div style={ groupHeaderStyle }>{ header }</div>
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
                isFocused={ focusedItem.uniqueKey === suggestion.uniqueKey }/>
            ))
          }
        </InfiniteScroll>
        { showMoreButton ? <LoadMoreButton onLoadMore={ onLoadMore } header={ header }/> : null }
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
