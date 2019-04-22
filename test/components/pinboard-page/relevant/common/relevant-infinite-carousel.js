import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import Carousel from 'components/common/carousel';


describe('RelevantInfiniteCarousel component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content', function () {
    const loadMoreStub = stub();
    instance = renderIntoDocument(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
      >
        <div className='test--child-1'/>
        <div className='test--child-2'/>
      </RelevantInfiniteCarousel>
    );
    findRenderedDOMComponentWithClass(instance, 'relevant-infinite-carousel-title').textContent.should.eql(
      'RelevantInfiniteCarousel Title'
    );

    const carousel = findRenderedComponentWithType(instance, Carousel);
    carousel.props.childWidth.should.eql(128);
    carousel.props.hasMore.should.be.true();
    carousel.props.loadMore.should.eql(loadMoreStub);
    carousel.props.arrowClassName.should.eql('relevant-carousel-arrow');

    findRenderedDOMComponentWithClass(carousel, 'test--child-1');
    findRenderedDOMComponentWithClass(carousel, 'test--child-2');
  });

  it('should render nothing if there is no child', function () {
    const loadMoreStub = stub();
    instance = renderIntoDocument(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
      />
    );

    scryRenderedDOMComponentsWithTag(instance, 'div').should.have.length(0);
  });
});
