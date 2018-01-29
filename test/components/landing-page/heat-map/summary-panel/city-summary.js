import React from 'react';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';
import { each } from 'lodash';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';


describe('CitySummary component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render most common complaints', function () {
    const mostCommonComplaints = [
      'failure to provide service',
      'search of premise without warrant',
      'excessive force'
    ];
    const citySummary = {
      mostCommonComplaints
    };

    instance = renderIntoDocument(<CitySummary citySummary={ citySummary }/>);
    const element = findDOMNode(instance);
    each(mostCommonComplaints, (complaint) => {
      element.innerHTML.should.containEql(complaint);
    });
  });

  it('should call getCitySummary when mounted', function () {
    const getCitySummary = spy();
    instance = renderIntoDocument(<CitySummary getCitySummary={ getCitySummary }/>);
    getCitySummary.called.should.be.true();
  });
});
