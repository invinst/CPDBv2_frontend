import React, { Component } from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { random, lorem } from 'faker';

import Carousel from 'components/common/carousel';
import { unmountComponentSuppressError } from 'utils/test';
import withCarousel from 'components/landing-page/carousel-wrapper';
import * as GATracking from 'utils/google_analytics_tracking';


describe('CarouselWrapper component', function () {
  let instance;

  const CarouselComponent = withCarousel(
    { 'abc': { CardComponent: 'div', itemWidth: 232 } },
    'abc',
  );

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render cards', function () {
    instance = renderIntoDocument(<CarouselComponent cards={ [1, 2, 3] }/>);
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--item').should.have.length(3);
  });

  it('should send ga event when navigate on carousel', function () {
    stub(GATracking, 'trackSwipeLanddingPageCarousel');
    instance = renderIntoDocument(<CarouselComponent cards={ [1, 2, 3] }/>);
    const carousel = findRenderedComponentWithType(instance, Carousel);
    carousel.props.resetPosition.should.be.false();

    carousel.props.onNavigate('left');

    GATracking.trackSwipeLanddingPageCarousel.should.be.calledWith('left', 'abc');
    GATracking.trackSwipeLanddingPageCarousel.restore();
  });

  it('should render cards with correct props', function () {
    class TestCardComponent extends Component {
      render() {
        return <div/>;
      }
    }

    const CarouselWithCustomCardComponent = withCarousel(
      { 'abc': { CardComponent: TestCardComponent, itemWidth: 232 } },
      'abc',
    );
    const addOrRemoveItemInPinboard = stub();
    const onTrackingAttachment = stub();
    const pathname = lorem.word();
    const openCardInNewPage = random.boolean();


    instance = renderIntoDocument(
      <CarouselWithCustomCardComponent
        cards={ [1, 2, 3] }
        openCardInNewPage={ openCardInNewPage }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        onTrackingAttachment={ onTrackingAttachment }
        pathname={ pathname }
      />,
    );
    const testCards = scryRenderedComponentsWithType(instance, TestCardComponent);

    testCards.should.have.length(3);
    testCards.forEach(item => {
      item.props.addOrRemoveItemInPinboard.should.be.eql(addOrRemoveItemInPinboard);
      item.props.onTrackingAttachment.should.be.eql(onTrackingAttachment);
      item.props.pathname.should.be.eql(pathname);
      item.props.openCardInNewPage.should.be.eql(openCardInNewPage);
    });
  });
});
