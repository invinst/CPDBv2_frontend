import React, { Component, PropTypes } from 'react';
import { map, chunk } from 'lodash';

import { viewportHeight } from 'utils/dom';
import { suggestionGroupStyle, groupHeaderStyle, headerHeight } from './suggestion-group.style';
import SuggestionColumn from './suggestion-column';
import { suggestionItemHeight } from './suggestion-column/suggestion-item.style';
import LoadMoreButton from './load-more-button';
import { loadMoreButtonHeight } from './load-more-button.style';
import { navWrapperCompactHeight } from 'components/header/header-content.style';
import { tagsWrapperHeight } from 'components/search-page/search-tags.style';


export default class SuggestionGroup extends Component {
  canLoadMore() {
    const { suggestions, isShowingSingleContentType } = this.props;
    return !isShowingSingleContentType && suggestions.length === 10;
  }

  renderColumns() {
    const { suggestions, header, suggestionClick, isShowingSingleContentType } = this.props;

    const occupiedHeight = navWrapperCompactHeight + tagsWrapperHeight + loadMoreButtonHeight + headerHeight;
    const availableHeight = viewportHeight() - occupiedHeight;
    const numberOfItems = Math.max(parseInt(availableHeight / suggestionItemHeight), 1);

    let columns = [];
    if (isShowingSingleContentType) {
      columns = chunk(suggestions, numberOfItems);
    } else {
      columns = [suggestions.slice(0, numberOfItems)];
    }

    return map(columns, (suggestions, key) => (
      <SuggestionColumn
        key={ key }
        suggestionClick={ suggestionClick }
        contentType={ header }
        suggestions={ suggestions }
        index={ key }/>
    ));
  }

  renderLoadMore() {
    const { onLoadMore, header } = this.props;

    if (this.canLoadMore()) {
      return (
        <LoadMoreButton onLoadMore={ onLoadMore } header={ header }/>
      );
    }
    return null;
  }

  render() {
    const { suggestions, header } = this.props;

    if (suggestions.length > 0) {
      return (
        <div style={ suggestionGroupStyle } className='suggestion-group'>
          <div style={ groupHeaderStyle }>{ header }</div>
          { this.renderColumns() }
          { this.renderLoadMore() }
        </div>
      );
    }
    return null;
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  isShowingSingleContentType: PropTypes.bool
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  header: ''
};
