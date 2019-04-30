import { connect } from 'react-redux';

import NetworkGraph from 'components/social-graph-page/network';
import {
  requestSocialGraph,
  requestSocialGraphAllegations,
  changeMainTab,
  changeNetworkTab
} from 'actions/social-graph-page';
import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
  hasComplaintSelector,
  getCurrentMainTab,
  getCurrentNetworkTab,
} from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    title: ownProps.location.query['title'],
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
    hasComplaint: hasComplaintSelector(state),
    currentMainTab: getCurrentMainTab(state),
    currentNetworkTab: getCurrentNetworkTab(state),
  };
}

const mapDispatchToProps = {
  requestSocialGraph,
  requestSocialGraphAllegations,
  changeMainTab,
  changeNetworkTab
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkGraph);
