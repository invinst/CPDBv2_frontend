import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate, } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import { stub } from 'sinon';
import HoverableMarker, { Marker } from 'components/officer-page/tabbed-pane-section/map/marker';


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
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--marker').should.have.length(1);
  });

  it('should toggle popup and set zIndex when hovering', function () {
    const stubMapboxMarker = {
      getPopup: stub().returns({
        isOpen: stub().returns(false)
      }),
      togglePopup: stub(),
      getElement: stub().returns({
        style: {
          zIndex: 'auto'
        }
      })
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
        isOpen: stub().returns(true)
      }),
      togglePopup: stub(),
      getElement: stub().returns({
        style: {
          zIndex: 'auto'
        }
      })
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

  it('should open CR page when clicked', function () {
    const stubOpenComplaintPage = stub();
    instance = renderIntoDocument(
      <Marker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
        hovering={ false }
        openComplaintPage={ stubOpenComplaintPage }
      />
    );
    Simulate.click(findDOMNode(instance));
    stubOpenComplaintPage.should.be.calledWith({ crid: '123' });
  });

  it('should open TRR page when clicked', function () {
    const stubOpenTRRPage = stub();
    instance = renderIntoDocument(
      <Marker
        id={ '123' }
        kind={ 'FORCE' }
        hovering={ false }
        openTRRPage={ stubOpenTRRPage }
      />
    );
    Simulate.click(findDOMNode(instance));
    stubOpenTRRPage.should.be.calledWith({ trrId: '123' });
  });
});
