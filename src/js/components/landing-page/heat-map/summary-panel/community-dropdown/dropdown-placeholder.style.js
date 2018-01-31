import { accentColor, hawkesBlue, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  border: `1px solid ${accentColor}`,
  backgroundColor: hawkesBlue,
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 300,
  color: accentColor,
  padding: '23px 16px 11px 16px',
  cursor: 'pointer'
};

export const firstRowStyle = {
  paddingBottom: '21px',
};

export const secondRowStyle = {
  paddingTop: '9px',
  borderTop: `1px solid ${accentColor}`
};

export const firstRowTextStyle = {
  display: 'inline-block',
  width: 'calc(100% - 14px)',
  verticalAlign: 'middle'
};

export const arrowDownStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '14px',
  height: '9px',
  background: `url("${imgUrl('arrow-down-blue.svg')}") 0px 0px no-repeat scroll`
};
