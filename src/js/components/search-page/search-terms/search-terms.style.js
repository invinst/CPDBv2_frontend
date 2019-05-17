import { accentColor, softBlackColor, searchPreviewPaneWidth } from 'utils/styles';


export const contentWrapperStyle = {
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  position: 'relative',
  width: `calc(100% - ${searchPreviewPaneWidth}px)`,
  display: 'inline-block',
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

export const scrollIntoViewStyle = {
  container: {
    height: 'calc(100vh - 110px)',
    width: '100%',
    display: 'inline-block'
  },
  view: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginBottom: 0
  }
};

export const wrapperStyle = {
  boxSizing: 'border-box',
  width: 'calc(100vw - 16px)',
  height: 'calc(100% - 45px)'
};
