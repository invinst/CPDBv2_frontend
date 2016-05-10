import React from 'react';

import NavLink from 'components/common/nav-link';
import { wrapperStyle, navStyle } from './header.style';


export default class Header extends React.Component {
  render() {
    let links = ['Database', 'Stories', 'FAQ', 'Collaboration'];
    return (
      <div style={ wrapperStyle }>
        { links.map((txt, ind) => (
          <NavLink key={ ind } style={ navStyle }>{ txt }</NavLink>
        )) }
      </div>
    );
  }
}
