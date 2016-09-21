import {
  softBlackColor, codGrayColor, lightMineShaftColor, sanFranciscoTextFamily, accentColor, wildSandColor
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const headerBlockStyle = {
  marginBottom: '26px'
};

export const headerStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  fontWeight: 300,
  color: codGrayColor
};

export const dateStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  color: lightMineShaftColor,
  marginLeft: '6px'
};

export const textStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '20px',
  fontWeight: 100,
  color: softBlackColor,
  cursor: 'pointer',
  textDecoration: 'none',
  ':hover': {
    color: accentColor
  }
};

export const textStyleExtraWide = {
  ...textStyle,
  fontSize: '26px'
};

export const textStyleDesktop = {
  ...textStyle
};

export const newsWrapperStyle = {
  marginBottom: '26px'
};

export const formHeaderBlockStyle = {
  marginBottom: '26px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  fontWeight: 700,
  color: softBlackColor,
  position: 'relative'
};

export const iconStyle = {
  width: '26px',
  height: '22px',
  display: 'inline-block',
  verticalAlign: 'middle',
  marginLeft: '11px',
  marginRight: '16px',
  background: `url(${imgUrl('medium-icon.svg')}) center / cover`,
  ':hover': {
    background: `url(${imgUrl('medium-icon-colored.svg')}) center / cover`
  }
};

export const formHeaderStyle = {
  paddingBottom: '3px',
  fontWeight: 100,
  display: 'inline-block',
  verticalAlign: 'middle'
};

export const vftgWrapperStyle = {
  padding: '30px 26px 32px',
  backgroundColor: wildSandColor
};

export const wrapperStyle = {
  boxSizing: 'border-box',
  backgroundColor: wildSandColor,
  paddingBottom: 0,
  margin: '16px'
};
