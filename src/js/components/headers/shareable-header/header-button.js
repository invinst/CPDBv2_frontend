import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './header-button.sass';

export default class HeaderButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    const { name } = this.props;

    if (!event.target.closest(`.menu-container-${name}`)) {
      this.closeMenu();
    }
  };

  closeMenu = () => {
    if (this.state.menuIsOpen) {
      const { onClose } = this.props;
      onClose();
      this.setState({ menuIsOpen: false });
    }
  };

  openMenu = () => {
    const { onOpen } = this.props;
    onOpen();
    this.setState({ menuIsOpen: true });
  };

  render() {
    const { menuIsOpen } = this.state;
    const { buttonClassName, Menu, name } = this.props;
    const handleClick = menuIsOpen ? this.closeMenu : this.openMenu;

    return (
      <div className={ cx(`menu-container-${name}`, styles.headerButton) }>
        <div
          className={ cx(buttonClassName, { focus: menuIsOpen }) }
          onClick={ handleClick }
        />
        { menuIsOpen ? <Menu closeMenu={ this.closeMenu }/> : null }
      </div>
    );
  }
}

HeaderButton.propTypes = {
  name: PropTypes.string.isRequired,
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  buttonClassName: PropTypes.string,
};

HeaderButton.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
};
