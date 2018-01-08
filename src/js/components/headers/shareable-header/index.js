import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js/dist/react-clipboard';
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
  headerPlaceholder,
} from './shareable-header.style';
import { imgUrl } from 'utils/static-assets';
import BreadcrumbsItem from 'components/headers/shareable-header/breadcrumbs-item';
import { breadcrumbsStyle } from 'components/headers/shareable-header/shareable-header.style';
import { breadcrumbSeparatorStyle } from 'components/headers/shareable-header/breadcrumbs-item-style';
import { bodyScrollPosition, isScrolledToBottom } from 'utils/dom';


export default class ShareableHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareMenuIsOpen: false,
      position: 'top'
    };

    this.closeShareMenu = this.closeShareMenu.bind(this);
    this.openShareMenu = this.openShareMenu.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.closeShareMenu);
    addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeShareMenu);
    removeEventListener('scroll', this.handleScroll);
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

  isSticky() {
    if (this.placeholderElement) {
      const fromTop = this.placeholderElement.getBoundingClientRect().top;
      return fromTop <= 0;
    }

    return false;
  }

  handleScroll() {
    this.recalculatePosition();
  }

  recalculatePosition() {
    let newPosition = 'middle';

    const scrollPosition = bodyScrollPosition();
    if (scrollPosition === 0) {
      newPosition = 'top';
    } else if (isScrolledToBottom()) {
      newPosition = 'bottom';
    }

    if (newPosition !== this.state.position) {
      this.setState({ position: newPosition });
    }
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
          style={ shareMenuButtonItemStyle(this.state.position) }
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
    console.log('params', params)
    const { shareMenuIsOpen } = this.state;

    const shareButtonClickHandler = shareMenuIsOpen ? this.closeShareMenu : this.openShareMenu;
    const separatorRenderer = () => <li style={ breadcrumbSeparatorStyle }/>;

    return (
      <div>
        <div style={ headerPlaceholder }/>
        <ResponsiveFluidWidthComponent style={ outerStyle }>
          <div style={ navBarStyle } ref={ el => { this.placeholderElement = el; } }>
            <span
              style={ rightLinkStyle(shareMenuIsOpen, this.state.position) }
              onClick={ shareButtonClickHandler }
              className='test--shareable-header--share-link'
            >
              Share
            </span>
            <Breadcrumbs
              className='test--breadcrumbs'
              routes={ routes }
              params={ params }
              location={ location }
              separatorRenderer={ separatorRenderer }
              itemRenderer={ BreadcrumbsItem }
              style={ breadcrumbsStyle }
            />
            { this.renderMenu() }
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
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
  },
  routes: []
};
