import React from 'react';
import { shallow, mount } from 'enzyme';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import browserHistory from 'utils/history';

import DocumentsTable from 'components/documents-overview-page/documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import DocumentsOverviewPage from 'components/documents-overview-page';
import SearchBar from 'components/common/search-bar';
import * as constants from 'utils/constants';


describe('DocumentsOverviewPage component', function () {
  const store = MockStore()({
    breadcrumb: {
      breadcrumbItems: [],
    },
  });

  it('should render ShareableHeaderContainer component with correct props', function () {
    const wrapper = shallow(
      <DocumentsOverviewPage />
    );

    const shareableHeaderContainer = wrapper.find(ShareableHeaderContainer);

    shareableHeaderContainer.props().should.containEql({
      buttonType: constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK,
      buttonText: 'Crawlers',
      to: '/crawlers/',
    });
  });

  it('should render SearchBar component', function () {
    const wrapper = shallow(
      <DocumentsOverviewPage />
    );

    wrapper.find(SearchBar).exists().should.be.true();
  });

  it('should render DocumentsTable component and pass correct props to it', function () {
    const documents = [
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
    const fetchDocuments = spy();
    const fetchDocumentsAuthenticated = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <DocumentsOverviewPage
            documents={ documents }
            fetchDocuments={ fetchDocuments }
            fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }/>
        </MemoryRouter>
      </Provider>
    );

    let documentsTable = wrapper.find(DocumentsTable);
    documentsTable.props().should.containEql({
      rows: documents,
      fetchDocuments: fetchDocuments,
      fetchDocumentsAuthenticated: fetchDocumentsAuthenticated,
    });
  });

  it('should change url if search text is changed', function () {
    spy(browserHistory, 'push');
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <DocumentsOverviewPage location={ { pathname: '/documents/' } }/>
        </MemoryRouter>
      </Provider>
    );

    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: 'term' } } );

    browserHistory.push.should.be.calledWith('/documents/?match=term');
  });

  it('should not change url if search text hasnt changed', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <DocumentsOverviewPage location={ { pathname: '/documents/' } }/>
        </MemoryRouter>
      </Provider>
    );
    spy(browserHistory, 'push');

    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: 'abc' } } );
    browserHistory.push.should.be.calledOnce();
    browserHistory.push.resetHistory();

    inputElement.simulate('change', { target: { value: 'abc' } } );

    browserHistory.push.should.be.not.called();
  });

  it('should not include match param in url when search text is empty', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <DocumentsOverviewPage location={ { pathname: '/documents/' } }/>
        </MemoryRouter>
      </Provider>
    );
    spy(browserHistory, 'push');

    const inputElement = wrapper.find('input');
    inputElement.simulate('change', { target: { value: 'abc' } } );
    browserHistory.push.should.be.calledOnce();
    browserHistory.push.resetHistory();

    inputElement.simulate('change', { target: { value: '' } } );

    browserHistory.push.should.be.calledWith('/documents/');
  });
});
