import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { wrapperStyle, defaultButtonStyle, defaultMenuStyle, defaultMenuItemStyle, arrowStyle } from './dropdown.style';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.state = {
      open: false,
      selected: props.defaultValue,
    };
  }

  onClick() {
    this.setState({ open: !this.state.open });
  }

  onSelect(option) {
    if ( option !== this.state.selected) {
      this.props.onChange(option);
      this.setState({ selected: option, open: false });
    } else {
      this.setState({ open: false });
    }
  }

  onBlur() {
    this.setState({ open: false });
  }

  renderMenu() {
    const { menuItemStyle, menuStyle, options } = this.props;

    if (this.state.open) {
      return (
        <div style={ { ...defaultMenuStyle, ...menuStyle } } className='test--dropdown-menu'>
          {
            options.map((option, index) => (
              <div
                key={ index }
                style={ { ...defaultMenuItemStyle, ...menuItemStyle } }
                onClick={ () => this.onSelect(option) }
                className='test--dropdown-menu-item'
              >
                { option }
              </div>
            ))
          }
        </div>
      );
    }

    return null;
  }

  render() {
    const { buttonStyle, className } = this.props;
    const selected = this.state.selected;

    return (
      <div
        style={ wrapperStyle }
        onBlur={ this.onBlur }
        className={ classNames('test--dropdown', className) }
        tabIndex='-1'>
        <a
          className='test--dropdown-button'
          style={ { ...defaultButtonStyle, ...buttonStyle } }
          onClick={ this.onClick }
        >
          <span>{ selected }</span>
          <span style={ arrowStyle(this.state.open) }/>
        </a>
        { this.renderMenu() }
      </div>
    );
  }
}

Dropdown.propTypes = {
  buttonStyle: PropTypes.object,
  menuItemStyle: PropTypes.object,
  menuStyle: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};

Dropdown.defaultProps = {
  style: {},
  option: [],
};
