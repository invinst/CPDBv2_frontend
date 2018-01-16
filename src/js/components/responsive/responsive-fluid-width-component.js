import React, { PropTypes, Component } from 'react';
import MediaQuery from 'react-responsive';

import scrollBarWidth from 'utils/scrollbar-width';
import { fixedStyle, fluidStyle } from './responsive-fluid-width-component.style';


export default class ResponsiveFluidWidthComponent extends Component {
  render() {
    const { style, children, xPadding } = this.props;
    return (
      <div style={ style }>
        <MediaQuery maxWidth={ 767 }>
          <div className='test--fixed-width-component' style={ fixedStyle(767 - xPadding*2 - scrollBarWidth) }>
            { children }
          </div>
        </MediaQuery>
        <MediaQuery minWidth={ 768 } maxWidth={ 1439 }>
          <div style={ fluidStyle }>
            { children }
          </div>
        </MediaQuery>
        <MediaQuery minWidth={ 1440 }>
          <div style={ fixedStyle(1440) }>
            { children }
          </div>
        </MediaQuery>
      </div>
    );
  }
}

ResponsiveFluidWidthComponent.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  xPadding: PropTypes.number
};

ResponsiveFluidWidthComponent.defaultProps = {
  xPadding: 0
};
