import { connect } from 'react-redux';
import { omit } from 'lodash';

import DocumentPage from 'components/document-page';
import {
  documentSelector,
  getTitleEditModeOn,
  getTagsEditModeOn,
  getTagsErrorMessages,
  documentEditableFieldsSelector,
  getDocumentSuggestionTags,
} from 'selectors/document-page';
import { updateDocument } from 'actions/document-page';
import { isSignedIn } from 'selectors/log-out';
import {
  turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode,
  turnOnDocumentTagsEditMode,
  turnOffDocumentTagsEditMode,
} from 'actions/document-page';


function mapStateToProps(state, ownProps) {
  const documentAttrs = documentSelector(state);
  return {
    ...ownProps,
    ...documentAttrs,
    editableFields: documentEditableFieldsSelector(state),
    titleEditModeOn: getTitleEditModeOn(state),
    tagsEditModeOn: getTagsEditModeOn(state),
    isSignedIn: isSignedIn(state),
    tagsErrorMessages: getTagsErrorMessages(state),
    suggestionTags: getDocumentSuggestionTags(state),
  };
}

const mapDispatchToProps = {
  onSaveFormTitle: updateDocument('title'),
  onSaveFormContent: updateDocument('content'),
  onSaveFormTags: updateDocument('tags'),
  turnOnDocumentPageTitleEditMode: turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode: turnOffDocumentPageTitleEditMode,
  turnOnDocumentTagsEditMode: turnOnDocumentTagsEditMode,
  turnOffDocumentTagsEditMode: turnOffDocumentTagsEditMode,
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'titleEditModeOn', 'tagsEditModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnDocumentPageTitleEditMode',
      'turnOffDocumentPageTitleEditMode',
      'turnOnDocumentTagsEditMode',
      'turnOffDocumentTagsEditMode',
    ]),
    titleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.titleEditModeOn,
      onSaveForm: dispatchProps.onSaveFormTitle,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentPageTitleEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentPageTitleEditMode,
    },
    tagsEditWrapperStateProps: {
      fields: stateProps.editableFields,
      autoSave: true,
      sectionEditModeOn: true,
      onSaveForm: dispatchProps.onSaveFormTags,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentTagsEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentTagsEditMode,
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(DocumentPage);
