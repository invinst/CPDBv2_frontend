import { softBlackColor, mediumGrayColor, whiteTwoColor, accentColor, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  marginLeft: '8px',
  padding: '12px 10px 12px 8px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  cursor: 'pointer'
};

export const abbrNameStyle = hovering => ({
  fontWeight: 600,
  color: hovering ? accentColor : softBlackColor,
  marginRight: '8px',
  display: 'inline-block'
});

export const extraInfoStyle = hovering => ({
  fontWeight: 400,
  color: hovering ? accentColor : mediumGrayColor,
  display: 'inline-block'
});

export const arrowStyle = hovering => ({
  background: hovering ?
    `url("${imgUrl('disclosure-indicator-blue.svg')}") 14px 0 no-repeat scroll`:
    `url("${imgUrl('disclosure-indicator.svg')}") 14px 0 no-repeat scroll`,
  width: '22px',
  height: '13px',
  verticalAlign: 'middle',
  display: 'inline-block',
  float: 'right'
});
