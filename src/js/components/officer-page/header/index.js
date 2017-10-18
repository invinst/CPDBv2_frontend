import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  officerNameStyle, linkWrapperStyle, linkStyle, wrapperStyle, activeLinkStyle
} from './header.style';


const officerPath = subPath => pathname => {
  if (subPath) {
    return pathname.replace(/(\d+).+/, `$1/${subPath}/`);
  }
  return pathname.replace(/(\d+).+/, '$1/');
};

const OFFICER_BUTTONS = [
  ['Summary', ''],
  ['Timeline', 'timeline'],
  ['Social Map', 'social']
];

export default class Header extends Component {
  render() {
    const { officerName, pathname, activeTab } = this.props;

    return (
      <ResponsiveFluidWidthComponent>
        <div style={ wrapperStyle }>
          <div className='test--officer-name' style={ officerNameStyle }>{ officerName }</div>
          <div style={ linkWrapperStyle }>
            {
              map(OFFICER_BUTTONS, ([label, subpath], ind) => {
                const path = officerPath(subpath)(pathname);
                return (
                  <Link to={ path } key={ ind }
                    className={ subpath === activeTab ? 'test--header-button-active' : 'test--header-button' }
                    style={ subpath === activeTab ? activeLinkStyle : linkStyle }>
                    { label }
                  </Link>
                );
              })
            }
          </div>
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

Header.propTypes = {
  officerName: PropTypes.string,
  activeTab: PropTypes.string,
  pathname: PropTypes.string
};
