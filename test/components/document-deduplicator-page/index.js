import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import DocumentDeduplicatorPage from 'components/document-deduplicator-page';
import DocumentsTable from 'components/document-deduplicator-page/documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


describe('DocumentDeduplicatorPage component', function () {
  it('should render ShareableHeaderContainer component', function () {
    const wrapper = shallow(
      <DocumentDeduplicatorPage />
    );

    wrapper.find(ShareableHeaderContainer).exists().should.be.true();
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

    const wrapper = shallow(
      <DocumentDeduplicatorPage
        documents={ documents }
        setDocumentShow={ setDocumentShow }
        fetchDocumentsByCRID={ fetchDocumentsByCRID }
      />,
    );

    let documentsTable = wrapper.find(DocumentsTable);
    documentsTable.props().should.containEql({
      rows: documents,
      setDocumentShow: setDocumentShow,
      fetchDocumentsByCRID: fetchDocumentsByCRID,
    });
  });
});
