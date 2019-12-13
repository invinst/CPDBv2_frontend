import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AllegationsMap from 'components/common/allegations-map';
import { mapLegendSelector, mapMarkerGroupsSelector } from 'selectors/officer-page/map';

function mapStateToProps(state, ownProps) {
  return {
    legend: mapLegendSelector(state),
    markerGroups: mapMarkerGroupsSelector(state),
    mapCustomClassName: 'officer-allegations-map',
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMap));
