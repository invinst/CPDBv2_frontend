import React, { Component, PropTypes } from 'react';

import { searchInputStyle } from './search-box.style';


export default class SearchBox extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
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
