import React from 'react';
import { shallow } from 'enzyme';
import { date } from 'faker';
import { spy } from 'sinon';
import moment from 'moment';
import should from 'should';
import InfiniteScroll from 'react-infinite-scroller';

import PinboardsTable from 'components/pinboard-admin-page/pinboards-table';
import PinboardRow from 'components/pinboard-admin-page/pinboard-row';
import MonthSeparator from 'components/common/table/month-separator';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';


describe('PinboardsTable', function () {
  it('should render pinboard rows inside InfiniteScroll', function () {
    const rows = [
      {
        id: moment(date.past()).format('MM-YYYY'),
        kind: PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR,
        text: moment(date.past()).format('MMM YYYY'),
      },
      {
        id: 'abc123',
        kind: PINBOARDS_SEARCH_ITEMS.PINBOARD,
        title: 'Untitled Pinboard',
        createdAt: 'Oct 18',
        pinnedCount: '3 officers, 1 allegation and 0 TRRS',
      },
    ];
    const nextParams = { offset: 20, limit: 30 };
    const fetchPinboards = spy();

    const wrapper = shallow(
      <PinboardsTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        fetchPinboards={ fetchPinboards }
      />
    );

    const pinboardRows = wrapper.find(PinboardRow);
    const header = pinboardRows.at(0);
    header.prop('isHeader').should.be.true();
    header.prop('id').should.equal('ID');
    header.prop('title').should.equal('Pinboard');
    header.prop('pinnedCount').should.equal('Pinned items');
    header.prop('createdAt').should.equal('Date');

    const infiniteScroll = wrapper.find(InfiniteScroll);
    infiniteScroll.prop('hasMore').should.be.true();
    infiniteScroll.prop('useWindow').should.be.true();

    infiniteScroll.prop('loadMore')();
    fetchPinboards.should.be.calledOnce();
    fetchPinboards.should.be.calledWith(nextParams);

    const monthSeparator = infiniteScroll.find(MonthSeparator);
    monthSeparator.prop('text').should.equal(rows[0].text);

    const pinboardInfoRow = infiniteScroll.find(PinboardRow);
    should(pinboardInfoRow.props.isHeader).be.undefined();
    pinboardInfoRow.prop('id').should.equal('abc123');
    pinboardInfoRow.prop('title').should.equal('Untitled Pinboard');
    pinboardInfoRow.prop('pinnedCount').should.equal('3 officers, 1 allegation and 0 TRRS');
    pinboardInfoRow.prop('createdAt').should.equal('Oct 18');
  });

  it('should not load more items if it is loading', function () {
    const rows = [
      {
        id: moment(date.past()).format('MM-YYYY'),
        kind: PINBOARDS_SEARCH_ITEMS.MONTH_SEPARATOR,
        text: moment(date.past()).format('MMM YYYY'),
      },
      {
        id: 'abc123',
        kind: PINBOARDS_SEARCH_ITEMS.PINBOARD,
        title: 'Untitled Pinboard',
        createdAt: 'Oct 18',
        pinnedCount: '3 officers, 1 allegation and 0 TRRS',
      },
    ];
    const nextParams = { offset: 20, limit: 30 };
    const fetchPinboards = spy();

    const wrapper = shallow(
      <PinboardsTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        fetchPinboards={ fetchPinboards }
        isLoading={ true }
      />
    );

    const infiniteScroll = wrapper.find(InfiniteScroll);
    infiniteScroll.prop('hasMore').should.be.false();
  });
});
