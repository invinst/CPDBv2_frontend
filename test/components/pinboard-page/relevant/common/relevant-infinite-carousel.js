import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import should from 'should';

import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import Carousel from 'components/common/carousel';
import LoadingSpinner from 'components/common/loading-spinner';


describe('RelevantInfiniteCarousel component', function () {
  it('should render enough content', function () {
    const loadMoreStub = stub();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
        requesting={ false }
      >
        <div className='test--child-1'/>
        <div className='test--child-2'/>
      </RelevantInfiniteCarousel>
    );
    wrapper.find('.relevant-infinite-carousel-title').text().should.eql(
      'RelevantInfiniteCarousel Title'
    );

    const carousel = wrapper.find(Carousel);
    carousel.prop('childWidth').should.equal(128);
    carousel.prop('hasMore').should.be.true();
    carousel.prop('loadMore').should.eql(loadMoreStub);
    carousel.prop('arrowClassName').should.equal('relevant-carousel-arrow');

    carousel.find('test--child-1');
    carousel.find('test--child-2');
  });

  it('should render nothing if there is no child', function () {
    const loadMoreStub = stub();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
        requesting={ false }
      />
    );
    should(wrapper.type()).be.null();
  });

  it('should render LoadingSpinner if there is no child and questing is true', function () {
    const loadMoreStub = stub();
    const wrapper = shallow(
      <RelevantInfiniteCarousel
        childWidth={ 128 }
        title='RelevantInfiniteCarousel Title'
        hasMore={ true }
        loadMore={ loadMoreStub }
        requesting={ true }
      />
    );

    const loadingSpinner = wrapper.find(LoadingSpinner);
    loadingSpinner.prop('className').should.containEql('relevant-carousel-loading');
    loadingSpinner.prop('fill').should.equal('white');
  });
});
