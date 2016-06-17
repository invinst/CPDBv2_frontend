import React from 'react';
import Radium from 'radium';
import { browserHistory } from 'react-router';

import ClosableNavLink from 'components/closable-nav-link';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';
import {
  navWrapperStyle, navStyle, fixedWrapperStyle, logoWrapperStyle, logoStyle,
  navWrapperFixedStyle, logoWrapperFixedStyle, spacerStyle, spacerSmallStyle, wrapperStyle
} from './header.style';
import { getCurrentPathname } from 'utils/dom';


const COMPACT_STYLE_PATHNAMES = [COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH];

function toFixed() {
  return (window.scrollY > 88);
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixed: toFixed() };
    this.handleScroll = this.handleScroll.bind(this);
  }

  isCompact() {
    return this.state.fixed || COMPACT_STYLE_PATHNAMES.indexOf(getCurrentPathname()) !== -1;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.fixed !== toFixed()) {
      this.setState({ fixed: toFixed() });
    }
  }

  wrapperStyle() {
    return this.isCompact() ? fixedWrapperStyle : wrapperStyle;
  }

  navWrapperStyle() {
    return [navWrapperStyle, this.isCompact() ? navWrapperFixedStyle : null];
  }

  logoWrapperStyle() {
    return [logoWrapperStyle, this.isCompact() ? logoWrapperFixedStyle : null];
  }

  renderSpaceHolder() {
    if (COMPACT_STYLE_PATHNAMES.indexOf(getCurrentPathname()) !== -1) {
      return (
        <div style={ spacerSmallStyle }/>
      );
    }
    if (this.state.fixed) {
      return (
        <div style={ spacerStyle }/>
      );
    }
    return null;
  }

  goToBasePath() {
    browserHistory.push('/');
  }

  render() {
    const links = [
      {
        name: 'Database',
        href: DATA_PATH
      },
      {
        name: 'Stories',
        href: STORIES_PATH
      },
      {
        name: 'FAQ',
        href: FAQ_PATH
      },
      {
        name: 'Collaboration',
        href: COLLAB_PATH
      }
    ];
    const currentPath = getCurrentPathname();

    return (
      <div>
        { this.renderSpaceHolder() }
        <div style={ this.wrapperStyle() }>
          <ResponsiveFixedWidthComponent>
            <div style={ this.navWrapperStyle() }>
              { links.map((link, ind) => (
                <ClosableNavLink
                  key={ ind } style={ navStyle } href={ link.href } showCloseBtn={ link.href === currentPath }
                  onClickClose={ this.goToBasePath }>
                  { link.name }
                </ClosableNavLink>
              )) }
            </div>
            <div style={ this.logoWrapperStyle() }>
              <span style={ logoStyle }/>
            </div>
          </ResponsiveFixedWidthComponent>
        </div>
      </div>
    );
  }
}

export default Radium(Header);
