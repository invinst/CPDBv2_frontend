import React, { PropTypes, Component } from 'react';

import { hardBlackColor } from 'utils/styles';
import { eventStyle } from './event-text-svg.style';


export default class SVGComponent extends Component {
  render() {
    const { children, y } = this.props;
    return (
      <text x='26' y={ y } style={ eventStyle } fill={ hardBlackColor }>{ children }</text>
    );
  }
}

SVGComponent.propTypes = {
  y: PropTypes.string,
  children: PropTypes.node
};
