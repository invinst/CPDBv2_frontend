import { connect } from 'react-redux';
import { omit } from 'lodash';

import DocumentPage from 'components/document-page';
import {
  documentSelector,
  getTitleEditModeOn,
  getTextContentEditModeOn,
  documentEditableFieldsSelector,
} from 'selectors/document-page';
import { updateDocument } from 'actions/document-page';
import { isSignedIn } from 'selectors/log-out';
import {
  turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode,
  turnOnDocumentTextContentEditMode,
  turnOffDocumentTextContentEditMode,
} from 'actions/document-page';


function mapStateToProps(state, ownProps) {
  const documentAttrs = documentSelector(state);
  return {
    ...ownProps,
    ...documentAttrs,
    editableFields: documentEditableFieldsSelector(state),
    titleEditModeOn: getTitleEditModeOn(state),
    textContentEditModeOn: getTextContentEditModeOn(state),
    isSignedIn: isSignedIn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updateDocument,
  turnOnDocumentPageTitleEditMode: turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode: turnOffDocumentPageTitleEditMode,
  turnOnDocumentTextContentEditMode: turnOnDocumentTextContentEditMode,
  turnOffDocumentTextContentEditMode: turnOffDocumentTextContentEditMode,
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'titleEditModeOn', 'textContentEditModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnDocumentPageTitleEditMode',
      'turnOffDocumentPageTitleEditMode',
      'turnOnDocumentTextContentEditMode',
      'turnOffDocumentTextContentEditMode',
    ]),
    titleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.titleEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentPageTitleEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentPageTitleEditMode,
    },
    textContentEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.textContentEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentTextContentEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentTextContentEditMode,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(DocumentPage);
