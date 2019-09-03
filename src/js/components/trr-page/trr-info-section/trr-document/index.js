import React, { Component, PropTypes } from 'react';

import style from './trr-document.sass';
import RequestDocumentButton from 'components/common/request-document-button';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';


export default class TRRDocument extends Component {
  render() {
    const { alreadyRequested, openRequestTRRDocumentModal, noAttachmentTextEditWrapperStateProps } = this.props;
    return (
      <div className={ `${style.trrDocument} no-print` }>
        <EditWrapperStateProvider { ...noAttachmentTextEditWrapperStateProps }>
          <HoverableEditWrapper className='trr-document-text'>
            <RichTextEditable
              placeholder='There are no documents that have been made public yet.'
              fieldname='no_attachment_text'
            />
          </HoverableEditWrapper>
        </EditWrapperStateProvider>
        <div className='trr-request-document-button'>
          <RequestDocumentButton
            alreadyRequested={ alreadyRequested }
            openRequestDocumentModal={ openRequestTRRDocumentModal }
            hasData={ false }
          />
        </div>
      </div>
    );
  }
}


TRRDocument.propTypes = {
  alreadyRequested: PropTypes.bool,
  openRequestTRRDocumentModal: PropTypes.func,
  noAttachmentTextEditWrapperStateProps: PropTypes.object,
};

TRRDocument.defaultProps = {
  alreadyRequested: false,
  openRequestTRRDocumentModal: () => {},
};
