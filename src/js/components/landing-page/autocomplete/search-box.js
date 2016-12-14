import React, { Component, PropTypes } from 'react';

import { searchInputStyle } from './search-box.style';


export default class SearchBox extends Component {
  componentDidMount() {
    this.searchInput.focus();
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
  value: PropTypes.string
};
