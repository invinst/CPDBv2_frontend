import { connect } from 'react-redux';

import {
  documentsSelector,
  hasMoreSelector,
  nextParamsSelector,

} from 'selectors/documents-overview-page';
import { fetchDocuments } from 'actions/documents-overview-page';
import DocumentsPage from 'components/documents-overview-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    documents: documentsSelector(state),
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state)
  };
}

const mapDispatchToProps = {
  fetchDocuments
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
