import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { indexOf } from 'lodash';

import Hoverable from 'components/common/higher-order/hoverable';
import Menu from './menu';
import { arrowStyle, defaultButtonStyle, wrapperStyle, defaultButtonTextStyle } from './dropdown.style';


export class Dropdown extends Component {
  constructor(props) {
    super(props);

    const { options, defaultValue } = props;

    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      open: false,
      selectedIndex: indexOf(options, defaultValue),
    };
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  handleSelect(index) {
    const { onChange, options } = this.props;

    if (index !== this.state.selectedIndex) {
      onChange(options[index]);
      this.setState({
        selectedIndex: index,
        open: false,
      });
    }
  }

  handleBlur() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { buttonStyle, className, menuItemStyle, menuStyle, options, width, hovering, labels } = this.props;
    const { selectedIndex, open } = this.state;

    return (
      <div
        style={ wrapperStyle }
        onBlur={ this.handleBlur }
        className={ classNames('dropdown', className) }
        tabIndex='-1'
      >
        <div
          className='test--dropdown-button'
          style={ { ...defaultButtonStyle(width, hovering), ...buttonStyle } }
          onClick={ this.handleClick }
        >
          <span style={ defaultButtonTextStyle(width - 30) }>
            { labels ? labels[selectedIndex] : options[selectedIndex] }
          </span>
          <span style={ arrowStyle(open) } />
        </div>
        {
          open ? (
            <Menu
              menuItemStyle={ menuItemStyle }
              menuStyle={ menuStyle }
              onSelect={ this.handleSelect }
              options={ options }
              width={ width }
              selectedIndex={ selectedIndex }
              labels={ labels }
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
  labels: PropTypes.array,
};

Dropdown.defaultProps = {
  options: [],
  onChange: () => {},
};

export default Hoverable(Dropdown);
