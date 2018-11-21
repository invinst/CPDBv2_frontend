import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Row from 'components/trr-page/trr-info-section/trr-location/row';


describe('Row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render title and value correctly', function () {
    instance = renderIntoDocument(
      <Row title='location type' value='Police Facility/Veh Parking Lot'/>
    );

    findRenderedDOMComponentWithClass(instance, 'trr-location-row-title').textContent.should.eql(
      'location type'
    );
    findRenderedDOMComponentWithClass(instance, 'trr-location-row-value').textContent.should.eql(
      'Police Facility/Veh Parking Lot'
    );
  });

  it('should renderable with int value', function () {
    instance = renderIntoDocument(
      <Row title='beat' value={ 1034 } hideBorder={ true }/>
    );

    findRenderedDOMComponentWithClass(instance, 'trr-location-row-title').textContent.should.eql('beat');
    findRenderedDOMComponentWithClass(instance, 'trr-location-row-value').textContent.should.eql('1034');
  });
});
