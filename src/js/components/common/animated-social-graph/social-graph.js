import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { isEmpty, orderBy, isEqual, filter, map } from 'lodash';
import moment from 'moment';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import 'rc-slider/assets/index.css';
import cx from 'classnames';
import pluralize from 'pluralize';

import styles from './social-graph.sass';
import { greyishColor } from 'utils/styles';

const DEFAULT_GRAPH_WIDTH = 800;
const DEFAULT_GRAPH_HEIGHT = 500;
const DEFAULT_PADDING = 1.5;
const MAX_RADIUS = 20;
const COLLIDE_ALPHA = 0.5;
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
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleEdgeClick = this.handleEdgeClick.bind(this);
    this.handleMouseover = this.handleMouseover.bind(this);
    this.handleEdgeMouseover = this.handleEdgeMouseover.bind(this);
    this.handleEdgeMouseout = this.handleEdgeMouseout.bind(this);
  }

  componentDidMount() {
    this.svg = d3.select(ReactDOM.findDOMNode(this.chart)).append('svg:svg');
    this.node = this.svg.selectAll('.node');
    this.link = this.svg.selectAll('.link');
    this.label = this.svg.selectAll('.node-label');
    this.selectedNodeLabel = {
      labelText: this.svg.selectAll('.selected-node-label'),
      box: this.svg.selectAll('.selected-node-label-box'),
    };
    this.selectedEdgeLabel = {
      labelText: this.svg.selectAll('.selected-edge-label'),
      box: this.svg.selectAll('.selected-edge-label-box'),
    };
    this.tip = d3Tip()
      .attr('class', cx(styles.socialGraphTip, 'test--graph-tooltip'))
      .direction('e')
      .offset([0, 2])
      .html(this.graphTooltip);
    this.svg.call(this.tip);
    this.drawGraph();
    d3.select(window).on('resize', this.resizeGraph);
  }

  componentDidUpdate(prevProps) {
    const { coaccusedData, timelineIdx, selectedOfficerId, selectedEdge, performResizeGraph } = this.props;

    if (!isEqual(prevProps.coaccusedData, coaccusedData)) {
      this.drawGraph();
    } else {
      if (prevProps.timelineIdx !== timelineIdx) {
        this.filterAndRestart();
      }
      if (performResizeGraph) {
        this.resizeGraph();
      }
      if (prevProps.selectedOfficerId !== selectedOfficerId) {
        this._updateSelectedNode();
      }
      if (prevProps.selectedEdge !== selectedEdge) {
        this._updateSelectedEdge();
      }
    }
  }

  componentWillUnmount() {
    d3.select(window).on('resize', null);
  }

  handleNodeClick(currentNode) {
    const { updateSelectedOfficerId } = this.props;
    if (updateSelectedOfficerId) {
      this.tip.hide(currentNode);
      updateSelectedOfficerId(currentNode.uid);
    }
  }

  handleEdgeClick(currentEdge) {
    const { updateSelectedEdge } = this.props;
    if (updateSelectedEdge) {
      updateSelectedEdge({ sourceUid: currentEdge.source.uid, targetUid: currentEdge.target.uid });
    }
  }

  handleMouseover(currentNode) {
    if (!currentNode.isSelectedNode) {
      this.tip.show(currentNode);
    }
  }

  handleEdgeMouseover(currentEdge) {
    this.node.classed('edge-hover', function (graphNode) {
      return graphNode === currentEdge.source || graphNode === currentEdge.target;
    });
    this.link.classed('edge-hover', (graphLink) => currentEdge === graphLink);
  }

  handleEdgeMouseout() {
    this.node.classed('edge-hover', false);
    this.link.classed('edge-hover', false);
  }

  graphTooltip(graphNode) {
    return `<span>${graphNode.fname}</span>`;
  }

  setInitialData() {
    this.data = {
      linkedByIndex: {},
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
      .friction(0.3)
      .links(this.data.links)
      .on('tick', this.tick);

    this.resizeGraph();

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
    const chartDiv = d3.select(ReactDOM.findDOMNode(this.chart)).node();
    this.width = chartDiv.clientWidth;
    this.height = chartDiv.clientHeight;

    const graphViewPortRadius = Math.min(this.width, this.height) / 2;
    const linkDistance = Math.sqrt((Math.PI * Math.pow(graphViewPortRadius, 2) / this.data.nodes.length));

    this.force.charge(-10 * linkDistance)
      .gravity(10 / linkDistance)
      .linkDistance(linkDistance);

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

  _recalculateNodeDegrees() {
    const { updateSortedOfficerIds } = this.props;

    const orderedLinks = orderBy(this.data.links, ['weight', 'source', 'target']);
    const linksCount = this.data.links.length;

    orderedLinks.forEach((link, index) => {
      this.data.nodes[link.source].degree += 1;
      this.data.nodes[link.target].degree += 1;

      link.colorGroup = Math.ceil((index + 1) * NUMBER_OF_LINK_GROUP_COLORS / linksCount);
    });

    const sortedNodes = orderBy(this.data.nodes, ['degree', 'fname'], ['desc', 'asc']);

    this.data.topNodes = sortedNodes.slice(0, NUMBER_OF_TOP_NODES);

    if (updateSortedOfficerIds) {
      const sortedOfficerIds = map(sortedNodes, 'uid');
      updateSortedOfficerIds(sortedOfficerIds);
    }
  }

  _updateLinkSourceAndTarget() {
    this.data.links.forEach((link) => {
      link.source = this.data.nodes[link.source];
      link.target = this.data.nodes[link.target];
    });
  }

  _drawSelectedLabel(selectedLabel, data, className, textFunc) {
    selectedLabel.box = selectedLabel.box.data(data);
    selectedLabel.labelText = selectedLabel.labelText.data(data);

    selectedLabel.box.exit().remove();
    selectedLabel.labelText.exit().remove();

    selectedLabel.box.enter()
      .append('rect')
      .attr('class', `${className}-box`)
      .attr('rx', '4')
      .attr('ry', '4');

    selectedLabel.labelText.enter()
      .append('text')
      .attr('class', className);

    selectedLabel.labelText.text(textFunc);

    selectedLabel.labelText.each(function (d) { d.bb = this.getBBox(); });

    selectedLabel.box
      .attr('width', function (d) { return d.bb.width + LABEL_PADDING_LEFT_RIGHT; })
      .attr('height', function (d) { return d.bb.height + LABEL_PADDING_TOP_BOTTOM; });
  }

  _updateSelectedNode() {
    const { selectedOfficerId } = this.props;

    this.data.selectedNodes.forEach((d) => {
      d.isSelectedNode = false;
    });
    this.data.selectedNodes = [];
    if (selectedOfficerId) {
      this.data.selectedNodes = filter(this.data.nodes, { uid: selectedOfficerId });
      this.data.selectedNodes.forEach((d) => {
        d.isSelectedNode = true;
      });
    }

    this._drawSelectedLabel(this.selectedNodeLabel, this.data.selectedNodes, 'selected-node-label', (d) => d.fname);
    this._updateSelectedNodePosition();
  }

  _updateSelectedNodePosition() {
    this.selectedNodeLabel.labelText
      .attr('x', (d) => d.x + this.nodeRadius(d) + LABEL_PADDING_LEFT_RIGHT / 2 )
      .attr('y', (d) => d.y + LABEL_PADDING_TOP_BOTTOM / 2 + 2);

    this.selectedNodeLabel.box
      .attr('x', (d) => d.x + this.nodeRadius(d))
      .attr('y', (d) => d.y + LABEL_PADDING_TOP_BOTTOM / 2 - d.bb.height + 2);
  }


  _updateSelectedEdge() {
    const { selectedEdge } = this.props;

    this.data.selectedEdges = [];
    if (selectedEdge) {
      this.data.selectedEdges = filter(
        this.data.links,
        { source: { uid: selectedEdge.sourceUid }, target: { uid: selectedEdge.targetUid } }
      );
    }

    this._drawSelectedLabel(
      this.selectedEdgeLabel,
      this.data.selectedEdges,
      'selected-edge-label',
      () => `${selectedEdge.coaccusedCount} ${pluralize('coaccusal', selectedEdge.coaccusedCount)}`
    );
    this._updateSelectedEdgePosition();
  }

  _updateSelectedEdgePosition() {
    this.selectedEdgeLabel.labelText
      .attr('x', (d) => (d.source.x + d.target.x) / 2 + LABEL_PADDING_LEFT_RIGHT / 2)
      .attr('y', (d) => (d.source.y + d.target.y) / 2 + LABEL_PADDING_TOP_BOTTOM / 2 + 2);

    this.selectedEdgeLabel.box
      .attr('x', (d) => (d.source.x + d.target.x) / 2)
      .attr('y', (d) => (d.source.y + d.target.y) / 2 + LABEL_PADDING_TOP_BOTTOM / 2 - d.bb.height + 2);
  }

  recalculateNodeLinks(curDate) {
    this._resetNodes();
    this._recalculateLinks(curDate);
    this._recalculateNodeDegrees();
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

    if (this.props.updateSelectedOfficerId) {
      this.node.on('click', this.handleNodeClick);
    }

    this.node.attr('r', (d) => this.nodeRadius(d))
      .style('fill', (d) => d.color || greyishColor);

    this.node.exit().remove();
  }

  nodeRadius(node) {
    return Math.min((node.degree / 2 + 2), MAX_RADIUS);
  }

  _restartLinks() {
    this.force.links(this.data.links)
      .linkStrength((d) => 1 / (Math.min(d.source.degree, d.target.degree) + 1));

    this.link = this.link.data(this.data.links);

    this.link.enter().insert('line', '.node')
      .attr('class', 'link edge-coaccusals-preview-link')
      .on('mouseover', this.handleEdgeMouseover)
      .on('mouseout', this.handleEdgeMouseout);

    if (this.props.updateSelectedEdge) {
      this.link.on('click', this.handleEdgeClick);
    }

    this.link.attr('class', (d) => `link edge-coaccusals-preview-link link-group-color-${d.colorGroup} ${d.className}`);

    this.link.exit().remove();
  }

  restart() {
    this._restartNodes();
    this._restartLinks();
    this.force.start();
  }

  tick(e) {
    // bounded graph
    this.node.attr('cx', (d) => {
      const nodeRadius = this.nodeRadius(d);
      return d.x = Math.max(nodeRadius, Math.min(this.width - nodeRadius, d.x || 0));
    })
      .attr('cy', (d) => {
        const nodeRadius = this.nodeRadius(d);
        return d.y = Math.max(nodeRadius, Math.min(this.height - nodeRadius, d.y || 0));
      });

    this.label.attr('x', (d) => d.x + this.nodeRadius(d))
      .attr('y', (d) => d.y);

    this.node.each(this.collide());

    this.link.attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y);

    this._updateSelectedNodePosition();
    this._updateSelectedEdgePosition();
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

  collide() {
    const quadtree = d3.geom.quadtree(this.data.nodes);
    return (currentNode) => {
      let r = this.nodeRadius(currentNode) + MAX_RADIUS,
        nx1 = currentNode.x - r,
        nx2 = currentNode.x + r,
        ny1 = currentNode.y - r,
        ny2 = currentNode.y + r;
      quadtree.visit((quad, x1, y1, x2, y2) => {
        if (quad.point && (quad.point !== currentNode)) {
          let x = currentNode.x - quad.point.x,
            y = currentNode.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = (currentNode.degree / 2 + 3) + (quad.point.degree / 2 + 3) + DEFAULT_PADDING;
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
    return (
      <div ref={ chart => this.chart = chart } className={ styles.socialGraph } />
    );
  }
}

SocialGraph.propTypes = {
  officers: PropTypes.array.isRequired,
  coaccusedData: PropTypes.array.isRequired,
  listEvent: PropTypes.array.isRequired,
  timelineIdx: PropTypes.number,
  startTimelineFromBeginning: PropTypes.func,
  stopTimeline: PropTypes.func,
  selectedOfficerId: PropTypes.number,
  updateSelectedOfficerId: PropTypes.func,
  selectedEdge: PropTypes.object,
  updateSelectedEdge: PropTypes.func,
  updateSortedOfficerIds: PropTypes.func,
  performResizeGraph: PropTypes.bool,
};

SocialGraph.defaultProps = {
  startTimelineFromBeginning: () => {},
  stopTimeline: () => {},
};
