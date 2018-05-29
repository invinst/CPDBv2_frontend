import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import TRRDocument from 'components/trr-page/trr-info-section/trr-document';
import RequestDocumentButton from 'components/common/request-document-button';


describe('Row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render no document title and RequestDocumentButton', function () {
    const openRequestTRRDocumentModal = spy();
    instance = renderIntoDocument(
      <TRRDocument
        alreadyRequested={ true }
        openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--no-document').textContent.should.eql(
      'There are no documents that have been made public yet.'
    );

    const requestDocumentButton = findRenderedComponentWithType(instance, RequestDocumentButton);
    requestDocumentButton.props.alreadyRequested.should.be.true();
    requestDocumentButton.props.openRequestDocumentModal.should.eql(openRequestTRRDocumentModal);
  });
});
