import {
  previewPaneInfoSelector,
  totalItemCountSelector,
  focusedResultItemSelector
} from 'selectors/search-page/search-results/navigation';
import { RawOfficerSuggestion } from 'utils/test/factories/suggestion';
import { MORE_BUTTON, SEARCH_BOX } from 'utils/constants';


describe('search page navigation selector', function () {
  describe('focusedResultItemSelector', function () {
    it('should return correct suggestion', function () {
      focusedResultItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(2),
            'UNIT': [],
            'CO-ACCUSED': [
              RawOfficerSuggestion.build(),
              RawOfficerSuggestion.build({
                id: '29033',
                name: 'Jerome Turbyville',
                race: 'White',
                url: 'https://example.com',
                to: '/officer/29033'
              })
            ]
          },
          navigation: {
            itemIndex: 4
          },
          searchTerms: {
            hidden: true
          }
        }
      }).should.deepEqual({
        id: '29033',
        to: '/officer/29033',
        type: 'CO-ACCUSED',
        text: 'Jerome Turbyville',
        recentText: 'Jerome Turbyville',
        uniqueKey: 'CO-ACCUSED-29033',
        url: 'https://example.com'
      });
    });

    it('should return searchbox item when there is no suggestion', function () {
      focusedResultItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 0
          },
          searchTerms: {
            hidden: true
          }
        }
      }).should.deepEqual({
        id: undefined,
        to: undefined,
        type: undefined,
        text: undefined,
        recentText: undefined,
        uniqueKey: SEARCH_BOX,
        url: undefined
      });
    });

    it('should return More correctly', function () {
      focusedResultItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(6),
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 6
          },
          searchTerms: {
            hidden: true
          }
        }
      }).should.deepEqual({
        id: 'OFFICER',
        to: undefined,
        text: undefined,
        recentText: undefined,
        type: MORE_BUTTON,
        uniqueKey: `${MORE_BUTTON}-OFFICER`,
        url: undefined,
      });
    });
  });

  describe('previewPaneInfoSelector', function () {
    it('should return correct info', function () {
      const focusedSuggestion = RawOfficerSuggestion.build({
        id: '29033',
        name: 'Jerome Turbyville',
        race: 'White',
        sex: 'Male',
        'birth_year': 1969,
        to: '/officer/29033/',
        'allegation_count': 10,
        'sustained_count': 2,
        unit: {
          id: 1,
          'unit_name': '018',
          description: 'District 018',
        },
      });
      const info = {
        data: {
          fullName: 'Jerome Turbyville',
          age: 48,
          appointedDate: 'DEC 13, 1999',
          badge: '5922',
          complaintCount: 10,
          complaintPercentile: 93,
          civilianComplimentCount: 4,
          gender: 'Male',
          lastPercentile: {
            officerId: undefined,
            year: undefined,
            items: [
              { axis: 'Use of Force Reports', value: 90 },
              { axis: 'Internal Allegations', value: 91 },
              { axis: 'Civilian Allegations', value: 92 }
            ],
            visualTokenBackground: '#f52524',
            textColor: '#DFDFDF'
          },
          race: 'White',
          rank: 'Police Officer',
          resignationDate: null,
          sustainedCount: 2,
          disciplineCount: 1,
          honorableMentionCount: 0,
          majorAwardCount: 0,
          honorableMentionPercentile: 10,
          unit: {
            id: 1,
            unitName: '018',
            description: 'District 018',
          },
          trrCount: undefined,
          trrPercentile: 90,
          to: '/officer/29033/',
        },
        type: 'OFFICER',
      };
      previewPaneInfoSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [focusedSuggestion],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 1
          }
        }
      }).should.deepEqual(info);
    });
  });

  describe('totalItemCountSelector', function () {
    it('should return total suggestions count', function () {
      totalItemCountSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(3),
            'UNIT': [],
            'CO-ACCUSED': []
          }
        }
      }).should.equal(4);
    });
  });
});
