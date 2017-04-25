import React, { PropTypes, Component } from 'react';

import { altoColor, softGreyColor } from 'utils/styles';


export default class SVGComponent extends Component {
  render() {
    const { cy1, cy2, cy3 } = this.props;
    return (
      <g>
        <line x1='9' y1='1' x2='9' y2='150' stroke={ altoColor } strokeWidth={ 2 } />
        <circle r='7.5' cx='9' strokeWidth='3' stroke={ softGreyColor } fill='white' cy={ cy1 }/>
        <circle r='3' cx='9' fill={ softGreyColor } cy={ cy2 }/>
        <circle r='9' cx='9' fill={ softGreyColor } cy={ cy3 }/>
      </g>
    );
  }
}

SVGComponent.propTypes = {
  cy1: PropTypes.string,
  cy2: PropTypes.string,
  cy3: PropTypes.string
};
