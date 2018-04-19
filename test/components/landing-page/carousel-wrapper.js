import React from 'react';
import {
  renderIntoDocument, scryRenderedDOMComponentsWithClass, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import Carousel from 'components/common/carousel';
import { unmountComponentSuppressError } from 'utils/test';
import withCarousel from 'components/landing-page/carousel-wrapper';


describe('CarouselWrapper component', function () {
  let instance;

  const CarouselComponent = withCarousel('div', 'abc');

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render cards', function () {
    instance = renderIntoDocument(
      <CarouselComponent cards={ [1, 2, 3] }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--item').should.have.length(3);
  });

  it('should send ga event when navigate on carousel', function () {
    stub(global, 'ga');
    instance = renderIntoDocument(
      <CarouselComponent cards={ [1, 2, 3] }/>
    );
    const carousel = findRenderedComponentWithType(instance, Carousel);
    carousel.props.onNavigate('left');
    global.ga.calledWith('send', 'event', 'landing_page_carousel', 'swipe_left', 'abc').should.be.true();
    global.ga.restore();
  });
});
