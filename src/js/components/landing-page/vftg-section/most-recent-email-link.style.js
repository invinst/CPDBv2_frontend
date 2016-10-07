import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  marginBottom: '26px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  fontWeight: 700,
  color: softBlackColor,
  position: 'relative',
  display: 'inline-block',
  cursor: 'pointer',
  textDecoration: 'none'
};

export const iconStyle = {
  width: '26px',
  height: '22px',
  display: 'inline-block',
  verticalAlign: 'middle',
  marginLeft: '11px',
  marginRight: '16px',
  background: `url(${imgUrl('medium-icon.svg')}) center / cover`
};

export const iconHoverStyle = {
  ...iconStyle,
  background: `url(${imgUrl('medium-icon-colored.svg')}) center / cover`
};
