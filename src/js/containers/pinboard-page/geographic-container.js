import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AllegationsMap from 'components/common/allegations-map';
import {
  mapMarkersSelector,
  getClearAllMarkers,
  geographicDataLoadingSelector,
} from 'selectors/pinboard-page/geographic-data';

function mapStateToProps(state, ownProps) {
  return {
    mapCustomClassName: 'pinboard-map',
    markers: mapMarkersSelector(state),
    clearAllMarkers: getClearAllMarkers(state),
    geographicDataLoading: geographicDataLoadingSelector(state),
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMap));
