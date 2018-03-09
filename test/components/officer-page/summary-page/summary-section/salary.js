import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import Salary from 'components/officer-page/summary-page/summary-section/salary';
import { unmountComponentSuppressError } from 'utils/test';


describe('Salary', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable even when DATA NOT READY', function () {
    Salary.should.be.renderable({ salary: 'DATA NOT READY' });
  });

  it('should render with correct USD currency format', function () {
    instance = renderIntoDocument(<Salary salary={ 1000000 }/>);

    const salaryAmount = findRenderedDOMComponentWithClass(instance, 'test--salary-amount');
    salaryAmount.textContent.should.eql('$1,000,000');
  });
});
