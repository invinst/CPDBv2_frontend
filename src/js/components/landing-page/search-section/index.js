import React, { PropTypes, Component } from 'react';
import { SEARCH_PATH, SEARCH_TERMS_PATH } from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';
import { searchSectionStyle, searchTermsLinkStyle } from './search-section.style';

export default class SearchSection extends Component {
  goToSearch(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}`);
    e.stopPropagation();
  }

  goToSearchTerms(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}${SEARCH_TERMS_PATH}`);
    e.stopPropagation();
  }

  render() {
    return (
      <div style={ searchSectionStyle }>
        <div
          style={ this.props.searchBoxStyle }
          onClick={ this.goToSearch }
          className='test--search-section-search-box'>
          <span
            style={ searchTermsLinkStyle }
            onClick={ this.goToSearchTerms }
            className='test--search-section-term'>
            What can I search?
          </span>
        </div>
      </div>
    );
  }
}

SearchSection.contextTypes = {
  editModeOn: PropTypes.bool
};

SearchSection.propTypes = {
  searchBoxStyle: PropTypes.object
};
