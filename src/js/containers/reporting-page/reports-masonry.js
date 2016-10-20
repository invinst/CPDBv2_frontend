import { connect } from 'react-redux';

import ReportsMasonry from 'components/reporting-page/reports-masonry';
import { requestReports } from 'actions/reporting-page';
import { openBottomSheetWithReport } from 'actions/bottom-sheet';
import { nextParamsSelector } from 'selectors/reporting-page';


function mapStateToProps(state, ownProps) {
  return {
    reportGroups: state.reportingPage.reportGrouping.groups,
    hasMore: !!state.reportingPage.pagination.next,
    nextParams: nextParamsSelector(state)
  };
}

const mapDispatchToProps = {
  loadMore: requestReports,
  onReportClick: openBottomSheetWithReport
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsMasonry);
