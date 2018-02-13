import React from 'react';
import 'should';
import { stub } from 'sinon';
import { Provider } from 'react-redux';

import LandingPage from 'components/landing-page';
import configureStore from 'redux-mock-store';
import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';
import { renderIntoDocument } from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';

const mockStore = configureStore();
const store = mockStore({
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
      ]
    },
    officersByAllegation: {
      cards: [
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
        OfficerCardFactory.build(),
      ]
    },
    recentDocument: {
      cards: [
        RawDocumentCardFactory.build(),
        RawDocumentCardFactory.build()
      ]
    },
    complaintSummaries: {
      cards: [
        ComplaintSummaryFactory.build(),
        ComplaintSummaryFactory.build()
      ]
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

  it('should reset breadcrumbs', function () {
    const stubResetBreadcrumbs = stub();

    element = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage resetBreadcrumbs={ stubResetBreadcrumbs }/>
      </Provider>
    );
    stubResetBreadcrumbs.calledOnce.should.be.true();
  });
});
