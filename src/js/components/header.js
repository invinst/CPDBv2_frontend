import React from 'react';
import Radium from 'radium';

import NavLink from 'components/common/nav-link';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  navWrapperStyle, navStyle, fixedWrapperStyle, logoWrapperStyle, logoStyle,
  navWrapperFixedStyle, logoWrapperFixedStyle, spaceHolderStyle
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
    return this.state.fixed ? fixedWrapperStyle : null;
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
    let links = ['Database', 'Stories', 'FAQ', 'Collaboration'];
    return (
      <div>
        { this.renderSpaceHolder() }
        <div style={ this.wrapperStyle() }>
          <ResponsiveFixedWidthComponent>
            <div style={ this.navWrapperStyle() }>
              { links.map((txt, ind) => (
                <NavLink key={ ind } style={ navStyle }>{ txt }</NavLink>
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
