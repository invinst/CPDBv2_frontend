import React from 'react';
import { connect } from 'react-redux';
import { omit } from 'lodash';

import { requestDocument } from 'actions/cr-page';
import { getCRID } from 'utils/location';
import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';
import { CR_EDIT_TYPES, CR_PAGE_ID } from 'utils/constants';
import {
  turnOffDocumentRequestInstructionEditMode,
  turnOnDocumentRequestInstructionEditMode
} from 'actions/cr-page';
import { updatePage } from 'actions/cms';
import { getCMSFields } from 'selectors/cms';
import { getEditModeOn } from 'selectors/cr-page';


const mapDispatchToProps = {
  onRequestDocument: requestDocument,
  turnOnDocumentRequestInstructionEditMode,
  turnOffDocumentRequestInstructionEditMode,
  onSaveForm: updatePage(CR_PAGE_ID),
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: getCRID(ownProps.location.pathname),
    message: state.crPage.attachmentRequest.request.message,
    isRequested: state.crPage.attachmentRequest.request.isRequested,
    editableFields: getCMSFields(CR_PAGE_ID)(state),
    editModeOn: getEditModeOn(state),
  };
};

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
      sectionEditModeOn: stateProps.editModeOn[CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentRequestInstructionEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentRequestInstructionEditMode
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(RequestDocumentModalContent);
