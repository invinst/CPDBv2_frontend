import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerPage from 'components/officer-page';
import TimelinePage from 'components/officer-page/timeline-page';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import Header from 'components/officer-page/header';
import SocialGraphPageContainer from 'containers/officer-page/social-graph-page';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      socialGraph: {
        isRequesting: false,
        links: [],
        nodes: [],
        yearRange: [
          1984,
          2017
        ]
      },
      timeline: {
        items: [],
        sortDescending: true,
        filters: {},
        minimap: {
          pagination: {
            next: null,
            previous: null
          }
        },
        pagination: {
          next: null,
          previous: null
        }
      }
    }
  });
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render header', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerName='Jerome Finnigan' activeTab='timeline' pathname='timeline'/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, Header).should.have.length(1);
  });

  it('should render timeline page if active tab is timeline', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage activeTab='timeline'/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, TimelinePage).should.have.length(1);
  });

  it('should render summary page if active tab is summary', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage activeTab=''/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, SummaryPageContainer).should.have.length(1);
  });

  it('should render Socialgraph when path is social', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage activeTab='social'/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, Header).should.have.length(1);
    scryRenderedComponentsWithType(instance, SocialGraphPageContainer).should.have.length(1);
  });
});
