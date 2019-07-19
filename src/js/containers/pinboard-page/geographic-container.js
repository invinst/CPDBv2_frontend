import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import {
  mapLegendSelector,
  mapMarkersSelector,
  getGeographicDataRequesting,
  getClearAllMarkers,
} from 'selectors/pinboard-page/geographic-data';

function mapStateToProps(state, ownProps) {
  return {
    mapCustomClassName: 'pinboard-map',
    legend: mapLegendSelector(state),
    markers: mapMarkersSelector(state),
    requesting: getGeographicDataRequesting(state),
    clearAllMarkers: getClearAllMarkers(state),
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMapWithSpinner));
