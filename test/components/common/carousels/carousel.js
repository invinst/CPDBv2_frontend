import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import { mountWithRouter } from 'utils/test';
import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/common/officer-card';
import Swiper from 'components/common/swiper';


describe('Carousel component', function () {
  const getChildItems = data => data.map(({ id, ...attr }) => (
    <OfficerCard key={ id } { ...attr } officerId={ id }/>
  ));
  const carouselComponent = (data, otherProps) => (
    <Carousel
      onNavigate={ spy() }
      childWidth={ 232 }
      style={ { width: '1000px' } }
      { ...otherProps }
    >
      { getChildItems(data) }
    </Carousel>
  );

  const renderCarousel = (data, otherProps) => mountWithRouter(carouselComponent(data, otherProps));

  it('should render appropriately if few data provided', function () {
    const data = [{
      'id': 1,
      'visualTokenBackgroundColor': '#c6d4ec',
      'fullName': 'Manuel Guzman',
      'complaintCount': 13,
      'sustainedCount': 0,
      'birthYear': 1974,
      'allegationPercentile': 84.5,
      'race': 'Hispanic',
      'gender': 'Male',
    }, {
      'id': 2,
      'fullName': 'Jerome Finnagan',
      'complaintCount': 55,
      'sustainedCount': 22,
      'birthYear': 1979,
      'allegationPercentile': 94.5,
      'race': 'White',
      'gender': 'Male',
    }];

    const wrapper = renderCarousel(data);

    wrapper.find('.swiper-wrapper').exists().should.be.true();
    wrapper.find(Carousel).prop('children').should.have.length(2);
    const items = wrapper.find(OfficerCard);
    items.should.have.length(2);
    items.at(0).text().should.containEql('Manuel Guzman');
    items.at(1).text().should.containEql('Jerome Finnagan');
    wrapper.find('.test--carousel-arrow-left').exists().should.be.false();
  });

  it('should call updateSlidesPerGroup when mounted', function () {
    const data = OfficerCardFactory.buildList(10);
    const updateSlidesPerGroup = stub(Carousel.prototype, 'updateSlidesPerGroup');
    renderCarousel(data);

    updateSlidesPerGroup.should.be.called();
  });

  it('should call updateSlidesPerGroup when updated', function () {
    const data = OfficerCardFactory.buildList(10);
    const updateSlidesPerGroup = stub(Carousel.prototype, 'updateSlidesPerGroup');
    const wrapper = shallow(carouselComponent(data));
    updateSlidesPerGroup.resetHistory();

    wrapper.setProps({ data: data, otherProps: { a: 1 } });
    updateSlidesPerGroup.should.be.called();
  });

  it('should set arrow visibility when snap index change', function () {
    const data = OfficerCardFactory.buildList(10);
    const wrapper = renderCarousel(data);
    const carousel = wrapper.find(Carousel);
    carousel.setState({
      displayLeftArrow: false,
      displayRightArrow: false,
    });

    carousel.state('displayLeftArrow').should.be.false();
    carousel.state('displayRightArrow').should.be.false();

    const swiper = wrapper.find(Swiper);
    swiper.prop('onSnapIndexChange')({
      isEnd: false,
      isBeginning: false,
      activeIndex: 1,
    });
    carousel.state('displayLeftArrow').should.be.true();
    carousel.state('displayRightArrow').should.be.true();
  });

  it('should change slideIndex when click on arrow buttons', function () {
    const data = OfficerCardFactory.buildList(10);
    const wrapper = renderCarousel(data);
    const carousel = wrapper.find(Carousel);
    carousel.setState({
      displayLeftArrow: true,
      displayRightArrow: true,
    });
    carousel.instance().slidesPerGroup = 5;

    const rightArrow = wrapper.find('.test--carousel-arrow-right');
    rightArrow.simulate('click');
    carousel.state('slideIndex').should.equal(5);
    carousel.prop('onNavigate').should.be.calledWith('right');

    carousel.instance().slidesPerGroup = 5;
    const leftArrow = wrapper.find('.test--carousel-arrow-left');
    leftArrow.simulate('click');
    carousel.state('slideIndex').should.equal(0);
    carousel.prop('onNavigate').should.be.calledWith('left');
  });

  it('should call onNavigate with correct direction when slideIndex is changed', function () {
    const data = OfficerCardFactory.buildList(5);
    const wrapper = renderCarousel(data);
    const carousel = wrapper.find(Carousel);
    const instance = carousel.instance();
    const swiper = wrapper.find(Swiper);

    swiper.prop('onSnapIndexChange').should.eql(instance.onSnapIndexChange);
    swiper.prop('slideNextTransitionStart').should.eql(instance.handleSlideNext);
    swiper.prop('slidePrevTransitionStart').should.eql(instance.handleSlidePrev);
    carousel.state('slideIndex').should.equal(0);

    swiper.prop('slideNextTransitionStart')();
    carousel.prop('onNavigate').should.be.calledWith('right');

    swiper.prop('slidePrevTransitionStart')();
    carousel.prop('onNavigate').should.be.calledWith('left');
  });

  it('should call loadMore when still has more data at threshold', function () {
    const loadMoreSpy = spy();
    const wrapper = renderCarousel(
      OfficerCardFactory.buildList(10),
      {
        hasMore: true,
        loadMore: loadMoreSpy,
        threshold: 2,
      }
    );
    const carousel = wrapper.find(Carousel);

    carousel.setState({
      slideIndex: 7,
      displayRightArrow: true,
    });
    carousel.instance().slidesPerGroup = 5;

    const rightArrow = wrapper.find('.test--carousel-arrow-right');
    rightArrow.simulate('click');
    loadMoreSpy.should.be.called();
  });

  it('should call loadMore when reach end with onSnapIndexChange', function () {
    const loadMoreSpy = spy();
    const wrapper = renderCarousel(
      OfficerCardFactory.buildList(10),
      {
        hasMore: true,
        loadMore: loadMoreSpy,
        threshold: 2,
      }
    );

    const swiper = wrapper.find(Swiper);
    swiper.prop('onSnapIndexChange')({
      isEnd: true,
      isBeginning: true,
      activeIndex: 1,
    });

    loadMoreSpy.should.be.called();
  });

  it('should call loadMore when reach end with onUpdate', function () {
    const loadMoreSpy = spy();
    const wrapper = renderCarousel(
      OfficerCardFactory.buildList(10),
      {
        hasMore: true,
        loadMore: loadMoreSpy,
        threshold: 2,
      }
    );

    const swiper = wrapper.find(Swiper);
    swiper.prop('onUpdate')({ isEnd: true, isBeginning: true });

    loadMoreSpy.should.be.called();
  });

  it('should slide back when receive more children but new data', function () {
    const wrapper = renderCarousel(OfficerCardFactory.buildList(10));
    const carousel = wrapper.find(Carousel);

    carousel.setState({ slideIndex: 5 });

    wrapper.setProps({ children: carouselComponent(getChildItems(OfficerCardFactory.buildList(12))) });

    carousel.state('slideIndex').should.equal(0);
  });

  it('should not slide back if new data is added', function () {
    const initialData = OfficerCardFactory.buildList(10);
    const wrapper = renderCarousel(initialData);
    const carousel = wrapper.find(Carousel);
    carousel.setState({ slideIndex: 5 });

    wrapper.setProps({ children: carouselComponent(initialData.concat(OfficerCardFactory.buildList(2))) });
    carousel.state('slideIndex').should.equal(5);
  });

  it('should slide back when receive less children', function () {
    const wrapper = renderCarousel(OfficerCardFactory.buildList(10));
    const carousel = wrapper.find(Carousel);
    carousel.setState({ slideIndex: 5 });

    wrapper.setProps({ children: carouselComponent(getChildItems(OfficerCardFactory.buildList(3))) });
    carousel.state('slideIndex').should.equal(0);
  });

  it('should not slide back when if resetPosition is false', function () {
    const wrapper = renderCarousel(OfficerCardFactory.buildList(10), { resetPosition: true });
    const carousel = wrapper.find(Carousel);
    carousel.setState({ slideIndex: 5 });

    wrapper.setProps({
      children: carouselComponent(getChildItems(OfficerCardFactory.buildList(3)), { resetPosition: false }),
    });
    carousel.state('slideIndex').should.equal(5);
  });
});
