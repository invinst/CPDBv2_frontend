import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AllegationsMapWithSpinner } from 'components/common/allegations-map';
import {
  mapMarkerGroupsSelector,
  getClearAllMarkers,
  geographicDataRequestingSelector,
  geographicDataLoadingSelector,
} from 'selectors/pinboard-page/geographic-data';

function mapStateToProps(state, ownProps) {
  return {
    showLegends: false,
    mapCustomClassName: 'pinboard-map',
    attributionControlPosition: 'top-right',
    navigationControlPosition: 'top-right',
    markerGroups: mapMarkerGroupsSelector(state),
    clearAllMarkers: getClearAllMarkers(state),
    requesting: geographicDataRequestingSelector(state),
    geographicDataLoading: geographicDataLoadingSelector(state),
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMapWithSpinner));
