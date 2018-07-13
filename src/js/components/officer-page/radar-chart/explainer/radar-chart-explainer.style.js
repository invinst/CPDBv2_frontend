import { sugarCaneColor, whiteTwoColor } from 'utils/styles';


export const containerStyle = {
  display: 'block',
  width: 'calc(100% - 32px)',
  height: '361px',
  backgroundColor: sugarCaneColor,
  boxSizing: 'border-box',
  margin: '16px',
};

export const footerStyle = {
  borderTop: `solid 1px ${whiteTwoColor}`,
  width: '100%',
  height: '56px',
  lineHeight: '56px',
  boxSizing: 'border-box',
  position: 'relative',
  bottom: 0,
  fontSize: '14px'
};

export const closeButtonStyle = {
  width: '48px',
  height: '48px',
  position: 'absolute',
  right: '16px',
  top: '16px',
  cursor: 'pointer',
};

export const closeInnerStyle = {
  verticalAlign: 'middle',
  textAlign: 'center',
  paddingTop: 0,
  margin: '12px',
  width: '24px',
  height: '24px',
  lineHeight: '22px',
  boxSizing: 'border-box',
  color: 'black',
  fontSize: '24px',
  fontWeight: 100
};
