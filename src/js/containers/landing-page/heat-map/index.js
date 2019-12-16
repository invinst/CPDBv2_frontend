import { connect } from 'react-redux';

import HeatMap from 'components/landing-page/heat-map';
import { communityGeoJSONSelector, communitiesSelector, getClusterGeoJson } from 'selectors/landing-page/heat-map';


function mapStateToProps(state, props) {
  return {
    ...props,
    communityGeoJSON: communityGeoJSONSelector(state),
    communities: communitiesSelector(state),
    clusterGeoJson: getClusterGeoJson(state),
  };
}

export default connect(mapStateToProps, null)(HeatMap);
