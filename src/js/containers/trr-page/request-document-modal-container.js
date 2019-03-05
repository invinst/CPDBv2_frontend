import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';

import { requestDocument } from 'actions/trr-page';
import { getTRRId } from 'utils/location';
import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';
import { TRR_EDIT_TYPES, TRR_PAGE_ID } from 'utils/constants';
import {
  turnOnDocumentRequestInstructionEditMode,
  turnOffDocumentRequestInstructionEditMode
} from 'actions/trr-page';
import { updatePage } from 'actions/cms';
import { getCMSFields } from 'selectors/cms';
import { getEditModeOn } from 'selectors/trr-page';


const mapDispatchToProps = {
  onRequestDocument: requestDocument,
  turnOnDocumentRequestInstructionEditMode,
  turnOffDocumentRequestInstructionEditMode,
  onSaveForm: updatePage(TRR_PAGE_ID),
};

const mapStateToProps = (state, ownProps) => ({
  id: getTRRId(ownProps.location.pathname),
  message: state.trrPage.attachmentRequest.request.message,
  isRequested: state.trrPage.attachmentRequest.request.isRequested,
  editableFields: getCMSFields(TRR_PAGE_ID)(state),
  editModeOn: getEditModeOn(state),
  hasData: false,
});

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'editModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnDocumentRequestInstructionEditMode',
      'turnOffDocumentRequestInstructionEditMode',
    ]),
    instructionEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[TRR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentRequestInstructionEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentRequestInstructionEditMode
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(RequestDocumentModalContent);
