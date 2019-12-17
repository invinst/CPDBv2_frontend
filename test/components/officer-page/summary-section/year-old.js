import React from 'react';
import { shallow } from 'enzyme';

import YearOld from 'components/officer-page/summary-section/year-old';
import styles from 'components/officer-page/summary-section/year-old.sass';


describe('YearOld', function () {
  it('should be renderable with correct information', function () {
    const wrapper = shallow(<YearOld birthYear={ 2000 }/>);
    const dom = wrapper.find(`.${styles.yearOld}`);
    dom.text().should.equal('17 years old');
  });
});
