import React, { Component, PropTypes } from 'react';

import { defaultMenuItemStyle, defaultMenuStyle } from './menu.style';


export default class Menu extends Component {
  render() {
    const { menuItemStyle, menuStyle, options, onSelect } = this.props;
    return (
      <div style={ { ...defaultMenuStyle, ...menuStyle } } className='test--dropdown-menu'>
        {
          options.map((option, index) => (
            <div
              key={ index }
              style={ { ...defaultMenuItemStyle, ...menuItemStyle } }
              onClick={ () => onSelect(option) }
              className='test--dropdown-menu-item'
            >
              { option }
            </div>
          ))
        }
      </div>
    );
  }
}

Menu.propTypes = {
  menuItemStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  onSelect: PropTypes.func,
  options: PropTypes.array,
};

Menu.defaultProps = {
  options: [],
};
