import React from 'react';
import { connect } from 'react-redux';
import { omit, isEmpty } from 'lodash';

import { requestDocument } from 'actions/cr-page';
import { getCRID } from 'utils/location';
import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';
import { CR_EDIT_TYPES, CR_PAGE_ID } from 'utils/constants';
import {
  turnOffDocumentRequestInstructionEditMode,
  turnOnDocumentRequestInstructionEditMode,
  turnOnNewDocumentNotificationEditMode,
  turnOffNewDocumentNotificationEditMode
} from 'actions/cr-page';
import { updatePage } from 'actions/cms';
import { getCMSFields } from 'selectors/cms';
import { getEditModeOn, getAttachments } from 'selectors/cr-page';


const mapDispatchToProps = {
  onRequestDocument: requestDocument,
  turnOnDocumentRequestInstructionEditMode,
  turnOffDocumentRequestInstructionEditMode,
  turnOnNewDocumentNotificationEditMode,
  turnOffNewDocumentNotificationEditMode,
  onSaveForm: updatePage(CR_PAGE_ID),
};

const mapStateToProps = (state, ownProps) => {
  return {
    id: getCRID(ownProps.location.pathname),
    message: state.crPage.attachmentRequest.request.message,
    isRequested: state.crPage.attachmentRequest.request.isRequested,
    editableFields: getCMSFields(CR_PAGE_ID)(state),
    editModeOn: getEditModeOn(state),
    hasData: !isEmpty(getAttachments(state)),
  };
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  let editType, turnOnSectionEditMode, turnOffSectionEditMode;
  if (stateProps.hasData) {
    editType = CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION;
    turnOnSectionEditMode = dispatchProps.turnOnNewDocumentNotificationEditMode;
    turnOffSectionEditMode = dispatchProps.turnOffNewDocumentNotificationEditMode;
  } else {
    editType = CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION;
    turnOnSectionEditMode = dispatchProps.turnOnDocumentRequestInstructionEditMode;
    turnOffSectionEditMode = dispatchProps.turnOffDocumentRequestInstructionEditMode;
  }
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'editModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnDocumentRequestInstructionEditMode',
      'turnOffDocumentRequestInstructionEditMode',
      'turnOnNewDocumentNotificationEditMode',
      'turnOffNewDocumentNotificationEditMode',
    ]),
    instructionEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[editType],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: turnOnSectionEditMode,
      turnOffSectionEditMode: turnOffSectionEditMode
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(RequestDocumentModalContent);
