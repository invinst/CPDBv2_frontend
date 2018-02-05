import { softBlackColor, whiteTwoColor, accentColor } from 'utils/styles';

export const contentWrapperStyle = {
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  margin: '0 16px'
};

export const searchTermTitleStyle = {
  fontSize: '26px',
  padding: '48px 0 16px 0',
  fontWeight: 300,
  color: softBlackColor,
  borderBottom: `1px solid ${whiteTwoColor}`,
};

export const bottomLinkStyle = {
  height: '18px',
  padding: '11px 0',
  fontSize: '14px',
  fontWeight: 300,
  color: accentColor,
  borderTop: `1px solid ${whiteTwoColor}`,
  display: 'block',
  textDecoration: 'none',
};

export const bottomLinksWrapperStyle = {
  padding: '128px 0 126px 0',
};

export const minimumStyle = {
  width: '100%',
};

export const mediumStyle = {
  width: '699px',
};

export const maximumStyle = {
  width: '1440px',
};
