import { connect } from 'react-redux';

import { fetchAllPinboards } from 'actions/pinboard-admin';
import PinboardAdminPage from 'components/pinboard-admin-page';
import {
  allPinboardsSelector,
  allPinboardsNextParamsSelector,
  allPinboardsHasMoreSelector,
} from 'selectors/pinboard-admin';


function mapStateToProps(state, ownProps) {
  return {
    pinboards: allPinboardsSelector(state),
    nextParams: allPinboardsNextParamsSelector(state),
    hasMore: allPinboardsHasMoreSelector(state),
  };
}

const mapDispatchToProps = {
  fetchPinboards: fetchAllPinboards,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardAdminPage);
