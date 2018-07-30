import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import {
  unitNameStyle, unitNameWrapperStyle,
  wrapperStyle, outerPlaceHolderStyle, outerStyle
} from './header.style';


export default class Header extends Component {
  render() {
    const { unitName, unitDescription, scrollPosition } = this.props;
    return (
      <div>
        <div style={ outerPlaceHolderStyle(scrollPosition) }/>
        <ResponsiveFluidWidthComponent style={ outerStyle(scrollPosition) }>
          <div style={ wrapperStyle(scrollPosition) }>
            <div className='test--unit-name-wrapper' style={ unitNameWrapperStyle(scrollPosition) }>
              <div className='test--unit-name' style={ unitNameStyle(scrollPosition) }>{ `Unit ${unitName}` }</div>
              <div className='test--unit-description'>{ unitDescription }</div>
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
  scrollPosition: PropTypes.string
};
