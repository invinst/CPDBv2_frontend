import { mediumGrayColor, softBlackColor, clayGray, accentColor, sugarCaneColor } from 'utils/styles';

const middleSlimHeaderHeight = 64;
const topSlimHeaderHeight = 102;
const leftPadding = 16;
const logoWidth = 288;
const rightLinkMargin = 46;

export const fixedStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1
};

const slimHeaderStyle = {
  padding: `0 ${leftPadding}px`,
  boxSizing: 'border-box',
  width: 'inherit',
  fontSize: '14px',
  lineHeight: '18px'
};

export const topSlimHeaderStyle = {
  ...slimHeaderStyle,
  height: `${topSlimHeaderHeight}px`,
};

export const middleSlimHeaderStyle = {
  ...slimHeaderStyle,
  height: `${middleSlimHeaderHeight}px`,
  boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.13)',
  // backgroundColor: 'white'
};

export const bottomSlimHeaderStyle = {
  ...topSlimHeaderStyle,
  cursor: 'pointer',
  // backgroundColor: accentColor
};

const linkStyle = {
  textDecoration: 'none',
  color: mediumGrayColor,
  fontWeight: 400,
  cursor: 'pointer'
};

export const topLeftLinkStyle = {
  ...linkStyle,
  color: softBlackColor
};

export const middleLeftLinkStyle = {
  ...linkStyle,
  color: softBlackColor
};

export const bottomLeftLinkStyle = {
  ...linkStyle,
  color: sugarCaneColor
};

const rightLinkStyle = {
  ...linkStyle,
  marginLeft: `${rightLinkMargin}px`
};

export const topRightLinkStyle = {
  ...rightLinkStyle,
  color: accentColor
};

export const middleRightLinkStyle = {
  ...rightLinkStyle,
  color: clayGray
};

export const bottomRightLinkStyle = {
  ...rightLinkStyle,
  color: 'white',
};

export const verticallyAlignedHeaderItemStyle = {
  float: 'right',
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};

export const logoWrapperStyle = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
  maxWidth: `${logoWidth}px`
};

const subtitleStyle = {
  fontSize: '14px',
  fontWeight: '300',
  width: `${logoWidth}px`,
  color: clayGray,
};

export const topSubtitleStyle = subtitleStyle;
export const middleSubtitleStyle = {
  ...subtitleStyle,
  display: 'none',
};
export const bottomSubtitleStyle = subtitleStyle;
