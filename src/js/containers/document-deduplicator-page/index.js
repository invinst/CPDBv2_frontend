import { connect } from 'react-redux';

import {
  documentsSelector
} from 'selectors/document-deduplicator-page';
import DocumentsPage from 'components/document-deduplicator-page';
import { setDocumentShow } from 'actions/document-deduplicator-page.js';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    documents: documentsSelector(state)
  };
}

const mapDispatchToProps = {
  setDocumentShow
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
