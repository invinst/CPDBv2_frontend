import React from 'react';
import { shallow } from 'enzyme';

import ViewMapButton from 'components/cr-page/location/view-map-button';


describe('ViewMapButton component', function () {
  it('should render view map button', function () {
    const wrapper = shallow(<ViewMapButton lng={ 1 } lat={ 1 } />);
    wrapper.find('.test--view-map-button').exists().should.be.true();
  });
});
