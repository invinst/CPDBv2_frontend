import { find } from 'lodash';

import {
  cardSelector, countSelector, nextParamsSelector, hasMoreSelector,
} from 'selectors/cr-page/related-complaints';
import { RelatedComplaintFactory } from 'utils/test/factories/complaint';

describe('related complaints selectors', function () {
  describe('cardSelector', function () {
    it('should return results match with officers', function () {
      cardSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByOfficer: {
                cards: {
                  cards: [{
                    crid: 123,
                    complainants: [{ race: 'white', 'gender': 'male', age: 43 }],
                    'category_names': ['a', 'b'],
                    'point': { lat: 1, lon: 2 },
                    coaccused: ['c', 'd'],
                    'incident_date': '2016-02-23',
                  }],
                },
              },
            },
          },
        },
        {
          match: 'officers',
        }
      ).should.eql([{
        crid: 123,
        lat: 1,
        lon: 2,
        categories: 'a, b',
        complainants: 'white male Age 43',
        accused: 'c, d',
        isPinned: false,
        incidentDate: 'Feb 23, 2016',
      }]);
    });

    it('should return results match with categories', function () {
      cardSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByCategory: {
                cards: {
                  cards: [RelatedComplaintFactory.build({ crid: 123 })],
                },
              },
            },
          },
        },
        {
          match: 'categories',
        }
      )[0].crid.should.eql(123);
    });

    it('should return results with correct isPinned', function () {
      const state = {
        pinboardPage: {
          pinboard: {
            'crids': ['1111', '3333'],
          },
        },
        crPage: {
          relatedComplaints: {
            relatedByCategory: {
              cards: {
                cards: [
                  RelatedComplaintFactory.build({ crid: '1111' }),
                  RelatedComplaintFactory.build({ crid: '2222' }),
                ],
              },
            },
            relatedByOfficer: {
              cards: {
                cards: [
                  RelatedComplaintFactory.build({ crid: '3333' }),
                  RelatedComplaintFactory.build({ crid: '4444' }),
                ],
              },
            },
          },
        },
      };
      const byCategories = cardSelector(state, { match: 'categories' });
      const byOfficers = cardSelector(state, { match: 'officers' });
      find(byCategories, { crid: '1111' }).isPinned.should.be.true();
      find(byCategories, { crid: '2222' }).isPinned.should.be.false();
      find(byOfficers, { crid: '3333' }).isPinned.should.be.true();
      find(byOfficers, { crid: '4444' }).isPinned.should.be.false();
    });
  });

  describe('countSelector', function () {
    it('should return results match with officers', function () {
      countSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByOfficer: {
                count: 123,
              },
            },
          },
        },
        {
          match: 'officers',
        }
      ).should.eql(123);
    });

    it('should return results match with categories', function () {
      countSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByCategory: {
                count: 123,
              },
            },
          },
        },
        {
          match: 'categories',
        }
      ).should.eql(123);
    });
  });

  describe('nextParamsSelector', function () {
    it('should return results match with officers', function () {
      nextParamsSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByOfficer: {
                pagination: {
                  next: 'localhost.com/?a=1',
                },
              },
            },
          },
        },
        {
          match: 'officers',
        }
      ).should.eql({
        a: '1',
      });
    });

    it('should return results match with categories', function () {
      nextParamsSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByCategory: {
                pagination: {
                  next: 'localhost.com/?a=1',
                },
              },
            },
          },
        },
        {
          match: 'categories',
        }
      ).should.eql({
        a: '1',
      });
    });
  });

  describe('hasMoreSelector', function () {
    it('should return results match with officers', function () {
      hasMoreSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByOfficer: {
                cards: {
                  cards: RelatedComplaintFactory.buildList(10),
                },
                count: 20,
              },
            },
          },
        },
        {
          match: 'officers',
        }
      ).should.be.true();
    });

    it('should return results match with categories', function () {
      hasMoreSelector(
        {
          crPage: {
            relatedComplaints: {
              relatedByCategory: {
                cards: {
                  cards: RelatedComplaintFactory.buildList(10),
                },
                count: 10,
              },
            },
          },
        },
        {
          match: 'categories',
        }
      ).should.be.false();
    });
  });
});
