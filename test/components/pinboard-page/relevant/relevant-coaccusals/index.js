import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantCoaccusalCard from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';


describe('RelevantCoaccusals component', function () {
  it('should render enough content correctly', function () {
    const coaccusals = [{
      id: 123,
      fullName: 'Jerome Finnigan',
      rank: 'Officer',
      coaccusalCount: 11,
    }, {
      id: 456,
      fullName: 'Jerome Turbyville',
      rank: 'Police Officer',
      coaccusalCount: 0,
    }];
    const addItemInPinboardPageStub = stub();
    const fetchPinboardRelevantCoaccusalsStub = stub();

    const wrapper = mount(
      <RelevantCoaccusals
        requesting={ false }
        addItemInPinboardPage={ addItemInPinboardPageStub }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusalsStub }
        coaccusals={ coaccusals }
        hasMore={ true }
        pinboardId='66ef1560'
        nextParams={ { limit: 20, offset: 20 } }
      />
    );

    const relevantInfiniteCarousel = wrapper.find(RelevantInfiniteCarousel);
    relevantInfiniteCarousel.prop('title').should.equal('COACCUSALS');
    relevantInfiniteCarousel.prop('childWidth').should.equal(148);
    relevantInfiniteCarousel.prop('hasMore').should.be.true();
    relevantInfiniteCarousel.prop('requesting').should.be.false();

    const relevantCoaccusalCards = relevantInfiniteCarousel.find(RelevantCoaccusalCard);
    relevantCoaccusalCards.should.have.length(2);
    relevantCoaccusalCards.at(0).prop('id').should.equal(123);
    relevantCoaccusalCards.at(0).prop('fullName').should.equal('Jerome Finnigan');
    relevantCoaccusalCards.at(0).prop('rank').should.equal('Officer');
    relevantCoaccusalCards.at(0).prop('coaccusalCount').should.equal(11);
    relevantCoaccusalCards.at(1).prop('id').should.equal(456);
    relevantCoaccusalCards.at(1).prop('fullName').should.equal('Jerome Turbyville');
    relevantCoaccusalCards.at(1).prop('rank').should.equal('Police Officer');
    relevantCoaccusalCards.at(1).prop('coaccusalCount').should.equal(0);

    relevantInfiniteCarousel.prop('loadMore')();
    fetchPinboardRelevantCoaccusalsStub.should.be.calledOnce();
    fetchPinboardRelevantCoaccusalsStub.should.be.calledWith('66ef1560', { limit: 20, offset: 20 });
  });
});
