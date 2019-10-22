import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { spy, stub } from 'sinon';

import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/common/officer-card';
import Swiper from 'components/common/swiper';


describe('Carousel component', function () {
  let instance;
  let onNavigateSpy = spy();
  const carouselComponent = (data, props) => (
    <Carousel
      onNavigate={ onNavigateSpy }
      childWidth={ 232 }
      style={ { width: '1000px' } } { ...props }
    >
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
      'gender': 'Male',
    }, {
      'id': 2,
      'fullName': 'Jerome Finnagan',
      'complaintCount': 55,
      'sustainedCount': 22,
      'birthYear': 1979,
      'complaintPercentile': 94.5,
      'race': 'White',
      'gender': 'Male',
    }];

    instance = renderIntoDocument(carouselComponent(data));

    findRenderedDOMComponentWithClass(instance, 'swiper-wrapper').should.be.ok();
    instance.props.children.should.have.length(2);
    const items = scryRenderedComponentsWithType(instance, OfficerCard);
    items.should.have.length(2);
    findDOMNode(items[0]).textContent.should.containEql('Manuel Guzman');
    findDOMNode(items[1]).textContent.should.containEql('Jerome Finnagan');
    scryRenderedDOMComponentsWithClass(instance, 'test--carousel-arrow-left').should.have.length(0);
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
    swiper.props.onSnapIndexChange({
      isEnd: false,
      isBeginning: false,
      activeIndex: 1,
    });
    instance.state.displayLeftArrow.should.be.true();
    instance.state.displayRightArrow.should.be.true();
  });

  it('should change slideIndex when click on arrow buttons', function () {
    const data = OfficerCardFactory.buildList(10);
    instance = renderIntoDocument(carouselComponent(data));
    instance.setState({
      displayLeftArrow: true,
      displayRightArrow: true,
    });

    const rightArrow = findRenderedDOMComponentWithClass(
      instance, 'test--carousel-arrow-right'
    );
    instance.slidesPerGroup = 5;
    Simulate.click(rightArrow);
    instance.state.slideIndex.should.eql(5);
    onNavigateSpy.calledWith('right').should.be.true();

    const leftArrow = findRenderedDOMComponentWithClass(
      instance, 'test--carousel-arrow-left'
    );
    instance.slidesPerGroup = 5;
    Simulate.click(leftArrow);
    instance.state.slideIndex.should.eql(0);
    onNavigateSpy.calledWith('left').should.be.true();
  });

  it('should call onNavigate with correct direction when slideIndex is changed', function () {
    const data = OfficerCardFactory.buildList(5);
    instance = renderIntoDocument(carouselComponent(data));
    const swiper = findRenderedComponentWithType(instance, Swiper);

    swiper.swiper.slideNext();
    instance.state.slideIndex.should.eql(1);
    onNavigateSpy.calledWith('right').should.be.true();

    swiper.swiper.slidePrev();
    instance.state.slideIndex.should.eql(0);
    onNavigateSpy.calledWith('left').should.be.true();
  });

  it('should call loadMore when still has more data at threshold', function () {
    const loadMoreSpy = spy();
    instance = renderIntoDocument(carouselComponent(
      OfficerCardFactory.buildList(10),
      {
        hasMore: true,
        loadMore: loadMoreSpy,
        threshold: 2,
      }
    ));
    instance.setState({
      slideIndex: 7,
      displayRightArrow: true,
    });

    const rightArrow = findRenderedDOMComponentWithClass(
      instance, 'test--carousel-arrow-right'
    );
    instance.slidesPerGroup = 1;
    Simulate.click(rightArrow);
    loadMoreSpy.called.should.be.true();
  });

  it('should call loadMore when reach end with onSnapIndexChange', function () {
    const loadMoreSpy = spy();
    instance = renderIntoDocument(carouselComponent(
      OfficerCardFactory.buildList(10),
      {
        hasMore: true,
        loadMore: loadMoreSpy,
        threshold: 2,
      }
    ));

    const swiper = findRenderedComponentWithType(instance, Swiper);
    swiper.props.onSnapIndexChange({
      isEnd: true,
      isBeginning: true,
      activeIndex: 1,
    });

    loadMoreSpy.called.should.be.true();
  });

  it('should call loadMore when reach end with onUpdate', function () {
    const loadMoreSpy = spy();
    instance = renderIntoDocument(carouselComponent(
      OfficerCardFactory.buildList(10),
      {
        hasMore: true,
        loadMore: loadMoreSpy,
        threshold: 2,
      }
    ));

    const swiper = findRenderedComponentWithType(instance, Swiper);
    swiper.props.onUpdate({ isEnd: true, isBeginning: true });

    loadMoreSpy.called.should.be.true();
  });

  it('should slide back when receive more children but new data', function () {
    instance = renderIntoDocument(carouselComponent(
      OfficerCardFactory.buildList(10)
    ));
    instance.setState({ slideIndex: 5 });

    instance = reRender(
      carouselComponent(OfficerCardFactory.buildList(12)),
      instance
    );
    instance.state.slideIndex.should.eql(0);
  });

  it('should not slide back if new data is added', function () {
    const initialData = OfficerCardFactory.buildList(10);
    instance = renderIntoDocument(carouselComponent(initialData));
    instance.setState({ slideIndex: 5 });

    instance = reRender(
      carouselComponent(initialData.concat(OfficerCardFactory.buildList(2))),
      instance
    );
    instance.state.slideIndex.should.eql(5);
  });

  it('should slide back when receive less children', function () {
    instance = renderIntoDocument(carouselComponent(
      OfficerCardFactory.buildList(10)
    ));
    instance.setState({ slideIndex: 5 });

    instance = reRender(
      carouselComponent(OfficerCardFactory.buildList(3)),
      instance
    );
    instance.state.slideIndex.should.eql(0);
  });

  it('should not slide back when if resetPosition is false', function () {
    instance = renderIntoDocument(
      carouselComponent(OfficerCardFactory.buildList(10), { resetPosition: false })
    );
    instance.setState({ slideIndex: 5 });

    instance = reRender(
      carouselComponent(OfficerCardFactory.buildList(3), { resetPosition: false }),
      instance
    );
    instance.state.slideIndex.should.eql(5);
  });
});
