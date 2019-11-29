import React from 'react';
import { shallow } from 'enzyme';

import OfficerInfo from 'components/landing-page/common/pairing-card/officer-info';


describe('OfficerInfo component', function () {
  const info = {
    id: '123',
    fullName: 'Jerome Finnigan',
    age: 54,
    race: 'White',
    gender: 'Male',
  };

  it('should render personal information of the officer correctly', function () {
    const wrapper = shallow(
      <OfficerInfo info={ info }/>
    );
    const officerFullName = wrapper.find('.officer-info-name');
    const officerPersonalInfo = wrapper.find('.officer-info-personal-info');
    officerPersonalInfo.text().should.equal('54-year-old White Male');
    officerFullName.text().should.equal('Jerome Finnigan');
  });
});
