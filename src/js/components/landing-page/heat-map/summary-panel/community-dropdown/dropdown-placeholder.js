import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import {
  wrapperStyle, firstRowStyle, secondRowStyle, arrowDownStyle, firstRowTextStyle,
} from './dropdown-placeholder.style';


export default class DropdownPlaceholder extends Component {
  render() {
    const { openDropdown } = this.props;

    return (
      <div style={ wrapperStyle }
        onClick={ openDropdown }
        className='test--dropdown-placeholder'>
        <div style={ firstRowStyle }>
          <span style={ firstRowTextStyle }>
            Select a community to learn more about police activity in that area.
          </span>
          <span style={ arrowDownStyle }/>
        </div>
        <div style={ secondRowStyle }>
          or <Link to='/search/terms/' className='test--dropdown-search-terms'>see what you can search for</Link>
        </div>
      </div>
    );
  }
}

DropdownPlaceholder.propTypes = {
  openDropdown: PropTypes.func,
};
