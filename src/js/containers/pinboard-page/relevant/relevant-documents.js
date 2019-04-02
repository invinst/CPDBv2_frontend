import { connect } from 'react-redux';

import RelevantDocuments from 'components/pinboard-page/relevant/relevant-documents';
import {
  relevantDocumentsSelector,
  relevantDocumentsNextParamsSelector,
  relevantDocumentsHasMoreSelector
} from 'selectors/pinboard-page/relevant-documents';
import { fetchPinboardRelevantDocuments } from 'actions/pinboard';
import { getPinboardID } from 'utils/location';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboardId: getPinboardID(state.pathname),
    documents: relevantDocumentsSelector(state, ownProps),
    hasMore: relevantDocumentsHasMoreSelector(state, ownProps),
    nextParams: relevantDocumentsNextParamsSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchPinboardRelevantDocuments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelevantDocuments);
