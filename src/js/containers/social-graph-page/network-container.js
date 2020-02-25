import { connect } from 'react-redux';
import queryString from 'query-string';

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
  const query = queryString.parse(ownProps.location.search);
  return {
    officerIds: query['officer_ids'],
    unitId: query['unit_id'],
    pinboardId: ownProps.params.pinboardId || query['pinboard_id'],
    title: query['title'],
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
