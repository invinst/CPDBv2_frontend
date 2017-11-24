import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import { resultWrapperStyle, plusWrapperStyle, plusSignStyle } from './search-results.style';
import SuggestionGroup from './suggestion-group';
import SuggestionNoResult from './search-no-result';
import * as constants from 'utils/constants';


export default class SuggestionResults extends Component {
  renderGroups() {
    const { suggestionGroups,
      searchText,
      isEmpty,
      suggestionClick,
      navigation,
      onLoadMore,
      aliasEditModeOn
    } = this.props;

    if (isEmpty) {
      return (
        <SuggestionNoResult searchText={ searchText }/>
      );
    }
    // FIXME: Refactor it by a more convenient way
    let i = -1;

    return map(suggestionGroups, (group, index) => {
      i = i + 1;

      return (
        <SuggestionGroup
          onLoadMore={ onLoadMore }
          key={ `suggestion-group-${group.header}` }
          navigation={ navigation }
          suggestions={ group.columns }
          canLoadMore={ group.canLoadMore }
          suggestionClick={ suggestionClick }
          header={ group.header }
          columnIndex={ i }
          aliasEditModeOn={ aliasEditModeOn } />
      );
    });
  }

  render() {
    const { isRequesting, editModeOn, aliasEditModeOn } = this.props;
    if (isRequesting) {
      return (
        <div style={ { ...resultWrapperStyle, marginTop: '38px' } }>
          Loading...
        </div>
      );
    }
    return (
      <div>
        { editModeOn && !aliasEditModeOn ?
          <div style={ plusWrapperStyle }>
            <Link to={ `/edit/${constants.SEARCH_ALIAS_EDIT_PATH}` } style={ plusSignStyle }>[+]</Link>
          </div> :
          null
        }
        <div style={ resultWrapperStyle }>
          <div className='content-wrapper'>
            { this.renderGroups() }
          </div>
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
  suggestionClick: PropTypes.func,
  editModeOn: PropTypes.bool,
  getSuggestion: PropTypes.func,
  onLoadMore: PropTypes.func,
  resetNavigation: PropTypes.func,
  isEmpty: PropTypes.bool,
  contentType: PropTypes.string,
  aliasEditModeOn: PropTypes.bool
};
