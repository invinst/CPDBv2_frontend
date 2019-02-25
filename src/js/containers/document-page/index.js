import { connect } from 'react-redux';

import DocumentPage from 'components/document-page';
import { documentSelector, getTitleEditModeOn } from 'selectors/document-page';
import { mergeEditWrapperStateProps } from 'utils/container';
import { updateDocument } from 'actions/document-pape';
import { turnOnDocumentPageTitleEditMode, turnOffDocumentPageTitleEditMode } from 'actions/document-pape';


function mapStateToProps(state, ownProps) {
  console.warn('ownProps', ownProps)
  return {
    ...ownProps,
    ...documentSelector(state),
    fields: documentSelector(state),
    sectionEditModeOn: getTitleEditModeOn(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updateDocument,
  turnOnSectionEditMode: turnOnDocumentPageTitleEditMode,
  turnOffSectionEditMode: turnOffDocumentPageTitleEditMode,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeEditWrapperStateProps)(DocumentPage);
