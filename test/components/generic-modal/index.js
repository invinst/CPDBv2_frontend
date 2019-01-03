import React from 'react';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { unmountComponentSuppressError } from 'utils/test';
import LegalDisclaimerModalContent from 'components/generic-modal/legal-disclaimer-modal-content';
import GenericModal from 'components/generic-modal';
import RequestDocumentModalContent from 'containers/cr-page/request-document-modal-container';
import RequestTRRDocumentModalContent from 'containers/trr-page/request-document-modal-container';
import { CR_EDIT_TYPES, TRR_EDIT_TYPES } from 'utils/constants';


describe('GenericModal component', function () {
  let element;

  afterEach(function () {
    if (element) {
      unmountComponentSuppressError(element);
    }
  });

  it('should render nothing if activeModal is unavailable', function () {
    element = renderIntoDocument(
      <GenericModal activeModal={ null }/>
    );

    scryRenderedDOMComponentsWithClass(element, 'generic-modal-content').should.have.length(0);
  });

  it('should render Legal Disclaimer when activeModal matches', function () {
    const closeModal = () => {};
    element = renderIntoDocument(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    findRenderedComponentWithType(element, LegalDisclaimerModalContent).props.closeModal.should.equal(closeModal);
  });

  it('should render RequestDocumentModalContent when activeModal matches', function () {
    const store = MockStore()({
      cms: { pages: {} },
      breadcrumb: {
        breadcrumbs: []
      },
      crPage: {
        attachmentRequest: {
          request: {}
        },
        editModeOn: {
          [TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        }
      }
    });
    const closeModal = () => {};

    element = renderIntoDocument(
      <Provider store={ store }>
        <GenericModal
          location={ { pathname: '/complaint/123/' } }
          activeModal='REQUEST_DOCUMENT'
          closeModal={ closeModal }
        />
      </Provider>
    );

    findRenderedComponentWithType(element, RequestDocumentModalContent).props.closeModal.should.equal(closeModal);
  });

  it('should render RequestTRRDocumentModalContent when activeModal matches', function () {
    const store = MockStore()({
      cms: { pages: {} },
      breadcrumb: {
        breadcrumbs: []
      },
      trrPage: {
        attachmentRequest: {
          request: {}
        },
        editModeOn: {
          [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
          [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        }
      }
    });
    const closeModal = () => {};

    element = renderIntoDocument(
      <Provider store={ store }>
        <GenericModal
          location={ { pathname: '/trr/123/' } }
          activeModal='REQUEST_TRR_DOCUMENT'
          closeModal={ closeModal }
        />
      </Provider>
    );

    findRenderedComponentWithType(element, RequestTRRDocumentModalContent).props.closeModal.should.equal(closeModal);
  });

  it('should dispatch "close modal" action when overlay is clicked on', function () {
    const closeModal = spy();
    element = renderIntoDocument(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    Simulate.click(findDOMNode(element));

    closeModal.called.should.be.true();
  });

  it('should not dispatch "close modal" action when modal content is clicked on', function () {
    const closeModal = spy();
    element = renderIntoDocument(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    const content = findRenderedDOMComponentWithClass(element, 'generic-modal-content');
    Simulate.click(content);

    closeModal.called.should.be.false();
  });
});
