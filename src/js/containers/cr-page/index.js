import { connect } from 'react-redux';
import React from 'react';
import { omit } from 'lodash';

import { contentSelector, getCRID, getDocumentAlreadyRequested } from 'selectors/cr-page';
import CRPage from 'components/cr-page';
import { openRequestDocumentModal } from 'actions/generic-modal';
import { popupSelector } from 'selectors/popup';
import { CR_EDIT_TYPES, CR_PAGE_ID } from 'utils/constants';
import {
  turnOnNoAttachmentTextEditMode,
  turnOffNoAttachmentTextEditMode,
} from 'actions/cr-page';
import { updatePage } from 'actions/cms';
import { trackingClickAttachment } from 'actions/common/analytic';
import { getCMSFields } from 'selectors/cms';
import { getEditModeOn } from 'selectors/cr-page';


function mapStateToProps(state, ownProps) {
  return {
    crid: getCRID(state),
    ...contentSelector(state),
    alreadyRequested: getDocumentAlreadyRequested(state),
    popup: popupSelector(state),
    pathname: ownProps.pathname,
    notes: state.popups,
    printHeader: `CR ${getCRID(state)}`,
    editModeOn: getEditModeOn(state),
    editableFields: getCMSFields(CR_PAGE_ID)(state),
  };
}

const mapDispatchToProps = {
  openRequestDocumentModal,
  onSaveForm: updatePage(CR_PAGE_ID),
  turnOnNoAttachmentTextEditMode,
  turnOffNoAttachmentTextEditMode,
  onTrackingAttachment: trackingClickAttachment,
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'editModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnNoAttachmentTextEditMode',
      'turnOffNoAttachmentTextEditMode',
    ]),
    noAttachmentTextEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.editModeOn[CR_EDIT_TYPES.NO_ATTACHMENT_TEXT],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnNoAttachmentTextEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffNoAttachmentTextEditMode,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(CRPage);
