import React, { PropTypes } from 'react';

import {
  buttonStyle,
  wrapperStyle
} from './share-button.style';
import Hoverable from 'components/common/higher-order/hoverable';
import ShareMenu from 'components/headers/shareable-header/share-menu';

class ShareButton extends React.Component {
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
    const { hovering, scrollPosition } = this.props;
    const shareButtonClickHandler = shareMenuIsOpen ? this.closeShareMenu : this.openShareMenu;

    return (
      <div style={ wrapperStyle }>
        <span
          style={ buttonStyle(shareMenuIsOpen, scrollPosition, hovering) }
          onClick={ shareButtonClickHandler }
          className='test--shareable-header--share-link'
        >
          Share
        </span>
        <ShareMenu open={ shareMenuIsOpen } closeShareMenu={ this.closeShareMenu }/>
      </div>
    );
  }
}

ShareButton.propTypes = {
  hovering: PropTypes.bool,
  scrollPosition: PropTypes.string,
};

ShareButton.defaultProps = {
  scrollPosition: 'top',
  hovering: false
};

export default Hoverable(ShareButton);
