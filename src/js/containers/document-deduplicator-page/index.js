import { connect } from 'react-redux';

import {
  documentsSelector, hasMoreSelector, nextParamsSelector,
} from 'selectors/document-deduplicator-page';
import DocumentsPage from 'components/document-deduplicator-page';
import { setDocumentShow, fetchDocumentsByCRID } from 'actions/document-deduplicator-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    documents: documentsSelector(state),
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state),
  };
}

const mapDispatchToProps = {
  setDocumentShow,
  fetchDocumentsByCRID,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
