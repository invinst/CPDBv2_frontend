import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import { coaccusalGroupsSelector } from 'selectors/officer-page/coaccusals';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    coaccusalGroups: coaccusalGroupsSelector(state),
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard: addOrRemoveItemInPinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
