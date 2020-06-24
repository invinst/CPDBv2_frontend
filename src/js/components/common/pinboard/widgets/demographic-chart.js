import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import * as d3 from 'd3';
import { scaleLinear, scaleBand } from 'd3-scale';

import * as styles from './demographic-chart.sass';


const BAR_CHART_WIDTH = 244;
const BAR_CHART_RIGHT_PADDING = 12;
const PERCENTAGE_PADDING = 8;
const SHORT_BAR_WIDTH = 25;
const SHORT_BAR_PERCENTAGE_PADDING = 4;
const BAR_HEIGHT = 17;
const BAR_LINE_HEIGHT = BAR_HEIGHT + 6;
const BAR_SPACING = 0.17;
const PERCENTAGE_TOP_PADDING = 4;

class DemographicChart extends Component {
  componentDidMount() {
    const { demographicData } = this.props;

    const barChartHeight = demographicData.length * BAR_LINE_HEIGHT;

    this.svg = d3.select(ReactDOM.findDOMNode(this.chart))
      .append('svg:svg')
      .attr('class', styles.demographicChart)
      .attr('width', '100%')
      .attr('height', barChartHeight);

    const x = scaleLinear()
      .domain([0, d3.max(demographicData, d => d.percentage)])
      .range([0, BAR_CHART_WIDTH - BAR_CHART_RIGHT_PADDING]);

    const y = scaleBand()
      .domain(d3.range(demographicData.length))
      .rangeRound([0, barChartHeight])
      .padding(BAR_SPACING);

    const chartContainer = this.svg
      .append('g')
      .attr('transform', 'translate(90, 0)');

    // Background
    chartContainer
      .append('rect')
      .attr('class', 'bar-chart-background')
      .attr('y', '0')
      .attr('width', BAR_CHART_WIDTH)
      .attr('height', barChartHeight);

    // Bar chart
    chartContainer
      .append('g')
      .attr('class', 'bar-chart')
      .selectAll('rect')
      .data(demographicData)
      .enter()
      .append('rect')
      .attr('y', (d, i) => y(i))
      .attr('width', d => x(d.percentage) - x(0))
      .attr('height', BAR_HEIGHT);

    // Percentage
    const format = x.tickFormat(10, '%');

    chartContainer
      .append('g')
      .selectAll('text')
      .data(demographicData)
      .enter()
      .append('text')
      .attr('class', 'bar-chart-precentage')
      .attr('y', (d, i) => y(i) + y.bandwidth() / 2)
      .attr('dy', PERCENTAGE_TOP_PADDING)
      .text(d => format(d.percentage))
      .attr('dx', PERCENTAGE_PADDING)
      .call(text => text.filter(d => x(d.percentage) - x(0) < SHORT_BAR_WIDTH) // short bars
        .attr('dx', d => x(d.percentage) + SHORT_BAR_PERCENTAGE_PADDING)
        .attr('class', 'bar-chart-precentage short-bar')
      );

    // Label
    const yAxis = d3.svg.axis()
      .scale(y)
      .tickFormat(i => demographicData[i].name)
      .orient('right')
      .tickSubdivide(true);

    this.svg
      .append('g')
      .attr('class', 'bar-chart-label')
      .attr('transform', 'translate(3, 0)')
      .call(g => yAxis(g))
      .call(g => g.select('.domain').remove());
  }

  render() {
    return <div ref={ el => this.chart = el } />;
  }
}

DemographicChart.propTypes = {
  demographicData: PropTypes.array,
};

DemographicChart.defaultProps = {
  demographicData: [],
};

export default DemographicChart;
