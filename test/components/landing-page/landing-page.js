import React from 'react';

import LandingPage from 'components/landing-page/landing-page';
import configureStore from 'redux-mock-store';
import RawStoryFactory from 'utils/test/factories/raw-story';
import FAQFactory from 'utils/test/factories/faq';
import PaginationFactory from 'utils/test/factories/pagination';


const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    storyApp: {
      stories: PaginationFactory.build({ results: [1, 2, 3].map(id => RawStoryFactory.build({ id: id })) }),
      featuredStoryId: 1
    },
    faqApp: {
      faqs: PaginationFactory.build({ results: FAQFactory.buildList(3) })
    }
  },
  faqPage: {
    faqs: PaginationFactory.build({ results: FAQFactory.buildList(5) })
  }
});

describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.renderable({ store: store });
  });
});
