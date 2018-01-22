import React, { Component, PropTypes } from 'react';

import { pushPathPreserveEditMode } from 'utils/edit-path';
import * as constants from 'utils/constants';
import { searchInputStyle, searchTermsButtonStyle, wrapperStyle } from './search-box.style';
import TextInput from 'components/common/input';
import HoverableButton from 'components/common/hoverable-button';
import CloseButton from './close-btn';


export default class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
  }

  handleToggleButtonClick() {
    if (this.props.searchTermsHidden) {
      pushPathPreserveEditMode(`${constants.SEARCH_PATH}${constants.SEARCH_TERMS_PATH}`);
    }
    else {
      pushPathPreserveEditMode(constants.SEARCH_PATH);
    }
  }

  renderToggleButton() {
    const { value, searchTermsHidden, changeSearchQuery } = this.props;

    if (value !== '') {
      return (
        <CloseButton
          className='test--search-close-button'
          onClick={ () => changeSearchQuery('') }
        />
      );
    } else {
      return (
        <HoverableButton
          className='test--toggle-button'
          style={ searchTermsButtonStyle }
          onClick={ this.handleToggleButtonClick }>
          {
            searchTermsHidden ? 'What can I search?' : 'Hide Search terms'
          }
        </HoverableButton>
      );
    }
  }

  render() {
    const { value, onChange, onEscape, onEnter, focused, resetNavigation } = this.props;

    const keyPressHandlers = {
      esc: onEscape,
      enter: onEnter,
    };

    return (
      <div style={ wrapperStyle }>
        <TextInput
          autoFocus={ true }
          style={ searchInputStyle }
          placeholder='Search Chicago'
          onChange={ onChange }
          paddingVertical={ 9 }
          paddingHorizontal={ 9 }
          value={ value }
          keyPressHandlers={ keyPressHandlers }
          blurOnKeyPress={ ['up', 'down'] }
          spellCheck={ false }
          className='test--search-page-input'
          focused={ focused }
          resetNavigation={ resetNavigation }
        />
        { this.renderToggleButton() }
      </div>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  onEnter: PropTypes.func,
  toggleSearchTerms: PropTypes.func,
  value: PropTypes.string,
  searchTermsHidden: PropTypes.bool,
  changeSearchQuery: PropTypes.func,
  focused: PropTypes.bool,
  resetNavigation: PropTypes.func,
};

SearchBox.defaultProps = {
  value: '',
  focused: false
};
