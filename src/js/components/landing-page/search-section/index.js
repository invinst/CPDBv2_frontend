import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import { SEARCH_PATH, SEARCH_TERMS_PATH } from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';
import MagnifyingGlass from 'components/common/icons/magnifying-glass';
import styles from './search-section.sass';

export default class SearchSection extends Component {
  goToSearchTerms(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}${SEARCH_TERMS_PATH}`);
    e.stopPropagation();
  }

  render() {
    const { searchBoxClassName, magnifyingGlassColor } = this.props;
    return (
      <div className={ styles.searchSection }>
        <div
          className={ cx(searchBoxClassName, 'search-section-search-box' ) }
          onClick={ this.goToSearchTerms }
        >
          <MagnifyingGlass className='search-section-magnifying-glass' color={ magnifyingGlassColor }/>
          <span className='search-section-term'>What can I search?</span>
        </div>
      </div>
    );
  }
}

SearchSection.contextTypes = {
  editModeOn: PropTypes.bool
};

SearchSection.propTypes = {
  searchBoxClassName: PropTypes.string,
  magnifyingGlassColor: PropTypes.string
};
