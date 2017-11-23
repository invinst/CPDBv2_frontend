import React, { Component, PropTypes } from 'react';

import { searchInputStyle, searchTermsButtonStyle, wrapperStyle } from './search-box.style';
import TextInput from 'components/common/input';


class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.handleToggleSeachTerm = this.handleToggleSeachTerm.bind(this);
  }

  handleToggleSeachTerm() {
    this.props.toggleSearchTerms();
  }

  render() {
    const {
      value, onChange, onEscape, onEnter, searchTermsHidden
    } = this.props;

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
        />
        <span className='test--toggle-button'
          style={ searchTermsButtonStyle(searchTermsHidden) }
          onClick={ this.handleToggleSeachTerm }>
          { `${searchTermsHidden ? 'Show' : 'Hide'} Search terms` }
        </span>
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
  searchTermsHidden: PropTypes.bool
};

export default SearchBox;
