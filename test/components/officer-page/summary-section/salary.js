import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
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
    const popup = {
      title: 'Salary',
      text: 'Some salary explanation',
    };
    instance = renderIntoDocument(
      <Salary
        salary={ 1000000 }
        popup={ popup }
        pathName='/officer/8562/jerome-finnigan/'
      />
    );

    const salaryAmount = findRenderedDOMComponentWithClass(instance, 'salary-amount');
    salaryAmount.textContent.should.eql('$1,000,000');
    const salaryPopup = findRenderedComponentWithType(instance, Popup);
    salaryPopup.props.title.should.eql('Salary');
    salaryPopup.props.text.should.eql('Some salary explanation');
    salaryPopup.props.url.should.eql('/officer/8562/jerome-finnigan/');
  });
});
