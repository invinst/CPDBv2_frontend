import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import Salary from 'components/officer-page/summary-section/salary';
import Popup from 'components/common/popup';
import { unmountComponentSuppressError } from 'utils/test';


describe('Salary', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable even when DATA NOT READY', function () {
    Salary.should.be.renderable({ salary: 'DATA NOT READY' });
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<Salary salary={ 1000000 }/>);

    const salaryAmount = findRenderedDOMComponentWithClass(instance, 'test--salary-amount');
    salaryAmount.textContent.should.eql('$1,000,000');
    const popup = findRenderedComponentWithType(instance, Popup);
    popup.props.title.should.eql('Salary Figures');
    popup.props.text.should.eql(
      'Salary information is based on data provided by the Chicago Department of Human Resources. Salary ' +
      'data reflects base pay, but not overtime pay, which can make up a substantial amount of an officer’s pay.'
    );
    popup.props.style.should.eql({
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft: '6px',
    });
  });
});
