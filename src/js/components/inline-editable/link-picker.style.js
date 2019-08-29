import {
  softBlackColor, mistyRoseColor, fashionPinkColor, pinkishWhiteColor,
  softGreenColor, tomatoPinkColor,
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const wrapperStyle = {
  position: 'relative',
  display: 'inline-block',
};

export const linkButtonStyle = {
  width: '24px',
  height: '24px',
  backgroundColor: mistyRoseColor,
  marginLeft: '8px',
  verticalAlign: 'middle',
  cursor: 'pointer',
  border: '1px solid white',
  display: 'inline-block',
};

export const hoveredLinkButtonStyle = {
  ...linkButtonStyle,
  backgroundColor: tomatoPinkColor,
};

export const iconStyle = {
  display: 'inline-block',
  width: '24px',
  height: '24px',
  background: `url("${imgUrl('link-pink.svg')}") 5px 9px no-repeat scroll`,
};

export const popupWrapperStyle = {
  position: 'absolute',
  padding: '16px',
  backgroundColor: pinkishWhiteColor,
  boxShadow: `0 2px 4px 0 ${softGreenColor}`,
  zIndex: 25,
  top: '27px',
  right: '-190px',
};

export const linkInputStyle = {
  border: `1px solid ${fashionPinkColor}`,
  color: softBlackColor,
  width: '334px',
  height: '26px',
};
