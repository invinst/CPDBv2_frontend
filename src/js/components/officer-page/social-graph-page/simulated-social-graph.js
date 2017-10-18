import React, { PropTypes, Component } from 'react';
import {
  forceLink, forceManyBody, forceSimulation, forceCenter
} from 'd3-force';
import { sortBy, isEqual } from 'lodash';

import SocialGraph from './social-graph';


export default class SimulatedSocialGraph extends Component {
  constructor(props) {
    super(props);
    this.linkForce = forceLink(props.links).id(d => d.id);
    this.simulation = forceSimulation()
      .nodes(props.nodes)
      .force('charge', forceManyBody().strength(-300))
      .force('link', this.linkForce)
      .force('center', forceCenter());
  }

  componentWillReceiveProps(nextProps) {
    const { nodes, links } = nextProps;
    if (this.thereIsChangeInGraph(nextProps)) {
      this.restartSimulation(nodes, links);
    }
  }

  componentWillUnmount() {
    this.simulation.stop();
  }

  thereIsChangeInGraph(nextProps) {
    const prevNodes = sortBy(this.props.nodes, 'id');
    const nextNodes = sortBy(nextProps.nodes, 'id');
    const prevLinks = sortBy(this.props.links, 'source');
    const nextlinks = sortBy(nextProps.links, 'source');

    return !isEqual(prevNodes, nextNodes) || !isEqual(prevLinks, nextlinks);
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
        links={ this.linkForce.links() }
      />
    );
  }
}

SimulatedSocialGraph.propTypes = {
  nodes: PropTypes.array,
  links: PropTypes.array
};
