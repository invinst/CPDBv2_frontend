import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { filter, isEmpty } from 'lodash';
import moment from 'moment';
import * as d3 from 'd3';
import * as jLouvain from 'jlouvain';
import d3Tip from 'd3-tip';
import 'rc-slider/assets/index.css';
import { countBy, indexOf } from 'lodash';
import cx from 'classnames';

import { imgUrl } from 'utils/static-assets';
import styles from './social-graph.sass';

const DEFAULT_GRAPH_WIDTH = 800;
const DEFAULT_GRAPH_HEIGHT = 500;
const RADIUS = 10;
const DEFAULT_PADDING = 1.5;
const DEFAULT_CLUSTER_PADDING = 6;
const MAX_RADIUS = 12;
const COLLIDE_ALPHA = 0.5;


export default class SocialGraph extends Component {
  constructor(props) {
    super(props);
    this.width = DEFAULT_GRAPH_WIDTH;
    this.height = DEFAULT_GRAPH_HEIGHT;

    this.setInitialData();

    this.resizeGraph = this.resizeGraph.bind(this);
    this.tick = this.tick.bind(this);
    this.connectedNodes = this.connectedNodes.bind(this);
    this.collide = this.collide.bind(this);
  }

  componentDidMount() {
    this.svg = d3.select(ReactDOM.findDOMNode(this.refs.chart)).append('svg:svg');
    this.node = this.svg.selectAll('.node');
    this.link = this.svg.selectAll('.link');
    this.fill = d3.scale.category20();
    this.tip = d3Tip()
      .attr('class', cx(styles.socialGraphTip, 'test--graph-tooltip'))
      .offset([-5, 0])
      .html(this.graphTooltip);
    this.svg.call(this.tip);
    this.drawGraph();
  }

  componentDidUpdate(prevProps) {
    const { coaccusedData, timelineIdx, clickSearchState } = this.props;

    if (prevProps.coaccusedData !== coaccusedData) {
      this.drawGraph();
    } else {
      if (prevProps.timelineIdx !== timelineIdx) {
        this.filterAndRestart();
      }
      if (prevProps.clickSearchState !== clickSearchState) {
        this.highlightNode();
      }
    }
  }

  graphTooltip(graphNode) {
    return `<span>${graphNode.fname}</span>`;
  }

  setInitialData() {
    this.data = {
      maxWeight: 0,
      linkedByIndex: {},
      maxNodeInCommunities: {}
    };
  }

  drawGraph() {
    const { officers, listEvent, startTimelineFromBeginning, stopTimeline } = this.props;
    if (isEmpty(officers))
      return;

    stopTimeline();

    if (this.force)
      this.force.stop();

    this.setInitialData();
    const numOfEvents = listEvent.length;
    const curDate = moment(listEvent[numOfEvents - 1], 'YYYY-MM-DD').toDate();

    this.recalculateNodeLinks(curDate);

    // Compute the distinct nodes from the links.
    this.force = d3.layout.force()
      .size([this.width, this.height])
      .nodes(this.data.nodes)
      .charge(-50)
      .friction(0.5)
      .links(this.data.links)
      .on('tick', this.tick);

    this.resizeGraph();
    d3.select(window).on('resize', this.resizeGraph);

    this.data.linkedByIndex = {};
    this.data.links.forEach((link) => {
      this.data.linkedByIndex[link.source.id + ',' + link.target.id] = 1;
    });
    this.data.nodes.forEach((node) => {
      this.data.linkedByIndex[node.id + ',' + node.id] = 1;
    });

    this.restart();
    startTimelineFromBeginning();
  }

  resizeGraph() {
    const chartDiv = d3.select(ReactDOM.findDOMNode(this.refs.chart)).node();
    this.width = chartDiv.clientWidth;
    this.height = chartDiv.clientHeight;
    this.svg.attr('width', this.width).attr('height', this.height);
    this.force.size([this.width, this.height]);
  }

