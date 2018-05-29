import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Map from 'components/officer-page/tabbed-pane-section/map';
import { getMapLegend, getMapMarkers } from 'selectors/officer-page/map';

function mapStateToProps(state, ownProps) {
  return {
    legend: getMapLegend(state),
    markers: getMapMarkers(state)
  };
}

export default withRouter(connect(mapStateToProps)(Map));
