import React from 'react';
import { findRenderedComponentWithType, renderIntoDocument, } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { stub } from 'sinon';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import OfficerPage from 'components/officer-page';
import SummarySection from 'components/officer-page/summary-section';
import MetricsSection from 'components/officer-page/metrics-section';
import TabbedPaneSection from 'components/officer-page/tabbed-pane-section';
import OfficerRadarChart from 'components/officer-page/radar-chart';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      metrics: {},
      newTimeline: {},
    },
    breadcrumb: {
      breadcrumbs: []
    }
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough sections', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerId={ 1 }/>
      </Provider>
    );

    findRenderedComponentWithType(instance, SummarySection);
    findRenderedComponentWithType(instance, MetricsSection);
    findRenderedComponentWithType(instance, TabbedPaneSection);
    findRenderedComponentWithType(instance, OfficerRadarChart);
  });

  it('should not re-render when officerName and currentTab haven\'t changed', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerName='Shaun Frank' currentTab='TIMELINE'/>
      </Provider>
    );

    stub(OfficerPage.prototype, 'render');

    instance = reRender(
      <Provider store={ store }>
        <OfficerPage officerName='Shaun Frank' currentTab='TIMELINE'/>
      </Provider>,
      instance
    );

    OfficerPage.prototype.render.called.should.be.false();
    OfficerPage.prototype.render.restore();
  });

  it('should render correct document title', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerName='Shaun Frank' officerSummary={ { rank: 'Officer' } }/>
      </Provider>
    );

    let documentTitle = findRenderedComponentWithType(instance, DocumentTitle);
    documentTitle.props.title.should.eql('Officer Shaun Frank');

    instance = reRender(
      <Provider store={ store }>
        <OfficerPage officerName='Jerome Finigan' officerSummary={ { rank: 'N/A' } }/>
      </Provider>,
      instance
    );

    documentTitle = findRenderedComponentWithType(instance, DocumentTitle);
    documentTitle.props.title.should.eql('Jerome Finigan');
  });
});
