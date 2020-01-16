import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';

import Attachments from 'components/cr-page/attachments';
import AttachmentHeader from 'components/cr-page/attachments/headers/attachment-header';
import NoAttachmentHeader from 'components/cr-page/attachments/headers/no-attachment-header';
import PrintAttachments from 'components/cr-page/attachments/print-attachments';
import { buildEditStateFields } from 'utils/test/factories/draft';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import { PrintModeContext } from 'contexts';


describe('AttachmentsTab component', function () {
  it('should show editable "no documents" message if no items', function () {
    const noAttachmentTextEditWrapperStateProps = {
      fields: buildEditStateFields({
        'no_attachment_text': ['There are no documents that have been made public yet.'],
      }),
      sectionEditModeOn: false,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy(),
    };

    const wrapper = mount(
      <Attachments noAttachmentTextEditWrapperStateProps={ noAttachmentTextEditWrapperStateProps }/>
    );
    wrapper.text().should.containEql(
      'There are no documents that have been made public yet.'
    );

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);
    const editableNoDocumentText = hoverableEditWrapper.find(RichTextEditable);
    editableNoDocumentText.prop('fieldname').should.equal('no_attachment_text');

  });

  it('should render AttachmentHeader if has items and items is not empty', function () {
    const items = [{ title: 'abc', url: 'def', previewImageUrl: 'pre' }];
    const wrapper = shallow(<Attachments items={ items }/>);
    wrapper.find(AttachmentHeader).exists().should.be.true();
    wrapper.find(NoAttachmentHeader).exists().should.be.false();
  });

  it('should render NoAttachmentHeader if items is empty', function () {
    const wrapper = shallow(<Attachments />);
    wrapper.find(AttachmentHeader).exists().should.be.false();
    wrapper.find(NoAttachmentHeader).exists().should.be.true();
  });

  it('should render PrintAttachment if printMode is true', function () {
    const items = [{ title: 'abc', url: 'def', previewImageUrl: 'pre' }];
    const context = { printMode: true };
    const wrapper = mount(
      <PrintModeContext.Provider value={ context }>
        <Attachments items={ items }/>
      </PrintModeContext.Provider>
    );
    wrapper.find(PrintAttachments).exists().should.be.true();
  });
});
