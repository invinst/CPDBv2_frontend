import { connect } from 'react-redux';

import HeatMap from 'components/embeddable-heat-map';
import { communityGeoJSONSelector, communitiesSelector, getClusterGeoJson } from 'selectors/landing-page/heat-map';


function mapStateToProps(state) {
  return {
    communityGeoJSON: communityGeoJSONSelector(state),
    communities: communitiesSelector(state),
    clusterGeoJson: getClusterGeoJson(state)
  };
}

export default connect(mapStateToProps, null)(HeatMap);
