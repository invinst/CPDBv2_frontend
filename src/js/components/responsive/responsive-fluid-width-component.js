import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import scrollBarWidth from 'utils/scrollbar-width';
import { fixedStyle, fluidStyle } from './responsive-fluid-width-component.style';


export default function ResponsiveFluidWidthComponent(props) {
  const {
    style, children, minimumStyle, mediumStyle,
    maximumStyle, minWidthThreshold, maxWidthThreshold,
  } = props;
  return (
    <div style={ style }>
      <MediaQuery maxWidth={ minWidthThreshold - 1 }>
        <div className='test--fixed-width-component' style={ minimumStyle }>
          { children }
        </div>
      </MediaQuery>
      <MediaQuery minWidth={ minWidthThreshold } maxWidth={ maxWidthThreshold - 1 }>
        <div style={ mediumStyle }>
          { children }
        </div>
      </MediaQuery>
      <MediaQuery minWidth={ maxWidthThreshold }>
        <div style={ maximumStyle }>
          { children }
        </div>
      </MediaQuery>
    </div>
  );
}

ResponsiveFluidWidthComponent.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
  minimumStyle: PropTypes.object,
  mediumStyle: PropTypes.object,
  maximumStyle: PropTypes.object,
  minWidthThreshold: PropTypes.number,
  maxWidthThreshold: PropTypes.number,
};

ResponsiveFluidWidthComponent.defaultProps = {
  minWidthThreshold: 768,
  maxWidthThreshold: 1440,
  minimumStyle: fixedStyle(767 - scrollBarWidth),
  mediumStyle: fluidStyle,
  maximumStyle: fixedStyle(1440),
};
