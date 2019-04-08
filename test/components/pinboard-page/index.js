import React from 'react';
import { Link } from 'react-router';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import PinboardPageContainer from 'containers/pinboard-page';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
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
      graphData: {
        officers: [
          {
            'full_name': 'Jerome Finnigan',
            id: 1
          },
          {
            'full_name': 'Edward May',
            id: 2
          }
        ],
        'coaccused_data': [
          {
            'officer_id_1': 1,
            'officer_id_2': 2,
            'incident_date': '1988-10-03T00:00:00Z',
            'accussed_count': 1,
          }
        ],
        'list_event': [
          '1988-10-03 00:00:00+00:00',
          '1989-12-11 00:00:00+00:00',
          '1990-01-09 00:00:00+00:00',
          '1990-12-13 00:00:00+00:00',
          '1991-01-02 00:00:00+00:00',
          '1991-01-06 00:00:00+00:00',
          '1991-01-15 00:00:00+00:00',
          '1991-02-18 00:00:00+00:00',
          '1991-02-20 00:00:00+00:00',
          '1991-03-06 00:00:00+00:00'
        ],
      },
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

    findRenderedComponentWithType(instance, AnimatedSocialGraph);
    findRenderedDOMComponentWithClass(instance, 'pinboard-title').textContent.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').textContent.should.eql(
      'This is pinboard description'
    );
    const linkButton = findRenderedComponentWithType(instance, Link);
    linkButton.props.to.should.eql('/search/');
  });
});
