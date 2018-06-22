import React, { Component, PropTypes } from 'react';

import { defaultMenuItemStyle, defaultMenuStyle } from './menu.style';


export default class Menu extends Component {
  render() {
    const { menuItemStyle, menuStyle, options, onSelect, width, selected } = this.props;
    return (
      <div style={ { ...defaultMenuStyle(width), ...menuStyle } } className='test--dropdown-menu'>
        {
          options.map((option, index) => (
            option !== selected ? (
              <div
                key={ index }
                style={ { ...defaultMenuItemStyle, ...menuItemStyle } }
                onClick={ () => onSelect(option) }
                className='test--dropdown-menu-item'
              >
                { option }
              </div>
            ) : null
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
  width: PropTypes.number,
  selected: PropTypes.string,
};

Menu.defaultProps = {
  options: [],
};
