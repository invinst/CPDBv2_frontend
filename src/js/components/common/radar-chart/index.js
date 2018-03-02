import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { scaleLinear } from 'd3-scale';

import { StaticRadarChart } from './static-radar-chart';


export default class AnimatedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionValue: 0
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

  componentWillUnmount() {
    this.stopTimer();
  }

  animate() {
    const { data } = this.props;
    if (data.length < 2)
      return;

    const maxValue = data.length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  }

  startTimer() {
    this.timer = setInterval(this.animate, this.interval);
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
    // console.warn(backgroundColor);

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

    const { transitionValue } = this.state;
    const { data } = this.props;

    const itemData = this.getCurrentTransitionData();

    return (!!itemData) && (
      <StaticRadarChart
        onClick={ this.handleClick }
        textColor={ itemData.textColor }
        backgroundColor={ itemData.visualTokenBackground }
        fadeOutLegend={ transitionValue >= (data.length - 1) }
        legendText={ itemData.year }
        data={ itemData.items }
      />
    );
  }
}


AnimatedChart.propTypes = {
  data: PropTypes.array
};
