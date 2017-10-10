import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Sparklines from 'components/common/sparklines';
import { getOfficerId } from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    officerId: getOfficerId(state)
  };
}

export default withRouter(connect(mapStateToProps, {})(Sparklines));
