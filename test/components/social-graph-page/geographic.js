import React from 'react';
import { stub } from 'sinon';
import {
  scryRenderedComponentsWithType,
  renderIntoDocument,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import GeographicMap from 'components/social-graph-page/geographic';
import MainTabs from 'components/social-graph-page/main-tabs';
import AllegationsMap from 'components/common/allegations-map';


describe('GeographicMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<GeographicMap/>);
    scryRenderedComponentsWithType(instance, MainTabs).should.have.length(1);
    scryRenderedComponentsWithType(instance, AllegationsMap).should.have.length(1);
  });

  it('should fetch geographic data with unitId when componentDidMount', function () {
    const requestGeographicStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        unitId='123'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'unit_id': '123' });
  });

  it('should fetch geographic data with officerIds when componentDidMount', function () {
    const requestGeographicStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        officerIds='123,456,789'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
  });

  it('should fetch geographic data with pinboardId when componentDidMount', function () {
    const requestGeographicStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        pinboardId='5cd06f2b'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'pinboard_id': '5cd06f2b' });
  });
});
