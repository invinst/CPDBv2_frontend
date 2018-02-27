import { softBlackColor, whiteTwoColor, accentColor, concreteColor } from 'utils/styles';

export const contentWrapperStyle = {
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  position: 'relative',
  height: 'calc(100vh - 53px)',
  width: 'calc(100% - 320px)',
  overflowX: 'auto',
  display: 'inline-block',
};

export const searchTermWrapperStyle = {
  background: concreteColor,
};

export const searchTermTitleStyle = {
  fontSize: '26px',
  padding: '48px 0 16px 0',
  margin: '0 16px',
  fontWeight: 300,
  color: softBlackColor,
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
  padding: '128px 16px 0 16px',
};

export const minimumStyle = {
  width: '100%',
};

export const mediumStyle = {
  maxWidth: '699px',
};

export const maximumStyle = {
  maxWidth: '1440px',
};
