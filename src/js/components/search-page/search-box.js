import React, { Component, PropTypes } from 'react';
import Mousetrap from 'mousetrap';

import { searchInputStyle } from './search-box.style';


export default class SearchBox extends Component {
  componentDidMount() {
    const { onEscape, onEnter } = this.props;
    this.searchInput.focus();
    this.mousetrap = new Mousetrap(this.searchInput);
    this.mousetrap.bind('esc', onEscape);
    this.mousetrap.bind('enter', onEnter);
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <input
        ref={ searchInput => { this.searchInput = searchInput; } }
        style={ searchInputStyle }
        placeholder='Search'
        onChange={ onChange }
        value={ value }/>
    );
  }
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  onEscape: PropTypes.func,
  onEnter: PropTypes.func,
  value: PropTypes.string
};
