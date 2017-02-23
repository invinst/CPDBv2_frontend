import { spy } from 'sinon';
import React from 'react';
import {
  findRenderedComponentWithType, renderIntoDocument, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import InfiniteScroll from 'react-infinite-scroller';

import { unmountComponentSuppressError } from 'utils/test';
import ReportAddButton from 'components/reporting-page/report-add-button';
import ReportsMasonry from 'components/reporting-page/reports-masonry';


describe('ReportsMasonry component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should show addButton when edit mode on', function () {
    instance = renderIntoDocument(
      <ReportsMasonry editModeOn={ true }/>
    );
    findRenderedComponentWithType(instance, ReportAddButton);
  });

  it('should not show addButton when edit mode off', function () {
    instance = renderIntoDocument(
      <ReportsMasonry editModeOn={ false }/>
    );
    scryRenderedComponentsWithType(instance, ReportAddButton).length.should.eql(0);
  });

  it('should call loadMore if reportGroups doesn\'t exist', function () {
    const loadMore = spy();

    instance = renderIntoDocument(
      <ReportsMasonry
        loadMore={ loadMore }
      />
    );

    loadMore.called.should.be.true();
  });

  it('shouldn\'t call loadMore if reportGroups exists', function () {
    const loadMore = spy();

    instance = renderIntoDocument(
      <ReportsMasonry
        loadMore={ loadMore }
        reportGroups={ [{ key: 1 }] }
      />
    );

    loadMore.called.should.be.false();
  });

  it('should call loadMore when InfiniteScroll call loadMore', function () {
    const loadMore = spy();
    const nextParams = {};
    instance = renderIntoDocument(
      <ReportsMasonry
        nextParams={ nextParams }
        loadMore={ loadMore }
      />
    );
    const scroller = findRenderedComponentWithType(instance, InfiniteScroll);
    scroller.props.loadMore();
    loadMore.calledWith(nextParams).should.be.true();
  });
});