  recalculateNodeLinks(curDate) {
    let index = 0;
    const { officers, coaccusedData } = this.props;
    if (!this.data.nodes) {
      let nodes = [];
      let officerHash = {};
      officers.forEach((officer) => {
        const officerData = {
          id: index,
          uid: officer.id,
          fname: officer.fullName,
          degree: 0
        };
        nodes.push(officerData);
        officerHash[officer.id] = index;
        index = index + 1;
      });

      this.data.nodes = nodes;
      this.data.officerHash = officerHash;
    } else {
      this.data.nodes.forEach((graphNode) => {
        graphNode.degree = 0;
      });
    }

    let nodesData = {};
    coaccusedData.forEach((row) => {
      const rowDate = moment(row['incidentDate'], 'YYYY-MM-DD').toDate();
      if (rowDate <= curDate) {
        const objKey = row['officerId1'] + '_' + row['officerId2'];
        if (nodesData[objKey]) {
          nodesData[objKey].weight = row['accussedCount'];
        } else {
          const officerIndex1 = this.data.officerHash[row['officerId1']];
          const officerIndex2 = this.data.officerHash[row['officerId2']];
          nodesData[objKey] = {
            source: officerIndex1,
            target: officerIndex2,
            weight: row['accussedCount']
          };
        }
        nodesData[objKey]['color'] = (rowDate.getTime() === curDate.getTime()) ? 'red' : '#999';
      }
    });

    const links = Object.values(nodesData);

    links.forEach((link) => {
      this.data.nodes[link.source].degree += 1;
      this.data.nodes[link.target].degree += 1;
    });

    const communityPartition = jLouvain.jLouvain().nodes(Object.values(this.data.officerHash)).edges(links)();

    const memberCountInCommunity = countBy(communityPartition);

    let groupIds = [];

    for (const groupId in memberCountInCommunity) {
      if (memberCountInCommunity[groupId] >= 3) {
        groupIds.push(parseInt(groupId));
      }
    }

    for (const graphNodeId in communityPartition) {
      const groupId = communityPartition[graphNodeId];
      if (indexOf(groupIds, groupId) != -1) {
        communityPartition[graphNodeId] = groupId + 1;
      } else {
        communityPartition[graphNodeId] = 0;
      }
    }

    this.data.maxNodeInCommunities = {};
    this.data.nodes.forEach((graphNode) => {
      graphNode.group = communityPartition[graphNode.id];

      if (!(graphNode.group in this.data.maxNodeInCommunities) ||
        (this.data.maxNodeInCommunities[graphNode.group].degree < graphNode.degree)) {
        this.data.maxNodeInCommunities[graphNode.group] = graphNode;
      }
    });

    this.data.maxWeight = 0;
    links.forEach((link) => {
      link.source = this.data.nodes[link.source];
      link.target = this.data.nodes[link.target];

      if (this.data.maxWeight < link.weight) {
        this.data.maxWeight = link.weight;
      }
    });

    this.data.links = links;
  }

  restart() {
    this.toggleNode = 0;
    this.node = this.node.data(this.data.nodes);
    this.node.enter().insert('circle', '.cursor')
      .attr('class', 'node')
      .call(this.force.drag)
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide)
      .on('dblclick', this.connectedNodes);

    this.node.attr('r', (d) => {
      return (d.degree / 2 + 2);
    }).style('fill', (d) => {
      return this.fill(d.group);
    });

    this.node.exit().remove();

    this.force.links(this.data.links)
      .linkStrength((d) => {
        return ((d.weight + 1) / (this.data.maxWeight + 1));
      });
    this.link = this.link.data(this.data.links);

    this.link.enter().insert('line', '.node').attr('class', 'link');

    // update the weights to new data
    this.link.attr('stroke-width', (d) => {
      return Math.ceil(Math.sqrt(d.weight));
    })
      .style('stroke', (d) => {
        return d.color;
      });

    this.link.exit().remove();

