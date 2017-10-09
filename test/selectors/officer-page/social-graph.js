import _ from 'lodash';

import {
  nodesSelector, linksSelector, legendSelector
} from 'selectors/officer-page/social-graph';


describe('Officer social graph selectors', function () {
  const state = {
    officerPage: {
      socialGraph: {
        nodes: [],
        links: [],
        yearRange: [1984, 2017]
      }
    }
  };
  const socialGraph = state.officerPage.socialGraph;

  describe('nodesSelector', function () {
    it('should select nodes within year range', function () {
      socialGraph.nodes = [
        {
          id: 1,
          name: 'John Doe',
          'cr_years': [2001, 2002, 2003, 2004, 2005]
        },
        {
          id: 2,
          name: 'John Nee',
          'cr_years': [2001]
        },
        {
          id: 3,
          name: 'John Kee',
          'cr_years': [2002, 2002]
        },
        {
          id: 4,
          name: 'John Glee',
          'cr_years': [2006]
        },
        {
          id: 5,
          name: 'John Bee',
          'cr_years': [null]
        }
      ];
      socialGraph.yearRange = [2002, 2004];
      nodesSelector(state).should.eql([
        {
          id: 1,
          name: 'John Doe',
          crs: 3
        },
        {
          id: 3,
          name: 'John Kee',
          crs: 2
        },
        {
          id: 5,
          name: 'John Bee',
          crs: 1
        }
      ]);
    });
  });

  describe('linksSelector', function () {
    it('should select links within year range', function () {
      socialGraph.links = [
        {
          source: 1,
          target: 2,
          'cr_years': [2005]
        },
        {
          source: 2,
          target: 3,
          'cr_years': [2002, 2006]
        },
        {
          source: 3,
          target: 4,
          'cr_years': [2001]
        },
        {
          source: 5,
          target: 4,
          'cr_years': [null]
        },
        {
          source: 5,
          target: 6,
          'cr_years': [2004]
        },
        {
          source: 7,
          target: 6,
          'cr_years': [2003]
        }
      ];
      socialGraph.yearRange = [2002, 2004];
      linksSelector(state).should.eql([
        {
          source: 2,
          target: 3
        },
        {
          source: 5,
          target: 4
        },
        {
          source: 5,
          target: 6
        },
        {
          source: 7,
          target: 6
        }
      ]);
    });
  });

  describe('legendSelector', function () {
    it('should select legend correctly', function () {
      socialGraph.nodes = [
        {
          id: 1,
          name: 'foo',
          'cr_years': _.range(6).map(() => 2002)
        },
        {
          id: 2,
          name: 'bar',
          'cr_years': _.range(14).map(() => 2001)
        },
        {
          id: 3,
          name: 'baz',
          'cr_years': [1990]
        },
        {
          id: 4,
          name: 'bas',
          'cr_years': [2010]
        },
        {
          id: 5,
          name: 'bal',
          'cr_years': [null]
        },
        {
          id: 6,
          name: 'foo',
          'cr_years': _.range(6).map(() => 2002)
        },
        {
          id: 7,
          name: 'foo',
          'cr_years': _.range(13).map(() => 2002)
        },
      ];
      socialGraph.yearRange = [2001, 2002];
      legendSelector(state).should.eql({
        mostCrs: 14,
        leastCrs: 1,
        nodeShades: ['#c6d4ec', '#d4e2f4', '#edf0fa']
      });

    });
  });
});
