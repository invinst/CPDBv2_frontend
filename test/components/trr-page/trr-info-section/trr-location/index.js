import React from 'react';
import { shallow } from 'enzyme';

import TRRLocation from 'components/trr-page/trr-info-section/trr-location';
import Row from 'components/trr-page/trr-info-section/trr-location/row';
import TRRMap from 'components/trr-page/trr-info-section/trr-location/trr-map';


describe('TRRLocation component', function () {
  const trrLocation = {
    address: '22XX Damen Ave',
    incidentDate: 'APR 18, 2004',
    beat: '1034',
    locationType: 'Police Facility/Veh Parking Lot',
    point: {
      lat: 41.7508596,
      lng: -87.6533166,
    },
  };

  it('should render date and location info correctly', function () {
    const wrapper = shallow(<TRRLocation { ...trrLocation } printMode={ false }/>);

    wrapper.find('.trr-location-info').exists().should.be.true();
    const titles = wrapper.find('.info-block-title');
    titles.should.have.length(2);
    titles.at(0).text().should.equal('DATE OF INCIDENT');
    titles.at(1).text().should.equal('LOCATION');
    wrapper.find('.info-block-date').text().should.equal('APR 18, 2004');

    const rows = wrapper.find(Row);
    const locationType = rows.at(0);
    const address = rows.at(1);
    const beat = rows.at(2);

    locationType.prop('title').should.equal('location type');
    locationType.prop('value').should.equal('Police Facility/Veh Parking Lot');

    address.prop('title').should.equal('address');
    address.prop('value').should.equal('22XX Damen Ave');

    beat.prop('title').should.equal('beat');
    beat.prop('value').should.equal('1034');

    const map = wrapper.find(TRRMap);

    map.prop('lat').should.equal(41.7508596);
    map.prop('lng').should.equal(-87.6533166);
  });

  it('should show hide and rearrange contents when printing', function () {
    const wrapper = shallow(
      <TRRLocation { ...trrLocation }/>,
      { context: { printMode: true } },
    );

    wrapper.find('.location-title-print').text().should.equal('LOCATION');
    wrapper.find('.trr-location-info').exists().should.be.false();
    wrapper.find('.info-block').exists().should.be.true();
    wrapper.find('.info-block-title').prop('className').should.containEql('no-print');
  });
});
