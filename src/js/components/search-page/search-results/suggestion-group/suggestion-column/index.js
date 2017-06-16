import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { suggestionColumnStyle } from './suggestion-column.style';
import SuggestionItem from './suggestion-item';


export default class SuggestionColumn extends Component {
  shouldComponentUpdate(nextProps) {
    const activeColumnIndex = nextProps.navigation.columnIndex;
    return (
      nextProps.columnIndex === activeColumnIndex ||
      nextProps.columnIndex === activeColumnIndex - 1 ||
      nextProps.columnIndex === activeColumnIndex + 1
    );
  }

  renderSuggestions() {
    const { contentType, suggestions, suggestionClick, columnIndex, navigation } = this.props;
    let isFocused;

    return map(suggestions, (suggestion, index) => {
      isFocused = (columnIndex == navigation.columnIndex) && (index == navigation.itemIndex);

      return (
        <SuggestionItem
          id={ `suggestion-item-${columnIndex}-${index}` }
          key={ index }
          contentType={ contentType }
          suggestion={ suggestion }
          suggestionClick={ suggestionClick }
          isFocused={ isFocused }/>
      );
    });
  }

  render() {
    return (
      <div style={ suggestionColumnStyle(this.props.index === 0) } className='suggestion-column'>
        {
          this.renderSuggestions()
        }
      </div>
    );
  }
}

SuggestionColumn.propTypes = {
  columnIndex: PropTypes.number,
  navigation: PropTypes.object,
  index: PropTypes.number,
  suggestions: PropTypes.array,
  contentType: PropTypes.string,
  suggestionClick: PropTypes.func
};

SuggestionColumn.defaultProps = {
  navigation: {},
  suggestionClick: () => {}
};
