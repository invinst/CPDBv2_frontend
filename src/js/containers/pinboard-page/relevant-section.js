import { connect } from 'react-redux';

import RelevantSection from 'components/pinboard-page/relevant';
import {
  relevantDocumentsSelector,
  relevantDocumentsNextParamsSelector,
  relevantDocumentsHasMoreSelector,
  getRequesting as getRequestingRelevantDocuments,
} from 'selectors/pinboard-page/relevant-documents';
import {
  relevantCoaccusalsSelector,
  relevantCoaccusalsNextParamsSelector,
  relevantCoaccusalsHasMoreSelector,
  getRequesting as getRequestingRelevantCoaccusals,
} from 'selectors/pinboard-page/relevant-coaccusals';
import {
  relevantComplaintsSelector,
  relevantComplaintsNextParamsSelector,
  relevantComplaintsHasMoreSelector,
  getRequesting as isRequestingRelevantComplaints,
} from 'selectors/pinboard-page/relevant-complaints';
import {
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemInPinboardPage,
} from 'actions/pinboard';
import { getPinboardID } from 'utils/location';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboardId: getPinboardID(state.pathname),
    documents: relevantDocumentsSelector(state, ownProps),
    documentHasMore: relevantDocumentsHasMoreSelector(state, ownProps),
    documentNextParams: relevantDocumentsNextParamsSelector(state, ownProps),
    coaccusals: relevantCoaccusalsSelector(state, ownProps),
    coaccusalHasMore: relevantCoaccusalsHasMoreSelector(state, ownProps),
    coaccusalNextParams: relevantCoaccusalsNextParamsSelector(state, ownProps),
    complaints: relevantComplaintsSelector(state, ownProps),
    complaintHasMore: relevantComplaintsHasMoreSelector(state, ownProps),
    complaintNextParams: relevantComplaintsNextParamsSelector(state, ownProps),
    isRequestingDocuments: getRequestingRelevantDocuments(state),
    isRequestingCoaccusals: getRequestingRelevantCoaccusals(state),
    isRequestingComplaints: isRequestingRelevantComplaints(state),
  };
}

const mapDispatchToProps = {
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemInPinboardPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelevantSection);
