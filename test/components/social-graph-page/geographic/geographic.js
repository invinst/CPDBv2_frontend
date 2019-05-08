import React from 'react';
import { stub } from 'sinon';
import {
  scryRenderedComponentsWithType,
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test/index';
import GeographicMap from 'components/social-graph-page/geographic/index';
import MainTabs from 'components/social-graph-page/main-tabs/index';
import AllegationsMap from 'components/common/allegations-map/index';
import PreviewPane from 'components/social-graph-page/geographic/preview-pane';
import CRPane from 'components/common/preview-pane';


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

  it('should fetch geographic data with unit_id when componentDidMount', function () {
    const requestGeographicStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        unitId='123'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'unit_id': '123' });
  });

  it('should fetch geographic data with officer_ids when componentDidMount', function () {
    const requestGeographicStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        officerIds='123,456,789'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
  });

  it('should add mousedown event when componentDidMounted', function () {
    stub(window, 'addEventListener');
    instance = renderIntoDocument(<GeographicMap/>);
    window.addEventListener.should.be.calledWith('mousedown', instance.handleClickOutside);
    window.addEventListener.restore();
  });

  it('should remove mousedown event when componentWillUnmount', function () {
    stub(window, 'removeEventListener');
    instance = renderIntoDocument(<GeographicMap/>);
    unmountComponentSuppressError(instance);
    window.removeEventListener.should.be.calledWith('mousedown', instance.handleClickOutside);
    window.removeEventListener.restore();
  });

  it('should not call updateGeographicCrid when clicking on preview-pane or markers', function () {
    const updateGeographicCridStub = stub();
    const allegation = {
      category: 'Operation/Personnel Violations',
      subCategory: 'Inadequate / Failure To Provide Service',
      incidentDate: '2006-10-24',
      address: '66XX S HALSTED ST, CHICAGO IL',
      victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
      coaccused: 2,
      to: '/complaint/123456/'
    };
    instance = renderIntoDocument(
      <GeographicMap
        updateGeographicCrid={ updateGeographicCridStub }
        allegation={ allegation }
      />
    );
    const previewPane = findRenderedComponentWithType(instance, PreviewPane);
    instance.handleClickOutside({ target: findDOMNode(previewPane) });
    updateGeographicCridStub.should.not.be.called();
  });

  it('should call updateGeographicCrid when clicking outside of preview-pane or marker', function () {
    const updateGeographicCridStub = stub();
    instance = renderIntoDocument(<GeographicMap updateGeographicCrid={ updateGeographicCridStub }/>);
    const leftSection = findRenderedDOMComponentWithClass(instance, 'left-section');
    instance.handleClickOutside({ target: findDOMNode(leftSection) });
    updateGeographicCridStub.should.be.calledWith(null);
  });

  it('should render CRPane if there is allegation', function () {
    const allegation = {
      category: 'Operation/Personnel Violations',
      subCategory: 'Inadequate / Failure To Provide Service',
      incidentDate: '2006-10-24',
      address: '66XX S HALSTED ST, CHICAGO IL',
      victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
      coaccused: 2,
      to: '/complaint/123456/'
    };
    instance = renderIntoDocument(<GeographicMap allegation={ allegation }/>);
    scryRenderedComponentsWithType(instance, CRPane).should.have.length(1);
  });

  it('should call updateGeographicCrid when clicking on a marker', function () {
    const updateGeographicCridStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        updateGeographicCrid={ updateGeographicCridStub }
      />
    );
    instance.handleClickMarker('123456');
    updateGeographicCridStub.should.be.calledWith('123456');
  });
});
