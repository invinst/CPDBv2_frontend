import { mediumGrayColor, softBlackColor } from 'utils/styles';

export const SLIM_HEADER_HEIGHT = 22;

export const slimHeaderStyle = {
  height: `${SLIM_HEADER_HEIGHT}px`,
  lineHeight: '22px',
  padding: '0 16px',
  backgroundColor: 'white'
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '12px',
  fontWeight: 500
};

export const leftLinkStyle = {
  ...linkStyle,
  color: softBlackColor,
  fontWeight: 600
};

export const rightLinkStyle = {
  ...linkStyle,
  color: mediumGrayColor,
  marginLeft: '50px'
};

export const rightLinksWrapperStyle = {
  float: 'right'
};
