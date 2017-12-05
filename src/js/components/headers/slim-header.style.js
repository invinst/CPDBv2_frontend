import { mediumGrayColor, softBlackColor, clayGray, accentColor, whiteTwoColor } from 'utils/styles';

const middleSlimHeaderHeight = 40;
const topSlimHeaderHeight = 64;
const leftPadding = 16;

const slimHeaderStyle = {
  padding: `0 ${leftPadding}px`,
  boxSizing: 'border-box',
  width: 'inherit',
  fontSize: '14px',
};

export const topSlimHeaderStyle = {
  ...slimHeaderStyle,
  height: `${topSlimHeaderHeight}px`,
  lineHeight: `${topSlimHeaderHeight}px`,
};

export const middleSlimHeaderStyle = {
  ...slimHeaderStyle,
  height: `${middleSlimHeaderHeight}px`,
  lineHeight: `${middleSlimHeaderHeight}px`,
  boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.13)',
  backgroundColor: 'white'
};

export const bottomSlimHeaderStyle = {
  ...topSlimHeaderStyle,
  cursor: 'pointer',
  backgroundColor: accentColor
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
  color: whiteTwoColor
};

export const topRightLinkStyle = {
  ...linkStyle,
  marginLeft: '50px',
  color: accentColor
};

export const middleRightLinkStyle = {
  ...linkStyle,
  marginLeft: '50px',
  color: clayGray
};

export const bottomRightLinkStyle = {
  ...linkStyle,
  marginLeft: '50px',
  color: whiteTwoColor
};

export const rightLinksWrapperStyle = {
  float: 'right'
};

export const outerStyle = {
  width: 'inherit'
};

export const subtitleStyle = {
  color: clayGray,
  marginLeft: `${leftPadding}px`,
  fontSize: '14px',
  fontWeight: '300',
  marginTop: '-22px'
};
