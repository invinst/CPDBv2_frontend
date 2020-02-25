import { connect } from 'react-redux';
import queryString from 'query-string';

import SocialGraphPage from 'components/social-graph-page';
import { getCurrentMainTab } from 'selectors/social-graph-page';
import { changeMainTab } from 'actions/social-graph-page';
import { updatePathName } from 'actions/path-name';

function mapStateToProps(state, ownProps) {
  const query = queryString.parse(ownProps.location.search);
  return {
    location: ownProps.location,
    params: ownProps.match.params,
    currentTab: getCurrentMainTab(state),
    pinboardId: ownProps.match.params.pinboardId || query['pinboard_id'],
  };
}

const mapDispatchToProps = {
  changeMainTab,
  updatePathName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialGraphPage);
