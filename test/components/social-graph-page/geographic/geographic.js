import React from 'react';
import { stub } from 'sinon';
import {
  scryRenderedComponentsWithType,
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test/index';
import GeographicMap from 'components/social-graph-page/geographic/index';
import AllegationsMap from 'components/common/allegations-map/index';
import PreviewPane from 'components/social-graph-page/geographic/preview-pane';
import CRPane from 'components/common/preview-pane/cr-pane';


describe('GeographicMap component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<GeographicMap />);
    scryRenderedComponentsWithType(instance, AllegationsMap).should.have.length(1);
  });

  it('should fetch geographic data with unit_id when componentDidMount', function () {
    const requestGeographicStub = stub();
    const requestSocialGraphGeographicPreviewPaneStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        requestSocialGraphGeographicPreviewPane={ requestSocialGraphGeographicPreviewPaneStub }
        unitId='123'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'unit_id': '123' });
    requestSocialGraphGeographicPreviewPaneStub.should.be.calledWith({ 'unit_id': '123' });
  });

  it('should fetch geographic data with officer_ids when componentDidMount', function () {
    const requestGeographicStub = stub();
    const requestSocialGraphGeographicPreviewPaneStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        requestSocialGraphGeographic={ requestGeographicStub }
        requestSocialGraphGeographicPreviewPane={ requestSocialGraphGeographicPreviewPaneStub }
        officerIds='123,456,789'
      />
    );
    requestGeographicStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
    requestSocialGraphGeographicPreviewPaneStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
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

  it('should call updateGeographicCrid when clicking outside and allegation exists', function () {
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
      <GeographicMap updateGeographicCrid={ updateGeographicCridStub } allegation={ allegation } />
    );
    const leftSection = findRenderedDOMComponentWithClass(instance, 'left-section');
    instance.handleClickOutside({ target: findDOMNode(leftSection) });
    updateGeographicCridStub.should.be.calledWith(null);
  });

  it('should call updateGeographicCrid when clicking outside and allegation exists', function () {
    const updateGeographicTrrIdStub = stub();
    const trr = {
      category: 'Firearm',
      incidentDate: '2006-10-24',
      address: '66XX S HALSTED ST, CHICAGO IL',
      to: '/trr/123456/'
    };
    instance = renderIntoDocument(
      <GeographicMap updateGeographicTrrId={ updateGeographicTrrIdStub } trr={ trr } />
    );
    const leftSection = findRenderedDOMComponentWithClass(instance, 'left-section');
    instance.handleClickOutside({ target: findDOMNode(leftSection) });
    updateGeographicTrrIdStub.should.be.calledWith(null);
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

  it('should call updateGeographicCrid when clicking on a CR marker', function () {
    const updateGeographicCridStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        updateGeographicCrid={ updateGeographicCridStub }
      />
    );
    instance.handleClickCRMarker('123456');
    updateGeographicCridStub.should.be.calledWith('123456');
  });

  it('should call updateGeographicTrrId when clicking on a TRR marker', function () {
    const updateGeographicTrrIdStub = stub();
    instance = renderIntoDocument(
      <GeographicMap
        updateGeographicTrrId={ updateGeographicTrrIdStub }
      />
    );
    instance.handleClickTRRMarker('123456');
    updateGeographicTrrIdStub.should.be.calledWith('123456');
  });

  it('should render mainTabsContent if there is mainTabsContent', function () {
    instance = renderIntoDocument(
      <GeographicMap mainTabsContent={ <div className='main-tabs-content'>This is main tabs content</div> }/>
    );
    const mainTabsContent = findRenderedDOMComponentWithClass(instance, 'main-tabs-content');
    mainTabsContent.textContent.should.eql('This is main tabs content');
  });
});
