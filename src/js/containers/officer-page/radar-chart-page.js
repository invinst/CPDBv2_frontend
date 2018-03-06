import { connect } from 'react-redux';

import OfficerRadarDemoPage from 'components/officer-page/radar-chart-page';
import { fetchPercentile } from 'actions/officer-page/radar-chart';
import { getOfficerId } from 'selectors/officer-page';
import { officerYearlyThreePercentile } from 'selectors/officer-page/radar-chart';

function mapStateToProps(state, ownProps) {
  return {
    officerId: getOfficerId(state),
    threeCornerPercentile: officerYearlyThreePercentile(state)
  };
}

const mapDispatchToProps = {
  fetchPercentile
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerRadarDemoPage);
