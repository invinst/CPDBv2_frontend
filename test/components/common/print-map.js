import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PrintMap from 'components/common/print-map';


describe('PrintMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <PrintMap lng={ 1.1 } lat={ 1.2 } width={ 1000 } height={ 500 } className='test--print-map' />
    );
    const printMap = findRenderedDOMComponentWithClass(instance, 'test--print-map');
    printMap.src.should.containEql(
      'https://api.mapbox.com/styles/v1/mapbox/light-v9/static/url-https%3A%2F%2Fcpdbv21777.blob.core.windows.net%' +
      '2Fassets%2Fmap-marker.png(1.1,1.2)/1.1,1.2,14,0,0/1000x500@2x?access_token='
    );
    const content = findRenderedDOMComponentWithClass(instance, 'map-attribution');
    content.textContent.should.containEql('© Mapbox');
    content.textContent.should.containEql('© OpenStreetMap');
    content.textContent.should.containEql('Improve this map');
  });
});
