import { connect } from 'react-redux';

import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';
import { heatMapDataRequestedSelector } from 'selectors/landing-page/heat-map';
import { isPinboardButtonIntroductionVisitedSelector } from 'selectors/pinboard-introduction';
import { visitPinboardButtonIntroduction } from 'actions/pinboard-introduction';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    heatMapDataRequested: heatMapDataRequestedSelector(state),
    isPinboardButtonIntroductionVisited: isPinboardButtonIntroductionVisitedSelector(state),
  };
}

const mapDispatchToProps = {
  visitPinboardButtonIntroduction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardButton);
