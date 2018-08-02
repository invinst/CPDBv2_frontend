import React, { Component, PropTypes } from 'react';

import { get } from 'lodash';

import { defaultMenuItemStyle, defaultMenuStyle } from './menu.style';


export default class Menu extends Component {
  render() {
    const { menuItemStyle, menuStyle, options, onSelect, width, selectedIndex } = this.props;
    const labels = get(this.props, 'labels', this.props.options);
    return (
      <div style={ { ...defaultMenuStyle(width), ...menuStyle } } className='test--dropdown-menu'>
        {
          options.map((option, index) => (
            option !== options[selectedIndex] ? (
              <div
                key={ index }
                style={ { ...defaultMenuItemStyle, ...menuItemStyle } }
                onClick={ () => onSelect(index) }
                className='test--dropdown-menu-item'
              >
                { labels[index] }
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
  selectedIndex: PropTypes.number,
  labels: PropTypes.array,
};

Menu.defaultProps = {
  options: [],
};
