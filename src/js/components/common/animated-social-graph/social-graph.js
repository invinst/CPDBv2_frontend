import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty, countBy, indexOf, orderBy, isEqual, filter } from 'lodash';
import moment from 'moment';
import * as d3 from 'd3';
import * as jLouvain from 'jlouvain';
import d3Tip from 'd3-tip';
import 'rc-slider/assets/index.css';
import cx from 'classnames';

import { imgUrl } from 'utils/static-assets';
import styles from './social-graph.sass';
import { greyishColor } from 'utils/styles';

const DEFAULT_GRAPH_WIDTH = 800;
const DEFAULT_GRAPH_HEIGHT = 500;
const RADIUS = 10;
const DEFAULT_PADDING = 1.5;
const DEFAULT_CLUSTER_PADDING = 6;
const MAX_RADIUS = 12;
const COLLIDE_ALPHA = 0.5;
const MIN_MEMBERS_IN_COMMUNITY = 3;
const NUMBER_OF_TOP_NODES = 5;
const NUMBER_OF_LINK_GROUP_COLORS = 6;
const LABEL_PADDING_LEFT_RIGHT = 10;
const LABEL_PADDING_TOP_BOTTOM = 6;


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
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseover = this.handleMouseover.bind(this);
  }

  componentDidMount() {
    this.svg = d3.select(ReactDOM.findDOMNode(this.refs.chart)).append('svg:svg');
    this.node = this.svg.selectAll('.node');
    this.link = this.svg.selectAll('.link');
    this.label = this.svg.selectAll('.node-label');
    this.selectedLabel = this.svg.selectAll('.selected-node-label');
    this.selectedLabelBox = this.svg.selectAll('.selected-node-label-box');
    this.tip = d3Tip()
      .attr('class', cx(styles.socialGraphTip, 'test--graph-tooltip'))
      .direction('e')
      .offset([0, 2])
      .html(this.graphTooltip);
    this.svg.call(this.tip);
    this.drawGraph();
  }

  componentDidUpdate(prevProps) {
    const { coaccusedData, timelineIdx, fullscreen, officer } = this.props;

    if (!isEqual(prevProps.coaccusedData, coaccusedData)) {
      this.drawGraph();
    } else {
      if (prevProps.timelineIdx !== timelineIdx) {
        this.filterAndRestart();
      }
      if (prevProps.fullscreen !== fullscreen) {
        this.resizeGraph();
      }
      if (!isEqual(prevProps.officer, officer)) {
        this._updateSelectedNode();
      }
    }
  }

  handleClick(currentNode) {
    const { updateOfficerId } = this.props;
    if (updateOfficerId) {
      this.tip.hide(currentNode);
      updateOfficerId(currentNode.uid);
    }
  }

  handleMouseover(currentNode) {
    if (!currentNode.isSelectedNode) {
      this.tip.show(currentNode);
    }
  }

  graphTooltip(graphNode) {
    return `<span>${graphNode.fname}</span>`;
  }

  setInitialData() {
    this.data = {
      maxWeight: 0,
      linkedByIndex: {},
      maxNodeInCommunities: {},
      topNodes: [],
      selectedNodes: [],
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
    this.force.start();
  }

  _resetNodes() {
    const { officers } = this.props;
    if (!this.data.nodes) {
      let nodes = [];
      let officerHash = {};
      officers.forEach((officer, index) => {
        const officerData = {
          id: index,
          uid: officer.id,
          fname: officer.fullName,
          color: officer.visualTokenBackground,
          degree: 0
        };
        nodes.push(officerData);
        officerHash[officer.id] = index;
      });

      this.data.nodes = nodes;
      this.data.officerHash = officerHash;
    } else {
      this.data.nodes.forEach((graphNode) => {
        graphNode.degree = 0;
        graphNode.isSelectedNode = false;
      });
    }
  }

  _recalculateLinks(curDate) {
    const { coaccusedData } = this.props;
    let nodesData = {};
    coaccusedData.forEach((row) => {
      const rowDate = moment(row.incidentDate, 'YYYY-MM-DD').toDate();
      if (rowDate <= curDate) {
        const objKey = row.officerId1 + '_' + row.officerId2;
        if (nodesData[objKey]) {
          nodesData[objKey].weight = row.accussedCount;
        } else {
          const officerIndex1 = this.data.officerHash[row.officerId1];
          const officerIndex2 = this.data.officerHash[row.officerId2];
          nodesData[objKey] = {
            source: officerIndex1,
            target: officerIndex2,
            weight: row.accussedCount
          };
        }
        nodesData[objKey]['className'] = (rowDate.getTime() === curDate.getTime()) ? 'current-link' : '';
      }
    });

    this.data.links = Object.values(nodesData);
  }

  _recalculateNodeDegreesAndMaxWeight() {
    this.data.maxWeight = 0;

    const orderedLinks = orderBy(this.data.links, ['weight'], ['asc']);
    const linksCount = this.data.links.length;

    orderedLinks.forEach((link, index) => {
      this.data.nodes[link.source].degree += 1;
      this.data.nodes[link.target].degree += 1;

      if (this.data.maxWeight < link.weight) {
        this.data.maxWeight = link.weight;
      }

      link.colorGroup = Math.ceil((index + 1) * NUMBER_OF_LINK_GROUP_COLORS / linksCount);
    });

    this.data.topNodes = orderBy(this.data.nodes, ['degree', 'uid'], ['desc', 'asc']).slice(0, NUMBER_OF_TOP_NODES);
  }

  _recalculateNodeGroups() {
    const communityPartition = jLouvain.jLouvain().nodes(Object.values(this.data.officerHash)).edges(this.data.links)();

    const memberCountInCommunity = countBy(communityPartition);

    let groupIds = [];

    for (const groupId in memberCountInCommunity) {
      if (memberCountInCommunity[groupId] >= MIN_MEMBERS_IN_COMMUNITY) {
        groupIds.push(parseInt(groupId));
      }
    }

    for (const graphNodeId in communityPartition) {
      const groupId = communityPartition[graphNodeId];
      if (indexOf(groupIds, groupId) !== -1) {
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
  }

  _updateLinkSourceAndTarget() {
    this.data.links.forEach((link) => {
      link.source = this.data.nodes[link.source];
      link.target = this.data.nodes[link.target];
    });
  }

  _updateSelectedNode() {
    const { officer } = this.props;

    this.force.stop();
    this.data.selectedNodes.forEach((d) => {
      d.isSelectedNode = false;
    });
    this.data.selectedNodes = [];
    if (officer) {
      this.data.selectedNodes = filter(this.data.nodes, { uid: officer.id });
      this.data.selectedNodes.forEach((d) => {
        d.isSelectedNode = true;
      });
    }

    this.selectedLabelBox = this.selectedLabelBox.data(this.data.selectedNodes);
    this.selectedLabel = this.selectedLabel.data(this.data.selectedNodes);

    this.selectedLabelBox.enter()
      .append('rect')
      .attr('class', 'selected-node-label-box')
      .attr('rx', '4')
      .attr('ry', '4');

    this.selectedLabel.enter()
      .append('text')
      .attr('class', 'selected-node-label');

    this.selectedLabel.text((d) => d.fname);

    this.selectedLabel.each(function (d) { d.bb = this.getBBox(); });

    this.selectedLabelBox
      .attr('width', function (d) { return d.bb.width + LABEL_PADDING_LEFT_RIGHT; })
      .attr('height', function (d) { return d.bb.height + LABEL_PADDING_TOP_BOTTOM; });

    this.selectedLabelBox.exit().remove();
    this.selectedLabel.exit().remove();

    this.force.start();
  }

  recalculateNodeLinks(curDate) {
    this._resetNodes();
    this._recalculateLinks(curDate);
    this._recalculateNodeDegreesAndMaxWeight();
    this._recalculateNodeGroups();
    this._updateLinkSourceAndTarget();
  }

  _restartNodes() {
    this.toggleNode = 0;

    this.node = this.node.data(this.data.nodes);

    this.label = this.label.data(this.data.topNodes);

    this.label.enter()
      .append('text')
      .attr('class', 'node-label');

    this.label.text((d) => d.fname);

    this.label.exit().remove();

    this.node.enter().insert('circle', '.cursor')
      .attr('class', 'node officer-preview-link')
      .call(this.force.drag)
      .on('mouseover', this.handleMouseover)
      .on('mouseout', this.tip.hide)
      .on('dblclick', this.connectedNodes);

    if (this.props.updateOfficerId) {
      this.node.on('click', this.handleClick);
    }

    this.node.attr('r', (d) => (d.degree / 2 + 2))
      .style('fill', (d) => d.color || greyishColor);

    this.node.exit().remove();
  }

  _restartLinks() {
    this.force.links(this.data.links)
      .linkStrength((d) => ((d.weight + 1) / (this.data.maxWeight + 1)));
    this.link = this.link.data(this.data.links);

    this.link.enter().insert('line', '.node').attr('class', 'link');

    this.link.attr('class', (d) => `link link-group-color-${d.colorGroup} ${d.className}`);

    this.link.exit().remove();
  }

  restart() {
    this._restartNodes();
    this._restartLinks();
    this.force.start();
  }

  tick(e) {
    // bounded graph
    this.node.attr('cx', (d) => d.x = Math.max(RADIUS, Math.min(this.width - RADIUS, d.x || 0)))
    .attr('cy', (d) => d.y = Math.max(RADIUS, Math.min(this.height - RADIUS, d.y || 0)));

    this.label.attr('x', (d) => d.x + (d.degree / 2 + 2))
      .attr('y', (d) => d.y);

    this.selectedLabel
      .attr('x', (d) => d.x + (d.degree / 2 + 2) + LABEL_PADDING_LEFT_RIGHT / 2 )
      .attr('y', (d) => d.y + LABEL_PADDING_TOP_BOTTOM / 2 + 2);

    this.selectedLabelBox
      .attr('x', (d) => d.x + (d.degree / 2 + 2))
      .attr('y', (d) => d.y + LABEL_PADDING_TOP_BOTTOM / 2 - d.bb.height + 2);

    if (this.props.collideNodes) {
      this.node.each(this.cluster(60 * e.alpha * e.alpha))
        .each(this.collide());
    }

    this.link.attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);
  }

  connectedNodes(currentNode) {
    const neighboring = (a, b) => this.data.linkedByIndex[a.index + ',' + b.index];

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
    return (currentNode) => {
      const cluster = maxNodeInCommunities[currentNode.group];
      if (typeof cluster === 'undefined' || cluster === currentNode || currentNode.group === 0)
        return;
      const xDistance = currentNode.x - cluster.x,
        yDistance = currentNode.y - cluster.y,
        distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance),
        minDistance = (currentNode.degree + cluster.degree) / 2 + 4;

      if (distance && minDistance && distance !== minDistance) {
        const percentage = (distance - minDistance) / distance * alpha;
        const xAdjust = xDistance * percentage;
        const yAdjust = yDistance * percentage;
        currentNode.x -= xAdjust;
        currentNode.y -= yAdjust;
        cluster.x += xAdjust;
        cluster.y += yAdjust;
      }
    };
  }

  collide() {
    const quadtree = d3.geom.quadtree(this.data.nodes);
    return (currentNode) => {
      let r = (currentNode.degree / 2 + 2) + MAX_RADIUS + DEFAULT_CLUSTER_PADDING,
        nx1 = currentNode.x - r,
        nx2 = currentNode.x + r,
        ny1 = currentNode.y - r,
        ny2 = currentNode.y + r;
      quadtree.visit((quad, x1, y1, x2, y2) => {
        if (quad.point && (quad.point !== currentNode)) {
          let x = currentNode.x - quad.point.x,
            y = currentNode.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = (currentNode.degree / 2 + 3) + (quad.point.degree / 2 + 3) +
              (currentNode.group === quad.point.group ? DEFAULT_PADDING : DEFAULT_CLUSTER_PADDING);
          if (l && r && l < r) {
            l = (l - r) / l * COLLIDE_ALPHA;
            currentNode.x -= x *= l;
            currentNode.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
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
  fullscreen: PropTypes.bool,
  updateOfficerId: PropTypes.func,
  officer: PropTypes.object,
};

SocialGraph.defaultProps = {
  startTimelineFromBeginning: () => {},
  stopTimeline: () => {},
  collideNodes: false
};
