import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import { random, lorem } from 'faker';

import Carousel from 'components/common/carousel';
import withCarousel from 'components/landing-page/carousel-wrapper';
import * as GATracking from 'utils/google_analytics_tracking';


describe('CarouselWrapper component', function () {
  const CarouselComponent = withCarousel(
    { 'abc': { CardComponent: 'div', itemWidth: 232 } },
    'abc',
  );

  it('should render cards', function () {
    const wrapper = shallow(<CarouselComponent cards={ [1, 2, 3] }/>);
    wrapper.find('.test--carousel--item').should.have.length(3);
  });

  it('should send ga event when navigate on carousel', function () {
    stub(GATracking, 'trackSwipeLanddingPageCarousel');
    const wrapper = shallow(<CarouselComponent cards={ [1, 2, 3] }/>);
    const carousel = wrapper.find(Carousel);
    carousel.prop('resetPosition').should.be.false();

    carousel.prop('onNavigate')('left');

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

    const wrapper = shallow(
      <CarouselWithCustomCardComponent
        cards={ [1, 2, 3] }
        openCardInNewPage={ openCardInNewPage }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        onTrackingAttachment={ onTrackingAttachment }
        pathname={ pathname }
        pinnable={ false }
      />,
    );
    const testCards = wrapper.find(TestCardComponent);

    testCards.should.have.length(3);
    testCards.forEach(item => {
      item.prop('addOrRemoveItemInPinboard').should.be.equal(addOrRemoveItemInPinboard);
      item.prop('onTrackingAttachment').should.be.equal(onTrackingAttachment);
      item.prop('pathname').should.be.equal(pathname);
      item.prop('openCardInNewPage').should.be.equal(openCardInNewPage);
      item.prop('pinnable').should.be.false();
    });
  });
});
