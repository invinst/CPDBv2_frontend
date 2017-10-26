import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import { Link } from 'react-router';
import { BACK_LINK_WHITELIST } from 'utils/constants';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  outerStyle,
  navBarStyle,
  leftLinkStyle,
  rightLinkStyle,
  shareMenuStyle,
  menuItemImgStyle,
  shareMenuButtonItemStyle,
  shareMenuLinkItemStyle
} from './shareable-header.style';
import { imgUrl } from 'utils/static-assets';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareMenuIsOpen: false
    };

    this.closeShareMenu = this.closeShareMenu.bind(this);
    this.openShareMenu = this.openShareMenu.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeShareMenu);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeShareMenu);
  }

  closeShareMenu() {
    if (this.state.shareMenuIsOpen) {
      this.setState({ shareMenuIsOpen: false });
    }
  }

  openShareMenu() {
    this.setState({ shareMenuIsOpen: true });
  }

  renderMenu() {
    const { shareMenuIsOpen } = this.state;

    if (!shareMenuIsOpen) {
      return null;
    }

    const encodedLink = encodeURIComponent(window.location.href);

    return (
      <div style={ shareMenuStyle } className='test--shareable-header--share-menu'>
        <ClipboardButton
          style={ shareMenuButtonItemStyle }
          onClick={ this.closeShareMenu }
          data-clipboard-text={ window.location.href }
        >
          Copy Link
        </ClipboardButton>

        <a
          style={ shareMenuLinkItemStyle }
          className='test--shareable-header--tweet-link'
          href={ 'https://twitter.com/intent/tweet?url=' + encodedLink }
          target='_blank'
          onClick={ this.closeShareMenu }
        >
          Tweet <img style={ menuItemImgStyle } src={ imgUrl('ic-twitter.svg') }/>
        </a>

        <a
          style={ { ...shareMenuLinkItemStyle, border: 0 } }
          className='test--shareable-header--facebook-link'
          href={ 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink }
          target='_blank'
          onClick={ this.closeShareMenu }
        >
          Share <img style={ menuItemImgStyle } src={ imgUrl('ic-facebook.svg') }/>
        </a>
      </div>
    );
  }

  render() {
    const { backLink } = this.props;
    const { shareMenuIsOpen } = this.state;

    const shareButtonClickHandler = shareMenuIsOpen ? this.closeShareMenu : this.openShareMenu;
    const backLinkText = `Back to ${BACK_LINK_WHITELIST[backLink]}`;

    return (
      <ResponsiveFluidWidthComponent style={ outerStyle }>
        <div style={ navBarStyle }>
          <Link style={ leftLinkStyle } className='left-link' to={ backLink }>{ backLinkText }</Link>
          <span
            style={ rightLinkStyle(shareMenuIsOpen) }
            onClick={ shareButtonClickHandler }
            className='test--shareable-header--share-link'
          >
          Share
        </span>
          { this.renderMenu() }
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

ShareableHeader.propTypes = {
  backLink: PropTypes.string,
  closeShareMenu: PropTypes.func,
  openShareMenu: PropTypes.func,
  shareMenuIsOpen: PropTypes.bool
};

ShareableHeader.defaultProps = {
  backLink: '/'
};
