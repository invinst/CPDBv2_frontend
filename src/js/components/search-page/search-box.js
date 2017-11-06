import React, { Component, PropTypes } from 'react';
import Mousetrap from 'mousetrap';
import { Style } from 'radium';

import ConfiguredRadium from 'utils/configured-radium';
import { searchInputStyle, searchInputPlaceholderStyle } from './search-box.style';


class SearchBox extends Component {
  componentDidMount() {
    const { onEscape, onEnter, value } = this.props;
    this.searchInput.focus();
    if (value) {
      // Make sure the text input cursor is always at the end
      this.searchInput.setSelectionRange(value.length, value.length);
    }
    this.mousetrap = new Mousetrap(this.searchInput);
    this.mousetrap.bind('esc', onEscape);
    this.mousetrap.bind('enter', onEnter);
    ['up', 'down'].map((direction) => (this.mousetrap.bind(
      direction,
      () => (this.searchInput.blur())
    )));
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <span className='search-box'>
        <Style
          scopeSelector='.search-box'
          rules={ searchInputPlaceholderStyle }
        />
        <input
          ref={ searchInput => { this.searchInput = searchInput; } }
          style={ searchInputStyle }
          placeholder='Search Chicago'
          onChange={ onChange }
          value={ value }
        />
      </span>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  onEnter: PropTypes.func,
  value: PropTypes.string
};

export default ConfiguredRadium(SearchBox);
