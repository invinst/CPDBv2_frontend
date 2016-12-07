import { spy } from 'sinon';
import React from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import {
  findRenderedComponentWithType, renderIntoDocument, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import ReportAddButton from 'components/reporting-page/report-add-button';
import ReportsMasonry from 'components/reporting-page/reports-masonry';


describe('ReportsMasonry component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should show addButton when edit mode on', function () {
    instance = renderWithContext(
      { editModeOn: true },
      <ReportsMasonry/>
    );
    findRenderedComponentWithType(instance, ReportAddButton);
  });

  it('should not show addButton when edit mode off', function () {
    instance = renderWithContext(
      { editModeOn: false },
      <ReportsMasonry/>
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

  it('should call loadMore when MasonryInfiniteScroller call loadMore', function () {
    const loadMore = spy();
    const nextParams = {};
    instance = renderIntoDocument(
      <ReportsMasonry
        nextParams={ nextParams }
        loadMore={ loadMore }
      />
    );
    const masonryScroller = findRenderedComponentWithType(instance, MasonryInfiniteScroller);
    masonryScroller.props.loadMore();
    loadMore.calledWith(nextParams).should.be.true();
  });
});
