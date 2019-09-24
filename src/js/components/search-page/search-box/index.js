import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { pushPathPreserveEditMode } from 'utils/edit-path';
import * as constants from 'utils/constants';
import TextInput from 'components/common/input';
import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import { searchInputStyle } from './search-box.style';
import CloseButton from './close-btn';
import styles from './search-box.sass';
import MagnifyingGlass from 'components/common/icons/magnifying-glass';


export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter() {
    const { trackRecentSuggestion } = this.props;
    navigateToSearchItem(this.props.firstSuggestionItem, ({ to, url, type, recentText }) => {
      trackRecentSuggestion(type, recentText, url, to);
    });
  }

  handleCloseButtonClick() {
    this.props.changeSearchQuery('');
    pushPathPreserveEditMode(constants.SEARCH_PATH);
  }

  render() {
    const { value, onChange, onEscape, focused, resetNavigation, className } = this.props;

    const keyPressHandlers = {
      esc: onEscape,
      enter: this.handleEnter,
    };

    const keyPressWithBlurHandlers = {
      down: () => resetNavigation(),
    };

    return (
      <div className={ cx(className, styles.searchBox) }>
        <MagnifyingGlass className='magnifying-glass' size={ 12 }/>
        <TextInput
          autoFocus={ true }
          style={ searchInputStyle }
          placeholder='Search'
          onChange={ onChange }
          paddingVertical={ 12 }
          paddingHorizontal={ 37 }
          value={ value }
          keyPressHandlers={ keyPressHandlers }
          keyPressWithBlurHandlers={ keyPressWithBlurHandlers }
          spellCheck={ false }
          className='search-box-text-input'
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
  className: PropTypes.string,
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  firstSuggestionItem: PropTypes.object,
  value: PropTypes.string,
  searchTermsHidden: PropTypes.bool,
  changeSearchQuery: PropTypes.func,
  focused: PropTypes.bool,
  resetNavigation: PropTypes.func,
  trackRecentSuggestion: PropTypes.func,
};

SearchBox.defaultProps = {
  value: '',
  focused: false,
  trackRecentSuggestion: () => {},
};
