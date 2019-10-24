import { connect } from 'react-redux';

import { pinboardSavingSelector } from 'selectors/pinboard-page/pinboard';
import PinboardLink from 'components/pinboard-page/pinboard-link';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    saving: pinboardSavingSelector(state),
  };
}

export default connect(mapStateToProps, {})(PinboardLink);
