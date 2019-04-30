import { connect } from 'react-redux';

import SocialGraphPage from 'components/social-graph-page';
import { getCurrentMainTab } from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    currentTab: getCurrentMainTab(state),
  };
}

export default connect(mapStateToProps)(SocialGraphPage);
