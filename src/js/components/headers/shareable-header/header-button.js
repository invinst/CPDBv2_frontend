import React, { PropTypes } from 'react';
import cx from 'classnames';

import styles from './header-button.sass';
import ShareMenu from 'components/headers/shareable-header/share-menu';

export default class HeaderButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareMenuIsOpen: false,
    };

    this.closeShareMenu = this.closeShareMenu.bind(this);
    this.openShareMenu = this.openShareMenu.bind(this);
  }

  closeShareMenu(e) {
    if (this.state.shareMenuIsOpen) {
      this.setState({ shareMenuIsOpen: false });
      e.stopPropagation();
    }
  }

  openShareMenu() {
    this.setState({ shareMenuIsOpen: true });
  }

  render() {
    const { shareMenuIsOpen } = this.state;
    const { scrollPosition, buttonText, Menu } = this.props;
    const shareButtonHandler = shareMenuIsOpen ? this.closeShareMenu : this.openShareMenu;

    return (
      <div className={ styles.headerButton }>
        <span
          className={ cx('button', shareMenuIsOpen ? 'focus' : scrollPosition) }
          onClick={ shareButtonHandler }
        >
          { buttonText }
        </span>
        <Menu open={ shareMenuIsOpen } closeShareMenu={ this.closeShareMenu }/>
      </div>
    );
  }
}

HeaderButton.propTypes = {
  scrollPosition: PropTypes.string,
  buttonText: PropTypes.string,
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

HeaderButton.defaultProps = {
  scrollPosition: 'top',
  hovering: false,
  buttonText: 'Share',
  Menu: ShareMenu,
};
