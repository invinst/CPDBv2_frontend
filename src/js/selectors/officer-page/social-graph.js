import { createSelector } from 'reselect';
import _ from 'lodash';

import { getVisualTokenShade } from 'utils/visual-token';

const getNodes = state => state.officerPage.socialGraph.nodes;
const getLinks = state => state.officerPage.socialGraph.links;
export const getYearRange = state => state.officerPage.socialGraph.yearRange;

const cachedNodesSelector = createSelector(
  [getNodes],
  rawNodes => [...rawNodes]
);

const cachedLinksSelector = createSelector(
  [getLinks],
  rawLinks => [...rawLinks]
);


export const nodesSelector = createSelector(
  [cachedNodesSelector, getYearRange],
  (cachedNodes, [minYear, maxYear]) => {
    _.each(cachedNodes, node => {
      const filteredYears = _.filter(
        node['cr_years'],
        year => minYear <= year && year <= maxYear || year === null
      );
      node.crs = filteredYears.length;
    });

    return _.filter(cachedNodes, node => node.crs > 0);
  }
);

export const linksSelector = createSelector(
  [cachedLinksSelector, getYearRange],
  (cachedLinks, [minYear, maxYear]) => {
    _.each(cachedLinks, link => {
      const filteredYears = _.filter(
        link['cr_years'],
        year => minYear <= year && year <= maxYear || year === null
      );
      link.crs = filteredYears.length;
    });

    return _.filter(cachedLinks, link => link.crs !== 0);
  }
);

export const legendSelector = createSelector(
  [nodesSelector],
  (nodes) => {
    let crs = nodes.map(node => node.crs);
    crs = _.sortBy(crs).reverse();
    const nodeShades = _.uniq(crs.map(getVisualTokenShade));
    return {
      mostCrs: _.maxBy(crs),
      leastCrs: _.minBy(crs),
      nodeShades
    };
  }
);
