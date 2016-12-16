import React, { Component, PropTypes } from 'react';
import { map, chunk } from 'lodash';

import {
  suggestionGroupStyle, groupHeaderStyle, loadMoreButtonStyle, suggestionTextStyle
} from './suggestion-group.style';
import SuggestionColumn from './suggestion-column';


export default class SuggestionGroup extends Component {
  renderColumns() {
    return map(chunk(this.props.suggestions, 10), (suggestions, key) => (
      <SuggestionColumn key={ key } suggestions={ suggestions } index={ key }/>
    ));
  }

  renderLoadMore() {
    const { suggestions, onLoadMore, header } = this.props;

    if (suggestions.length === 9) {
      return (
        <div style={ loadMoreButtonStyle } onClick={ onLoadMore.bind(null, header) }>
          <div style={ suggestionTextStyle }>Show more results</div>
        </div>
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
  onLoadMore: PropTypes.func
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  header: ''
};
