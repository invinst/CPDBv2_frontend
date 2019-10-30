import { connect } from 'react-redux';

import { hasPendingChangesSelector } from 'selectors/pinboard-page/pinboard';
import PinboardLink from 'components/pinboard-page/pinboard-link';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    hasPendingChanges: hasPendingChangesSelector(state),
  };
}

export default connect(mapStateToProps, {})(PinboardLink);
