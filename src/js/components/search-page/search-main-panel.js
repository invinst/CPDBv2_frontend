import React, { PropTypes } from 'react';
import { noop } from 'lodash';

import SearchResultsContainer from 'containers/search-page/search-results-container';
import SearchTermsContainer from 'containers/search-page/search-terms-container';
import './search-main-panel.sass';


export default function SearchMainPanel(props) {
  const {
    contentType, query, editModeOn, aliasEditModeOn,
    handleSelect, tags, onEmptyPinboardButtonClick,
  } = props;

  return (
    <div className='search-main-panel'>
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
            aliasEditModeOn={ aliasEditModeOn }
          />
      }
    </div>
  );
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
