import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getPinboards, getShowPinboardsList } from 'selectors/pinboard-page/pinboards';
import PinboardsWithOverlay from 'components/pinboard-page/pinboards';
import { fetchPinboards, hidePinboardList } from 'actions/pinboard-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboards: getPinboards(state),
    isShown: getShowPinboardsList(state),
  };
}

const mapDispatchToProps = {
  fetchPinboards,
  handleClose: hidePinboardList,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardsWithOverlay));
