import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import DocumentsTable from 'components/document-deduplicator-page/documents-table';
import DocumentRow from 'components/document-deduplicator-page/document-row';
import InfiniteScroll from 'react-infinite-scroller';


describe('DocumentDeduplicatorPage DocumentsTable component', function () {
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
    const wrapper = shallow(
      <DocumentsTable rows={ rows }/>,
    );
    wrapper.find(InfiniteScroll).exists().should.be.true();
    wrapper.find(DocumentRow).exists().should.be.true();
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
    const fetchDocumentsByCRID = sinon.stub().returns({ catch: sinon.stub() });

    const wrapper = shallow(
      <DocumentsTable
        rows={ rows }
        nextParams={ nextParams }
        hasMore={ true }
        fetchDocumentsByCRID={ fetchDocumentsByCRID }
      />,
    );
    wrapper.find(InfiniteScroll).prop('loadMore')();
    fetchDocumentsByCRID.should.be.calledWith({ ...nextParams });
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
    const setDocumentShow = sinon.spy();

    const wrapper = shallow(
      <DocumentsTable rows={ rows } setDocumentShow={ setDocumentShow }/>,
    );

    let row = wrapper.find(DocumentRow);
    row.props().should.containEql({
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
