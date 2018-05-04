import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import YearOld from 'components/officer-page/summary-section/year-old';
import { unmountComponentSuppressError } from 'utils/test';


describe('YearOld', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable with correct information', function () {
    instance = renderIntoDocument(<YearOld birthYear={ 2000 }/>);
    const dom = findRenderedDOMComponentWithClass(instance, 'test--year-old');
    dom.textContent.should.eql('17 years old');
  });
});
