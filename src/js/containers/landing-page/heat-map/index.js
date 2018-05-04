import { connect } from 'react-redux';

import HeatMap from 'components/landing-page/heat-map';
import { communityGeoJSONSelector, communitiesSelector } from 'selectors/landing-page/heat-map';


function mapStateToProps(state) {
  return {
    communityGeoJSON: communityGeoJSONSelector(state),
    communities: communitiesSelector(state)
  };
}

export default connect(mapStateToProps, null)(HeatMap);
