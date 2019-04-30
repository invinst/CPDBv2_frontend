import { connect } from 'react-redux';

import OfficersSection from 'components/social-graph-page/network/right-pane-section/officers-section';
import { officersSelector } from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    officers: officersSelector(state),
  };
}

export default connect(mapStateToProps)(OfficersSection);
