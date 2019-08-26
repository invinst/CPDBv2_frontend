import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import DocumentsTable from 'components/document-deduplicator-page/documents-table';
import DocumentRow from 'components/document-deduplicator-page/document-row';
import InfiniteScroll from 'react-infinite-scroller';


describe('DocumentDeduplicatorPage DocumentsTable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render InfiniteScroll and DocumentRow components', function () {
    const rows = [
      {
        id: 1,
        title: 'ABC',
        thumbnail: 'https://example.com/pic1.jpg',
        source: 'https://www.chicagocopa.org/',
        date: 'Jan 10, 2019',
        viewsCount: 1,
        downloadsCount: 1,
        show: true,
      },
    ];
    instance = renderIntoDocument(
      <DocumentsTable rows={ rows } />
    );
    findRenderedComponentWithType(instance, InfiniteScroll).should.be.ok();
    findRenderedComponentWithType(instance, DocumentRow).should.be.ok();
  });

  it('should load more on scroll to bottom', function () {
    const rows = [
      {
        id: 1,
        title: 'ABC',
        thumbnail: 'https://example.com/pic1.jpg',
        source: 'https://www.chicagocopa.org/',
        date: 'Jan 10, 2019',
        viewsCount: 1,
        downloadsCount: 1,
        show: true,
      },
    ];
    const nextParams = {
      crid: 1000000,
      limit: 1,
      offset: 1,
    };
    const fetchDocumentsByCRID = stub().returns({ catch: stub() });

    instance = renderIntoDocument(
      <DocumentsTable
        rows={ rows }
        nextParams={ nextParams }
        hasMore={ true }
        fetchDocumentsByCRID={ fetchDocumentsByCRID }
      />
    );
    findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
    fetchDocumentsByCRID.calledWith({ ...nextParams }).should.be.true();
  });

  it('should pass correct props to DocumentRow component', function () {
    const rows = [
      {
        id: 1,
        title: 'ABC',
        thumbnail: 'https://example.com/pic1.jpg',
        source: 'https://www.chicagocopa.org/',
        date: 'Jan 10, 2019',
        viewsCount: 1,
        downloadsCount: 1,
        show: true,
      },
    ];
    const setDocumentShow = spy();

    instance = renderIntoDocument(
      <DocumentsTable rows={ rows } setDocumentShow={ setDocumentShow } />
    );

    let row = findRenderedComponentWithType(instance, DocumentRow);
    row.props.should.containEql({
      setDocumentShow: setDocumentShow,
      id: 1,
      title: 'ABC',
      thumbnail: 'https://example.com/pic1.jpg',
      source: 'https://www.chicagocopa.org/',
      date: 'Jan 10, 2019',
      viewsCount: 1,
      downloadsCount: 1,
      show: true,
    });
  });
});
