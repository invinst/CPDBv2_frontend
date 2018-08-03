import React from 'react';
import { findDOMNode } from 'react-dom';
import { each } from 'lodash';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CitySummary from 'components/landing-page/heat-map/summary-panel/city-summary';


describe('CitySummary component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render most common complaints', function () {
    const mostCommonComplaints = [
      {
        name: 'failure to provide service',
        count: 3
      },
      {
        name: 'search of premise without warrant',
        count: 2
      },
      {
        name: 'excessive force',
        count: 1
      }
    ];
    const citySummary = {
      startYear: 1999,
      endYear: 2017,
      mostCommonComplaints
    };

    instance = renderIntoDocument(<CitySummary citySummary={ citySummary }/>);

    findRenderedDOMComponentWithClass(
      instance, 'test--city-summary-header'
    ).textContent.should.equal('CHICAGO 1999 - 2017');

    const element = findDOMNode(instance);
    each(mostCommonComplaints, ({ name, count }) => {
      element.textContent.should.containEql(name);
      element.textContent.should.containEql(`${ count } allegations`);
    });
  });
});
