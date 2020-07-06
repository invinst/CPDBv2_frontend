import { connect } from 'react-redux';

import {
  trrSummarySelector,
  getTRRSummaryRequesting,
} from 'selectors/pinboard-page/widgets/trr-summary';
import { SummaryWidgetWithSpinner } from 'components/common/pinboard/widgets/summary-widget';


function mapStateToProps(state, ownProps) {
  return {
    requesting: getTRRSummaryRequesting(state),
    summaryItems: trrSummarySelector(state),
  };
}

export default connect(mapStateToProps)(SummaryWidgetWithSpinner);
