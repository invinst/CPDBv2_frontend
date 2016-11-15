import { connect } from 'react-redux';

import ReportsMasonry from 'components/reporting-page/reports-masonry';
import { requestReports } from 'actions/reporting-page';
import { openBottomSheetWithReport, openBottomSheetToCreateReport } from 'actions/bottom-sheet';
import { nextParamsSelector, groupsSelector } from 'selectors/reporting-page';


function mapStateToProps(state, ownProps) {
  return {
    reportGroups: groupsSelector(state),
    hasMore: !!state.reportingPage.pagination.next,
    nextParams: nextParamsSelector(state)
  };
}

const mapDispatchToProps = {
  loadMore: requestReports,
  onReportClick: openBottomSheetWithReport,
  onAddReportClick: openBottomSheetToCreateReport
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsMasonry);
