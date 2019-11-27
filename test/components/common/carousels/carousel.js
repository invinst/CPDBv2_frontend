import React from 'react';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';

import { OfficerCardFactory } from 'utils/test/factories/activity-grid';
import Carousel from 'components/common/carousel';
import OfficerCard from 'components/common/officer-card';
import Swiper from 'components/common/swiper';


describe('Carousel component', function () {
  const getChildItems = data => data.map(({ id, ...attr }) => (
    <OfficerCard key={ id } { ...attr } officerId={ id }/>
  ));
  const renderCarousel = (data, otherProps) => mount(
    <Carousel
      onNavigate={ spy() }
      childWidth={ 232 }
      style={ { width: '1000px' } }
      { ...otherProps }
    >
      { getChildItems(data) }
    </Carousel>,
  );

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

    const wrapper = renderCarousel(data);

    wrapper.find('.swiper-wrapper').exists().should.be.true();
    wrapper.prop('children').should.have.length(2);
    const items = wrapper.find(OfficerCard);
    items.should.have.length(2);
    items.at(0).text().should.containEql('Manuel Guzman');
    items.at(1).text().should.containEql('Jerome Finnagan');
    wrapper.find('.test--carousel-arrow-left').should.have.length(0);
  });

  it('should call updateSlidesPerGroup when mounted', function () {
    const data = OfficerCardFactory.buildList(10);
    const updateSlidesPerGroup = stub(Carousel.prototype, 'updateSlidesPerGroup');
    renderCarousel(data);

    updateSlidesPerGroup.should.be.called();
    updateSlidesPerGroup.restore();
  });

  it('should call updateSlidesPerGroup when updated', function () {
    const data = OfficerCardFactory.buildList(10);
    const updateSlidesPerGroup = stub(Carousel.prototype, 'updateSlidesPerGroup');
    const wrapper = renderCarousel(data);
    updateSlidesPerGroup.resetHistory();

    wrapper.setProps({ data: data, otherProps: { a: 1 } });
    updateSlidesPerGroup.should.be.called();
    updateSlidesPerGroup.restore();
  });

  it('should set arrow visibility when snap index change', function () {
    const data = OfficerCardFactory.buildList(10);
    const wrapper = renderCarousel(data);
    wrapper.setState({
      displayLeftArrow: false,
      displayRightArrow: false,
    });

    const swiper = wrapper.find(Swiper);
    swiper.prop('onSnapIndexChange')({
      isEnd: false,
      isBeginning: false,
      activeIndex: 1,
    });
    wrapper.state('displayLeftArrow').should.be.true();
    wrapper.state('displayRightArrow').should.be.true();
  });

  it('should change slideIndex when click on arrow buttons', function () {
    const data = OfficerCardFactory.buildList(10);
    const wrapper = renderCarousel(data);
    wrapper.setState({
      displayLeftArrow: true,
      displayRightArrow: true,
    });
    wrapper.instance().slidesPerGroup = 5;

    const rightArrow = wrapper.find('.test--carousel-arrow-right');
    rightArrow.simulate('click');
    wrapper.state('slideIndex').should.equal(5);
    wrapper.prop('onNavigate').should.be.calledWith('right');

    wrapper.instance().slidesPerGroup = 5;
    const leftArrow = wrapper.find('.test--carousel-arrow-left');
    leftArrow.simulate('click');
    wrapper.state('slideIndex').should.equal(0);
    wrapper.prop('onNavigate').should.be.calledWith('left');
  });

  it('should call onNavigate with correct direction when slideIndex is changed', function () {
    const data = OfficerCardFactory.buildList(5);
    const wrapper = renderCarousel(data);
    const instance = wrapper.instance();
    const swiper = wrapper.find(Swiper);

    swiper.prop('onSnapIndexChange').should.eql(instance.onSnapIndexChange);
    swiper.prop('slideNextTransitionStart').should.eql(instance.handleSlideNext);
    swiper.prop('slidePrevTransitionStart').should.eql(instance.handleSlidePrev);
    wrapper.state('slideIndex').should.equal(0);

    swiper.prop('slideNextTransitionStart')();
    wrapper.prop('onNavigate').should.be.calledWith('right');

    swiper.prop('slidePrevTransitionStart')();
    wrapper.prop('onNavigate').should.be.calledWith('left');
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

    wrapper.setState({
      slideIndex: 7,
      displayRightArrow: true,
    });
    wrapper.instance().slidesPerGroup = 5;

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
    wrapper.setState({ slideIndex: 5 });

    wrapper.setProps({ children: getChildItems(OfficerCardFactory.buildList(12)) });

    wrapper.state('slideIndex').should.equal(0);
  });

  it('should not slide back if new data is added', function () {
    const initialData = OfficerCardFactory.buildList(10);
    const wrapper = renderCarousel(initialData);
    wrapper.setState({ slideIndex: 5 });

    wrapper.setProps({ children: getChildItems(initialData.concat(OfficerCardFactory.buildList(2))) });
    wrapper.state('slideIndex').should.equal(5);
  });

  it('should slide back when receive less children', function () {
    const wrapper = renderCarousel(OfficerCardFactory.buildList(10));
    wrapper.setState({ slideIndex: 5 });

    wrapper.setProps({ children: getChildItems(OfficerCardFactory.buildList(3)) });
    wrapper.state('slideIndex').should.equal(0);
  });

  it('should not slide back when if resetPosition is false', function () {
    const wrapper = renderCarousel(OfficerCardFactory.buildList(10), { resetPosition: false });
    wrapper.setState({ slideIndex: 5 });

    wrapper.setProps({
      children: getChildItems(OfficerCardFactory.buildList(3)),
      resetPosition: false,
    });
    wrapper.state('slideIndex').should.equal(5);
  });
});
