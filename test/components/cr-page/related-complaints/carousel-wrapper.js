import React from 'react';
import { spy } from 'sinon';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import Carousel from 'components/common/carousel';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import CarouselWrapper from 'components/cr-page/related-complaints/carousel-wrapper';


describe('CarouselWrapper component', function () {
  let instance;
  let fetchSpy;
  const crid = '123456';
  const match = 'officers';
  const distance = '10mi';

  beforeEach(function () {
    fetchSpy = spy();
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CarouselWrapper.should.be.renderable({
      cards: [{ crid: '123456' }]
    });
  });

  it('should call fetchRelatedComplaints when mounted', function () {
    instance = renderIntoDocument(
      <CarouselWrapper
        crid={ crid }
        match={ match }
        distance={ distance }
        fetchRelatedComplaints={ fetchSpy }/>
    );
    fetchSpy.calledWith(crid, { match, distance }).should.be.true();
  });

  it('should call fetchRelatedComplaints when receive new props', function () {
    instance = renderIntoDocument(
      <CarouselWrapper/>
    );
    instance = reRender(
      <CarouselWrapper
        crid={ crid }
        match={ match }
        distance={ distance }
        fetchRelatedComplaints={ fetchSpy }/>,
      instance
    );
    fetchSpy.calledWith(crid, { match, distance }).should.be.true();
  });

  it('should call fetchRelatedComplaints when load more', function () {
    const nextParams = {
      match: 'officers',
      distance: '10mi',
      offset: 20,
      limit: 20
    };
    instance = renderIntoDocument(
      <CarouselWrapper
        crid={ crid }
        nextParams={ nextParams }
        fetchRelatedComplaints={ fetchSpy }/>
    );
    fetchSpy.resetHistory();
    const carousel = findRenderedComponentWithType(instance, Carousel);
    carousel.props.loadMore();
    fetchSpy.calledWith(crid, nextParams).should.be.true();
  });
});
