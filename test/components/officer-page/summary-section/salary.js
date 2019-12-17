import React from 'react';
import { shallow } from 'enzyme';

import Salary from 'components/officer-page/summary-section/salary';
import Popup from 'components/common/popup';


describe('Salary', function () {
  it('should be renderable even when DATA NOT READY', function () {
    Salary.should.be.renderable({ salary: 'DATA NOT READY' });
  });

  it('should render correctly', function () {
    const popup = {
      title: 'Salary',
      text: 'Some salary explanation',
    };
    const wrapper = shallow(
      <Salary
        salary={ 1000000 }
        popup={ popup }
        pathName='/officer/8562/jerome-finnigan/'
      />
    );

    const salaryAmount = wrapper.find('.salary-amount');
    salaryAmount.text().should.equal('$1,000,000');
    const salaryPopup = wrapper.find(Popup);
    salaryPopup.prop('title').should.equal('Salary');
    salaryPopup.prop('text').should.equal('Some salary explanation');
    salaryPopup.prop('url').should.equal('/officer/8562/jerome-finnigan/');
  });
});
