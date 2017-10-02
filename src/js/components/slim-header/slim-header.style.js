import { mediumGrayColor, softBlackColor } from 'utils/styles';

export const slimHeaderStyle = {
  height: '22px',
  lineHeight: '22px',
  padding: '0 16px',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  position: 'fixed',
  zIndex: 1,
  width: 'inherit'
};

const linkStyle = {
  textDecoration: 'none',
  fontSize: '12px',
  color: mediumGrayColor,
  fontWeight: 500
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
