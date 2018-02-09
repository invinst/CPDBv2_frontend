import { focusedSearchTermItemSelector, totalItemCountSelector } from 'selectors/search-page/search-terms/navigation';
import { SEARCH_BOX } from 'utils/constants';


describe('Search term navigation selector', function () {
  const makeStore = (focusedItemIndex=1) => ({
    searchPage: {
      searchTerms: {
        categories: [
          {
            name: 'Geography',
            items: [
              {
                id: 'community',
                name: 'Communities',
                description: 'Chicago is divided into 77 community areas.',
                'call_to_action_type': 'view_all',
                link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>'
              },
              {
                id: 'police-beats',
                name: 'Police Beat',
                description: 'Police beats are the smallest area patrolled by officers.',
                'call_to_action_type': 'view_all',
                link: 'http://beta.cpdb.co/url-mediator/session-builder?beat=<name>'
              },

            ]
          },
          {
            name: 'Complaint Categories',
            items: [
              {
                id: 'conduct-unbecoming-off-duty',
                name: 'Conduct Unbecoming (Off Duty)',
                description: 'This category (09) is made up of a wide range of non-physical misbehavior.',
                'call_to_action_type': 'link',
                link: 'http://beta.cpdb.co/url-mediator/session-builder?cat__category=Conduct+Unbecoming'
              },
              {
                id: 'criminal-misconduct',
                name: 'Criminal Misconduct',
                description: 'This group of complaints (08) is comprised of categories where a police officer',
                'call_to_action_type': 'link',
                link: 'http://beta.cpdb.co/url-mediator/session-builder?cat__category=Criminal+Misconduct'
              },
            ]
          }
        ],
        navigation: {
          itemIndex: focusedItemIndex
        },
      }
    }
  });

  const searchBoxItem = {
    id: '',
    name: '',
    description: '',
    'call_to_action_type': '',
    link: '',
    type: '',
    uniqueKey: SEARCH_BOX
  };

  describe('totalItemCountSelector', function () {
    it('should return total suggestions count', function () {
      totalItemCountSelector(makeStore()).should.equal(7);
    });
  });

  describe('focusedResultItemSelector', function () {

    it('should return searchbox item when itemIndex is 0', function () {
      focusedSearchTermItemSelector(makeStore(0)).should.deepEqual(searchBoxItem);
    });

    it('should return category item when it is focused', function () {
      focusedSearchTermItemSelector(makeStore(1)).should.deepEqual({
        id: 'Geography',
        name: 'Geography',
        description: '',
        'call_to_action_type': '',
        link: '',
        type: 'category',
        uniqueKey: 'category-Geography'
      });
    });

    it('should return correct term', function () {
      focusedSearchTermItemSelector(makeStore(2)).should.deepEqual({
        id: 'community',
        name: 'Communities',
        description: 'Chicago is divided into 77 community areas.',
        'call_to_action_type': 'view_all',
        link: 'http://beta.cpdb.co/url-mediator/session-builder?community=<name>',
        type: 'Geography',
        uniqueKey: 'Geography-community'
      });
    });

    it('should return searchBoxItem when itemIndex is out of item list range', function () {
      focusedSearchTermItemSelector(makeStore(10)).should.deepEqual(searchBoxItem);
    });
  });
});
