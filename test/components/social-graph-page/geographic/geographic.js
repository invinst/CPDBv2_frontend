import { Promise } from 'es6-promise';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { stub } from 'sinon';

import { mountWithRouter } from 'utils/test';
import GeographicMap from 'components/social-graph-page/geographic/index';
import AllegationsMap from 'components/common/allegations-map/index';
import PreviewPane from 'components/social-graph-page/geographic/preview-pane';
import CRPane from 'components/common/preview-pane/panes/cr-pane';


describe('GeographicMap component', function () {
  it('should render correctly', function () {
    const legend = {
      allegationCount: 20,
      useOfForceCount: 1,
    };

    const markerGroups = {
      crs: [
        {
          point: {
            lat: 42.012567,
            lon: -87.680291,
          },
          kind: 'CR',
          finding: 'Not Sustained',
          id: '123456',
          category: 'False Arrest',
          coaccused: 2,
          victims: [{
            gender: 'male',
            race: 'White',
            age: 32,
          }],
        },
      ],
      trrs: [
        {
          point: {
            lat: 42.212567,
            lon: -87.280291,
          },
          kind: 'FORCE',
          id: '1234',
          category: 'Use of Force Report',
        },
      ],
    };

    const wrapper = shallow(<GeographicMap legend={ legend } markerGroups={ markerGroups } />);
    const instance = wrapper.instance();
    const allegationMap = wrapper.find(AllegationsMap);
    allegationMap.exists().should.be.true();

    const allegationMapProps = allegationMap.props();
    allegationMapProps.markerGroups.should.eql(markerGroups);
    allegationMapProps.legend.should.eql(legend);
    allegationMapProps.mapCustomClassName.should.equal('social-graph-map');
    allegationMapProps.handleClickCRMarker.should.equal(instance.handleClickCRMarker);
    allegationMapProps.clearAllMarkers.should.be.false();
  });

  it('should fetch geographic data pages with unit_id when componentDidMount', function (done) {
    const requestFirstPageSocialGraphGeographicCrsStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 100, limit: 50 }, request: { params: { 'unit_id': '123' } } }
    );
    const requestFirstPageSocialGraphGeographicTrrsStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 200, limit: 100 }, request: { params: { 'unit_id': '123' } } }
    );
    const requestFirstPageSocialGraphGeographicCrsPreviewPaneStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 200, limit: 150 }, request: { params: { 'unit_id': '123' } } }
    );
    const requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 250, limit: 200 }, request: { params: { 'unit_id': '123' } } }
    );
    const requestOtherPagesSocialGraphGeographicCrsStub = stub();
    const requestOtherPagesSocialGraphGeographicTrrsStub = stub();
    const requestOtherPagesSocialGraphGeographicCrsPreviewPaneStub = stub();
    const requestOtherPagesSocialGraphGeographicTrrsPreviewPaneStub = stub();

    mount(
      <GeographicMap
        requestFirstPageSocialGraphGeographicCrs={ requestFirstPageSocialGraphGeographicCrsStub }
        requestFirstPageSocialGraphGeographicTrrs={ requestFirstPageSocialGraphGeographicTrrsStub }
        requestFirstPageSocialGraphGeographicCrsPreviewPane={
          requestFirstPageSocialGraphGeographicCrsPreviewPaneStub
        }
        requestFirstPageSocialGraphGeographicTrrsPreviewPane={
          requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub
        }
        requestOtherPagesSocialGraphGeographicCrs={ requestOtherPagesSocialGraphGeographicCrsStub }
        requestOtherPagesSocialGraphGeographicTrrs={ requestOtherPagesSocialGraphGeographicTrrsStub }
        requestOtherPagesSocialGraphGeographicCrsPreviewPane={
          requestOtherPagesSocialGraphGeographicCrsPreviewPaneStub
        }
        requestOtherPagesSocialGraphGeographicTrrsPreviewPane={
          requestOtherPagesSocialGraphGeographicTrrsPreviewPaneStub
        }
        unitId='123'
      />
    );
    requestFirstPageSocialGraphGeographicCrsStub.should.be.calledWith({ 'unit_id': '123' });
    requestFirstPageSocialGraphGeographicTrrsStub.should.be.calledWith({ 'unit_id': '123' });
    requestFirstPageSocialGraphGeographicCrsPreviewPaneStub.should.be.calledWith({ 'unit_id': '123' });
    requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub.should.be.calledWith({ 'unit_id': '123' });
    setTimeout(() => {
      requestOtherPagesSocialGraphGeographicCrsStub.should.be.calledWith({ limit: 50, offset: 50, 'unit_id': '123' });
      requestOtherPagesSocialGraphGeographicTrrsStub.should.be.calledWith({
        'limit': 100,
        'offset': 100,
        'unit_id': '123',
      });
      requestOtherPagesSocialGraphGeographicCrsPreviewPaneStub.should.be.calledWith({
        'limit': 150,
        'offset': 150,
        'unit_id': '123',
      });
      requestOtherPagesSocialGraphGeographicTrrsPreviewPaneStub.should.be.calledWith({
        'limit': 200,
        'offset': 200,
        'unit_id': '123',
      });
      done();
    }, 50);
  });

  it('should fetch geographic data pages with officer_ids when componentDidMount', function () {
    const requestFirstPageSocialGraphGeographicCrsStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 50, limit: 50 } }
    );
    const requestFirstPageSocialGraphGeographicTrrsStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 100, limit: 100 } }
    );
    const requestFirstPageSocialGraphGeographicCrsPreviewPaneStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 150, limit: 150 } }
    );
    const requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 200, limit: 200 } }
    );

    mount(
      <GeographicMap
        requestFirstPageSocialGraphGeographicCrs={ requestFirstPageSocialGraphGeographicCrsStub }
        requestFirstPageSocialGraphGeographicTrrs={ requestFirstPageSocialGraphGeographicTrrsStub }
        requestFirstPageSocialGraphGeographicCrsPreviewPane={
          requestFirstPageSocialGraphGeographicCrsPreviewPaneStub
        }
        requestFirstPageSocialGraphGeographicTrrsPreviewPane={
          requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub
        }
        officerIds='123,456,789'
      />
    );
    requestFirstPageSocialGraphGeographicCrsStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
    requestFirstPageSocialGraphGeographicTrrsStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
    requestFirstPageSocialGraphGeographicCrsPreviewPaneStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
    requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub.should.be.calledWith({ 'officer_ids': '123,456,789' });
  });

  it('should fetch geographic data pages with pinboard_id when componentDidMount', function () {
    const requestFirstPageSocialGraphGeographicCrsStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 50, limit: 50 } }
    );
    const requestFirstPageSocialGraphGeographicTrrsStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 100, limit: 100 } }
    );
    const requestFirstPageSocialGraphGeographicCrsPreviewPaneStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 150, limit: 150 } }
    );
    const requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub = stub().usingPromise(Promise).resolves(
      { payload: { count: 200, limit: 200 } }
    );

    mount(
      <GeographicMap
        requestFirstPageSocialGraphGeographicCrs={ requestFirstPageSocialGraphGeographicCrsStub }
        requestFirstPageSocialGraphGeographicTrrs={ requestFirstPageSocialGraphGeographicTrrsStub }
        requestFirstPageSocialGraphGeographicCrsPreviewPane={
          requestFirstPageSocialGraphGeographicCrsPreviewPaneStub
        }
        requestFirstPageSocialGraphGeographicTrrsPreviewPane={
          requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub
        }
        pinboardId='5cd06f2b'
      />
    );
    requestFirstPageSocialGraphGeographicCrsStub.should.be.calledWith({ 'pinboard_id': '5cd06f2b' });
    requestFirstPageSocialGraphGeographicTrrsStub.should.be.calledWith({ 'pinboard_id': '5cd06f2b' });
    requestFirstPageSocialGraphGeographicCrsPreviewPaneStub.should.be.calledWith({ 'pinboard_id': '5cd06f2b' });
    requestFirstPageSocialGraphGeographicTrrsPreviewPaneStub.should.be.calledWith({ 'pinboard_id': '5cd06f2b' });
  });

  it('should add mousedown event when componentDidMounted', function () {
    stub(window, 'addEventListener');
    const wrapper = mount(<GeographicMap/>);
    window.addEventListener.should.be.calledWith('mousedown', wrapper.instance().handleClickOutside);
  });

  it('should remove mousedown event when componentWillUnmount', function () {
    stub(window, 'removeEventListener');
    const wrapper = mount(<GeographicMap/>);
    const handleClickOutside = wrapper.instance().handleClickOutside;
    wrapper.unmount();
    window.removeEventListener.should.be.calledWith('mousedown', handleClickOutside);
  });

  it('should not call updateGeographicCrid when clicking on preview-pane or markers', function () {
    const updateGeographicCridStub = stub();
    const allegation = {
      category: 'Operation/Personnel Violations',
      subCategory: 'Inadequate / Failure To Provide Service',
      incidentDate: '2006-10-24',
      address: '66XX S HALSTED ST, CHICAGO IL',
      victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
      coaccused: [2],
      to: '/complaint/123456/',
    };
    const wrapper = mountWithRouter(
      <GeographicMap
        updateGeographicCrid={ updateGeographicCridStub }
        allegation={ allegation }
      />
    );
    const previewPane = wrapper.find(PreviewPane);
    wrapper.find(GeographicMap).instance().handleClickOutside({ target: previewPane.getDOMNode() });
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
      coaccused: [2],
      to: '/complaint/123456/',
    };
    const wrapper = mountWithRouter(
      <GeographicMap updateGeographicCrid={ updateGeographicCridStub } allegation={ allegation } />
    );
    const leftSection = wrapper.find('.left-section');
    wrapper.find(GeographicMap).instance().handleClickOutside({ target: leftSection.getDOMNode() });
    updateGeographicCridStub.should.be.calledWith(null);
  });

  it('should call updateGeographicTrrId when clicking outside and TRR exists', function () {
    const updateGeographicTrrIdStub = stub();
    const trr = {
      category: 'Firearm',
      incidentDate: '2006-10-24',
      address: '66XX S HALSTED ST, CHICAGO IL',
      to: '/trr/123456/',
    };
    const wrapper = mountWithRouter(
      <GeographicMap updateGeographicTrrId={ updateGeographicTrrIdStub } trr={ trr } />
    );
    const leftSection = wrapper.find('.left-section');
    wrapper.find(GeographicMap).instance().handleClickOutside({ target: leftSection.getDOMNode() });
    updateGeographicTrrIdStub.should.be.calledWith(null);
  });

  it('should render CRPane if there is allegation', function () {
    const allegation = {
      category: 'Operation/Personnel Violations',
      subCategory: 'Inadequate / Failure To Provide Service',
      incidentDate: '2006-10-24',
      address: '66XX S HALSTED ST, CHICAGO IL',
      victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
      coaccused: [2],
      to: '/complaint/123456/',
    };
    const wrapper = mountWithRouter(<GeographicMap allegation={ allegation }/>);
    wrapper.find(CRPane).exists().should.be.true();
  });

  it('should call updateGeographicCrid when clicking on a CR marker', function () {
    const updateGeographicCridStub = stub();
    const wrapper = shallow(
      <GeographicMap
        updateGeographicCrid={ updateGeographicCridStub }
      />
    );
    wrapper.instance().handleClickCRMarker('123456');
    updateGeographicCridStub.should.be.calledWith('123456');
  });

  it('should call updateGeographicTrrId when clicking on a TRR marker', function () {
    const updateGeographicTrrIdStub = stub();
    const wrapper = shallow(
      <GeographicMap
        updateGeographicTrrId={ updateGeographicTrrIdStub }
      />
    );
    wrapper.instance().handleClickTRRMarker('123456');
    updateGeographicTrrIdStub.should.be.calledWith('123456');
  });

  it('should render mainTabsContent if there is mainTabsContent', function () {
    const wrapper = shallow(
      <GeographicMap mainTabsContent={ <div className='main-tabs-content'>This is main tabs content</div> }/>
    );
    const mainTabsContent = wrapper.find('.main-tabs-content');
    mainTabsContent.text().should.equal('This is main tabs content');
  });
});
