import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import { SEARCH_PATH } from 'utils/constants';
import { pushPathPreserveEditMode } from 'utils/edit-path';
import MagnifyingGlass from 'components/common/icons/magnifying-glass';
import styles from './search-box.sass';
import { accentColor, boulderColor } from 'utils/styles';

export default class SearchBox extends Component {
  handleClick(e) {
    pushPathPreserveEditMode(`/${SEARCH_PATH}`);
    e.stopPropagation();
  }

  render() {
    const { position } = this.props;
    const magnifyingGlassColors = {
      top: accentColor,
      middle: boulderColor,
      bottom: accentColor,
    };

    return (
      <div
        className={ cx(styles.searchBox, position ) }
        onClick={ this.handleClick }
      >
        <MagnifyingGlass className='search-box-magnifying-glass' color={ magnifyingGlassColors[position] } size={ 12 }/>
        <span className='search-box-search-text'>Search</span>
        <span className='search-box-term'>What can I search?</span>
      </div>
    );
  }
}

SearchBox.propTypes = {
  position: PropTypes.string,
};
