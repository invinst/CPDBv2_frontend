import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import Carousel from 'components/common/carousel';
import CarouselWrapper from 'components/cr-page/related-complaints/carousel-wrapper';


describe('CarouselWrapper component', function () {
  let fetchSpy;
  const crid = '123456';
  const match = 'officers';
  const distance = '10mi';

  beforeEach(function () {
    fetchSpy = spy();
  });

  it('should renderable', function () {
    CarouselWrapper.should.be.renderable({
      cards: [{ crid: '123456' }],
    });
  });

  it('should call fetchRelatedComplaints when mounted', function () {
    mount(
      <CarouselWrapper
        crid={ crid }
        match={ match }
        distance={ distance }
        fetchRelatedComplaints={ fetchSpy }/>
    );
    fetchSpy.should.be.calledWith(crid, { match, distance });
  });

  it('should call fetchRelatedComplaints when receive new props', function () {
    const wrapper = shallow(<CarouselWrapper/>);

    wrapper.setProps({
      crid: crid,
      match: match,
      distance: distance,
      fetchRelatedComplaints: fetchSpy,
    });

    fetchSpy.should.be.calledWith(crid, { match, distance });
  });

  it('should call fetchRelatedComplaints when load more', function () {
    const nextParams = {
      match: 'officers',
      distance: '10mi',
      offset: 20,
      limit: 20,
    };
    const wrapper = shallow(
      <CarouselWrapper
        crid={ crid }
        nextParams={ nextParams }
        fetchRelatedComplaints={ fetchSpy }/>
    );
    fetchSpy.resetHistory();
    const carousel = wrapper.find(Carousel);
    carousel.prop('loadMore')();
    fetchSpy.should.be.calledWith(crid, nextParams);
  });
});
