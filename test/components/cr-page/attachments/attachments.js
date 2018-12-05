import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import Attachments from 'components/cr-page/attachments';
import PrintAttachments from 'components/cr-page/attachments/print-attachments';


describe('AttachmentsTab component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should show "no documents" message if no items', function () {
    instance = renderIntoDocument(<Attachments />);
    findDOMNode(instance).innerText.should.containEql(
      'There are no documents that have been made public yet.'
    );
  });

  it('should render if has items and items is not empty', function () {
    const items = [{ title: 'abc', url: 'def', previewImageUrl: 'pre' }];
    instance = renderIntoDocument(<Attachments items={ items }/>);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(1);
  });

  it('should render PrintAttachment if printMode is true', function () {
    const items = [{ title: 'abc', url: 'def', previewImageUrl: 'pre' }];
    const context = { printMode: true };
    instance = renderWithContext(context, <Attachments items={ items }/>);
    scryRenderedComponentsWithType(instance, PrintAttachments).should.have.length(1);
  });
});
