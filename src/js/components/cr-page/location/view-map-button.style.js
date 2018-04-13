import { mediumGrayColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const viewMapButtonStyle = hovering => ({
  fontWeight: 400,
  color: hovering ? accentColor : mediumGrayColor,
  display: 'inline-block',
  cursor: 'pointer',
  float: 'right',
  textDecoration: 'none'
});

export const textStyle = {
  verticalAlign: 'middle'
};

export const arrowStyle = hovering => ({
  background: hovering ?
    `url("${imgUrl('disclosure-indicator-blue.svg')}") 14px 0 no-repeat scroll`:
    `url("${imgUrl('disclosure-indicator.svg')}") 14px 0 no-repeat scroll`,
  width: '8px',
  height: '13px',
  verticalAlign: 'middle',
  paddingRight: '14px',
  display: 'inline-block'
});
