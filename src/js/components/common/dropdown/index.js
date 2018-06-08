import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Hoverable from 'components/common/higher-order/hoverable';
import Menu from './menu';
import { arrowStyle, defaultButtonStyle, wrapperStyle, defaultButtonTextStyle } from './dropdown.style';


export class Dropdown extends Component {
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
    this.setState({
      open: !this.state.open
    });
  }

  onSelect(option) {
    if ( option !== this.state.selected) {
      this.props.onChange(option);
      this.setState({
        selected: option,
        open: false
      });
    } else {
      this.setState({
        open: false
      });
    }
  }

  onBlur() {
    this.setState({
      open: false
    });
  }

  render() {
    const { buttonStyle, className, menuItemStyle, menuStyle, options, width, hovering } = this.props;
    const { selected, open } = this.state;

    return (
      <div
        style={ wrapperStyle }
        onBlur={ this.onBlur }
        className={ classNames('dropdown', className) }
        tabIndex='-1'
      >
        <div
          className='test--dropdown-button'
          style={ { ...defaultButtonStyle(width, hovering), ...buttonStyle } }
          onClick={ this.onClick }
        >
          <span style={ defaultButtonTextStyle(width - 30) }>{ selected }</span>
          <span style={ arrowStyle(open) }/>
        </div>
        {
          open ? (
            <Menu
              menuItemStyle={ menuItemStyle }
              menuStyle={ menuStyle }
              onSelect={ this.onSelect }
              options={ options }
              width={ width }
              selected={ selected }
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
  width: PropTypes.number,
  hovering: PropTypes.bool,
};

Dropdown.defaultProps = {
  options: [],
  onChange: () => {},
};

export default Hoverable(Dropdown);
