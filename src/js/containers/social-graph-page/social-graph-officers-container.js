import { connect } from 'react-redux';

import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import { networkOfficersSelector } from 'selectors/social-graph-page/network-officers';

function mapStateToProps(state, ownProps) {
  return {
    officers: networkOfficersSelector(state),
    updateOfficerId: ownProps.updateOfficerId
  };
}

export default connect(mapStateToProps)(Officers);
