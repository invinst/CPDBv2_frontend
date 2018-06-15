import React, { Component, PropTypes } from 'react';

import { VennDiagram } from 'venn.js';
import { select } from 'd3-selection';
import { wrapperStyle } from './venn-diagram.style';
import { clayGray } from 'utils/styles';


export default class Diagram extends Component {
  componentDidMount() {
    const { background1, background2, coaccusalCount } = this.props;
    const sets = [
      { sets: ['A'], size: 4 },
      { sets: ['B'], size: 4 },
      { sets: ['A', 'B'], size: 1 }
    ];
    const chart = VennDiagram().width(194).height(134);

    const d3Diagram = select(this.diagram);
    d3Diagram.datum(sets).call(chart);

    // Style two circles
    const d3Circles = d3Diagram.selectAll('.venn-circle');
    d3Circles.selectAll('text').text('');

    const d3CirclesPaths = d3Circles.selectAll('path');
    d3CirclesPaths.style('fill-opacity', 1);
    d3CirclesPaths.style('stroke', 'white');
    d3CirclesPaths.filter((d, i) => i === 0).style('fill', background1);
    d3CirclesPaths.filter((d, i) => i === 1).style('fill', background2);

    //Style the intersection
    const d3Intersection = d3Diagram.selectAll('.venn-intersection');

    const d3InterSectionText = d3Intersection.selectAll('text');
    d3InterSectionText.text(coaccusalCount.toString());
    d3InterSectionText.style('fill', 'white');
    d3InterSectionText.style('font-size', '14px');
    d3InterSectionText.style('font-weight', 300);

    const d3IntersectionPath = d3Intersection.selectAll('path');
    d3IntersectionPath.style('fill', clayGray);
    d3IntersectionPath.style('fill-opacity', 1);

  }

  render() {
    return (
      <div style={ wrapperStyle } ref={ diagram => this.diagram = diagram } />
    );
  }
}

Diagram.propTypes = {
  background1: PropTypes.string,
  background2: PropTypes.string,
  coaccusalCount: PropTypes.number,
};
