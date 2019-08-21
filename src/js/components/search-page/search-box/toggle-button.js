import React, { Component, PropTypes } from 'react';

import { pushPathPreserveEditMode } from 'utils/edit-path';
import * as constants from 'utils/constants';
import { searchTermsButtonStyle } from './search-box.style';
import HoverableButton from 'components/common/hoverable-button';
import CloseButton from './close-btn';


class ToggleButton extends Component {
  handleToggleButtonClick() {
    const path = this.props.searchTermsHidden
      ? `${constants.SEARCH_PATH}${constants.SEARCH_TERMS_PATH}`
      : constants.SEARCH_PATH;
    pushPathPreserveEditMode(path);
  }

  handleCloseButtonClick() {
    this.props.changeSearchQuery('');
    pushPathPreserveEditMode(constants.SEARCH_PATH);
  }

  render() {
    const { value, searchTermsHidden } = this.props;

    if (value !== '') {
      return (
        <CloseButton
          className='test--search-close-button'
          onClick={ () => this.handleCloseButtonClick() }
        />
      );
    } else {
      return (
        <HoverableButton
          className='test--toggle-button'
          style={ searchTermsButtonStyle(searchTermsHidden) }
          onClick={ () => this.handleToggleButtonClick() }>
          {
            searchTermsHidden ? 'What can I search?' : 'Hide Search terms'
          }
        </HoverableButton>
      );
    }
  }
}

ToggleButton.propTypes = {
  value: PropTypes.string,
  searchTermsHidden: PropTypes.bool,
  changeSearchQuery: PropTypes.func,
};

ToggleButton.defaultProps = {
  value: '',
  changeSearchQuery: () => {},
};

export default ToggleButton;
