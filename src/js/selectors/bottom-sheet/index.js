import { BottomSheetContentType } from 'utils/constants';


export function contentSelector(state, props) {
  const { params } = props;
  const { reportId } = params;

  if (reportId) {
    return { props: { id: reportId }, type: BottomSheetContentType.REPORT };
  }

  return null;
}
