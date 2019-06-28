import { connect } from 'react-redux';

import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import { sortedNetworkOfficersSelector } from 'selectors/social-graph-page/network-officers';
import { updateOfficerId } from 'actions/social-graph-page';


function mapStateToProps(state, ownProps) {
  return {
    officers: sortedNetworkOfficersSelector(state, ownProps),
    updateOfficerId: ownProps.updateOfficerId,
  };
}

const mapDispatchToProps = {
  updateOfficerId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Officers);
