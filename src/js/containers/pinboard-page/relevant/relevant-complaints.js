import { connect } from 'react-redux';

import RelevantComplaints from 'components/pinboard-page/relevant/relevant-complaints';
import {
  relevantComplaintsSelector,
  relevantComplaintsNextParamsSelector,
  relevantComplaintsHasMoreSelector
} from 'selectors/pinboard-page/relevant-complaints';
import { fetchPinboardRelevantComplaints } from 'actions/pinboard';
import { getPinboardID } from 'utils/location';
import { addItemInPinboardPage } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboardId: getPinboardID(state.pathname),
    complaints: relevantComplaintsSelector(state, ownProps),
    hasMore: relevantComplaintsHasMoreSelector(state, ownProps),
    nextParams: relevantComplaintsNextParamsSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchPinboardRelevantComplaints,
  addItemInPinboardPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelevantComplaints);
