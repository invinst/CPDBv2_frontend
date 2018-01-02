import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import Breadcrumbs from 'redux-breadcrumb-trail';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  outerStyle,
  navBarStyle,
  rightLinkStyle,
  shareMenuStyle,
  menuItemImgStyle,
  shareMenuButtonItemStyle,
  shareMenuLinkItemStyle,
} from './shareable-header.style';
import { imgUrl } from 'utils/static-assets';
import { breadcrumbItem } from 'components/breadcrumbs/breadcrumb-item';


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

  closeShareMenu(e) {
    if (this.state.shareMenuIsOpen) {
      this.setState({ shareMenuIsOpen: false });
      e.stopPropagation();
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
          Tweet <img style={ menuItemImgStyle } src={ imgUrl('ic-twitter.svg') } />
        </a>

        <a
          style={ { ...shareMenuLinkItemStyle, border: 0 } }
          className='test--shareable-header--facebook-link'
          href={ 'https://www.facebook.com/sharer/sharer.php?u=' + encodedLink }
          target='_blank'
          onClick={ this.closeShareMenu }
        >
          Share <img style={ menuItemImgStyle } src={ imgUrl('ic-facebook.svg') } />
        </a>
      </div>
    );
  }

  render() {
    const { location, routes, params } = this.props;
    const { shareMenuIsOpen } = this.state;

    const shareButtonClickHandler = shareMenuIsOpen ? this.closeShareMenu : this.openShareMenu;

    return (
      <ResponsiveFluidWidthComponent style={ outerStyle }>
        <div style={ navBarStyle }>
          <span
            style={ rightLinkStyle(shareMenuIsOpen) }
            onClick={ shareButtonClickHandler }
            className='test--shareable-header--share-link'
          >
          Share
        </span>
          <Breadcrumbs
            className='list-inline'
            routes={ routes }
            params={ params }
            location={ location }
            separatorRenderer={ (<breadcrumbItem> > </breadcrumbItem>) }
            itemRenderer={ breadcrumbItem }
          />
          { this.renderMenu() }
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

ShareableHeader.propTypes = {
  location: PropTypes.object,
  params: PropTypes.object,
  routes: PropTypes.array,
  closeShareMenu: PropTypes.func,
  openShareMenu: PropTypes.func,
  shareMenuIsOpen: PropTypes.bool
};

ShareableHeader.defaultProps = {
  params: {},
  location: {
    pathname: ''
  }
};
