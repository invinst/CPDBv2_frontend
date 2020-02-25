import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { VennDiagram } from 'venn.js';
import { select } from 'd3-selection';
import style from './venn-diagram.sass';
import { softBlackColor } from 'utils/styles';


export default class Diagram extends Component {
  componentDidMount() {
    // We have to make sure that the component's wrapper (div) is rendered before the Diagram generating code,
    // so that has something to draw in.
    const { background1, background2 } = this.props;
    const sets = [
      { sets: ['A'], size: 4 },
      { sets: ['B'], size: 4 },
      { sets: ['A', 'B'], size: 1 },
    ];
    const chart = VennDiagram().width(194).height(134);

    const d3Diagram = select(this.diagram);
    d3Diagram.datum(sets).call(chart);

    // Style two circles
    const d3Circles = d3Diagram.selectAll('.venn-circle');
    d3Circles.selectAll('text').text('');
    const d3CirclesPaths = d3Circles.selectAll('path');
    d3CirclesPaths.style('fill-opacity', 1);

    //style each circles
    const d3Circle1 = d3Circles.filter((d, i) => i === 0);
    d3Circle1.select('path').style('fill', background1);
    const d3Circle2 = d3Circles.filter((d, i) => i === 1);
    d3Circle2.select('path').style('fill', background2);

    //Style the intersection
    const d3Intersection = d3Diagram.selectAll('.venn-intersection');

    const d3InterSectionText = d3Intersection.selectAll('text');
    d3InterSectionText.style('fill', 'white');
    d3InterSectionText.style('font-size', '14px');
    d3InterSectionText.style('font-weight', 300);

    const d3IntersectionPath = d3Intersection.selectAll('path');
    d3IntersectionPath.style('fill', softBlackColor);
    d3IntersectionPath.style('fill-opacity', 1);
  }

  render() {
    return (
      <div
        className={ style.vennDiagram }
        ref={ diagram => this.diagram = diagram }
      />
    );
  }
}

Diagram.propTypes = {
  background1: PropTypes.string,
  background2: PropTypes.string,
};
