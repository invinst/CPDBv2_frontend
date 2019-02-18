import React, { PropTypes, Component } from 'react';

import SearchTags from './search-tags';
import SearchResultsContainer from 'containers/search-page/search-results-container';
import SearchNoInput from './search-no-input';
import { buttonsWrapperStyle, searchMainPanelStyle } from './search-main-panel.style';


export default class SearchMainPanel extends Component {

  render() {
    const {
      tags, contentType, recentSuggestions, query, editModeOn,
      officerCards, requestActivityGrid, aliasEditModeOn, handleSelect, isRequesting
    } = this.props;

    return (
      <div style={ searchMainPanelStyle }>
        <div style={ buttonsWrapperStyle }>
          <SearchTags
            tags={ tags }
            onSelect={ handleSelect }
            selected={ contentType }
            isRequesting={ isRequesting }
          />
        </div>

        {
          query ?
            <SearchResultsContainer
              onLoadMore={ handleSelect }
              editModeOn={ editModeOn }
              aliasEditModeOn={ aliasEditModeOn }
            /> :
            <SearchNoInput
              recentSuggestions={ recentSuggestions }
              officerCards={ officerCards }
              requestActivityGrid={ requestActivityGrid }
            />
        }

      </div>
    );
  }
}

SearchMainPanel.propTypes = {
  tags: PropTypes.array,
  contentType: PropTypes.string,
  recentSuggestions: PropTypes.array,
  query: PropTypes.string,
  editModeOn: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  officerCards: PropTypes.array,
  requestActivityGrid: PropTypes.func,
  handleSelect: PropTypes.func,
  isRequesting: PropTypes.bool,
};

SearchMainPanel.defaultProps = {
  handleSelect: () => {}
};
