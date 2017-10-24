import { mediumGrayColor, softBlackColor, clayGray } from 'utils/styles';

export const slimHeaderHeight = 22;

export const slimHeaderStyle = {
  height: `${slimHeaderHeight}px`,
  lineHeight: '22px',
  padding: '0 16px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  zIndex: 1,
  width: 'inherit'
};

const linkStyle = {
  textDecoration: 'none',
  fontSize: '12px',
  color: mediumGrayColor,
  fontWeight: 500,
  cursor: 'pointer'
};

export const leftLinkStyle = {
  ...linkStyle,
  fontWeight: 600
};

export const rightLinkStyle = {
  ...linkStyle,
  marginLeft: '50px'
};

export const activeLinkStyle = {
  color: softBlackColor
};

export const rightLinksWrapperStyle = {
  float: 'right'
};

export const outerStyle = {
  width: 'inherit'
};

export const subtitleStyle = {
  fontSize: '12px',
  color: clayGray,
  marginLeft: '4px'
};
