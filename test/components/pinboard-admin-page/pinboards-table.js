import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { date } from 'faker';
import { spy } from 'sinon';
import moment from 'moment';
import should from 'should';
import InfiniteScroll from 'react-infinite-scroller';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardsTable from 'components/pinboard-admin-page/pinboards-table';
import PinboardRow from 'components/pinboard-admin-page/pinboard-row';
import MonthSeparator from 'components/common/table/month-separator';
import { PINBOARDS_SEARCH_ITEMS } from 'utils/constants';


describe('PinboardsTable', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

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

    instance = renderIntoDocument(
      <PinboardsTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        fetchPinboards={ fetchPinboards }
      />
    );

    const pinboardRows = scryRenderedComponentsWithType(instance, PinboardRow);
    const header = pinboardRows[0];
    header.props.isHeader.should.be.true();
    header.props.id.should.be.equal('ID');
    header.props.title.should.be.equal('Pinboard');
    header.props.pinnedCount.should.be.equal('Pinned items');
    header.props.createdAt.should.be.equal('Date');

    const infiniteScroll = findRenderedComponentWithType(instance, InfiniteScroll);
    infiniteScroll.props.initialLoad.should.be.true();
    infiniteScroll.props.hasMore.should.be.true();
    infiniteScroll.props.useWindow.should.be.true();

    infiniteScroll.props.loadMore();
    fetchPinboards.should.be.calledOnce();
    fetchPinboards.should.be.calledWith(nextParams);

    const monthSeparator = findRenderedComponentWithType(infiniteScroll, MonthSeparator);
    monthSeparator.props.text.should.equal(rows[0].text);

    const pinboardInfoRow = findRenderedComponentWithType(infiniteScroll, PinboardRow);
    should(pinboardInfoRow.props.isHeader).be.undefined();
    pinboardInfoRow.props.id.should.be.equal('abc123');
    pinboardInfoRow.props.title.should.be.equal('Untitled Pinboard');
    pinboardInfoRow.props.pinnedCount.should.be.equal('3 officers, 1 allegation and 0 TRRS');
    pinboardInfoRow.props.createdAt.should.be.equal('Oct 18');
  });
});
