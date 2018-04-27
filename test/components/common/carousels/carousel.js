import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import ReactDOM from 'react-dom';
import { spy, stub } from 'sinon';

import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import Arrow from 'components/common/carousel/arrow';
import Swiper from 'components/common/swiper';

describe('Carousel component', function () {
  let instance;
  let onNavigateSpy = spy();
  const carouselComponent = (data, props) => (
    <Carousel
      onNavigate={ onNavigateSpy }
      childWidth={ 232 }
      style={ { width: '1000px' } } { ...props }>
      { data.map(({ id, ...attr }) => (
        <OfficerCard key={ id } { ...attr } officerId={ id }/>
      )) }
    </Carousel>
  );

  beforeEach(function () {
    onNavigateSpy.resetHistory();
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render appropriately if few data provided', function () {
    const data = [{
      'id': 1,
      'visualTokenBackgroundColor': '#c6d4ec',
      'fullName': 'Manuel Guzman',
      'complaintCount': 13,
      'sustainedCount': 0,
      'birthYear': 1974,
      'complaintPercentile': 84.5,
      'race': 'Hispanic',
      'gender': 'Male'
    }, {
      'id': 2,
      'fullName': 'Jerome Finnagan',
      'complaintCount': 55,
      'sustainedCount': 22,
      'birthYear': 1979,
      'complaintPercentile': 94.5,
      'race': 'White',
      'gender': 'Male'
    }];

    instance = renderIntoDocument(carouselComponent(data));

    findRenderedDOMComponentWithClass(instance, 'swiper-wrapper').should.be.ok();
    instance.props.children.should.have.length(2);
    const items = scryRenderedComponentsWithType(instance, OfficerCard);
    items.should.have.length(2);
    ReactDOM.findDOMNode(items[0]).textContent.should.containEql('Manuel Guzman');
    ReactDOM.findDOMNode(items[1]).textContent.should.containEql('Jerome Finnagan');
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel--arrow--left').should.have.length(0);
  });

  it('should call updateSlidesPerGroup when mounted', function () {
    const data = OfficerCardFactory.buildList(10);
    const updateSlidesPerGroup = stub(Carousel.prototype, 'updateSlidesPerGroup');
    instance = renderIntoDocument(carouselComponent(data));
    updateSlidesPerGroup.called.should.be.true();
    updateSlidesPerGroup.restore();
  });

  it('should call updateSlidesPerGroup when updated', function () {
    const data = OfficerCardFactory.buildList(10);
    const updateSlidesPerGroup = stub(Carousel.prototype, 'updateSlidesPerGroup');
    instance = renderIntoDocument(carouselComponent(data));
    updateSlidesPerGroup.resetHistory();
    reRender(carouselComponent(data), instance);
    updateSlidesPerGroup.called.should.be.true();
    updateSlidesPerGroup.restore();
  });

  it('should set arrow visibility when snap index change', function () {
    const data = OfficerCardFactory.buildList(10);
    instance = renderIntoDocument(carouselComponent(data));
    instance.state.displayLeftArrow = false;
    instance.state.displayRightArrow = false;
    const swiper = findRenderedComponentWithType(instance, Swiper);
    swiper.props.onSnapIndexChange(true, true);
    instance.state.displayLeftArrow.should.be.true();
    instance.state.displayRightArrow.should.be.true();
  });

  it('should change slideIndex when click on arrow buttons', function () {
    const data = OfficerCardFactory.buildList(10);
    instance = renderIntoDocument(carouselComponent(data));
    instance.slidesPerGroup = 5;
    const arrows = scryRenderedComponentsWithType(instance, Arrow);
    arrows[1].props.onClick('right');
    instance.state.slideIndex.should.eql(5);
    onNavigateSpy.calledWith('right').should.be.true();

    instance.slidesPerGroup = 5;
    arrows[0].props.onClick('left');
    instance.state.slideIndex.should.eql(0);
    onNavigateSpy.calledWith('left').should.be.true();
  });
});
