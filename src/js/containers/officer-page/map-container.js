import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AllegationsMap from 'components/common/allegations-map';
import { mapLegendSelector, mapMarkersSelector } from 'selectors/officer-page/map';

function mapStateToProps(state, ownProps) {
  return {
    legend: mapLegendSelector(state),
    markers: mapMarkersSelector(state),
    mapCustomClassName: 'officer-allegations-map',
  };
}

export default withRouter(connect(mapStateToProps)(AllegationsMap));
