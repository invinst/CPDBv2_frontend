import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import PinboardPageContainer from 'containers/pinboard-page';
import RelevantCoaccusalsContainer from 'containers/pinboard-page/relevant/relevant-coaccusals';
import RelevantDocumentsContainer from 'containers/pinboard-page/relevant/relevant-documents';
import RelevantComplaintsContainer from 'containers/pinboard-page/relevant/relevant-complaints';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import { unmountComponentSuppressError } from 'utils/test';


describe('PinboardPage component', function () {
  let instance;
  const defaultPaginationState = {
    items: [],
    count: 0,
    pagination: { next: null, previous: null }
  };
  const store = MockStore()({
    pinboard: {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'officer_ids': [1, 2],
      'crids': [],
      'trr_ids': [],
    },
    pinboardPage: {
      graphData: {},
      geographicData: [],
      currentTab: 'NETWORK',
      relevantDocuments: defaultPaginationState,
      relevantCoaccusals: defaultPaginationState,
      relevantComplaints: defaultPaginationState,
    }
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pinboard page correctly', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    findRenderedComponentWithType(instance, PinboardPaneSection);
    findRenderedDOMComponentWithClass(instance, 'pinboard-title').textContent.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').textContent.should.eql(
      'This is pinboard description'
    );

    findRenderedDOMComponentWithClass(instance, 'relevant-title').textContent.should.eql('Relevant');
    findRenderedComponentWithType(instance, RelevantCoaccusalsContainer);
    findRenderedComponentWithType(instance, RelevantDocumentsContainer);
    findRenderedComponentWithType(instance, RelevantComplaintsContainer);
  });
});
