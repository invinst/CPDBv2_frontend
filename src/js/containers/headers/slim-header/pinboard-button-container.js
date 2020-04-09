import { connect } from 'react-redux';

import PinboardButton from 'components/headers/slim-header/slim-header-content/pinboard-button';
import { heatMapDataRequestedSelector } from 'selectors/landing-page/heat-map';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    heatMapDataRequested: heatMapDataRequestedSelector(state),
  };
}

export default connect(mapStateToProps)(PinboardButton);
