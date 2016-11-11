import React from 'react';
import 'should';

import LandingPage from 'components/landing-page';
import configureStore from 'redux-mock-store';
import ReportFactory from 'utils/test/factories/report';
import FAQFactory from 'utils/test/factories/faq';


const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    reportSection: {
      reports: [1, 2, 3]
    },
    faqSection: {
      faqs: [1, 2, 3]
    },
    aboutSection: {
      fields: {}
    },
    vftgSection: {
      fields: {}
    },
    collaborateSection: {
      fields: {}
    }
  },
  reports: {
    1: ReportFactory.build({ id: 1 }),
    2: ReportFactory.build({ id: 2 }),
    3: ReportFactory.build({ id: 3 })
  },
  faqs: {
    1: FAQFactory.build({ id: 1 }),
    2: FAQFactory.build({ id: 2 }),
    3: FAQFactory.build({ id: 3 })
  }
});

describe('LandingPage component', function () {
  it('should render', function () {
    LandingPage.should.be.responsiveRenderable({ store: store, requestLandingPage: () => {} });
  });
});
