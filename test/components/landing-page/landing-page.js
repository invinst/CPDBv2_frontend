import React from 'react';
import { stub } from 'sinon';

import LandingPage from 'components/landing-page';
import configureStore from 'redux-mock-store';
import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';
import { unmountComponentSuppressError } from 'utils/test';

const mockStore = configureStore();
const store = mockStore({
  authentication: {},
  cms: {
    pages: {
    }
  },
  landingPage: {
    heatMap: {
      citySummary: {},
      communities: null
    },
    activityGrid: {
      cards: [
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
      ],
      headerEditModeOn: false
    },
    officersByAllegation: {
      cards: [
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
      ],
      headerEditModeOn: false
    },
    recentDocument: {
      cards: [
        RawDocumentCardFactory.build(),
        RawDocumentCardFactory.build()
      ],
      headerEditModeOn: false
    },
    complaintSummaries: {
      cards: [
        ComplaintSummaryFactory.build(),
        ComplaintSummaryFactory.build()
      ],
      headerEditModeOn: false
    }
  },
  breadcrumb: {
    breadcrumbs: []
  },
  headers: {
    shareableHeader: {
      scrollPosition: 'top'
    },
    slimHeader: {
      logoSectionEditModeOn: false
    }
  }
});

describe('LandingPage component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });


  it('should render', function () {
    const stubResetBreadcrumbs = stub();
    LandingPage.should.be.responsiveRenderable({
      store: store,
      resetBreadcrumbs: stubResetBreadcrumbs
    });
  });
});
