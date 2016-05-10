import React from 'react';
import Radium from 'radium';

import NavLink from 'components/common/nav-link';
import { wrapperStyle, navStyle, fixedWrapperStyle } from './header.style';


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
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.fixed !== toFixed()) {
      this.setState({ fixed: toFixed() });
    }
  }

  render() {
    let links = ['Database', 'Stories', 'FAQ', 'Collaboration'];
    return (
      <div style={ [wrapperStyle, this.state.fixed ? fixedWrapperStyle : null] }>
        { links.map((txt, ind) => (
          <NavLink key={ ind } style={ navStyle }>{ txt }</NavLink>
        )) }
      </div>
    );
  }
}

export default Radium(Header);
