import { connect } from 'react-redux';
import React from 'react';
import { omit } from 'lodash';

import {
  getTRRId,
  officerSelector,
  trrLocationSelector,
  trrDetailSelector,
  trrDocumentSelector,
} from 'selectors/trr-page';
import { popupSelector } from 'selectors/popup';
import TRRPage from 'components/trr-page';
import { openRequestTRRDocumentModal } from 'actions/generic-modal';
import { getPathname } from 'selectors/common/pathname';
import { TRR_PAGE_ID, TRR_EDIT_TYPES } from 'utils/constants';
import {
  turnOnNoAttachmentTextEditMode,
  turnOffNoAttachmentTextEditMode,
} from 'actions/trr-page';
import { updatePage } from 'actions/cms';
import { getCMSFields } from 'selectors/cms';
import { getEditModeOn } from 'selectors/trr-page';


function mapStateToProps(state) {
  const trrId = getTRRId(state);
  return {
    trrId,
    officer: officerSelector(state),
    trrDetail: trrDetailSelector(state),
    trrLocation: trrLocationSelector(state),
    trrDocument: trrDocumentSelector(state),
    popup: popupSelector(state),
    pathName: getPathname(state),
    notes: state.popups,
    printHeader: `TRR ${trrId}`,
    editModeOn: getEditModeOn(state),
    editableFields: getCMSFields(TRR_PAGE_ID)(state),
  };
}

const mapDispatchToProps = {
  openRequestTRRDocumentModal,
  onSaveForm: updatePage(TRR_PAGE_ID),
  turnOnNoAttachmentTextEditMode,
  turnOffNoAttachmentTextEditMode,
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
      sectionEditModeOn: stateProps.editModeOn[TRR_EDIT_TYPES.NO_ATTACHMENT_TEXT],
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnNoAttachmentTextEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffNoAttachmentTextEditMode,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(TRRPage);
