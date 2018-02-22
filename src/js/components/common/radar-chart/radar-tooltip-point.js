import React, { PropTypes } from 'react';

import { radarPointStyle, tooltipStyle } from './radar-tooltip-point.style';


export default class RadarTooltipPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      activePoint: { x: 0, y: 0, value: 0 }
    };
  }

  mouseOver(e, val) {
    this.setState({
      showTooltip: true,
      activePoint: {
        x: e.target.cx.baseVal.value + 10,
        y: e.target.cy.baseVal.value - 10,
        value: val
      }
    });
  }

  mouseOut() {
    this.setState({
      showTooltip: false,
      activePoint: { x: 0, y: 0, value: 0 }
    });
  }

  render() {
    const { data } = this.props;
    return data ? (
      <g>
        <g className='test--radar--tooltip'>
          { data.map((point, i) => (
            <circle
              key={ i }
              className='test--radar--tooltip--point' r='10' cx={ point.x } cy={ point.y }
              style={ radarPointStyle }
              onMouseOver={ (e) => this.mouseOver(e, point.value) }
              onMouseOut={ (e) => this.mouseOut(e, point.value) }
            />
          )) }
        </g>
        <text
          className='test--radar--tooltip--text' textAnchor='middle' dy='0.35em'
          style={ tooltipStyle(this.state.showTooltip) }
          x={ this.state.activePoint.x }
          y={ this.state.activePoint.y }>
          { this.state.activePoint.value }
        </text>
      </g>
    ) : <g/>;
  }
}

RadarTooltipPoint.propTypes = {
  data: PropTypes.array
};
