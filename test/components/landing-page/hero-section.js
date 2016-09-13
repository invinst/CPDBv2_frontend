import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';

import HeroSection from 'components/landing-page/hero-section';
import { unmountComponentSuppressError, withMockGA } from 'utils/test';


describe('HeroSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    HeroSection.should.be.responsiveRenderable({
      complaintsText: 'complaint text', useOfForceText: 'use of force text'
    });
  });

  it('should trigger gaSpy when click on dataLink', function () {
    withMockGA((gaSpy) => {
      instance = renderIntoDocument(<HeroSection/>);
      const dataLink = findRenderedDOMComponentWithClass(instance, 'data-link');
      Simulate.click(dataLink);
      gaSpy.called.should.be.true();
    });
  });

  it('should trigger gaSpy when click on shootingDataLink', function () {
    withMockGA((gaSpy) => {
      instance = renderIntoDocument(<HeroSection/>);
      const dataLink = findRenderedDOMComponentWithClass(instance, 'shooting-data-link');
      Simulate.click(dataLink);
      gaSpy.called.should.be.true();
    });
  });
});
