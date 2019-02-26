import { connect } from 'react-redux';

import DocumentPage from 'components/document-page';
import { documentSelector, getTitleEditModeOn, getTextContentEditModeOn } from 'selectors/document-page';
import { updateDocument } from 'actions/document-pape';
import {
  turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode,
  turnOnDocumentTextContentEditMode,
  turnOffDocumentTextContentEditMode
} from 'actions/document-pape';
import { omit } from 'lodash';


function mapStateToProps(state, ownProps) {
  const documentAttrs = documentSelector(state);
  return {
    ...ownProps,
    ...documentAttrs,
    editableFields: {
      attachmentId: documentAttrs.attachmentId,
      title: documentAttrs.title || '',
      'text_content': documentAttrs.fullText || '',
    },
    titleEditModeOn: getTitleEditModeOn(state),
    textContentEditModeOn: getTextContentEditModeOn(state),
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
      'turnOffDocumentTextContentEditMode'
    ]),
    titleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.titleEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentPageTitleEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentPageTitleEditMode
    },
    textContentEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.textContentEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentTextContentEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentTextContentEditMode
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(DocumentPage);
