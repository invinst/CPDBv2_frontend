import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';


import { groupHeaderStyle } from './suggestion-group.style';
import SuggestionItem from './suggestion-item';
import LoadMoreButton from './load-more-button';


export default class SuggestionGroup extends Component {
  render() {
    const {
      suggestions,
      header,
      canLoadMore,
      onLoadMore,
      focusedItem,
      aliasEditModeOn,
      setAliasAdminPageContent,
      suggestionClick
    } = this.props;

    return (
      <div className='test--suggestion-group'>
        <div style={ groupHeaderStyle }>{ header }</div>
        <div>
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
        </div>
        { canLoadMore ? <LoadMoreButton onLoadMore={ onLoadMore } header={ header }/> : null }
      </div>
    );
  }
}

SuggestionGroup.propTypes = {
  suggestions: PropTypes.array,
  header: PropTypes.string,
  canLoadMore: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  onLoadMore: PropTypes.func,
  suggestionClick: PropTypes.func,
  setAliasAdminPageContent: PropTypes.func,
  focusedItem: PropTypes.object
};

SuggestionGroup.defaultProps = {
  suggestions: [],
  focusedItem: {},
  header: ''
};
