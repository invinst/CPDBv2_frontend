import { connect } from 'react-redux';

import PinboardIntroduction from 'components/search-page/pinboard/pinboard-introduction';
import { pinboardFeatureUsedSelector } from 'selectors/pinboard-page/pinboard';
import { isPinboardIntroductionVisitedSelector } from 'selectors/pinboard-introduction';
import { visitPinboardIntroduction } from 'actions/pinboard-introduction';


function mapStateToProps(state, ownProps) {
  return {
    pinboardFeatureUsed: pinboardFeatureUsedSelector(state),
    isPinboardIntroductionVisited: isPinboardIntroductionVisitedSelector(state),
  };
}

const mapDispatchToProps = {
  visitPinboardIntroduction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardIntroduction);
