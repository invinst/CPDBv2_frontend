import { createSelector } from 'reselect';
import _ from 'lodash';

import { getVisualTokenShade } from 'utils/visual-token';

const getNodes = state => state.officerPage.socialGraph.nodes;
const getLinks = state => state.officerPage.socialGraph.links;
export const getYearRange = state => state.officerPage.socialGraph.yearRange;


export const nodesSelector = createSelector(
  [getNodes, getYearRange],
  (rawNodes, [minYear, maxYear]) => {
    const nodes = rawNodes.map(node => {
      const filteredYears = _.filter(
        node['cr_years'],
        year => minYear <= year && year <= maxYear || year === null
      );
      return {
        id: node.id,
        name: node.name,
        crs: filteredYears.length
      };
    });

    return _.filter(nodes, node => node.crs > 0);
  }
);

export const linksSelector = createSelector(
  [getLinks, getYearRange],
  (rawLinks, [minYear, maxYear]) => {
    const links = rawLinks.reduce((accumulator, link) => {
      const filteredYears = _.filter(
        link['cr_years'],
        year => minYear <= year && year <= maxYear || year === null
      );
      if (filteredYears.length !== 0) {
        accumulator.push({
          source: link.source,
          target: link.target
        });
      }
      return accumulator;
    }, []);

    return links;
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
