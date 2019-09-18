import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GeographicMap from 'components/social-graph-page/geographic';
import {
  mapLegendSelector,
  mapMarkersSelector,
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
  return {
    legend: mapLegendSelector(state),
    markers: mapMarkersSelector(state),
    mainTabsContent: ownProps.mainTabsContent,
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    allegation: geographicAllegationSelector(state),
    trr: geographicTRRSelector(state),
    pinboardId: ownProps.location.query['pinboard_id'],
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
