import {
  getTimelineItems, getSelectedItemIndex, getHoveredItemIndex, getSortDescending, timelineItemsHasMoreSelector,
  timelineItemsNextParamsSelector, timelineItemsSelector, minimapSelector, sortParamsSelector
} from 'selectors/officer-page/timeline';

import { TimelineItemType } from 'utils/constants';

describe('officer page selectors', function () {
  let state = {
    officerPage: {
      timeline: {}
    }
  };

  beforeEach(function () {
    state.officerPage.timeline = {};
  });

  describe('getTimelineItems', function () {
    it('should return timeline items', function () {
      state.officerPage.timeline = {
        items: [1, 2, 3]
      };

      getTimelineItems(state).should.eql([1, 2, 3]);
    });
  });

  describe('getSelectedItemIndex', function () {
    it('should return selected item index', function () {
      state.officerPage.timeline = {
        selectedItemIndex: 1
      };

      getSelectedItemIndex(state).should.eql(1);
    });
  });

  describe('getHoveredItemIndex', function () {
    it('should return hovred item index', function () {
      state.officerPage.timeline = {
        hoveredItemIndex: 1
      };

      getHoveredItemIndex(state).should.eql(1);
    });
  });

  describe('getSortDescending', function () {
    it('should return sortDescending', function () {
      state.officerPage.timeline = {
        sortDescending: true
      };

      getSortDescending(state).should.eql(true);
    });
  });

  describe('timelineItemsHasMoreSelector', function () {
    it('should return false if next url is null', function () {
      state.officerPage.timeline = {
        pagination: {
          next: null
        }
      };

      timelineItemsHasMoreSelector(state).should.eql(false);
    });

    it('should return false if requesting', function () {
      state.officerPage.timeline = {
        isRequesting: true,
        pagination: {
          next: null
        }
      };

      timelineItemsHasMoreSelector(state).should.eql(false);
    });

    it('should return true if not requesting and has next url', function () {
      state.officerPage.timeline = {
        isRequesting: false,
        pagination: {
          next: 'abc'
        }
      };

      timelineItemsHasMoreSelector(state).should.eql(true);
    });
  });

  describe('timelineItemsNextParamsSelector', function () {
    it('should return sortDescending', function () {
      state.officerPage.timeline = {
        isRequesting: false,
        pagination: {
          next: 'http://foo.bar?a=b'
        }
      };

      timelineItemsNextParamsSelector(state).should.eql({ a: 'b' });
    });
  });

  describe('timelineItemsSelector', function () {
    it('should return timeline items', function () {
      state.officerPage.timeline = {
        items: [
          {
            'foo_key': 'bar',
            kind: 'YEAR'
          },
          {
            kind: 'CR',
            date: '2005-11-28'
          }
        ]
      };

      timelineItemsSelector(state).should.eql([
        {
          fooKey: 'bar',
          kind: TimelineItemType.YEAR,
          date: null
        },
        {
          kind: TimelineItemType.CR,
          date: 'NOV 28, 2005'
        }
      ]);
    });
  });

  describe('sortParamsSelector', function () {
    it('should return {} if sortDescending }', function () {
      state.officerPage.timeline = {
        sortDescending: true
      };

      sortParamsSelector(state).should.eql({});
    });

    it('should return asc if not sortDescending }', function () {
      state.officerPage.timeline = {
        sortDescending: false
      };

      sortParamsSelector(state).should.eql({ sort: 'asc' });
    });
  });

  describe('minimapSelector', function () {
    const minimap = {
      minimap: [
        {
          kind: 'CR',
          year: 2005
        },
        {
          kind: 'Unit',
          year: 2005
        },
        {
          kind: 'Joined',
          year: 2000
        }
      ]
    };

    it('should return minimap sorted descending by year if sortDescending}', function () {
      state.officerPage.timeline = {
        sortDescending: true,
        minimap: minimap
      };
      minimapSelector(state).should.eql([
        {
          year: '2005',
          items: [
            {
              kind: 'CR',
              index: 1
            },
            {
              kind: 'Unit',
              index: 2
            }
          ]
        },
        {
          year: '2000',
          items: [
            {
              kind: 'Joined',
              index: 4
            }
          ]
        }
      ]);
    });

    it('should return minimap sorted ascending by year if not sortDescending}', function () {
      state.officerPage.timeline = {
        sortDescending: false,
        minimap: minimap
      };
      minimapSelector(state).should.eql([
        {
          year: '2000',
          items: [
            {
              kind: 'Joined',
              index: 0
            }
          ]
        },
        {
          year: '2005',
          items: [
            {
              kind: 'Unit',
              index: 2
            },
            {
              kind: 'CR',
              index: 3
            }
          ]
        }
      ]);
    });
  });
});
