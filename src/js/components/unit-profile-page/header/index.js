import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  unitNameStyle, linkWrapperStyle, linkStyle, wrapperStyle, activeLinkStyle, boxShadowStyle
} from './header.style';


const path = subPath => pathname => {
  if (subPath) {
    return pathname.replace(/(\d+).+/, `$1/${subPath}/`);
  }
  return pathname.replace(/(\d+).+/, '$1/');
};

const HEADER_BUTTONS = [
  ['Summary', path()],
  ['Timeline', path('timeline')],
  ['Social Map', path('social')]
];

export default class Header extends Component {
  render() {
    const { unitName, pathname } = this.props;

    return (
      <div style={ boxShadowStyle }>
        <ResponsiveFluidWidthComponent>
          <div style={ wrapperStyle }>
            <div className='test--unit-name' style={ unitNameStyle }>{ `Unit ${unitName}` }</div>
            <div style={ linkWrapperStyle }>
              {
                map(HEADER_BUTTONS, ([label, getPath], index) => {
                  const path = getPath(pathname);
                  return (
                    <Link to={ path } key={ index }
                      className={ path === pathname ? 'test--header-button-active' : 'test--header-button' }
                      style={ path === pathname ? activeLinkStyle : linkStyle }>
                      { label }
                    </Link>
                  );
                })
              }
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

Header.propTypes = {
  unitName: PropTypes.string,
  pathname: PropTypes.string
};
