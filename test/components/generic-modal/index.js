import React from 'react';
import { spy } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import {
  Simulate,
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import LegalDisclaimerModalContent from 'components/generic-modal/legal-disclaimer-modal-content';
import GenericModal from 'components/generic-modal';
import RequestDocumentModalContent from 'containers/cr-page/request-document-modal-container';
import RequestTRRDocumentModalContent from 'containers/trr-page/request-document-modal-container';


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

    scryRenderedDOMComponentsWithClass(element, 'test--generic-modal-overlay').should.have.length(0);
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
      breadcrumb: {
        breadcrumbs: []
      },
      crPage: {
        attachmentRequest: {
          request: {}
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
      breadcrumb: {
        breadcrumbs: []
      },
      trrPage: {
        attachmentRequest: {
          request: {}
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

    const overlay = findRenderedDOMComponentWithClass(element, 'test--generic-modal-overlay');
    Simulate.click(overlay);

    closeModal.called.should.be.true();
  });

  it('should not dispatch "close modal" action when modal content is clicked on', function () {
    const closeModal = spy();
    element = renderIntoDocument(
      <GenericModal activeModal='LEGAL_DISCLAIMER' closeModal={ closeModal } />
    );

    const content = findRenderedDOMComponentWithClass(element, 'test--generic-modal-content');
    Simulate.click(content);

    closeModal.called.should.be.false();
  });
});