    this.force.start();
  }

  tick(e) {
    // bounded graph
    this.node.attr('cx', (d) => {
      return d.x = Math.max(RADIUS, Math.min(this.width - RADIUS, d.x || 0));
    })
    .attr('cy', (d) => {
      return d.y = Math.max(RADIUS, Math.min(this.height - RADIUS, d.y || 0));
    });

    if (this.props.collideNodes) {
      this.node.each(this.cluster(60 * e.alpha * e.alpha))
        .each(this.collide());
    }

    this.link.attr('x1', function (d) {
      return d.source.x;
    }).attr('y1', function (d) {
      return d.source.y;
    }).attr('x2', function (d) {
      return d.target.x;
    }).attr('y2', function (d) {
      return d.target.y;
    });
  }

  connectedNodes(currentNode) {
    const neighboring = (a, b) => {
      return this.data.linkedByIndex[a.index + ',' + b.index];
    };

    if (this.toggleNode === 0) {
      //Reduce the opacity of all but the neighbouring nodes
      this.node.style('opacity', function (otherNode) {
        return neighboring(currentNode, otherNode) | neighboring(otherNode, currentNode) ? 1 : 0.1;
      });
      this.link.style('opacity', function (otherNode) {
        return currentNode.index === otherNode.source.index | currentNode.index === otherNode.target.index ? 1 : 0.1;
      });
      this.toggleNode = 1;
      currentNode.fixed = false;
    } else {
      //Put them back to opacity=1
      this.node.style('opacity', 1);
      this.link.style('opacity', 1);
      this.toggleNode = 0;
    }
  }

  filterAndRestart() {
    const { listEvent, timelineIdx } = this.props;
    const dateObj = moment(listEvent[timelineIdx], 'YYYY-MM-DD');
    const curDate = dateObj.toDate();

    this.recalculateNodeLinks(curDate);
    this.restart();
  }

  cluster(alpha) {
    const maxNodeInCommunities = this.data.maxNodeInCommunities;
    return (d) => {
      const cluster = maxNodeInCommunities[d.group];
      if (typeof cluster === 'undefined' || cluster === d || d.group === 0)
        return;
      let x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = (d.degree + cluster.degree) / 2 + 4;

      if (l && r && l !== r) {
        l = (l - r) / l * alpha;
        d.x -= x *= l;
        d.y -= y *= l;
        cluster.x += x;
        cluster.y += y;
      }
    };
  }

  collide() {
    const quadtree = d3.geom.quadtree(this.data.nodes);
    return (d) => {
      let r = (d.degree / 2 + 2) + MAX_RADIUS + DEFAULT_CLUSTER_PADDING,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
      quadtree.visit((quad, x1, y1, x2, y2) => {
        if (quad.point && (quad.point !== d)) {
          let x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = (d.degree / 2 + 3) + (quad.point.degree / 2 + 3) +
              (d.group === quad.point.group ? DEFAULT_PADDING : DEFAULT_CLUSTER_PADDING);
          if (l && r && l < r) {
            l = (l - r) / l * COLLIDE_ALPHA;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

  highlightNode() {
    const { officers, searchText } = this.props;
    if (isEmpty(searchText))
      return;
    const currentNode = filter(officers, officer => officer.fullName === searchText)[0];

    if (currentNode) {
      const others = this.node.filter(function (d, i) {
        return d.uid !== currentNode.id;
      });

      const selected = this.node.filter(function (d, i) {
        return d.uid === currentNode.id;
      });

      selected.attr('r', 20);

      others.style('opacity', '0');
      this.link.style('opacity', '0');
      d3.selectAll('.node, .link').transition()
        .duration(5000)
        .style('opacity', 1);

      selected.transition().duration(2000).attr('r', function (d) {
        return d.degree / 2 + 2;
      });
    }
  }

  render() {
    const { officers } = this.props;

    return (
      <div ref='chart' className={ styles.socialGraph }>
        { isEmpty(officers) && <img className='loading-img' src={ imgUrl('loading-large.svg') } /> }
      </div>
    );
  }
}

SocialGraph.propTypes = {
  officers: PropTypes.array.isRequired,
  coaccusedData: PropTypes.array.isRequired,
  listEvent: PropTypes.array.isRequired,
  timelineIdx: PropTypes.number,
  collideNodes: PropTypes.bool,
  startTimelineFromBeginning: PropTypes.func,
  stopTimeline: PropTypes.func,
  searchText: PropTypes.string,
  clickSearchState: PropTypes.bool,
};

SocialGraph.defaultProps = {
  startTimelineFromBeginning: () => {},
  stopTimeline: () => {},
  collideNodes: false
};
