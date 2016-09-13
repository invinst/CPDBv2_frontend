import React from 'react';

import FAQSection from 'components/landing-page/faq-section';
import configureStore from 'redux-mock-store';
import FAQFactory from 'utils/test/factories/faq';
import PaginationFactory from 'utils/test/factories/pagination';


// TODO: will try to find a solution for store props
const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    faqApp: {
      faqs: PaginationFactory.build({ results: FAQFactory.buildList(3) })
    }
  }
});

describe('FAQSection component', function () {
  it('should render', function () {
    FAQSection.should.be.renderable({ store: store, openBottomSheetWithFAQ: () => {} });
  });
});
