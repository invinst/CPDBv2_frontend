import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { svgStyle, pathStyle } from './spinner.style';


function Spinner(props) {
  const { style } = props;
  const pathD = 'm35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,'
    + '0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z';

  return (
    <svg style={ [svgStyle, style] } viewBox='0 0 70 70'>
      <path
        style={ pathStyle }
        d={ pathD }/>
    </svg>
  );
}

Spinner.propTypes = {
  style: PropTypes.object,
};

export default ConfiguredRadium(Spinner);
