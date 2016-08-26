import { includes } from 'lodash';
import React from 'react';
import { browserHistory } from 'react-router';
import { Motion, spring } from 'react-motion';
import { assign } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';
import ClosableNavLink from 'components/closable-nav-link';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';
import {
  navWrapperStyle, navStyle, logoWrapperStyle, logoStyle, spacerStyle,
  navWrapperCompactStyle, logoWrapperCompactStyle, wrapperCompactStyle
} from './header.style';
import { getCurrentPathname } from 'utils/dom';
import { faster } from 'utils/spring-presets';


const COMPACT_STYLE_PATHNAMES = [COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH];
const links = [
  {
    name: 'Data',
    href: DATA_PATH
  },
  {
    name: 'Reporting',
    href: STORIES_PATH
  },
  {
    name: 'FAQ',
    href: FAQ_PATH
  },
  {
    name: 'Collaborate',
    href: COLLAB_PATH
  }
];

function shouldShowCompact() {
  return (window.scrollY > 145);
}

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showCompact: shouldShowCompact() };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  showCompact() {
    return this.state.showCompact || includes(COMPACT_STYLE_PATHNAMES, getCurrentPathname());
  }

  handleScroll() {
    if (this.state.showCompact !== shouldShowCompact()) {
      this.setState({ showCompact: shouldShowCompact() });
    }
  }

  goToBasePath() {
    browserHistory.push('/');
  }

  renderHeader(compact=false, style={}) {
    const currentPath = getCurrentPathname();
    let wrapperStyle = compact ? wrapperCompactStyle : null;
    wrapperStyle = assign({}, wrapperStyle, style);

    if (!compact && currentPath !== '/') {
      return (
        <div style={ spacerStyle }/>
      );
    }

    return (
      <div style={ wrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ compact ? navWrapperCompactStyle : navWrapperStyle }>
            { links.map((link, ind) => (
              <ClosableNavLink
                key={ ind } style={ navStyle } href={ link.href } showCloseBtn={ compact && link.href === currentPath }
                onClickClose={ this.goToBasePath }>
                { link.name }
              </ClosableNavLink>
            )) }
          </div>
          <div style={ compact ? logoWrapperCompactStyle : logoWrapperStyle }>
            <span style={ logoStyle }>CPDP</span>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Motion defaultStyle={ this.showCompact() ? { top: 0 }: { top: 1 } }
          style={ this.showCompact() ? { top: spring(0, faster()) }: { top: spring(1, faster()) } }>
        { interpolatingStyle => (
          <div>
            { this.renderHeader(false) }
            { this.renderHeader(true, { top: `${interpolatingStyle.top * -88}px` }) }
          </div>
        ) }
        </Motion>
      </div>
    );
  }
}

export default ConfiguredRadium(Header);
