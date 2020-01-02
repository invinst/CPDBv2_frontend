import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import LegalDisclaimerModalContent from 'components/generic-modal/legal-disclaimer-modal-content';
import GenericModal from 'components/generic-modal';
import RequestDocumentModalContent from 'containers/cr-page/request-document-modal-container';
import RequestTRRDocumentModalContent from 'containers/trr-page/request-document-modal-container';
import LogFileModalContent from 'containers/crawlers-page/log-file-modal-container';
import { CR_EDIT_TYPES } from 'utils/constants';


describe('GenericModal component', function () {
  it('should render nothing if activeModal is unavailable', function () {
    const wrapper = shallow(
      <GenericModal activeModal={ null }/>
    );

    wrapper.find('.generic-modal-content').exists().should.be.false();
  });

  it('should render Legal Disclaimer when activeModal matches', function () {
    const closeModal = () => {};
    const wrapper = shallow(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    wrapper.find(LegalDisclaimerModalContent).prop('closeModal').should.equal(closeModal);
  });

  it('should render RequestDocumentModalContent for DOCUMENT_REQUEST when activeModal matches', function () {
    const store = MockStore()({
      cms: { pages: {} },
      breadcrumb: {
        breadcrumbs: [],
      },
      crPage: {
        crid: '123456',
        attachmentRequest: {
          request: {},
        },
        editModeOn: {
          [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        },
      },
      crs: {
        '123456': {
          attachments: [],
        },
      },
    });
    const closeModal = () => {};

    const wrapper = mount(
      <Provider store={ store }>
        <GenericModal
          location={ { pathname: '/complaint/123/' } }
          activeModal='REQUEST_DOCUMENT'
          closeModal={ closeModal }
        />
      </Provider>
    );

    wrapper.find(RequestDocumentModalContent).prop('closeModal').should.equal(closeModal);
  });

  it('should render Log File when activeModal matches', function () {
    const store = MockStore()({
      cms: { pages: {} },
      breadcrumb: {
        breadcrumbs: [],
      },
      crawlersPage: {
        crawlers: [{
          'log_url': 'https://lvh.me/log',
          'crawler_name': 'COPA_CRAWLER',
        }],
      },
    });
    const closeModal = () => {};

    const wrapper = mount(
      <Provider store={ store }>
        <GenericModal
          activeModal='LOG_FILE'
          closeModal={ closeModal }
        />
      </Provider>
    );

    wrapper.find(LogFileModalContent).prop('closeModal').should.equal(closeModal);
  });

  it('should render RequestDocumentModalContent for NEW_DOCUMENT_NOTIFICATIONS when activeModal matches', function () {
    const store = MockStore()({
      cms: { pages: {} },
      breadcrumb: {
        breadcrumbs: [],
      },
      crPage: {
        crid: '123456',
        attachmentRequest: {
          request: {},
        },
        editModeOn: {
          [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
        },
      },
      crs: {
        '123456': {
          attachments: [{
            url: 'https://www.documentcloud.org/documents/3108232-CRID-1071970-OCIR-3-of-3.html',
            previewImageUrl: 'https://assets.documentcloud.org/documents/3518954/pages/CRID-299780-CR-p1-normal.gif',
            fileType: 'document',
            id: '123',
          }],
        },
      },
    });
    const closeModal = () => {};

    const wrapper = mount(
      <Provider store={ store }>
        <GenericModal
          location={ { pathname: '/complaint/123/' } }
          activeModal='REQUEST_DOCUMENT'
          closeModal={ closeModal }
        />
      </Provider>
    );

    wrapper.find(RequestDocumentModalContent).prop('closeModal').should.equal(closeModal);
  });

  it('should render RequestTRRDocumentModalContent when activeModal matches', function () {
    const store = MockStore()({
      cms: { pages: {} },
      breadcrumb: {
        breadcrumbs: [],
      },
      trrPage: {
        attachmentRequest: {
          request: {},
        },
        editModeOn: {
          [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        },
      },
    });
    const closeModal = () => {};

    const wrapper = mount(
      <Provider store={ store }>
        <GenericModal
          location={ { pathname: '/trr/123/' } }
          activeModal='REQUEST_TRR_DOCUMENT'
          closeModal={ closeModal }
        />
      </Provider>
    );

    wrapper.find(RequestTRRDocumentModalContent).prop('closeModal').should.equal(closeModal);
  });

  it('should dispatch "close modal" action when overlay is clicked on', function () {
    const closeModal = spy();
    const wrapper = shallow(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    wrapper.simulate('click');

    closeModal.should.be.called();
  });

  it('should not dispatch "close modal" action when modal content is clicked on', function () {
    const closeModal = spy();
    const wrapper = shallow(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    const content = wrapper.find('.generic-modal-content');
    content.simulate('click', { stopPropagation: () => {} });

    closeModal.called.should.be.false();
  });
});
