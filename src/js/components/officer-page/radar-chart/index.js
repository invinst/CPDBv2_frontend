import React, { Component, PropTypes } from 'react';
import { map, isEqual, filter } from 'lodash';
import { scaleLinear } from 'd3-scale';


import StaticRadarChart from 'components/common/radar-chart';
import {
  animatedRadarChartStyle,
  radarChartPlaceholderStyle,
  openExplainerButtonStyle,
  questionMarkStyle,
  radarChartOverlayStyle
} from './radar-chart.style';
import RadarExplainer from './explainer';
import NoDataRadarChart from 'components/common/radar-chart/no-data-radar-chart';
import { hasEnoughRadarChartData } from 'utils/radar-chart';


export default class AnimatedRadarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionValue: 0,
      showExplainer: false
    };
    this.interval = 20;
    this.velocity = 0.1;
    this.timer = null;

    this.animatedData = this.getAnimatedData(props.data);

    this.openExplainer = this.openExplainer.bind(this);
    this.closeExplainer = this.closeExplainer.bind(this);
    this.animate = this.animate.bind(this);
    this.getCurrentTransitionData = this.getCurrentTransitionData.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.animatedData = this.getAnimatedData(nextProps.data);
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data)) {

      /* istanbul ignore next */
      if (this.timer) {
        this.stopTimer();
      }
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  getAnimatedData(data) {
    return filter(data, item => hasEnoughRadarChartData(item.items));
  }

  openExplainer() {
    this.endAnimation();
    this.setState({ showExplainer: true });
  }

  closeExplainer() {
    this.setState({ showExplainer: false });
    this.startAnimation();
  }

  animate() {
    const maxValue = this.animatedData.length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  }

  startTimer() {
    if (this.animatedData.length > 1 && !this.timer) {
      this.timer = setInterval(() => this.animate(), this.interval);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getCurrentTransitionData() {
    const { transitionValue } = this.state;

    if (this.animatedData.length < 2)
      return this.animatedData[0];

    const index = Math.min(Math.floor(transitionValue) + 1, this.animatedData.length - 1);

    const previousData = this.animatedData[index - 1].items;

    const color = scaleLinear()
      .domain([0, 1])
      .range([this.animatedData[index - 1].visualTokenBackground, this.animatedData[index].visualTokenBackground]);

    const backgroundColor = color(transitionValue - (index - 1));

    return {
      ...this.animatedData[index],
      items: map(this.animatedData[index].items, (d, i) => ({
        ...d,
        value: (d.value - previousData[i].value) * (transitionValue - (index - 1)) + previousData[i].value,
      })),
      visualTokenBackground: backgroundColor
    };
  }

  startAnimation() {
    if (this.timer) {
      this.stopTimer();
    }

    this.setState({ transitionValue: 0 });
    this.startTimer();
  }

  endAnimation() {
    if (this.timer) {
      this.stopTimer();
    }
    const maxValue = this.animatedData.length - 1;
    this.setState({ transitionValue: maxValue });
    this.startTimer();
  }

  render() {
    const { transitionValue, showExplainer } = this.state;
    const { data, noDataText, isRequesting } = this.props;

    const itemData = this.getCurrentTransitionData();
    if (itemData) {
      return (
        <div
          className='test--officer--radar-chart'
          style={ animatedRadarChartStyle }
        >
          <div
            style={ radarChartPlaceholderStyle }
            onClick={ this.openExplainer }
            className='test--officer--radar-chart-placeholder'
          >
            <StaticRadarChart
              textColor={ itemData.textColor }
              backgroundColor={ itemData.visualTokenBackground }
              fadeOutLegend={ transitionValue >= (this.animatedData.length - 1) }
              legendText={ itemData.year }
              data={ itemData.items }
              showSpineLinePoint={ true }
              showGrid={ true }
              gridOpacity={ 0.25 }
              showAxisTitle={ true }
              showValueWithSuffix={ true }
            />
            <div style={ openExplainerButtonStyle } className='test--radar-explainer-question-mark'>
              <span style={ questionMarkStyle }>?</span>
            </div>
          </div>
          { showExplainer && (
            <div style={ radarChartOverlayStyle }>
              <RadarExplainer closeExplainer={ this.closeExplainer } radarChartData={ data }/>
            </div>
            )
          }
        </div>
      );
    } else {
      return (
        <div
          className='test--officer--radar-chart'
          style={ animatedRadarChartStyle }
        >
          {
            !isRequesting && <NoDataRadarChart noDataText={ noDataText }/>
          }
        </div>
      );
    }
  }
}

AnimatedRadarChart.defaultProps = {
  noDataText: 'There is not enough data to construct a radar graph for this officer.'
};

AnimatedRadarChart.propTypes = {
  data: PropTypes.array,
  noDataText: PropTypes.string,
  isRequesting: PropTypes.bool,
};
