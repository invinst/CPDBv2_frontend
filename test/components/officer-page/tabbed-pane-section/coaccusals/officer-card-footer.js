import React from 'react';
import { shallow } from 'enzyme';

import OfficerCardFooter from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card-footer';


describe('OfficerCardFooter component', function () {
  it('should render with singular coaccusal count', function () {
    const wrapper = shallow(<OfficerCardFooter coaccusalCount={ 1 }/>);
    wrapper.text().should.equal('Coaccused in 1 case.');
  });

  it('should render with plural coaccusal count', function () {
    const wrapper = shallow(<OfficerCardFooter coaccusalCount={ 23 }/>);
    wrapper.text().should.equal('Coaccused in 23 cases.');
  });
});
