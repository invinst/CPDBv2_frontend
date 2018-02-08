import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  unitNameStyle, unitNameWrapperStyle, linkWrapperStyle,
  linkStyle, wrapperStyle, activeLinkStyle, outerPlaceHolderStyle, outerStyle
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
    const { unitName, unitDescription, pathname, scrollPosition } = this.props;
    return (
      <div>
        <div style={ outerPlaceHolderStyle(scrollPosition) }/>
        <ResponsiveFluidWidthComponent style={ outerStyle(scrollPosition) }>
          <div style={ wrapperStyle(scrollPosition) }>
            <div className='test--unit-name-wrapper' style={ unitNameWrapperStyle(scrollPosition) }>
              <div className='test--unit-name' style={ unitNameStyle(scrollPosition) }>{ `Unit ${unitName}` }</div>
              <div>{ unitDescription }</div>
            </div>
            <div style={ linkWrapperStyle }>
              {
                map(HEADER_BUTTONS, ([label, getPath], index) => {
                  const path = getPath(pathname);
                  return (
                    <Link to={ path } key={ index }
                      className={ path === pathname ? 'test--header-button-active' : 'test--header-button' }
                      style={ path === pathname ? activeLinkStyle(scrollPosition) : linkStyle(scrollPosition) }>
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
  unitDescription: PropTypes.string,
  pathname: PropTypes.string,
  scrollPosition: PropTypes.string,
};
