import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import Attachments from 'components/officer-page/tabbed-pane-section/attachments-tab';
import { getComplaintsWithAttachments } from 'selectors/officer-page/attachments';
import { changeFilter } from 'actions/officer-page/new-timeline';
import { openComplaintPage } from 'actions/open-page';
import { getOfficerId } from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    complaints: getComplaintsWithAttachments(state),
    officerId: getOfficerId(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
  openComplaintPage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Attachments));
