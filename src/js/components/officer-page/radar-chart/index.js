import React, { Component, PropTypes } from 'react';
import { map, isEqual } from 'lodash';
import { scaleLinear } from 'd3-scale';

import StaticRadarChart from 'components/common/radar-chart';
import { radarChartPlaceholderStyle } from './radar-chart.style';
import RadarExplainer from './explainer';


export default class AnimatedRadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionValue: 0,
    };
    this.interval = 20;
    this.velocity = 0.1;
    this.timer = null;

    this.handleClick = this.handleClick.bind(this);
    this.animate = this.animate.bind(this);
    this.getCurrentTransitionData = this.getCurrentTransitionData.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data)) {
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  animate() {
    const { data } = this.props;

    const maxValue = data.length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  }

  startTimer() {
    if (this.props.data && this.props.data.length > 1 && !this.timer) {
      this.timer = setInterval((() => this.animate(), this.interval));
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getCurrentTransitionData() {
    const { transitionValue } = this.state;
    const { data } = this.props;

    // ensure at least 2 elements
    if (data.length < 2)
      return data[0];

    const index = Math.min(parseInt(transitionValue) + 1, data.length - 1);

    const previousData = data[index - 1].items;

    const color = scaleLinear()
      .domain([0, 1])
      .range([data[index - 1].visualTokenBackground, data[index].visualTokenBackground]);

    const backgroundColor = color(transitionValue - (index - 1));

    return {
      ...data[index],
      items: map(data[index].items, (d, i) => ({
        ...d,
        value: (d.value - previousData[i].value) * (transitionValue - (index - 1)) + previousData[i].value,
      })),
      visualTokenBackground: backgroundColor
    };
  }

  handleClick() {
    if (this.timer) {
      this.stopTimer();
    } else {
      if (this.state.transitionValue === this.props.data.length - 1) {
        this.setState({
          transitionValue: 0,
        });
      }
      this.startTimer();
    }
  }

  render() {
    const { transitionValue, showExplainer } = this.state;
    const { data } = this.props;
    if (!data) return null;

    const itemData = this.getCurrentTransitionData();

    return (!!itemData) && (
      <div className='test--officer--radar-chart' style={ radarChartPlaceholderStyle }>
        <StaticRadarChart
          onClick={ this.handleClick }
          textColor={ itemData.textColor }
          backgroundColor={ itemData.visualTokenBackground }
          fadeOutLegend={ transitionValue >= (data.length - 1) }
          legendText={ itemData.year }
          data={ itemData.items }
          showSpineLinePoint={ true }
          showGrid={ true }
          gridOpacity={ 0.25 }
          showAxisTitle={ true }
          showAxisValue={ true }
        />
        <RadarExplainer
          show={ showExplainer }
          radarChartData={ data }
        />
      </div>
    );
  }
}


AnimatedRadarChart.propTypes = {
  data: PropTypes.array
};
