import { connect } from 'react-redux';

import {
  complaintSummarySelector,
  getComplaintSummaryRequesting,
} from 'selectors/pinboard-page/widgets/complaint-summary';
import { SummaryWidgetWithSpinner } from 'components/common/pinboard/widgets/summary-widget';


function mapStateToProps(state, ownProps) {
  return {
    requesting: getComplaintSummaryRequesting(state),
    summaryItems: complaintSummarySelector(state),
  };
}

export default connect(mapStateToProps)(SummaryWidgetWithSpinner);
