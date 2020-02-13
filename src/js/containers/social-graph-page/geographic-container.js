import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import GeographicMap from 'components/social-graph-page/geographic';
import {
  mapLegendSelector,
  mapMarkerGroupsSelector,
  geographicAllegationSelector,
  geographicTRRSelector,
  isRequestedSelector,
} from 'selectors/social-graph-page/geographic-data';
import {
  requestFirstPageSocialGraphGeographicCrs,
  requestOtherPagesSocialGraphGeographicCrs,
  requestFirstPageSocialGraphGeographicTrrs,
  requestOtherPagesSocialGraphGeographicTrrs,
  requestFirstPageSocialGraphGeographicCrsPreviewPane,
  requestOtherPagesSocialGraphGeographicCrsPreviewPane,
  requestFirstPageSocialGraphGeographicTrrsPreviewPane,
  requestOtherPagesSocialGraphGeographicTrrsPreviewPane,
  updateGeographicCrid,
  updateGeographicTrrId,
} from 'actions/social-graph-page';

function mapStateToProps(state, ownProps) {
  const query = queryString.parse(ownProps.location.search);
  return {
    legend: mapLegendSelector(state),
    markerGroups: mapMarkerGroupsSelector(state),
    mainTabsContent: ownProps.mainTabsContent,
    officerIds: query['officer_ids'],
    unitId: query['unit_id'],
    allegation: geographicAllegationSelector(state),
    trr: geographicTRRSelector(state),
    pinboardId: ownProps.match.params.pinboardId || query['pinboard_id'],
    isRequested: isRequestedSelector(state),
  };
}

const mapDispatchToProps = {
  requestFirstPageSocialGraphGeographicCrs,
  requestOtherPagesSocialGraphGeographicCrs,
  requestFirstPageSocialGraphGeographicTrrs,
  requestOtherPagesSocialGraphGeographicTrrs,
  requestFirstPageSocialGraphGeographicCrsPreviewPane,
  requestOtherPagesSocialGraphGeographicCrsPreviewPane,
  requestFirstPageSocialGraphGeographicTrrsPreviewPane,
  requestOtherPagesSocialGraphGeographicTrrsPreviewPane,
  updateGeographicCrid,
  updateGeographicTrrId,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeographicMap));
