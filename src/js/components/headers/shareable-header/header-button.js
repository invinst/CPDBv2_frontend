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
    const { buttonClassName, Menu } = this.props;
    const handleClick = menuIsOpen ? this.closeMenu : this.openMenu;

    return (
      <div className={ styles.headerButton }>
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
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  buttonClassName: PropTypes.string,
};

HeaderButton.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
};
