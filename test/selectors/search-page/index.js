import { stub } from 'sinon';

import { getFocusedItem, getCancelPathname } from 'selectors/search-page';
import * as searchResultsNavigation from 'selectors/search-page/search-results/navigation';
import * as searchTermsNavigation from 'selectors/search-page/search-terms/navigation';


describe('SearchPage selector', function () {
  describe('getFocusedItem', function () {
    it('should return focusedResultItemSelector when search term is hidden', function () {
      const stubFocusedResultItemSelector = stub(searchResultsNavigation, 'focusedResultItemSelector');
      const state = {
        searchPage: {
          query: 'Ke',
        },
      };
      getFocusedItem(state);
      stubFocusedResultItemSelector.calledWith(state).should.be.true();
      stubFocusedResultItemSelector.restore();
    });

    it('should return focusedResultItemSelector when search term is not hidden', function () {
      const stubFocusedSearchTermItemSelector = stub(searchTermsNavigation, 'focusedSearchTermItemSelector');
      const state = {
        searchPage: {
          query: '',
        },
      };
      getFocusedItem(state);
      stubFocusedSearchTermItemSelector.calledWith(state).should.be.true();
      stubFocusedSearchTermItemSelector.restore();
    });
  });

  describe('getCancelPathname', function () {
    it('should return the return path for the cancel button', function () {
      const state = {
        searchPage: {
          cancelPathname: '/pinboard/abc123/',
        },
      };
      getCancelPathname(state).should.equal('/pinboard/abc123/');
    });
  });
});
