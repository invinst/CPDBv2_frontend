import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerPage from 'components/officer-page';
import TimelinePage from 'components/officer-page/timeline-page';
import SummaryPageContainer from 'containers/officer-page/summary-page-container';
import Header from 'components/officer-page/header';


describe('OfficerPage component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      summary: {},
      timeline: {
        sortDescending: true,
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
        <OfficerPage officerName='Jerome Finnigan' activeTab='timeline'/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, TimelinePage).should.have.length(1);
  });

  it('should render summary page if active tab is summary', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <OfficerPage officerName='Jerome Finnigan' activeTab=''/>
      </Provider>
    );

    scryRenderedComponentsWithType(instance, SummaryPageContainer).should.have.length(1);
  });
});
