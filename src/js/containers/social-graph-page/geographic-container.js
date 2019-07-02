import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GeographicMap from 'components/social-graph-page/geographic';
import {
  mapLegendSelector,
  mapMarkersSelector,
  geographicAllegationSelector,
  geographicTRRSelector,
} from 'selectors/social-graph-page/geographic-data';
import { getCurrentMainTab } from 'selectors/social-graph-page';
import {
  changeMainTab,
  requestSocialGraphGeographic,
  requestSocialGraphGeographicPreviewPane,
  updateGeographicCrid,
  updateGeographicTrrId,
} from 'actions/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    legend: mapLegendSelector(state),
    markers: mapMarkersSelector(state),
    currentMainTab: getCurrentMainTab(state),
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
    allegation: geographicAllegationSelector(state),
    trr: geographicTRRSelector(state),
    pinboardId: ownProps.location.query['pinboard_id'],
  };
}

const mapDispatchToProps = {
  changeMainTab,
  requestSocialGraphGeographic,
  requestSocialGraphGeographicPreviewPane,
  updateGeographicCrid,
  updateGeographicTrrId,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeographicMap));
