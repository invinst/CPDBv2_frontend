import React, { PropTypes } from 'react';

import { radarPointStyle, tooltipStyle } from './radar-tooltip-point.style';


export default class RadarTooltipPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePoint: { x: 0, y: 0, value: 0 },
      showTooltip: false
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
    return (
      <g>
        <g className='radarCircleWrapper'>
          { data.map((point, i) => (
            <circle
              key={ i }
              className='radarInvisibleCircle' r='8' cx={ point.x } cy={ point.y }
              style={ radarPointStyle }
              onMouseOver={ (e) => this.mouseOver(e, point.value) }
              onMouseOut={ (e) => this.mouseOut(e, point.value) }
            />
          )) }
        </g>
        <text
          className='tooltip' textAnchor='middle' dy='0.35em'
          x={ this.state.activePoint.x }
          y={ this.state.activePoint.y }
          style={ tooltipStyle(this.state.showTooltip) }>{ this.state.activePoint.value }
        </text>
      </g>
    );
  }
}

RadarTooltipPoint.propTypes = {
  data: PropTypes.array
};
