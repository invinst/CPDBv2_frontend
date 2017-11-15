import React, { Component, PropTypes } from 'react';

import { searchInputStyle } from './search-box.style';
import TextInput from 'components/common/input';


class SearchBox extends Component {
  render() {
    const { value, onChange, onEscape, onEnter } = this.props;

    const keyPressHandlers = {
      esc: onEscape,
      enter: onEnter,
    };

    return (
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
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  onEnter: PropTypes.func,
  value: PropTypes.string
};

export default SearchBox;
