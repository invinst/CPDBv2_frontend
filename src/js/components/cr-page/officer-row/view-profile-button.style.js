import { mediumGrayColor, accentColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const viewOfficerButtonWrapperStyle = hovering => ({
  paddingRight: '19px',
  fontWeight: 400,
  color: hovering ? accentColor : mediumGrayColor,
  display: 'inline-block',
  cursor: 'pointer',
  float: 'right'
});

export const textStyle = {
  height: '32px',
  lineHeight: '32px'
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
