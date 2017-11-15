import { whiteTwoColor, sugarCaneColor, greyishColor, softBlackColor, clayGray } from 'utils/styles';

export const paddingWrapperStyle = {
  padding: '0 16px 8px 16px'
};

export const inputStyle = {
  width: '100%',
  padding: '6px 12px 7px 12px',
  boxSizing: 'border-box',
  backgroundColor: sugarCaneColor,
  borderRadius: '2px',
  fontSize: '13px',
  fontWeight: '500px',
  color: clayGray,
  border: 'none'
};

export const instructionStyle = {
  color: clayGray,
  fontWeight: 300,
  paddingTop: '38px',
  fontSize: '14px',
  marginBottom: '15px'
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

export const linkButtonStyle = {
  textDecoration: 'none',
  width: '54px',
  height: '18px',
  fontSize: '14px',
  fontWeight: 400,
  textAlign: 'left',
  color: greyishColor,
  cursor: 'pointer',
  display: 'inline-block'
};

export const submitButtonStyle = {
  ...linkButtonStyle,
  color: softBlackColor,
  margin: '11px 16px 27px 16px',
  background: 'none',
  border: 'none',
  padding: 0
};

export const messageBoxStyle = {
  backgroundColor: sugarCaneColor,
  height: '32px',
  borderTop: `1px solid ${whiteTwoColor}`,
  textAlign: 'center',
  lineHeight: '18px',
  fontSize: '14px',
  color: clayGray,
  fontWeight: 400,
  paddingTop: '6px',
  borderSizing: 'border-box'
};

export const emphasisTextboxStyle = {
  backgroundColor: 'rgba(255, 96, 0, 0.1)'
};
