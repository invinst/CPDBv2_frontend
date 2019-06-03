import React, { PropTypes, Component } from 'react';
import { noop } from 'lodash';

import SearchResultsContainer from 'containers/search-page/search-results-container';
import { searchMainPanelStyle } from './search-main-panel.style';
import SearchTermsContainer from 'containers/search-page/search-terms-container';


export default class SearchMainPanel extends Component {

  render() {
    const {
      contentType, query, editModeOn, aliasEditModeOn,
      handleSelect, tags, onEmptyPinboardButtonClick
    } = this.props;

    return (
      <div style={ searchMainPanelStyle }>
        {
          query ?
            <SearchResultsContainer
              onLoadMore={ handleSelect }
              onSelect={ handleSelect }
              editModeOn={ editModeOn }
              aliasEditModeOn={ aliasEditModeOn }
              contentType={ contentType }
              tags={ tags }
              onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
            /> :
            <SearchTermsContainer
              onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
            />
        }
      </div>
    );
  }
}

SearchMainPanel.propTypes = {
  contentType: PropTypes.string,
  recentSuggestions: PropTypes.array,
  query: PropTypes.string,
  editModeOn: PropTypes.bool,
  aliasEditModeOn: PropTypes.bool,
  handleSelect: PropTypes.func,
  tags: PropTypes.array,
  onEmptyPinboardButtonClick: PropTypes.func,
};

SearchMainPanel.defaultProps = {
  handleSelect: noop,
  onEmptyPinboardButtonClick: noop,
};
