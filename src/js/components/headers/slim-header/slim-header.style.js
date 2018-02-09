import { mediumGrayColor, clayGray, accentColor } from 'utils/styles';

const middleSlimHeaderHeight = 64;
const topSlimHeaderHeight = 102;
const leftPadding = 16;
const rightLinkMargin = 46;

export const fixedStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 3 // need to be at least 3 to cover Mapbox's controls & copyright text
};

export const middleWrapperStyle = {
  boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.13)',
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
};

export const bottomSlimHeaderStyle = {
  ...topSlimHeaderStyle,
  cursor: 'pointer',
};

const rightLinkStyle = {
  textDecoration: 'none',
  color: mediumGrayColor,
  fontWeight: 400,
  cursor: 'pointer',
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

export const logoWrapper = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)'
};
