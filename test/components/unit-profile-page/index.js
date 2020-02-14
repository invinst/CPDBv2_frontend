import React from 'react';
import { shallow } from 'enzyme';

import UnitProfilePage from 'components/unit-profile-page';
import Header from 'components/unit-profile-page/header';
import SummaryPageContainer from 'containers/unit-profile-page/summary-page';


describe('UnitProfilePage component', function () {
  it('should render Header and SummaryPage', function () {
    const wrapper = shallow(<UnitProfilePage />);

    wrapper.find(Header).exists().should.be.true();
    wrapper.find(SummaryPageContainer).exists().should.be.true();
  });
});
