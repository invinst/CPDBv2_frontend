import { BottomSheetContentType } from 'utils/constants';


export function contentSelector(state, props) {
  const { params } = props;
  const { reportId, faqId } = params;

  if (reportId) {
    return { props: { id: reportId }, type: BottomSheetContentType.REPORT };
  }
  if (faqId) {
    return { props: { id: faqId }, type: BottomSheetContentType.FAQ };
  }

  return null;
}
