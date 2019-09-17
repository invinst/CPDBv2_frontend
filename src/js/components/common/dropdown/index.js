import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import { indexOf } from 'lodash';

import Menu from './menu';
import styles from './dropdown.sass';


export default class Dropdown extends Component {
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
    const { className, options, labels } = this.props;
    const { selectedIndex, open } = this.state;

    return (
      <div
        className={ cx(styles.dropdown, className) }
        onBlur={ this.handleBlur }
        tabIndex='-1'
      >
        <div
          className='dropdown-button'
          onClick={ this.handleClick }
        >
          <span className='dropdown-button-text'>
            { labels ? labels[selectedIndex] : options[selectedIndex] }
          </span>
          <span className={ cx('dropdown-arrow', { open }) } />
        </div>
        {
          open ? (
            <Menu
              onSelect={ this.handleSelect }
              options={ options }
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
  onChange: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  hovering: PropTypes.bool,
  labels: PropTypes.array,
};

Dropdown.defaultProps = {
  options: [],
  onChange: () => {},
};
