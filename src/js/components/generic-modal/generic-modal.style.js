import { whiteTwoColor, sugarCaneColor, greyishColor, softBlackColor } from 'utils/styles';

export const paddingWrapperStyle = {
  padding: '0 16px 16px 16px'
};

export const inputStyle = {
  width: '100%',
  padding: '6px 12px 7px 12px',
  boxSizing: 'border-box',
  backgroundColor: sugarCaneColor,
  borderRadius: '2px',
  fontSize: '13px',
  fontWeight: '500px',
  color: '#8f8f8f',
  border: 'none',
  '::-webkit-input-placeholder': {
    color: 'red'
  }
};

export const instructionStyle = {
  color: '#8f8f8f',
  fontWeight: 300,
  paddingTop: '38px',
  fontSize: '14px'
};

export const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2000,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

export const contentStyle = {
  backgroundColor: 'white',
  border: `1px solid ${whiteTwoColor}`,
  margin: 'auto',
  width: '500px',
};

export const legalBodyStyle = {
  fontSize: '14px',
  fontWeight: 300,
  textAlign: 'left',
  color: greyishColor
};

export const linkStyle = {
  color: softBlackColor,
  fontWeight: 400,
  textDecoration: 'none',
  cursor: 'pointer',
  fontSize: '14px'
};

export const iUnderstandStyle = {
  ...linkStyle,
  display: 'inline-block',
  margin: '11px 0'
};
