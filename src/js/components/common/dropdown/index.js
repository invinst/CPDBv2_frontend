import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { arrowStyle, defaultButtonStyle, wrapperStyle } from './dropdown.style';
import Menu from './menu';


export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSelect = this.onSelect.bind(this);

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

  render() {
    const { buttonStyle, className, menuItemStyle, menuStyle, options } = this.props;
    const selected = this.state.selected;

    return (
      <div
        style={ wrapperStyle }
        onBlur={ this.onBlur }
        className={ classNames('test--dropdown', className) }
        tabIndex='-1'>
        <div
          className='test--dropdown-button'
          style={ { ...defaultButtonStyle, ...buttonStyle } }
          onClick={ this.onClick }
        >
          <span>{ selected }</span>
          <span style={ arrowStyle(this.state.open) }/>
        </div>
        {
          this.state.open ? (
            <Menu
              menuItemStyle={ menuItemStyle }
              menuStyle={ menuStyle }
              onSelect={ this.onSelect }
              options={ options }
            />
          ) : null
        }
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
  options: [],
};
