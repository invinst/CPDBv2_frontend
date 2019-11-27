import React from 'react';
import { shallow } from 'enzyme';

import PrintMap from 'components/common/print-map';


describe('PrintMap component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <PrintMap lng={ 1.1 } lat={ 1.2 } width={ 1000 } height={ 500 } className='test--print-map' />
    );
    const printMap = wrapper.find('.test--print-map');
    printMap.prop('src').should.containEql(
      'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%' +
      '2Fassets%2Fmap-marker.png(1.1,1.2)/1.1,1.2,14,0,0/1000x500@2x?access_token='
    );
    const content = wrapper.find('.map-attribution');
    content.text().should.containEql('© Mapbox');
    content.text().should.containEql('© OpenStreetMap');
  });
});
