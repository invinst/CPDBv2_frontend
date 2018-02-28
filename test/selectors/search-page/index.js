import { stub } from 'sinon';

import { getFocusedItem } from 'selectors/search-page';
import * as searchResultsNavigation from 'selectors/search-page/search-results/navigation';
import * as searchTermsNavigation from 'selectors/search-page/search-terms/navigation';

describe('getFocusedItem', function () {
  it('should return focusedResultItemSelector when search term is hidden', function () {
    const stubFocusedResultItemSelector = stub(searchResultsNavigation, 'focusedResultItemSelector');
    const state = {
      searchPage: {
        searchTerms: {
          hidden: true,
        }
      }
    };
    getFocusedItem(state);
    stubFocusedResultItemSelector.calledWith(state).should.be.true();
    stubFocusedResultItemSelector.restore();
  });

  it('should return focusedResultItemSelector when search term is not hidden', function () {
    const stubFocusedSearchTermItemSelector = stub(searchTermsNavigation, 'focusedSearchTermItemSelector');
    const state = {
      searchPage: {
        searchTerms: {
          hidden: false,
        }
      }
    };
    getFocusedItem(state);
    stubFocusedSearchTermItemSelector.calledWith(state).should.be.true();
    stubFocusedSearchTermItemSelector.restore();
  });
});
