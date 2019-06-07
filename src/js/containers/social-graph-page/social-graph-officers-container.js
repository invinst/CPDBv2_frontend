import { connect } from 'react-redux';

import Officers from 'components/social-graph-page/network/right-pane-section/officers';
import { networkOfficersSelector } from 'selectors/social-graph-page/network-officers';
import { updateOfficerId } from 'actions/social-graph-page';


function mapStateToProps(state, ownProps) {
  return {
    officers: networkOfficersSelector(state),
    updateOfficerId: ownProps.updateOfficerId
  };
}

const mapDispatchToProps = {
  updateOfficerId,
};

export default connect(mapStateToProps, mapDispatchToProps)(Officers);
