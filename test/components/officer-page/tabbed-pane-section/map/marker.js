import React from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import HoverableMarker, { Marker } from 'components/officer-page/tabbed-pane-section/map/marker';


describe('Marker component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CR marker component', function () {
    instance = renderIntoDocument(
      <HoverableMarker
        id={ '123' }
        kind={ 'CR' }
        finding={ 'Sustained' }
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--marker').should.have.length(1);
    const crLink = findRenderedComponentWithType(instance, Link);
    crLink.props.to.should.eql('/complaint/123/');
  });

  it('should render TRR marker component', function () {
    instance = renderIntoDocument(
      <HoverableMarker
        id={ '456' }
        kind={ 'FORCE' }
      />
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--marker').should.have.length(1);
    const trrLink = findRenderedComponentWithType(instance, Link);
    trrLink.props.to.should.eql('/trr/456/');
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
});
