import should from 'should';

import {
  isEmptySelector, suggestionTagsSelector, searchResultGroupsSelector,
  focusedItemSelector, previewPaneInfoSelector, totalItemCountSelector,
  isShowingSingleContentTypeSelector, hasMoreSelector, nextParamsSelector
} from 'selectors/search-page';
import { getSvgUrl } from 'utils/visual-token';
import { RawOfficerSuggestion, RawCRSuggestion } from 'utils/test/factories/suggestion';
import { MORE_TYPE } from 'utils/constants';


describe('search page selector', function () {
  describe('isShowingSingleContentTypeSelector', function () {
    it('should tell if showing single type of content', function () {
      isShowingSingleContentTypeSelector({
        searchPage: {
          contentType: 'OFFICER',
          tags: []
        }
      }).should.be.true();
      isShowingSingleContentTypeSelector({
        searchPage: {
          contentType: null,
          tags: [1]
        }
      }).should.be.true();
      isShowingSingleContentTypeSelector({
        searchPage: {
          tags: []
        },
      }).should.be.false();
    });
  });

  describe('searchResultGroupsSelector', function () {
    it('should give correct item format for OFFICER', function () {
      searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [
              RawOfficerSuggestion.build({ id: '29033' }, {
                race: 'White',
                resultText: 'Jerome Turbyville',
                sex: 'Male',
                birthYear: 1969,
                to: '/officer/29033/',
                allegationCount: 10,
                sustainedCount: 2,
                unit: '018',
                visualTokenBackgroundColor: '#90b1f5'
              })
            ]
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          canLoadMore: false,
          items: [{
            type: 'OFFICER',
            id: '29033',
            text: 'Jerome Turbyville',
            to: '/officer/29033/',
            url: '',
            tags: [],
            uniqueKey: 'OFFICER-29033',
            demographicInfo: '48 year old, White, Male',
            complaintCount: 10,
            sustainedCount: 2
          }]
        }
      ]);
    });

    it('should give correct item format for CR', function () {
      searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'CR': [RawCRSuggestion.build(
              { id: '1001' },
              { crid: '1234', 'outcome': 'Sustained', resultText: 'Lorem' }
            )]
          }
        }
      }).should.deepEqual([
        {
          header: 'CR',
          canLoadMore: false,
          items: [{
            type: 'CR',
            id: '1001',
            text: 'Lorem',
            to: '',
            url: '',
            tags: [],
            uniqueKey: 'CR-1001',
            subText: 'CRID 1234, Sustained'
          }]
        }
      ]);
    });

    it('should limit items per category to 5', function () {
      const [officerGroup, coaccusedGroup] = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(10),
            'CO-ACCUSED': RawOfficerSuggestion.buildList(3)
          }
        }
      });

      officerGroup.header.should.equal('OFFICER');
      officerGroup.items.should.have.length(5);
      officerGroup.canLoadMore.should.be.true();

      coaccusedGroup.header.should.equal('CO-ACCUSED');
      coaccusedGroup.items.should.have.length(3);
      coaccusedGroup.canLoadMore.should.be.false();
    });

    it('should not limit items if a category is selected', function () {
      const [officerGroup] = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(10),
            'CO-ACCUSED': RawOfficerSuggestion.buildList(3)
          },
          contentType: 'OFFICER'
        }
      });

      officerGroup.header.should.equal('OFFICER');
      officerGroup.items.should.have.length(10);
      officerGroup.canLoadMore.should.be.false();
    });

    it('should omit empty categories', function () {
      const groups = searchResultGroupsSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'CO-ACCUSED': RawOfficerSuggestion.buildList(3)
          }
        }
      });

      groups.length.should.equal(1);
      groups[0].header.should.equal('CO-ACCUSED');
    });
  });

  describe('suggestionTagsSelector', function () {
    it('should output correct order', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY'],
          query: 'something'
        }
      }).should.deepEqual(['OFFICER', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT']);
    });

    it('should output RECENT tag if theres no query', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY'],
          query: ''
        }
      }).should.deepEqual(['RECENT']);
    });
  });

  describe('isEmptySelector', function () {
    it('should be true when all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': []
          }
        }
      }).should.be.true();
    });

    it('should be false when not all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': []
          }
        }
      }).should.be.false();
    });
  });

  describe('focusedItemSelector', function () {
    it('should return correct suggestion', function () {
      focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(2),
            'UNIT': [],
            'CO-ACCUSED': [RawOfficerSuggestion.build(), RawOfficerSuggestion.build({ id: '29033' }, {
              race: 'White',
              resultText: 'Jerome Turbyville',
              url: 'https://example.com',
              to: '/officer/29033'
            })]
          },
          navigation: {
            itemIndex: 3
          }
        }
      }).should.deepEqual({
        id: '29033',
        text: 'Jerome Turbyville',
        to: '/officer/29033',
        type: 'CO-ACCUSED',
        uniqueKey: 'CO-ACCUSED-29033',
        url: 'https://example.com',
        tags: []
      });
    });

    it('should return empty when there is no suggestion', function () {
      should(focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 0
          }
        }
      })['id']).not.be.ok();
    });

    it('should return empty when itemIndex is smaller than 0', function () {
      should(focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: -1
          }
        }
      })['id']).not.be.ok();
    });

    it('should return More correctly', function () {
      focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(6),
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 5
          }
        }
      }).should.deepEqual({
        id: 'OFFICER',
        tags: [],
        text: undefined,
        to: undefined,
        type: MORE_TYPE,
        uniqueKey: `${MORE_TYPE}-OFFICER`,
        url: undefined,
      });
    });
  });

  describe('previewPaneInfoSelector', function () {
    it('should return correct info', function () {
      const focusedSuggestion = {
        header: 'OFFICER',
        id: '12345',
        text: 'John Wang',
        payload: {
          unit: '001',
          rank: null,
          salary: '$99,999',
          race: 'White',
          sex: 'Male',
          'visual_token_background_color': '#fafafa'
        }
      };
      const info = {
        data: [
          ['unit', '001'],
          ['rank', null],
          ['2017 salary', '$99,999'],
          ['race', 'White'],
          ['sex', 'Male']
        ],
        visualTokenBackgroundColor: '#fafafa',
        visualTokenImg: getSvgUrl('12345'),
        text: 'John Wang'
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
            itemIndex: 0
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
      }).should.equal(3);
    });
  });

  describe('hasMoreSelector', function () {
    it('should return false when no content type is selected', function () {
      hasMoreSelector({
        searchPage: {
          tags: [],
          pagination: {},
          contentType: null
        }
      }).should.be.false();
    });

    it('should return false when content type is selected and there is no next url', function () {
      hasMoreSelector({
        searchPage: {
          tags: [],
          pagination: {},
          contentType: 'OFFICER'
        }
      }).should.be.false();
    });

    it('should return true when content type is selected and there is next url', function () {
      hasMoreSelector({
        searchPage: {
          tags: [],
          pagination: {
            next: 'example.com/next'
          },
          contentType: 'OFFICER'
        }
      }).should.be.true();
    });
  });

  describe('nextParamsSelector', function () {
    it('should return params from url', function () {
      nextParamsSelector({
        searchPage: {
          pagination: {
            next: 'example.com?limit=20&offset=20'
          }
        }
      }).should.deepEqual({
        limit: '20',
        offset: '20'
      });
    });
  });
});
