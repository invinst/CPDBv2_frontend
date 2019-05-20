import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard-page/pinboard';
import PinboardButton from 'components/search-page/pinboard/pinboard-button';


function mapStateToProps(state, ownProps) {
  return {
    pinboard: getPinboard(state),
  };
}

export default connect(mapStateToProps)(PinboardButton);
