import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantInfiniteCarousel from 'components/pinboard-page/relevant/common/relevant-infinite-carousel';
import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import RelevantCoaccusalCard from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';


describe('RelevantCoaccusals component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content correctly', function () {
    const coaccusals = [{
      id: 123,
      fullName: 'Jerome Finnigan',
      percentile: {},
      rank: 'Officer',
      coaccusalCount: 11,
    }, {
      id: 456,
      fullName: 'Jerome Turbyville',
      percentile: {},
      rank: 'Police Officer',
      coaccusalCount: 0,
    }];
    const addItemToPinboardStub = stub();
    const fetchPinboardRelevantCoaccusalsStub = stub();

    instance = renderIntoDocument(
      <RelevantCoaccusals
        addItemToPinboard={ addItemToPinboardStub }
        fetchPinboardRelevantCoaccusals={ fetchPinboardRelevantCoaccusalsStub }
        coaccusals={ coaccusals }
        hasMore={ true }
        pinboardId='66ef1560'
        nextParams={ { limit: 20, offset: 20 } }
      />
    );

    const relevantInfiniteCarousel = findRenderedComponentWithType(instance, RelevantInfiniteCarousel);
    relevantInfiniteCarousel.props.title.should.eql('COACCUSALS');
    relevantInfiniteCarousel.props.childWidth.should.eql(148);
    relevantInfiniteCarousel.props.hasMore.should.be.true();

    const relevantCoaccusalCards = scryRenderedComponentsWithType(relevantInfiniteCarousel, RelevantCoaccusalCard);
    relevantCoaccusalCards.should.have.length(2);
    relevantCoaccusalCards[0].props.addItemToPinboard.should.eql(addItemToPinboardStub);
    relevantCoaccusalCards[0].props.id.should.eql(123);
    relevantCoaccusalCards[0].props.fullName.should.eql('Jerome Finnigan');
    relevantCoaccusalCards[0].props.percentile.should.eql({});
    relevantCoaccusalCards[0].props.rank.should.eql('Officer');
    relevantCoaccusalCards[0].props.coaccusalCount.should.eql(11);
    relevantCoaccusalCards[1].props.addItemToPinboard.should.eql(addItemToPinboardStub);
    relevantCoaccusalCards[1].props.id.should.eql(456);
    relevantCoaccusalCards[1].props.fullName.should.eql('Jerome Turbyville');
    relevantCoaccusalCards[1].props.percentile.should.eql({});
    relevantCoaccusalCards[1].props.rank.should.eql('Police Officer');
    relevantCoaccusalCards[1].props.coaccusalCount.should.eql(0);

    relevantInfiniteCarousel.props.loadMore();
    fetchPinboardRelevantCoaccusalsStub.should.be.calledOnce();
    fetchPinboardRelevantCoaccusalsStub.should.be.calledWith('66ef1560', { limit: 20, offset: 20 });
  });
});
