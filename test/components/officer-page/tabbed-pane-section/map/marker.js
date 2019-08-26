import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils';
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import HoverableMarker, { Marker } from 'components/officer-page/tabbed-pane-section/map/marker';
import styles from 'components/officer-page/tabbed-pane-section/map/marker.sass';


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

  it('should toggle popup and set zIndex when hovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(false),
      }),
      togglePopup: stub(),
      getElement: stub().returns({
        style: {
          zIndex: 'auto',
        },
      }),
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
    stubMapboxMarker.getElement().style.zIndex.should.eql('10');
  });

  it('should toggle popup and set zIndex when unhovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(true),
      }),
      togglePopup: stub(),
      getElement: stub().returns({
        style: {
          zIndex: 'auto',
        },
      }),
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
    stubMapboxMarker.getElement().style.zIndex.should.eql('0');
  });
});
