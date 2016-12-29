import { OPEN_BOTTOM_SHEET_WITH_REPORT } from 'actions/bottom-sheet';
import { trackClickedReportingItem } from 'utils/intercom';


export default store => next => action => {
  if (action.type === OPEN_BOTTOM_SHEET_WITH_REPORT) {
    const report = action.payload;
    trackClickedReportingItem(report.id, report.title);
  }

  return next(action);
};
