import React, { Component, PropTypes } from 'react';

import TextInput from 'components/common/input';
import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import ToggleButton from './toggle-button';
import { searchInputStyle, wrapperStyle } from './search-box.style';

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

  render() {
    const {
      value, onChange, onEscape, focused, resetNavigation, searchTermsHidden, changeSearchQuery,
    } = this.props;

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
        <ToggleButton value={ value }
          searchTermsHidden={ searchTermsHidden }
          changeSearchQuery={ changeSearchQuery }
        />
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
  trackRecentSuggestion: PropTypes.func,
};

SearchBox.defaultProps = {
  value: '',
  focused: false,
  trackRecentSuggestion: () => {},
};
