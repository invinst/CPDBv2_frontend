import React from 'react';
import { shallow } from 'enzyme';

import Row from 'components/trr-page/trr-info-section/trr-location/row';


describe('Row component', function () {
  it('should render title and value correctly', function () {
    const wrapper = shallow(
      <Row title='location type' value='Police Facility/Veh Parking Lot'/>
    );

    wrapper.find('.trr-location-row-title').text().should.eql(
      'location type'
    );
    wrapper.find('.trr-location-row-value').text().should.eql(
      'Police Facility/Veh Parking Lot'
    );
  });

  it('should renderable with int value', function () {
    const wrapper = shallow(
      <Row title='beat' value={ 1034 } hideBorder={ true }/>
    );

    wrapper.find('.trr-location-row-title').text().should.equal('beat');
    wrapper.find('.trr-location-row-value').text().should.equal('1034');
  });
});
