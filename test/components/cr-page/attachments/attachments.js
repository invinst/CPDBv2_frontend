import React from 'react';
import {
  findRenderedComponentWithType, renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError, renderWithContext } from 'utils/test';
import Attachments from 'components/cr-page/attachments';
import PrintAttachments from 'components/cr-page/attachments/print-attachments';
import { buildEditStateFields } from 'utils/test/factories/draft';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';


describe('AttachmentsTab component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should show editable "no documents" message if no items', function () {
    const noAttachmentTextEditWrapperStateProps = {
      fields: buildEditStateFields({
        'no_attachment_text': ['There are no documents that have been made public yet.'],
      }),
      sectionEditModeOn: false,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy()
    };

    instance = renderIntoDocument(
      <Attachments noAttachmentTextEditWrapperStateProps={ noAttachmentTextEditWrapperStateProps }/>
    );
    findDOMNode(instance).innerText.should.containEql(
      'There are no documents that have been made public yet.'
    );

    const editWrapperStateProvider = findRenderedComponentWithType(instance, EditWrapperStateProvider);
    const hoverableEditWrapper = findRenderedComponentWithType(editWrapperStateProvider, HoverableEditWrapper);
    const editableNoDocumentText = findRenderedComponentWithType(hoverableEditWrapper, RichTextEditable);
    editableNoDocumentText.props.fieldname.should.equal('no_attachment_text');

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
