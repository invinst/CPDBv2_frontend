import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { spy } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import DocumentDeduplicatorPage from 'components/document-deduplicator-page';
import DocumentsTable from 'components/document-deduplicator-page/documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import * as constants from 'utils/constants';


describe('DocumentDeduplicatorPage component', function () {
  let instance;
  const store = MockStore()({
    breadcrumb: {
      breadcrumbs: [],
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ShareableHeaderContainer component with no header button', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentDeduplicatorPage />
      </Provider>
    );

    let shareableHeaderContainer = findRenderedComponentWithType(instance, ShareableHeaderContainer);
    shareableHeaderContainer.props.should.containEql({
      buttonType: constants.SHAREABLE_HEADER_BUTTON_TYPE.NONE,
    });
  });

  it('should render DocumentsTable component and pass correct props to it', function () {
    const documents = [
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
    const fetchDocumentsByCRID = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentDeduplicatorPage
          documents={ documents }
          setDocumentShow={ setDocumentShow }
          fetchDocumentsByCRID={ fetchDocumentsByCRID } />
      </Provider>
    );

    let documentsTable = findRenderedComponentWithType(instance, DocumentsTable);
    documentsTable.props.should.containEql({
      rows: documents,
      setDocumentShow: setDocumentShow,
      fetchDocumentsByCRID: fetchDocumentsByCRID,
    });
  });
});
