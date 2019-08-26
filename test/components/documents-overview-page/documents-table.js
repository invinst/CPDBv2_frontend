import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import InfiniteScroll from 'react-infinite-scroller';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import DocumentsTable from 'components/documents-overview-page/documents-table';
import DocumentRow from 'components/documents-overview-page/document-row';
import MonthSeparator from 'components/documents-overview-page/month-separator';
import * as constants from 'utils/constants';


describe('DocumentsOverviewPage DocumentsTable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render InfiniteScroll and DocumentRow components', function () {
    const rows = [
      {
        id: 1,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      },
    ];
    instance = renderIntoDocument(
      <DocumentsTable rows={ rows } />
    );
    findRenderedComponentWithType(instance, InfiniteScroll).should.be.ok();
    findRenderedComponentWithType(instance, DocumentRow).should.be.ok();
  });

  it('should pass correct props to DocumentRow component', function () {
    const rows = [
      {
        id: 1,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      },
    ];
    const onCRLinkClick = spy();
    instance = renderWithContext(
      { editModeOn: true },
      <DocumentsTable rows={ rows } onCRLinkClick={ onCRLinkClick }/>
    );

    let row = findRenderedComponentWithType(instance, DocumentRow);
    row.props.should.containEql({
      id: 1,
      kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      onCRLinkClick: onCRLinkClick,
      editModeOn: true,
    });
  });

  it('should render MonthSeparator component if row kind is MONTH_SEPARATOR', function () {
    const rows = [
      {
        id: '01-2019',
        kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
        text: 'Jan 2019',
      },
    ];
    instance = renderIntoDocument(
      <DocumentsTable rows={ rows } />
    );

    let row = findRenderedComponentWithType(instance, MonthSeparator);
    row.props.should.containEql({
      id: '01-2019',
      kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
      text: 'Jan 2019',
    });
  });

  it('should load more on scroll to bottom', function () {
    const rows = [
      {
        id: '01-2019',
        kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
        text: 'Jan 2019',
      },
      {
        id: 1,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      },
    ];
    const nextParams = {
      limit: 1,
      offset: 1,
    };
    const fetchDocuments = stub().returns({ catch: stub() });

    instance = renderIntoDocument(
      <DocumentsTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        fetchDocuments={ fetchDocuments }/>
    );
    findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
    fetchDocuments.calledWith({ ...nextParams }).should.be.true();
  });

  it('should call fetchDocumentsAuthenticated if editModeOn is True on load more', function () {
    const rows = [
      {
        id: '01-2019',
        kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
        text: 'Jan 2019',
      },
      {
        id: 1,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      },
    ];
    const nextParams = {
      limit: 1,
      offset: 1,
    };
    const fetchDocumentsAuthenticated = stub().returns({ catch: stub() });

    instance = renderWithContext(
      { editModeOn: true },
      <DocumentsTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }/>
    );
    findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
    fetchDocumentsAuthenticated.calledWith({ ...nextParams }).should.be.true();
  });
});
