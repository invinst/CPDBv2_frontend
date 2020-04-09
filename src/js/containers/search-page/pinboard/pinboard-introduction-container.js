import { connect } from 'react-redux';

import PinboardIntroduction from 'components/search-page/pinboard/pinboard-introduction';
import { pinboardFeatureUsedSelector } from 'selectors/pinboard-page/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    pinboardFeatureUsed: pinboardFeatureUsedSelector(state),
  };
}

export default connect(mapStateToProps)(PinboardIntroduction);
