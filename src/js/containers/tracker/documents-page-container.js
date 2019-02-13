import { connect } from 'react-redux';

import {
  documentsSelector,
  hasMoreSelector,
  nextParamsSelector
} from 'selectors/tracker/documents-page';
import DocumentsPage from 'components/tracker/documents-page';
import { fetchTrackerDocuments } from 'actions/tracker/documents-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    documents: documentsSelector(state),
    hasMore: hasMoreSelector(state),
    nextParams: nextParamsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchTrackerDocuments
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
