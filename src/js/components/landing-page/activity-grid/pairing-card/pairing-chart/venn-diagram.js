import React, { Component } from 'react';

import { VennDiagram } from 'venn.js';
import { select } from 'd3-selection';
import { wrapperStyle } from './venn-diagram.style';


export default class Diagram extends Component {
  componentDidMount() {
    let sets = [{ sets: ['A'], size: 4 }, { sets: ['B'], size: 4 }, { sets: ['A', 'B'], size: 1 }];

    let chart = VennDiagram().width(194).height(134);
    select(this.diagram).datum(sets).call(chart);
  }

  render() {
    return (
      <div style={ wrapperStyle } ref={ diagram => this.diagram = diagram } />
    );
  }
}
