import React from 'react';

import ReportingSection from 'components/landing-page/reporting-section';
import configureStore from 'redux-mock-store';
import ReportFactory from 'utils/test/factories/report';


// TODO: will try to find a solution for store props
const mockStore = configureStore();
const store = mockStore({
  landingPage: {
    reportSection: {
      reports: [1, 2, 3]
    }
  },
  reports: {
    1: ReportFactory.build({ id: 1 }),
    2: ReportFactory.build({ id: 2 }),
    3: ReportFactory.build({ id: 3 })
  }
});

describe('ReportingSection component', function () {
  it('should render', function () {
    ReportingSection.should.be.renderable({ store: store, openBottomSheetWithReport: () => {} });
  });
});
