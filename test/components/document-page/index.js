import React from 'react';
import { shallow, mount } from 'enzyme';
import { Router, createMemoryHistory, Route } from 'react-router';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { omit, findIndex, slice, cloneDeep, set } from 'lodash';
import moment from 'moment-timezone';

import DocumentPageContainer from 'containers/document-page';
import ShareableHeader from 'components/headers/shareable-header';
import FooterContainer from 'containers/footer-container';
import SimpleListWidget from 'components/document-page/simple-list-widget';
import EditableTextBox from 'components/document-page/editable-text-box';
import EditableTagsInput from 'components/document-page/editable-tags-input';


describe('DocumentPage component', function () {
  const state = {
    headers: {
      shareableHeader: {
        scrollPosition: null,
      },
    },
    breadcrumb: {
      breadcrumbs: [],
    },
    routing: {
      locationBeforeTransitions: {
        pathname: '/edit/document/14193',
        search: '',
        hash: '',
        action: 'POP',
        key: '7g7rqv',
        query: {},
      },
    },
    documentPage: {
      isRequesting: false,
      data: {
        'id': 14193,
        'crid': '1083633',
        'title': 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
        'tags': ['tag1', 'tag2'],
        'text_content': 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
        'url': 'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf',
        'preview_image_url': 'https://assets.documentcloud.org/documents/4769607/pages/CRID-1052620-CR-p1-normal.gif',
        'original_url': 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
        'created_at': '2019-01-09T03:11:27.441718-06:00',
        'updated_at': '2019-02-28T20:50:10.161395-06:00',
        'crawler_name': 'Chicago COPA',
        'linked_documents': [{
          'id': 14192,
          'preview_image_url': 'https://assets.documentcloud.org/documents/4769275/pages/CRID-1075381-CR-p1-normal.gif',
        }, {
          'id': 14188,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 14191,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 14189,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 14190,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17570,
          'preview_image_url': 'https://assets.documentcloud.org/documents/5777858/pages/CRID-312474-CPB-p1-normal.gif',
        }, {
          'id': 17571,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17890,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17891,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17892,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17893,
          'preview_image_url': 'https://assets.documentcloud.org/documents/4769733/pages/CRID-1042825-CR-p1-normal.gif',
        }, {
          'id': 17894,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17895,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }, {
          'id': 17896,
          'preview_image_url': 'https://via.placeholder.com/133x176.gif',
        }],
        'pages': 5,
        'last_updated_by': 'John Doe',
        'views_count': 1000,
        'downloads_count': 100,
        'notifications_count': 10,
      },
      titleEditModeOn: false,
      tagsEditModeOn: false,
      textContentEditModeOn: false,
    },
  };

  const store = MockStore()(state);

  beforeEach(function () {
    moment.tz.setDefault('America/Chicago');
  });

  afterEach(function () {
    moment.tz.setDefault();
  });

  it('should render correctly', function () {
    const recentDocument = () => (
      <Provider store={ store }>
        <DocumentPageContainer />
      </Provider>
    );

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );

    const header = wrapper.find(ShareableHeader).first();
    header.prop('buttonType').should.equal('none');

    wrapper.find(FooterContainer).exists().should.be.true();
    wrapper.find('.document-side-bar').exists().should.be.true();

    const thumbnail = wrapper.find('.document-thumbnail').first();
    thumbnail.prop('href').should.equal(
      'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
    );

    const thumbnailImg = wrapper.find('.document-thumbnail-img');
    thumbnailImg.prop('src').should.equal(
      'https://assets.documentcloud.org/documents/4769607/pages/CRID-1052620-CR-p1-normal.gif'
    );
    thumbnailImg.prop('alt').should.equal('thumbnail');

    const thumbnailPageCount = wrapper.find('.document-thumbnail-page-count');
    thumbnailPageCount.text().should.equal('5 pages');

    const simpleListWidget = wrapper.find(SimpleListWidget);
    simpleListWidget.prop('items').should.eql([
      { name: 'CRID / UID', value: 'CR 1083633', to: '/complaint/1083633/' },
      {
        name: 'Source',
        value: 'chicagocopa.org',
        tooltip: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
        url: 'https://www.chicagocopa.org/wp-content/uploads/2017/03/TRR-HOSPITAL-REDACTED.pdf',
      },
      { name: 'Crawler', value: 'Chicago COPA' },
      { name: 'Date', value: 'Jan 9, 2019' },
      { name: 'Views', value: '1,000' },
      { name: 'Downloads', value: '100' },
      { name: 'Notifications', value: '10' },
    ]);

    const linkDocumentsTitle = wrapper.find('.linked-documents-title');
    linkDocumentsTitle.text().should.equal('Linked Documents (14)');

    const linkDocumentsContent = wrapper.find('a.linked-documents-content');
    linkDocumentsContent.prop('href').should.equal('/documents/?match=1083633/');

    const linkDisplayDocumentsThumbnails = wrapper.find('.linked-documents-thumbnail');
    linkDisplayDocumentsThumbnails.should.have.length(12);

    const linkDisplayDocumentsThumbnailImgs = wrapper.find('.linked-documents-thumbnail-img');
    linkDisplayDocumentsThumbnailImgs.should.have.length(11);

    linkDisplayDocumentsThumbnailImgs.at(0).prop('src').should.eql(
      'https://assets.documentcloud.org/documents/4769275/pages/CRID-1075381-CR-p1-normal.gif'
    );
    linkDisplayDocumentsThumbnailImgs.at(0).prop('width').should.equal('40');

    linkDisplayDocumentsThumbnailImgs.at(5).prop('src').should.eql(
      'https://assets.documentcloud.org/documents/5777858/pages/CRID-312474-CPB-p1-normal.gif'
    );
    linkDisplayDocumentsThumbnailImgs.at(5).prop('width').should.equal('40');

    linkDisplayDocumentsThumbnailImgs.at(10).prop('src').should.eql(
      'https://assets.documentcloud.org/documents/4769733/pages/CRID-1042825-CR-p1-normal.gif'
    );
    linkDisplayDocumentsThumbnailImgs.at(10).prop('width').should.equal('40');

    const linkDocumentsMore = wrapper.find('.linked-documents-more');
    linkDocumentsMore.text().should.equal('+3');

    const editableTextBoxes = wrapper.find(EditableTextBox);
    editableTextBoxes.should.have.length(2);

    const editableTitle = editableTextBoxes.at(0);
    editableTitle.prop('className').should.equal('main-section-title');
    editableTitle.prop('title').should.equal('Document Title');
    editableTitle.prop('fieldName').should.equal('title');
    editableTitle.prop('editWrapperStateProps').fields.should.eql({
      attachmentId: {
        type: 'number',
        key: 'id',
        value: 14193,
      },
      title: {
        type: 'string',
        key: 'title',
        value: 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
      },
      tags: {
        type: 'array',
        key: 'tags',
        value: ['tag1', 'tag2'],
      },
      textContent: {
        type: 'string',
        key: 'text_content',
        value: 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
      },
    });

    const editableTextContent = editableTextBoxes.at(1);
    editableTextContent.prop('className').should.equal('main-section-full-text');
    editableTextContent.prop('title').should.equal('Full-text OCR');
    editableTextContent.prop('fieldName').should.equal('textContent');
    editableTextContent.prop('editWrapperStateProps').fields.should.eql({
      attachmentId: {
        type: 'number',
        key: 'id',
        value: 14193,
      },
      title: {
        type: 'string',
        key: 'title',
        value: 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
      },
      tags: {
        type: 'array',
        key: 'tags',
        value: ['tag1', 'tag2'],
      },
      textContent: {
        type: 'string',
        key: 'text_content',
        value: 'TACTICAL RESPONSE Police Department\n1. DATE OF INCIDENT TIME 2. ADDRESS OF OCCURRENCE',
      },
    });

    const lastEdited = wrapper.find('.main-section-last-edited');
    lastEdited.text().should.equal('This document was last edited by John Doe at 08:50PM on Feb 28, 2019');
  });

  it('should not pass counts to SimpleListWidget when not available', function () {
    const newState = omit(
      state,
      ['documentPage.data.views_count', 'documentPage.data.downloads_count', 'documentPage.data.notifications_count']
    );
    const newStore = MockStore()(newState);

    const wrapper = shallow(
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const simpleListWidget = wrapper.find(SimpleListWidget);
    findIndex(simpleListWidget.props.items, ['name', 'Views']).should.eql(-1);
  });

  it('should not render more linked documents when there are less than 11 documents', function () {
    const newState = cloneDeep(state);
    newState.documentPage.data['linked_documents'] = slice(newState.documentPage.data['linked_documents'], 0, 5);
    const newStore = MockStore()(newState);

    const wrapper = mount(
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    wrapper.find('.linked-documents-more').exists().should.be.false();
  });

  it('should not render "by" when there is no last updated user', function () {
    const newState = omit(state, 'documentPage.data.last_updated_by');
    const newStore = MockStore()(newState);

    const wrapper = mount(
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const lastEdited = wrapper.find('.main-section-last-edited');
    lastEdited.text().should.equal('This document was last edited at 08:50PM on Feb 28, 2019');
  });

  it('should link linked documents to dedup page if user is authenticated', function () {
    const newState = cloneDeep(state);
    set(newState, 'authentication.apiAccessToken', '123456');
    const newStore = MockStore()(newState);

    const recentDocument = () => (
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );

    const linkDocumentsContent = wrapper.find('a.linked-documents-content');
    linkDocumentsContent.prop('href').should.equal('/documents/crid/1083633/');
  });

  it('should render EditableTagsInput for authenticated users', function () {
    const newState = cloneDeep(state);
    set(newState, 'authentication.apiAccessToken', '123456');
    const newStore = MockStore()(newState);

    const recentDocument = () => (
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );

    wrapper.find(EditableTagsInput).exists().should.be.true();
  });

  it('should not render EditableTagsInput for unauthenticated users', function () {
    const newState = cloneDeep(state);
    set(newState, 'authentication.apiAccessToken', '');
    const newStore = MockStore()(newState);

    const recentDocument = () => (
      <Provider store={ newStore }>
        <DocumentPageContainer />
      </Provider>
    );

    const wrapper = mount(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ recentDocument } />
      </Router>
    );

    wrapper.find(EditableTagsInput).exists().should.be.false();
  });
});
