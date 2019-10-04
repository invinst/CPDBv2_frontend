import { connect } from 'react-redux';

import SocialGraphPage from 'components/social-graph-page';
import { getCurrentMainTab } from 'selectors/social-graph-page';
import { changeMainTab } from 'actions/social-graph-page';
import { updatePathName } from 'actions/path-name';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    currentTab: getCurrentMainTab(state),
    pinboardId: ownProps.params.pinboardId || ownProps.location.query['pinboard_id'],
  };
}

const mapDispatchToProps = {
  changeMainTab,
  updatePathName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
