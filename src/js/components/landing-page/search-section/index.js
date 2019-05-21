import React, { PropTypes, Component } from 'react';
import { SEARCH_PATH } from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';
import { searchSectionStyle, searchTermsLinkStyle, magnifyingGlassStyle } from './search-section.style';
import MagnifyingGlass from 'components/common/icons/magnifying-glass';

export default class SearchSection extends Component {
  goToSearchPage(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}`);
    e.stopPropagation();
  }

  render() {
    const { searchBoxStyle, magnifyingGlassColor } = this.props;
    return (
      <div style={ searchSectionStyle }>
        <div
          style={ searchBoxStyle }
          onClick={ this.goToSearchPage }
          className='test--search-section-search-box'>
          <MagnifyingGlass style={ magnifyingGlassStyle } color={ magnifyingGlassColor }/>
          <span
            style={ searchTermsLinkStyle }
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
  searchBoxStyle: PropTypes.object,
  magnifyingGlassColor: PropTypes.string
};
