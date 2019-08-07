import { connect } from 'react-redux';

import { OfficersWithSpinner } from 'components/social-graph-page/network/right-pane-section/officers';
import {
  sortedNetworkOfficersSelector,
  getNetworkOfficersRequesting,
} from 'selectors/social-graph-page/network-officers';
import { updateSelectedOfficerId } from 'actions/social-graph-page';


function mapStateToProps(state, ownProps) {
  return {
    officers: sortedNetworkOfficersSelector(state, ownProps),
    updateSelectedOfficerId: ownProps.updateSelectedOfficerId,
    requesting: getNetworkOfficersRequesting(state),
  };
}

const mapDispatchToProps = {
  updateSelectedOfficerId,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficersWithSpinner);
