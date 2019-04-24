import { connect } from 'react-redux';

import SocialGraphPage from 'components/social-graph-page';
import { requestSocialGraph, changeSocialGraphTab } from 'actions/social-graph-page';
import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
  getCurrentTab,
  hasComplaintSelector
} from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    title: ownProps.location.query['title'],
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
    currentTab: getCurrentTab(state),
    hasComplaint: hasComplaintSelector(state),
  };
}

const mapDispatchToProps = {
  requestSocialGraph,
  changeSocialGraphTab
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
