import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { suggestionGroupStyle, groupHeaderStyle } from './suggestion-group.style';
import SuggestionColumn from './suggestion-column';
import LoadMoreButton from './load-more-button';

const HEADER_MAPPINGS = {
  OFFICER: 'OFFICERS',
  COMMUNITY: 'COMMUNITIES',
  NEIGHBORHOOD: 'NEIGHBORHOODS',
  UNIT: 'UNITS'
};

export default class SuggestionGroup extends Component {
  renderColumns() {
    const {
      suggestions,
      header,
      suggestionClick,
      columnIndex,
      navigation,
      aliasEditModeOn
    } = this.props;

    return map(suggestions, (suggestionsInColumn, key) => {
      return (
        <SuggestionColumn
          key={ key }
          navigation={ navigation }
          suggestionClick={ suggestionClick }
          contentType={ header }
          suggestions={ suggestionsInColumn }
          index={ key }
          columnIndex={ columnIndex + key }
          aliasEditModeOn={ aliasEditModeOn } />
      );
    });
  }

  renderLoadMore() {
    const { onLoadMore, header, canLoadMore } = this.props;

    if (canLoadMore) {
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
          <div style={ groupHeaderStyle }>{ HEADER_MAPPINGS[header] || header }</div>
          { this.renderColumns() }
          { this.renderLoadMore() }
        </div>
      );
    }
    return null;
  }
}

SuggestionGroup.propTypes = {
  columnIndex: PropTypes.number,
  navigation: PropTypes.object,
  suggestions: PropTypes.array,
  header: PropTypes.string,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  canLoadMore: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  header: '',
  onLoadMore: function () {}
};
