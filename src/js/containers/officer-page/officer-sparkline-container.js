import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import Sparklines from 'components/common/sparklines';
import { selectMinimapItem } from 'actions/officer-page/timeline';
import { minimapSelector } from 'selectors/officer-page/timeline';
import { getOfficerId } from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    minimapItems: minimapSelector(state),
    officerId: getOfficerId(state)
  };
}

const mapDispatchToProps = {
  selectMinimapItem
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sparklines));
