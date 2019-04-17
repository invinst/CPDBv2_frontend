import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import PinboardPage from 'components/pinboard-page';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import { unmountComponentSuppressError } from 'utils/test';


describe('PinboardPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description'
    };

    const graphData = {
      officers: [
        {
          fullName: 'Jerome Finnigan',
          id: 1
        },
        {
          fullName: 'Edward May',
          id: 2
        }
      ],
      coaccusedData: [
        {
          officerId1: 1,
          officerId2: 2,
          incidentDate: '1988-10-03T00:00:00Z',
          accussedCount: 1,
        }
      ],
      listEvent: [
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
      ]
    };

    instance = renderIntoDocument(<PinboardPage pinboard={ pinboard } graphData={ graphData }/>);

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
