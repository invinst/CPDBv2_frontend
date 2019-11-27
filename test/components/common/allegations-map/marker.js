import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import { browserHistory } from 'react-router';
import isMobile from 'ismobilejs';

import HoverableMarker, { Marker } from 'components/common/allegations-map/marker';
import styles from 'components/common/allegations-map/marker.sass';


describe('Marker component', function () {
  it('should render marker component', function () {
    const wrapper = mount(
      <HoverableMarker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
      />
    );
    wrapper.find(`.${styles.marker}`).exists().should.be.true();
  });

  it('should open CR page when clicked', function () {
    const stubPush = stub(browserHistory, 'push');
    const wrapper = shallow(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
      />
    );
    wrapper.simulate('click');
    stubPush.should.be.calledWith('/complaint/123/');
    stubPush.restore();
  });

  it('should open TRR page when clicked', function () {
    const stubPush = stub(browserHistory, 'push');
    const wrapper = shallow(
      <Marker
        id={ '123' }
        kind={ 'FORCE' }
        hovering={ false }
      />
    );
    wrapper.simulate('click');
    stubPush.should.be.calledWith('/trr/123/');
    stubPush.restore();
  });

  it('should not open CR page when clicked if device is tablet', function () {
    const tabletStub = stub(isMobile, 'tablet').value(true);
    const stubPush = stub(browserHistory, 'push');
    const wrapper = shallow(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
      />
    );
    wrapper.simulate('click');
    stubPush.should.not.be.called();
    stubPush.restore();
    tabletStub.restore();
  });

  it('should call handClickCRMarker if kind is CR', function () {
    const handleClickCRMarkerStub = stub();
    const handleClickTRRMarkerStub = stub();
    const wrapper = shallow(
      <Marker
        id='123'
        kind='CR'
        handleClickCRMarker={ handleClickCRMarkerStub }
        handleClickTRRMarker={ handleClickTRRMarkerStub }
      />
    );
    wrapper.simulate('click');
    handleClickCRMarkerStub.should.be.calledWith('123');
    handleClickTRRMarkerStub.should.be.calledWith(null);
  });

  it('should call handClickTRRMarker if kind is FORCE', function () {
    const handleClickCRMarkerStub = stub();
    const handleClickTRRMarkerStub = stub();
    const wrapper = shallow(
      <Marker
        id='123'
        kind='FORCE'
        handleClickCRMarker={ handleClickCRMarkerStub }
        handleClickTRRMarker={ handleClickTRRMarkerStub }
      />
    );
    wrapper.simulate('click');
    handleClickTRRMarkerStub.should.be.calledWith('123');
    handleClickCRMarkerStub.should.be.calledWith(null);
  });

  it('should toggle popup when hovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(false),
      }),
      togglePopup: stub(),
    };
    //default
    const wrapper = mount(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        mapboxMarker={ stubMapboxMarker }
      />
    );
    //hover
    wrapper.setProps({
      id: '123',
      kind: 'CR',
      finding: 'Sustained',
      hovering: true,
      mapboxMarker: stubMapboxMarker,
    });
    stubMapboxMarker.togglePopup.should.be.calledOnce();
  });

  it('should toggle popup when unhovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(true),
      }),
      togglePopup: stub(),
    };
    //default
    const wrapper = mount(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        mapboxMarker={ stubMapboxMarker }
      />
    );
    //unhover
    wrapper.setProps({
      id: '123',
      kind: 'CR',
      finding: 'Sustained',
      hovering: false,
      mapboxMarker: stubMapboxMarker,
    });
    stubMapboxMarker.togglePopup.should.be.calledOnce();
  });

  it('should not toggle popup when hovering if device is tablet', function () {
    const tabletStub = stub(isMobile, 'tablet').value(true);
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(false),
      }),
      togglePopup: stub(),
    };
    //default
    const wrapper = shallow(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        mapboxMarker={ stubMapboxMarker }
      />
    );
    //hover
    wrapper.setProps({
      id: '123',
      kind: 'CR',
      finding: 'Sustained',
      hovering: true,
      mapboxMarker: stubMapboxMarker,
    });
    stubMapboxMarker.togglePopup.should.not.be.called();
    tabletStub.restore();
  });
});
