import React, { PropTypes, Component } from 'react';

import { mediumGrayColor } from 'utils/styles';
import { dateStyle } from './date-text-svg.style';


export default class SVGComponent extends Component {
  render() {
    const { children, y } = this.props;
    return (
      <text x='26' y={ y } className='date' style={ dateStyle } fill={ mediumGrayColor }>
        { children }
      </text>
    );
  }
}

SVGComponent.propTypes = {
  children: PropTypes.node,
  y: PropTypes.string
};
