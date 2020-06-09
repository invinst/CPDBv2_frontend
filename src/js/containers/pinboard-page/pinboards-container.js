import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { pinboardsSelector, getShowPinboardsList } from 'selectors/pinboard-page/pinboards';
import PinboardsWithOverlay from 'components/pinboard-page/pinboards';
import { hidePinboardList } from 'actions/pinboard-page';
import { createNewEmptyPinboard, duplicatePinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboards: pinboardsSelector(state),
    isShown: getShowPinboardsList(state),
  };
}

const mapDispatchToProps = {
  handleClose: hidePinboardList,
  createNewEmptyPinboard,
  duplicatePinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardsWithOverlay));
