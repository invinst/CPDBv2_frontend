import React from 'react';
import { Router, createMemoryHistory, Route } from 'react-router';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { omit, findIndex, slice } from 'lodash';

import { unmountComponentSuppressError } from 'utils/test';
import DocumentPageContainer from 'containers/document-page';
import ShareableHeader from 'components/headers/shareable-header';
import FooterContainer from 'containers/footer-container';
import SimpleListWidget from 'components/document-page/simple-list-widget';
import EditableTextBox from 'components/document-page/editable-text-box';


describe('DocumentPage component', function () {
  let instance;

  const state = {
    headers: {
      shareableHeader: {
        scrollPosition: null
      },
    },
    breadcrumb: {
      breadcrumbs: []
    },
    routing: {
      locationBeforeTransitions: {
        pathname: '/edit/document/14193',
        search: '',
        hash: '',
        action: 'POP',
        key: '7g7rqv',
        query: {}
      }
    },
    documentPage: {
      isRequesting: false,
      data: {
        'id': 14193,
        'crid': '1083633',
        'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
        'text_content': 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
        'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/5680384/pages/CRID-1083633.gif',
        'original_url': 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
        'created_at': '2019-01-09T03:11:27.441718-06:00',
        'updated_at': '2019-02-28T20:50:10.161395-06:00',
        'crawler_name': 'Chicago COPA',
        'linked_documents': [{
          'id': 14192,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5680385/pages/CRID-1083633.gif'
        }, {
          'id': 14188,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5680389/pages/CRID-1083633.gif'
        }, {
          'id': 14191,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5680386/pages/CRID-1083633.gif'
        }, {
          'id': 14189,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5680388/pages/CRID-1083633.gif'
        }, {
          'id': 14190,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5680387/pages/CRID-1083633.gif'
        }, {
          'id': 17570,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670367/pages/CRID-1083633.gif'
        }, {
          'id': 17571,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670366/pages/CRID-1083633.gif'
        }, {
          'id': 17890,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670371/pages/CRID-1083633.gif'
        }, {
          'id': 17891,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670368/pages/CRID-1083633.gif'
        }, {
          'id': 17892,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670370/pages/CRID-1083633.gif'
        }, {
          'id': 17893,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670369/pages/CRID-1083633.gif'
        }, {
          'id': 17894,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670494/pages/CRID-1083633.gif'
        }, {
          'id': 17895,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670495/pages/CRID-1083633.gif'
        }, {
          'id': 17896,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5670496/pages/CRID-1083633.gif'
        }],
        'pages': 5,
        'last_updated_by': 'John Doe',
        'views_count': 1000,
        'downloads_count': 100,
        'notifications_count': 10,
      },
      titleEditModeOn: false,
      textContentEditModeOn: false
    },
  };

  const store = MockStore()(state);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const recentDocument = () => (
      <Provider store={ store }>
        <DocumentPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );

    const header = findRenderedComponentWithType(instance, ShareableHeader);
    header.props.shouldDisplayButton.should.eql(false);

    findRenderedComponentWithType(instance, FooterContainer);
    findRenderedDOMComponentWithClass(instance, 'document-side-bar');

    const thumbnail = findRenderedDOMComponentWithClass(instance, 'document-thumbnail');
    thumbnail.href.should.eql(
      'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
    );

    const thumbnailImg = findRenderedDOMComponentWithClass(instance, 'document-thumbnail-img');
    thumbnailImg.src.should.eql('https://assets.documentcloud.org/documents/5680384/pages/CRID-1083633.gif');
    thumbnailImg.alt.should.eql('thumbnail');

    const thumbnailPageCount = findRenderedDOMComponentWithClass(instance, 'document-thumbnail-page-count');
    thumbnailPageCount.textContent.should.eql('5 pages');

    const simpleListWidget = findRenderedComponentWithType(instance, SimpleListWidget);
    simpleListWidget.props.items.should.eql([
      { name: 'CRID / UID', value: 'CR 1083633', to: '/complaint/1083633/' },
      {
        name: 'Source',
        value: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
        url: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf'
      },
      { name: 'Crawler', value: 'Chicago COPA' },
      { name: 'Date', value: 'Jan 9, 2019' },
      { name: 'Views', value: '1,000' },
      { name: 'Downloads', value: '100' },
      { name: 'Notifications', value: '10' },
    ]);

    const linkDocumentsTitle = findRenderedDOMComponentWithClass(instance, 'linked-documents-title');
    linkDocumentsTitle.textContent.should.eql('Linked Documents (14)');

    const linkDocumentsContent = findRenderedDOMComponentWithClass(instance, 'linked-documents-content');
    linkDocumentsContent.getAttribute('href').should.eql('/documents?CRID=1083633');

    const linkDisplayDocumentsThumbnails = scryRenderedDOMComponentsWithClass(instance, 'linked-documents-thumbnail');
    linkDisplayDocumentsThumbnails.should.have.length(12);

    const linkDisplayDocumentsThumbnailImgs = scryRenderedDOMComponentsWithClass(
      instance, 'linked-documents-thumbnail-img'
    );
    linkDisplayDocumentsThumbnailImgs.should.have.length(11);

    linkDisplayDocumentsThumbnailImgs[0].src.should.eql(
      'https://assets.documentcloud.org/documents/5680385/pages/CRID-1083633.gif'
    );
    linkDisplayDocumentsThumbnailImgs[0].width.should.eql(40);
    linkDisplayDocumentsThumbnailImgs[0].alt.should.eql('thumbnail');

    linkDisplayDocumentsThumbnailImgs[5].src.should.eql(
      'https://assets.documentcloud.org/documents/5670367/pages/CRID-1083633.gif'
    );
    linkDisplayDocumentsThumbnailImgs[5].width.should.eql(40);
    linkDisplayDocumentsThumbnailImgs[5].alt.should.eql('thumbnail');

    linkDisplayDocumentsThumbnailImgs[10].src.should.eql(
      'https://assets.documentcloud.org/documents/5670369/pages/CRID-1083633.gif'
    );
    linkDisplayDocumentsThumbnailImgs[10].width.should.eql(40);
    linkDisplayDocumentsThumbnailImgs[10].alt.should.eql('thumbnail');

    const linkDocumentsMore = findRenderedDOMComponentWithClass(instance, 'linked-documents-more');
    linkDocumentsMore.textContent.should.eql('+3');

    const editableTextBoxes = scryRenderedComponentsWithType(instance, EditableTextBox);
    editableTextBoxes.should.have.length(2);

    const editableTitle = editableTextBoxes[0];
    editableTitle.props.className.should.eql('main-section-title');
    editableTitle.props.title.should.eql('Document Title');
    editableTitle.props.fieldName.should.eql('title');
    editableTitle.props.editWrapperStateProps.fields.should.eql({
      'attachmentId': 14193,
      'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
      'text_content': 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
    });

    const editableTextContent = editableTextBoxes[1];
    editableTextContent.props.className.should.eql('main-section-full-text');
    editableTextContent.props.title.should.eql('Full-text OCR');
    editableTextContent.props.fieldName.should.eql('text_content');
    editableTextContent.props.editWrapperStateProps.fields.should.eql({
      'attachmentId': 14193,
      'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
      'text_content': 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
    });

    const lastEdited = findRenderedDOMComponentWithClass(instance, 'main-section-last-edited');
    lastEdited.textContent.should.eql('This document was last edited by John Doe at 09:50AM on Mar 1, 2019');
  });

  it('should not pass counts to SimpleListWidget when not available', function () {
    const newState = omit(
      state,
      ['documentPage.data.views_count', 'documentPage.data.downloads_count', 'documentPage.data.notifications_count']
    );
    const newStore = MockStore()(newState);

    instance = renderIntoDocument(
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const simpleListWidget = findRenderedComponentWithType(instance, SimpleListWidget);
    findIndex(simpleListWidget.props.items, ['name', 'Views']).should.eql(-1);
  });

  it('should not render more linked documents when there are less than 11 documents', function () {
    state.documentPage.data['linked_documents'] = slice(state.documentPage.data['linked_documents'], 0, 5);
    const newStore = MockStore()(state);

    instance = renderIntoDocument(
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    scryRenderedDOMComponentsWithClass(instance, 'linked-documents-more').should.have.length(0);
  });

  it('should not render "by" when there is no last updated user', function () {
    const newState = omit(state, 'documentPage.data.last_updated_by');
    const newStore = MockStore()(newState);

    instance = renderIntoDocument(
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const lastEdited = findRenderedDOMComponentWithClass(instance, 'main-section-last-edited');
    lastEdited.textContent.should.eql('This document was last edited at 09:50AM on Mar 1, 2019');
  });
});
