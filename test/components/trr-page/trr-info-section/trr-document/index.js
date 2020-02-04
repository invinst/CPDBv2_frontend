import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import TRRDocument from 'components/trr-page/trr-info-section/trr-document';
import RequestDocumentButton from 'components/common/request-document-button';
import { buildEditStateFields } from 'utils/test/factories/draft';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


describe('Row component', function () {
  it('should render no document title and RequestDocumentButton', function () {
    const noAttachmentTextEditWrapperStateProps = {
      fields: buildEditStateFields({
        'no_attachment_text': ['There are no documents that have been made public yet.'],
      }),
      sectionEditModeOn: false,
      onSaveForm: sinon.spy(),
      turnOnSectionEditMode: sinon.spy(),
      turnOffSectionEditMode: sinon.spy(),
    };
    const openRequestTRRDocumentModal = sinon.spy();
    const wrapper = mount(
      <TRRDocument
        alreadyRequested={ true }
        openRequestTRRDocumentModal={ openRequestTRRDocumentModal }
        noAttachmentTextEditWrapperStateProps={ noAttachmentTextEditWrapperStateProps }
      />
    );

    wrapper.find('.trr-document-text').first().text().should.eql(
      'There are no documents that have been made public yet.'
    );

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);
    const editableNoDocumentText = hoverableEditWrapper.find(RichTextEditable);
    editableNoDocumentText.prop('fieldname').should.equal('no_attachment_text');

    const requestDocumentButton = wrapper.find(RequestDocumentButton);
    requestDocumentButton.prop('alreadyRequested').should.be.true();
    requestDocumentButton.prop('openRequestDocumentModal').should.eql(openRequestTRRDocumentModal);
  });

  it('should hide when printing', function () {
    const wrapper = shallow(<TRRDocument alreadyRequested={ true }/>);
    wrapper.prop('className').should.containEql('no-print');
  });
});
