import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils';
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import HoverableMarker, { Marker } from 'components/common/allegations-map/marker';
import styles from 'components/common/allegations-map/marker.sass';


describe('Marker component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render marker component', function () {
    instance = renderIntoDocument(
      <HoverableMarker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
      />
    );
    scryRenderedDOMComponentsWithClass(instance, styles.marker).should.have.length(1);
  });

  it('should open CR page when clicked', function () {
    const stubPush = stub(browserHistory, 'push');
    instance = renderIntoDocument(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
      />
    );
    Simulate.click(findDOMNode(instance));
    stubPush.should.be.calledWith('/complaint/123/');
    stubPush.restore();
  });

  it('should open TRR page when clicked', function () {
    const stubPush = stub(browserHistory, 'push');
    instance = renderIntoDocument(
      <Marker
        id={ '123' }
        kind={ 'FORCE' }
        hovering={ false }
      />
    );
    Simulate.click(findDOMNode(instance));
    stubPush.should.be.calledWith('/trr/123/');
    stubPush.restore();
  });

  it('should call handClickCRMarker if kind is CR', function () {
    const handleClickCRMarkerStub = stub();
    const handleClickTRRMarkerStub = stub();
    instance = renderIntoDocument(
      <Marker
        id='123'
        kind='CR'
        handleClickCRMarker={ handleClickCRMarkerStub }
        handleClickTRRMarker={ handleClickTRRMarkerStub }
      />
    );
    Simulate.click(findDOMNode(instance));
    handleClickCRMarkerStub.should.be.calledWith('123');
    handleClickTRRMarkerStub.should.be.calledWith(null);
  });

  it('should call handClickTRRMarker if kind is FORCE', function () {
    const handleClickCRMarkerStub = stub();
    const handleClickTRRMarkerStub = stub();
    instance = renderIntoDocument(
      <Marker
        id='123'
        kind='FORCE'
        handleClickCRMarker={ handleClickCRMarkerStub }
        handleClickTRRMarker={ handleClickTRRMarkerStub }
      />
    );
    Simulate.click(findDOMNode(instance));
    handleClickTRRMarkerStub.should.be.calledWith('123');
    handleClickCRMarkerStub.should.be.calledWith(null);
  });

  it('should toggle popup when hovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(false)
      }),
      togglePopup: stub(),
    };
    //default
    instance = renderIntoDocument(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        mapboxMarker={ stubMapboxMarker }
      />
    );
    //hover
    instance = reRender(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ true }
        mapboxMarker={ stubMapboxMarker }
      />, instance
    );
    stubMapboxMarker.togglePopup.should.be.calledOnce();
  });

  it('should toggle popup when unhovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(true)
      }),
      togglePopup: stub(),
    };
    //default
    instance = renderIntoDocument(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        mapboxMarker={ stubMapboxMarker }
      />
    );
    //unhover
    instance = reRender(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        mapboxMarker={ stubMapboxMarker }
      />, instance
    );
    stubMapboxMarker.togglePopup.should.be.calledOnce();
  });
});
