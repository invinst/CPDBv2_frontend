import { BottomSheetContentType } from 'utils/constants';


export function contentSelector(state, props) {
  const { params } = props;
  const { reportId, faqId, officerId, crid } = params;

  if (reportId) {
    return { props: { id: reportId }, type: BottomSheetContentType.REPORT };
  }
  if (faqId) {
    return { props: { id: faqId }, type: BottomSheetContentType.FAQ };
  }
  if (crid) {
    return { props: { crid, officerId }, type: BottomSheetContentType.CR };
  }
  if (officerId) {
    return { props: { id: officerId }, type: BottomSheetContentType.OFFICER };
  }
  return null;
}
