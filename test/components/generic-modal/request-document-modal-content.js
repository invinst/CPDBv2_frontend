import React from 'react';
import { findDOMNode } from 'react-dom';
import { unmountComponentSuppressError } from 'utils/test';
import { renderIntoDocument } from 'react-addons-test-utils';

import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';


describe('RequestDocumentModalContent component', function () {
  let element;

  afterEach(function () {
    if (element) {
      unmountComponentSuppressError(element);
    }
  });

  it('should render "I understand" link which closes modal on click', function () {
    element = renderIntoDocument(
      <RequestDocumentModalContent />
    );

    findDOMNode(element).innerText.should.containEql('We’ll notify you when the document is made available');
  });

});
