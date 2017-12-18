import { sanFranciscoTextFamily, softBlackColor, mediumGrayColor, lightBlackColor } from 'utils/styles';


export const unitNameWrapperStyle = {
  fontSize: '26px',
  fontWeight: 500,
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  display: 'inline-block',
  float: 'left'
};

export const unitNameStyle = {
  fontSize: '18px',
  fontWeight: 500,
  color: mediumGrayColor
};

export const wrapperStyle = {
  padding: '0 16px',
  height: '64px',
  marginTop: '22px',
  boxSizing: 'border-box'
};

export const boxShadowStyle = {
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`
};

export const linkWrapperStyle = {
  float: 'right',
  height: '64px',
  letterSpacing: '.8px',
  padding: '22px 0',
  boxSizing: 'border-box'
};

export const linkStyle = {
  fontFamily: sanFranciscoTextFamily,
  color: mediumGrayColor,
  textDecoration: 'none',
  display: 'inline-block',
  marginLeft: '50px',
  fontWeight: 400,
  fontSize: '16px',
  cursor: 'pointer'
};

export const activeLinkStyle = {
  ...linkStyle,
  color: softBlackColor
};
