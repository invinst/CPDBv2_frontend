import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  Simulate,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { browserHistory } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import DocumentsTable from 'components/documents-overview-page/documents-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';
import DocumentsOverviewPage from 'components/documents-overview-page';
import SearchBar from 'components/documents-overview-page/search-bar';
import * as constants from 'utils/constants';


describe('DocumentsOverviewPage component', function () {
  let instance;
  const store = MockStore()({
    breadcrumb: {
      breadcrumbs: [],
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ShareableHeaderContainer component with correct props', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentsOverviewPage />
      </Provider>
    );

    let shareableHeaderContainer = findRenderedComponentWithType(instance, ShareableHeaderContainer);

    shareableHeaderContainer.props.should.containEql({
      buttonType: constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK,
      buttonText: 'Crawlers',
      to: '/crawlers/',
    });
    findRenderedComponentWithType(instance, LinkHeaderButton).should.be.ok();
  });

  it('should render SearchBar component', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentsOverviewPage />
      </Provider>
    );

    findRenderedComponentWithType(instance, SearchBar).should.be.ok();
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

    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentsOverviewPage
          documents={ documents }
          fetchDocuments={ fetchDocuments }
          fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }/>
      </Provider>
    );

    let documentsTable = findRenderedComponentWithType(instance, DocumentsTable);
    documentsTable.props.should.containEql({
      rows: documents,
      fetchDocuments: fetchDocuments,
      fetchDocumentsAuthenticated: fetchDocumentsAuthenticated,
    });
  });

  it('should change url if search text is changed', function () {
    spy(browserHistory, 'push');
    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentsOverviewPage/>
      </Provider>
    );

    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = 'term';
    Simulate.change(inputElement);

    const documentsOverviewPage = findRenderedComponentWithType(instance, DocumentsOverviewPage);
    documentsOverviewPage.state.searchText.should.eql('term');

    browserHistory.push.calledWith('/documents/?match=term').should.be.true();
    browserHistory.push.restore();
  });

  it('should not change url if search text hasnt changed', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentsOverviewPage/>
      </Provider>
    );
    const documentsOverviewPage = findRenderedComponentWithType(instance, DocumentsOverviewPage);
    documentsOverviewPage.setState({ searchText: 'abc' });
    spy(browserHistory, 'push');

    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = 'abc';
    Simulate.change(inputElement);

    documentsOverviewPage.state.searchText.should.eql('abc');

    browserHistory.push.called.should.be.false();
    browserHistory.push.restore();
  });

  it('should not include match param in url when search text is empty', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <DocumentsOverviewPage/>
      </Provider>
    );
    const documentsOverviewPage = findRenderedComponentWithType(instance, DocumentsOverviewPage);
    documentsOverviewPage.setState({ searchText: 'abc' });
    spy(browserHistory, 'push');

    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    inputElement.value = '';
    Simulate.change(inputElement);

    documentsOverviewPage.state.searchText.should.eql('');

    browserHistory.push.calledWith('/documents/').should.be.true();
    browserHistory.push.restore();
  });
});
