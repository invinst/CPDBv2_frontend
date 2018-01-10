import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  officerNameStyle, linkWrapperStyle, linkStyle, wrapperStyle, activeLinkStyle, outerStyle, outerPlaceholderStyle
} from './header.style';
import { scrollToTop } from 'utils/dom';


export const officerPath = subPath => pathname => {
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
    const { officerName, pathname, activeTab, officerTimelineUrlParams, scrollPosition } = this.props;

    return (
      <div>
        <div style={ outerPlaceholderStyle(scrollPosition) }/>
        <ResponsiveFluidWidthComponent style={ outerStyle(scrollPosition) }>
          <div style={ wrapperStyle }>
            <div className='test--officer-name' style={ officerNameStyle(scrollPosition) }>{ officerName }</div>
            <div style={ linkWrapperStyle }>
              {
                map(OFFICER_BUTTONS, ([label, subpath], ind) => {
                  const path = officerPath(subpath)(pathname);
                  let pathWithParams = (label === 'Timeline' && officerTimelineUrlParams) ?
                    path + officerTimelineUrlParams : path;
                  return (
                    <Link to={ pathWithParams } key={ ind }
                      className={ subpath === activeTab ? 'test--header-button-active' : 'test--header-button' }
                      style={ subpath === activeTab ? activeLinkStyle(scrollPosition) : linkStyle(scrollPosition) }
                      onClick={ scrollToTop }
                    >
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
  officerName: PropTypes.string,
  activeTab: PropTypes.string,
  pathname: PropTypes.string,
  officerTimelineUrlParams: PropTypes.string,
  scrollPosition: PropTypes.string,
};
