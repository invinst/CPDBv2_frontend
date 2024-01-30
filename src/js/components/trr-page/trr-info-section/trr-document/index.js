import PropTypes from 'prop-types';
import React from 'react';

import style from './trr-document.sass';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';


export default function TRRDocument(props) {
  const { noAttachmentTextEditWrapperStateProps } = props;
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
    </div>
  );
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
