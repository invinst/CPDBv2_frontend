import React, { PropTypes, Component } from 'react';
import {
  forceLink, forceManyBody, forceSimulation, forceCenter
} from 'd3-force';

import SocialGraph from './social-graph';


export default class SimulatedSocialGraph extends Component {
  constructor(props) {
    super(props);
    this.linkForce = forceLink().id(d => d.id);
    this.simulation = forceSimulation()
      .force('charge', forceManyBody().strength(-300))
      .force('link', this.linkForce)
      .force('center', forceCenter());
  }

  componentWillReceiveProps(nextProps) {
    const { nodes, links } = nextProps;
    this.restartSimulation(nodes, links);
  }

  restartSimulation(nodes, links) {
    this.linkForce = forceLink(links).id(d => d.id);
    this.simulation
      .nodes(nodes)
      .force('link', this.linkForce)
      .alpha(1)
      .restart();
  }

  render() {
    return (
      <SocialGraph
        simulation={ this.simulation }
        linkForce={ this.linkForce }
      />
    );
  }
}

SimulatedSocialGraph.propTypes = {
  nodes: PropTypes.array,
  links: PropTypes.array
};
