import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './header-button.sass';
import ShareMenu from 'components/headers/shareable-header/share-menu';

export default class HeaderButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  closeShareMenu = e => {
    if (this.state.menuIsOpen) {
      const { onClose } = this.props;
      onClose();
      this.setState({ menuIsOpen: false });
      e.stopPropagation();
    }
  };

  openShareMenu = () => {
    const { onOpen } = this.props;
    onOpen();
    this.setState({ menuIsOpen: true });
  };

  render() {
    const { menuIsOpen } = this.state;
    const { buttonText, Menu } = this.props;
    const shareButtonHandler = menuIsOpen ? this.closeShareMenu : this.openShareMenu;

    return (
      <div className={ styles.headerButton }>
        <div
          className={ cx('button', { focus: menuIsOpen }) }
          onClick={ shareButtonHandler }
        >
          { buttonText }
        </div>
        { menuIsOpen ? <Menu closeShareMenu={ this.closeShareMenu }/> : null }
      </div>
    );
  }
}

HeaderButton.propTypes = {
  buttonText: PropTypes.string,
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

HeaderButton.defaultProps = {
  buttonText: '',
  Menu: ShareMenu,
  onOpen: () => {},
  onClose: () => {},
};
