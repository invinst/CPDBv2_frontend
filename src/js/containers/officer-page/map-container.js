import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Map from 'components/officer-page/tabbed-pane-section/map';
import { mapLegendSelector, mapMarkersSelector } from 'selectors/officer-page/map';
import { openTRRPage } from 'actions/open-page';

function mapStateToProps(state, ownProps) {
  return {
    legend: mapLegendSelector(state),
    markers: mapMarkersSelector(state)
  };
}

const mapDispatchToProps = {
  openTRRPage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Map));
