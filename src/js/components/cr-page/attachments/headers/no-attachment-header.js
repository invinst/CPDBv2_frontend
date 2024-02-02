import PropTypes from 'prop-types';
import React from 'react';

import RequestDocumentButton from 'components/common/request-document-button';
import styles from './no-attachment-header.sass';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';


export default function NoAttachmentHeader(props) {
  const { openRequestDocumentModal, alreadyRequested, editWrapperStateProps } = props;

  return (
    <div className={ styles.noHeaderMessage }>
      <EditWrapperStateProvider { ...editWrapperStateProps }>
        <HoverableEditWrapper className='message'>
          <RichTextEditable
            placeholder='There are no documents that have been made public yet.'
            fieldname='no_attachment_text'
          />
        </HoverableEditWrapper>
      </EditWrapperStateProvider>
    </div>
  );
}

NoAttachmentHeader.propTypes = {
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
  editWrapperStateProps: PropTypes.object,
};
