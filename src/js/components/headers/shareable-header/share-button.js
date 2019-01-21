import React, { PropTypes } from 'react';

import {
  buttonStyle,
  wrapperStyle
} from './share-button.style';
import Hoverable from 'components/common/higher-order/hoverable';
import ShareMenu from 'components/headers/shareable-header/share-menu';

export class ShareButton extends React.Component {
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
    const { hovering, scrollPosition, shareButtonClickHandler, buttonText, Menu } = this.props;
    const shareButtonHandler = shareButtonClickHandler || (shareMenuIsOpen ? this.closeShareMenu : this.openShareMenu);

    return (
      <div style={ wrapperStyle }>
        <span
          style={ buttonStyle(shareMenuIsOpen, scrollPosition, hovering) }
          onClick={ shareButtonHandler }
          className='test--shareable-header--share-link'
        >
          { buttonText }
        </span>
        <Menu open={ shareMenuIsOpen } closeShareMenu={ this.closeShareMenu }/>
      </div>
    );
  }
}

ShareButton.propTypes = {
  shareButtonClickHandler: PropTypes.func,
  hovering: PropTypes.bool,
  scrollPosition: PropTypes.string,
  buttonText: PropTypes.string,
  Menu: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

ShareButton.defaultProps = {
  scrollPosition: 'top',
  hovering: false,
  buttonText: 'Share',
  Menu: ShareMenu,
};

export default Hoverable(ShareButton);
