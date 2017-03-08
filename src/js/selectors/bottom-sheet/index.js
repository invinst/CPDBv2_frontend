import { BottomSheetContentType } from 'utils/constants';


export function contentSelector(state, props) {
  const { params } = props;
  const { reportId, faqId } = params;

  if (reportId) {
    return { id: reportId, type: BottomSheetContentType.REPORT };
  }
  if (faqId) {
    return { id: faqId, type: BottomSheetContentType.FAQ };
  }
  return null;
}
