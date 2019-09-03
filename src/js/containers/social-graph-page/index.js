import { connect } from 'react-redux';

import SocialGraphPage from 'components/social-graph-page';
import { getCurrentMainTab } from 'selectors/social-graph-page';
import { changeMainTab } from 'actions/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    currentTab: getCurrentMainTab(state),
    pinboardId: ownProps.location.query['pinboard_id'],
  };
}

const mapDispatchToProps = {
  changeMainTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
