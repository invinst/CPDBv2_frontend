import { connect } from 'react-redux';

import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import { getSortedNetworkOfficers } from 'selectors/social-graph-page/network-officers';
import { updateOfficerId } from 'actions/social-graph-page';


function mapStateToProps(state, ownProps) {
  return {
    officers: getSortedNetworkOfficers(state, ownProps.sortedOfficerIds),
    updateOfficerId: ownProps.updateOfficerId,
  };
}

const mapDispatchToProps = {
  updateOfficerId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Officers);
