import React from 'react';
import Radium from 'radium';
import classnames from 'classnames';

import NavLink from 'components/common/nav-link';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { COLLAB_PATH, DATA_PATH, FAQ_PATH, STORIES_PATH } from 'utils/constants';
import {
  navWrapperStyle, navStyle, fixedWrapperStyle, logoWrapperStyle, logoStyle,
  navWrapperFixedStyle, logoWrapperFixedStyle, spaceHolderStyle, wrapperStyle
} from './header.style';


function toFixed() {
  return (window.scrollY > 88);
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fixed: toFixed() };
    this.handleScroll = this.handleScroll.bind(this);
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
    return this.state.fixed ? fixedWrapperStyle : wrapperStyle;
  }

  navWrapperStyle() {
    return [navWrapperStyle, this.state.fixed ? navWrapperFixedStyle : null];
  }

  logoWrapperStyle() {
    return [logoWrapperStyle, this.state.fixed ? logoWrapperFixedStyle : null];
  }

  renderSpaceHolder() {
    if (this.state.fixed) {
      return (
        <div style={ spaceHolderStyle }/>
      );
    }
    return null;
  }

  render() {
    let links = [
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
    let headerWrapperClass = classnames({
      'header-wrapper-fixed': this.state.fixed
    });

    return (
      <div>
        { this.renderSpaceHolder() }
        <div style={ this.wrapperStyle() } className={ headerWrapperClass }>
          <ResponsiveFixedWidthComponent>
            <div style={ this.navWrapperStyle() }>
              { links.map((link, ind) => (
                <NavLink key={ ind } style={ navStyle } href={ link.href }>{ link.name }</NavLink>
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
