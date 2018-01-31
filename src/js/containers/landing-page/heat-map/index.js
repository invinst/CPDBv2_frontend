import { connect } from 'react-redux';

import HeatMap from 'components/landing-page/heat-map';
import { communityGeoJSONSelector, communitiesSelector } from 'selectors/landing-page/heat-map';
import { getCommunities } from 'actions/landing-page/heat-map';


function mapStateToProps(state) {
  return {
    communityGeoJSON: communityGeoJSONSelector(state),
    communities: communitiesSelector(state)
  };
}

const mapDispatchToProps = {
  getCommunities
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatMap);
