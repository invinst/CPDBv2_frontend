import React, { Component, PropTypes } from 'react';

import { pushPathPreserveEditMode } from 'utils/edit-path';
import * as constants from 'utils/constants';
import TextInput from 'components/common/input';
import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import { searchInputStyle, wrapperStyle } from './search-box.style';
import CloseButton from './close-btn';


export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter() {
    const { saveToRecent } = this.props;
    navigateToSearchItem(this.props.firstSuggestionItem, (item) => {
      saveToRecent({
        type: item.type,
        id: item.id,
        data: item.recentItemData,
      });
    });
  }

  handleCloseButtonClick() {
    this.props.changeSearchQuery('');
    pushPathPreserveEditMode(constants.SEARCH_PATH);
  }

  render() {
    const { value, onChange, onEscape, focused, resetNavigation } = this.props;

    const keyPressHandlers = {
      esc: onEscape,
      enter: this.handleEnter,
    };

    const keyPressWithBlurHandlers = {
      down: () => resetNavigation(),
    };

    return (
      <div style={ wrapperStyle }>
        <TextInput
          autoFocus={ true }
          style={ searchInputStyle }
          placeholder='Search Chicago'
          onChange={ onChange }
          paddingVertical={ 8 }
          paddingHorizontal={ 9 }
          value={ value }
          keyPressHandlers={ keyPressHandlers }
          keyPressWithBlurHandlers={ keyPressWithBlurHandlers }
          spellCheck={ false }
          className='test--search-page-input'
          focused={ focused }
        />
        {
          (value !== '') &&
            <CloseButton
              className='test--search-close-button'
              onClick={ () => this.handleCloseButtonClick() }
            />
        }
      </div>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  firstSuggestionItem: PropTypes.object,
  value: PropTypes.string,
  searchTermsHidden: PropTypes.bool,
  changeSearchQuery: PropTypes.func,
  focused: PropTypes.bool,
  resetNavigation: PropTypes.func,
  saveToRecent: PropTypes.func,
};

SearchBox.defaultProps = {
  value: '',
  focused: false,
  saveToRecent: () => {},
};
