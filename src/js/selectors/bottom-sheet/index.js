import { BottomSheetContentType } from 'utils/constants';


export function contentSelector(state, props) {
  const { params } = props;
  const { reportId, faqId, officerId } = params;

  if (reportId) {
    return { id: reportId, type: BottomSheetContentType.REPORT };
  }
  if (faqId) {
    return { id: faqId, type: BottomSheetContentType.FAQ };
  }
  if (officerId) {
    return { id: officerId, type: BottomSheetContentType.OFFICER };
  }
  return null;
}
