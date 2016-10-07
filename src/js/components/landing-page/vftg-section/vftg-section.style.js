import {
  softBlackColor, lightMineShaftColor, sanFranciscoTextFamily, accentColor, wildSandColor
} from 'utils/styles';
import { imgUrl } from 'utils/static-assets';


export const headerBlockStyle = {
  marginBottom: '26px'
};

export const headerStyle = {
  base: {
    fontFamily: sanFranciscoTextFamily,
    fontSize: '13px',
    fontWeight: 500,
    color: softBlackColor
  },
  extraWide: {
    fontSize: '14px'
  },
  desktop: {
    fontSize: '13px'
  },
  tablet: {
    fontSize: '12px'
  }
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
  fontWeight: 300
};

export const textHoverStyle = {
  color: softBlackColor,
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
  padding: '32px 16px 16px'
};

export const vftgWrapperEditModeStyle = {
  ...vftgWrapperStyle,
  backgroundColor: 'transparent'
};

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};

export const editWrapperLinkStyle = {
  fontSize: '13px'
};

export const linkStyle = {
  base: {
    paddingBottom: '3px',
    fontWeight: 300,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  extraWide: {
    fontSize: '14px'
  },
  desktop: {
    fontSize: '13px'
  },
  tablet: {
    fontSize: '12px'
  }
};
