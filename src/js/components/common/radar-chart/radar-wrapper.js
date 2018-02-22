import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { curveLinearClosed, radialLine } from 'd3-shape';
import _ from 'lodash';

import {
  radarMainAreaStyle,
  radarMainStrokeStyle,
  radarLegendYearStyle
} from './radar-wrapper.style';


export default class RadarWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionValue: 0
    };
    this.transitionData = this.calculateTransitionData(this.props.data);

    this.interval = 20;
    this.velocity = 0.1;
    this.timer = null;
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.startTimer, this.interval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculateTransitionData(data) {
    let transitionData = _.cloneDeep(data);
    if (data && data.length === 1) {
      transitionData.push({
        items: data[0].items.map(() => ({ r: 0 }))
      });
      transitionData = transitionData.reverse();
    }
    return transitionData;
  }

  startTimer() {
    const maxValue = this.transitionData.length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      clearInterval(this.timer);
    }
  }

  calculatePath(value, transitionData) {
    const radarLine = radialLine()
      .curve(curveLinearClosed)
      .radius(d => d.r)
      .angle(d => d.angle);
    const index = Math.min(parseInt(value) + 1, transitionData.length - 1);
    const previousData = transitionData[index - 1].items;

    const moveData = _.map(transitionData[index].items, (d, i) => ({
      ...d,
      r: (d.r - previousData[i].r) * (value - (index - 1)) + previousData[i].r
    }));
    return { pathD: radarLine(moveData), year: transitionData[index-1].year };
  }

  render() {
    const { extraStyle, drawStroke, data } = this.props;

    if (!data)
      return <g className='test--radar--wrapper'/>;

    const { pathD, year } = this.calculatePath(this.state.transitionValue, this.transitionData);

    const legendYearText = (year, opacity) => (
      <text
        className='test--radar--legend-year' textAnchor='middle' dy='0.35em'
        style={ { ...radarLegendYearStyle, opacity, visibility: opacity ? 'visible' : 'hidden' } }
        x={ 180 }
        y={ 180 }>
        { year }
      </text>
    );

    return (
      <g className='test--radar--wrapper'>
        <g>
          <path
            className='test--radar--radar-area'
            d={ pathD }
            style={ { ...radarMainAreaStyle, ...extraStyle } }/>

          { drawStroke && (
            <path
              className='test--radar--stroke'
              d={ pathD }
              style={ radarMainStrokeStyle }/>
          ) }

          { this.state.transitionValue >= (this.transitionData.length - 1) ? (
            <Motion defaultStyle={ { opacity: 1 } } style={ { opacity: spring(0, { stiffness: 100 }) } }>
              { interpolatingStyle => legendYearText(
                this.transitionData[this.transitionData.length-1].year,
                interpolatingStyle.opacity) }
            </Motion>
          ) : legendYearText(year, 1) }
        </g>
      </g>
    );
  }
}

RadarWrapper.defaultProps = {
  extraStyle: {},
  drawStroke: true
};

RadarWrapper.propTypes = {
  data: PropTypes.array,
  extraStyle: PropTypes.object,
  drawStroke: PropTypes.bool
};
