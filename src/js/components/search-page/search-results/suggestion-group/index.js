import React, { Component, PropTypes } from 'react';
import { map, chunk } from 'lodash';

import { suggestionGroupStyle, groupHeaderStyle } from './suggestion-group.style';
import SuggestionColumn from './suggestion-column';
import LoadMoreButton from './load-more-button';



export default class SuggestionGroup extends Component {
  renderColumns() {
    const { suggestions, header, suggestionClick } = this.props;

    return map(chunk(suggestions, 10), (suggestions, key) => (
      <SuggestionColumn
        key={ key }
        suggestionClick={ suggestionClick }
        contentType={ header }
        suggestions={ suggestions }
        index={ key }/>
    ));
  }

  renderLoadMore() {
    const { suggestions, onLoadMore, header, isShowingSingleContentType } = this.props;

    if (!isShowingSingleContentType && suggestions.length === 10) {
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
