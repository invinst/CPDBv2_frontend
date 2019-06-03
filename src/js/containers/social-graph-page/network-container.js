import { connect } from 'react-redux';

import NetworkGraph from 'components/social-graph-page/network';
import {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestSocialGraphOfficers,
  changeMainTab,
  changeNetworkTab,
  updateOfficerId
} from 'actions/social-graph-page';

import {
  hasComplaintSelector,
  getCurrentMainTab,
  getCurrentNetworkTab,
} from 'selectors/social-graph-page';

import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
  networkOfficerSelector
} from 'selectors/social-graph-page/network';

function mapStateToProps(state, ownProps) {
  return {
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    pinboardId: ownProps.location.query['pinboard_id'],
    title: ownProps.location.query['title'],
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
    hasComplaint: hasComplaintSelector(state),
    currentMainTab: getCurrentMainTab(state),
    currentNetworkTab: getCurrentNetworkTab(state),
    officer: networkOfficerSelector(state),
    location: ownProps.location,
  };
}

const mapDispatchToProps = {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestSocialGraphOfficers,
  changeMainTab,
  changeNetworkTab,
  updateOfficerId
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkGraph);
