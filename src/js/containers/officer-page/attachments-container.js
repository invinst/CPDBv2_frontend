import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AttachmentsTab from 'components/officer-page/tabbed-pane-section/attachments-tab';
import { complaintsWithAttachmentsSelector } from 'selectors/officer-page/attachments';
import { changeFilter } from 'actions/officer-page/new-timeline';
import { trackingClickAttachment } from 'actions/common/analytic';
import { getOfficerId } from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    complaints: complaintsWithAttachmentsSelector(state),
    officerId: getOfficerId(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
  onTrackingAttachment: trackingClickAttachment,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AttachmentsTab));
