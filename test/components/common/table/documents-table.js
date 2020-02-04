import React from 'react';
import { shallow, mount } from 'enzyme';
import InfiniteScroll from 'react-infinite-scroller';
import sinon from 'sinon';

import DocumentsTable from 'components/documents-overview-page/documents-table';
import DocumentRow from 'components/documents-overview-page/document-row';
import MonthSeparator from 'components/common/table/month-separator';
import * as constants from 'utils/constants';
import { EditModeContext } from 'contexts';


describe('DocumentsOverviewPage DocumentsTable component', function () {
  it('should render InfiniteScroll and DocumentRow components', function () {
    const rows = [
      {
        id: 1,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      },
    ];
    const wrapper = shallow(
      <DocumentsTable rows={ rows } />
    );
    wrapper.find(InfiniteScroll).exists().should.be.true();
    wrapper.find(DocumentRow).exists().should.be.true();
  });

  it('should pass correct props to DocumentRow component', function () {
    const rows = [
      {
        id: 1,
        kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
      },
    ];
    const onCRLinkClick = sinon.spy();
    const wrapper = mount(
      <EditModeContext.Provider value={ { editModeOn: true } }>
        <DocumentsTable rows={ rows } onCRLinkClick={ onCRLinkClick }/>
      </EditModeContext.Provider>
    );

    let row = wrapper.find(DocumentRow);
    row.props().should.containEql({
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
    const wrapper = shallow(
      <DocumentsTable rows={ rows } />
    );

    let row = wrapper.find(MonthSeparator);
    row.props().should.containEql({
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
    const fetchDocuments = sinon.stub().returns({ catch: sinon.stub() });

    const wrapper = shallow(
      <DocumentsTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        fetchDocuments={ fetchDocuments }/>
    );
    wrapper.find(InfiniteScroll).prop('loadMore')();
    fetchDocuments.should.be.calledWith({ ...nextParams });
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
    const fetchDocumentsAuthenticated = sinon.stub().returns({ catch: sinon.stub() });

    const wrapper = mount(
      <EditModeContext.Provider value={ { editModeOn: true } }>
        <DocumentsTable
          rows={ rows }
          hasMore={ true }
          nextParams={ nextParams }
          fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }
        />
      </EditModeContext.Provider>
    );
    wrapper.find(InfiniteScroll).prop('loadMore')();
    fetchDocumentsAuthenticated.should.be.calledWith({ ...nextParams });
  });
});
