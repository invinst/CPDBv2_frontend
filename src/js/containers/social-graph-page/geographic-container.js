import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import GeographicMap from 'components/social-graph-page/geographic';
import { mapLegendSelector, mapMarkersSelector } from 'selectors/social-graph-page/geographic-data';
import { getCurrentMainTab } from 'selectors/social-graph-page';
import { changeMainTab, requestGeographic } from 'actions/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    mapCustomClassName: 'social-graph-map',
    legend: mapLegendSelector(state),
    markers: mapMarkersSelector(state),
    currentMainTab: getCurrentMainTab(state),
    officerIds: ownProps.location.query['officer_ids'],
    unitId: ownProps.location.query['unit_id'],
  };
}

const mapDispatchToProps = {
  changeMainTab,
  requestGeographic
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GeographicMap));
