import { connect } from 'react-redux';

import NetworkGraph from 'components/social-graph-page/network';
import {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestSocialGraphOfficers,
  changeNetworkTab,
  updateSelectedOfficerId,
  updateSocialGraphSelectedEdge,
  updateSocialGraphSelectedCrid,
} from 'actions/social-graph-page';
import {
  getShowTimelineTab,
  getCurrentNetworkTab,
} from 'selectors/social-graph-page';
import { getSelectedEdge, getSelectedOfficerId, getSelectedCrid } from 'selectors/social-graph-page/network';
import { getNetworkPreviewPaneData } from 'selectors/social-graph-page/network-preview-pane';
import { trackingClickAttachment } from 'actions/common/analytic';

function mapStateToProps(state, ownProps) {
  return {
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    pinboardId: ownProps.location.query['pinboard_id'],
    title: ownProps.location.query['title'],
    showTimelineTab: getShowTimelineTab(state),
    currentNetworkTab: getCurrentNetworkTab(state),
    selectedOfficerId: getSelectedOfficerId(state),
    selectedEdge: getSelectedEdge(state),
    mainTabsContent: ownProps.mainTabsContent,
    location: ownProps.location,
    networkPreviewPaneData: getNetworkPreviewPaneData(state),
    selectedCrid: getSelectedCrid(state),
  };
}

const mapDispatchToProps = {
  requestSocialGraphNetwork,
  requestSocialGraphAllegations,
  requestSocialGraphOfficers,
  changeNetworkTab,
  updateSelectedOfficerId,
  updateSelectedEdge: updateSocialGraphSelectedEdge,
  onTrackingAttachment: trackingClickAttachment,
  updateSelectedCrid: updateSocialGraphSelectedCrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkGraph);
