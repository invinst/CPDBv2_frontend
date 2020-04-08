import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';

import DocumentsTable from 'components/documents-overview-page/documents-table';
import InfiniteScroll from 'react-infinite-scroller';
import { EditModeContext } from 'contexts';
import { DOCUMENTS_SEARCH_ITEMS } from 'utils/constants';


describe('DocumentsOverviewPage DocumentsTable component', function () {
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
    const infinityScroll = wrapper.find(InfiniteScroll);
    infinityScroll.exists().should.be.true();
    const documentRow = infinityScroll.childAt(0);
    documentRow.exists().should.be.true();
    documentRow.prop('title').should.equal('ABC');
  });

  context('editModeOn is false', function () {
    it('should call fetchDocuments on scroll to bottom', function () {
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
          kind: DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
        },
      ];
      const nextParams = {
        crid: 1000000,
        limit: 1,
        offset: 1,
      };
      const fetchDocuments = stub().returns({ catch: stub() });
      const fetchDocumentsAuthenticated = stub().returns({ catch: stub() });

      const wrapper = mount(
        <EditModeContext.Provider value={ { editModeOn: false } }>
          <DocumentsTable
            rows={ rows }
            nextParams={ nextParams }
            hasMore={ true }
            fetchDocuments={ fetchDocuments }
          />
        </EditModeContext.Provider>
      );
      wrapper.find(InfiniteScroll).prop('loadMore')();
      fetchDocuments.should.be.calledWith({ ...nextParams });
      fetchDocumentsAuthenticated.should.not.be.called();
    });
  });

  context('editModeOn is true', function () {
    it('should call fetchDocumentsAuthenticated on scroll to bottom', function () {
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
          kind: DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
        },
      ];
      const nextParams = {
        crid: 1000000,
        limit: 1,
        offset: 1,
      };
      const fetchDocuments = stub().returns({ catch: stub() });
      const fetchDocumentsAuthenticated = stub().returns({ catch: stub() });

      const wrapper = mount(
        <EditModeContext.Provider value={ { editModeOn: true } }>
          <DocumentsTable
            rows={ rows }
            nextParams={ nextParams }
            hasMore={ true }
            fetchDocuments={ fetchDocuments }
            fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }
          />
        </EditModeContext.Provider>
      );
      wrapper.find(InfiniteScroll).prop('loadMore')();
      fetchDocuments.should.not.be.called();
      fetchDocumentsAuthenticated.should.be.calledWith({ ...nextParams });
    });
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

    const wrapper = shallow(
      <DocumentsTable rows={ rows } />,
    );

    let row = wrapper.find(InfiniteScroll).childAt(0);
    row.props().should.containEql({
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

  context('isRequesting is true', function () {
    it('should render LoadingSpinner', function () {
      const wrapper = shallow(<DocumentsTable isRequesting={ true } rows={ {} } />);
      wrapper.find('LoadingSpinner').exists().should.be.true();
    });
  });

  context('isRequesting is false', function () {
    it('should not render LoadingSpinner', function () {
      const wrapper = shallow(<DocumentsTable isRequesting={ false } rows={ {} } />);
      wrapper.find('LoadingSpinner').exists().should.be.false();
    });
  });
});
