import { softBlackColor, whiteTwoColor, accentColor } from 'utils/styles';

export const contentWrapperStyle = {
  paddingTop: '30px',
  boxSizing: 'border-box',
  height: 'calc(100vh - 95px)',
  whiteSpace: 'nowrap',
  margin: '0 16px'
};

export const searchTermTitleStyle = {
  width: '668px',
  fontSize: '26px',
  padding: '48px 0 16px 0',
  margin: '0 16px',
  fontWeight: 500,
  color: softBlackColor,
  borderBottom: `2px solid ${whiteTwoColor}`,
};

export const bottomLinkStyle = {
  width: '100wh',
  height: '18px',
  padding: '11px 0',
  fontSize: '14px',
  fontWeight: 500,
  color: accentColor,
  borderTop: `2px solid ${whiteTwoColor}`,
  display: 'block',
  textDecoration: 'none',
};

export const bottomLinksWrapperStyle = {
  margin: '128px 16px 126px 16px',
};
