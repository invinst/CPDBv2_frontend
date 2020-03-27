import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'lodash';

import SearchResultsContainer from 'containers/search-page/search-results-container';
import SearchTermsContainer from 'containers/search-page/search-terms-container';
import './search-main-panel.sass';


export default function SearchMainPanel(props) {
  const {
    contentType, query, editModeOn, aliasEditModeOn,
    handleSelect, tags, onEmptyPinboardButtonClick,
    hide,
  } = props;

  return (
    <div className='search-main-panel'>
      {
        query ?
          <SearchResultsContainer
            hide={ hide }
            onLoadMore={ handleSelect }
            onSelect={ handleSelect }
            editModeOn={ editModeOn }
            aliasEditModeOn={ aliasEditModeOn }
            contentType={ contentType }
            tags={ tags }
            onEmptyPinboardButtonClick={ onEmptyPinboardButtonClick }
          /> :
          <SearchTermsContainer
            hide={ hide }
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
  hide: PropTypes.bool,
};

SearchMainPanel.defaultProps = {
  handleSelect: noop,
  onEmptyPinboardButtonClick: noop,
  hide: true,
};
