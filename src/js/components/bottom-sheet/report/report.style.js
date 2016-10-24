import {
  pinkishGreyColor, black32Color, altoColor, mediumGrayColor, fashionPinkColor,
  sanFranciscoTextFamily
} from 'utils/styles';

export const footerStyle = {
  height: 'auto',
  padding: '0'
};

export const leftBarStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingLeft: '32px',
  paddingTop: '74px',
  width: '482px',
  borderRight: `1px solid ${pinkishGreyColor}`,
  minHeight: '663px'
};

export const rightBarStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  padding: '77px 32px 0',
  width: '704px',
  verticalAlign: 'top',
  borderLeft: `1px solid ${pinkishGreyColor}`,
  marginLeft: '-1px',
  minHeight: '663px'
};

export const wrapperStyle = {
  height: '707px'
};

export const leftHeaderStyle = {
  boxSizing: 'border-box',
  height: '44px',
  width: '482px',
  display: 'inline-block',
  borderRight: `1px solid ${pinkishGreyColor}`
};

export const rightHeaderStyle = {
  boxSizing: 'border-box',
  height: '44px',
  width: '715px',
  display: 'inline-block',
  verticalAlign: 'top'
};

export const headerWrapperStyle = {
  boxShadow: `0 1px 2px 0 ${black32Color}`,
  height: '44px'
};

export const excerptStyle = {
  wrapper: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '12px'
  },
  paragraph: {
    marginTop: 0,
    marginBottom: '20px'
  }
};

export const infoRowStyle = {
  boxSizing: 'border-box',
  borderTop: `1px solid ${altoColor}`,
  height: '40px',
  padding: '11px 0'
};

export const labelStyle = {
  color: mediumGrayColor,
  width: '218px',
  display: 'inline-block'
};

export const inputStyle = {
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  display: 'inline-block'
};

export const inputEditStyle = {
  ...inputStyle,
  color: fashionPinkColor
};

export const headerTitleStyle = {
  fontSize: '32px',
  fontWeight: '600',
  marginBottom: '32px',
  paddingRight: '32px'
};

export const editWrapperLinkStyle = {
  fontSize: '13px',
  fontFamily: sanFranciscoTextFamily,
  width: '100%',
  paddingTop: '14px'
};

export const contentWrapperStyle = {
  overflowY: 'auto',
  height: '663px'
};
