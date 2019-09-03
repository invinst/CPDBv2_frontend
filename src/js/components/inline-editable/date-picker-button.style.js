import {
  sanFranciscoTextFamily, mistyRoseColor, lightMineShaftColor, tomatoPinkColor,
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const buttonStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: mistyRoseColor,
  marginLeft: '8px',
  cursor: 'pointer',
  display: 'inline-block',
  verticalAlign: 'middle',
  border: '1px solid white',
};

export const iconStyle = {
  display: 'inline-block',
  width: '24px',
  height: '22px',
  background: `url("${imgUrl('date-picker-pink.svg')}") no-repeat scroll center`,
};

export const hoveredButtonStyle = {
  ...buttonStyle,
  backgroundColor: tomatoPinkColor,
};

export const dateStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  color: lightMineShaftColor,
  marginLeft: '6px',
  width: '90px',
  height: '15px',
  display: 'inline-block',
};
