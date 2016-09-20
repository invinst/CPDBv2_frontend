import { softBlackColor, silverSandColor, lightGreyColor, sanFranciscoTextFamily } from 'utils/styles';


export const headerStyle = {
  marginBottom: '34px',
  backgroundColor: 'white',
  height: '26px',
  lineHeight: '26px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  color: softBlackColor,
  letterSpacing: '-0.2px',
  borderLeft: `8px solid ${softBlackColor}`,
  paddingLeft: '8px'
};

export const contentStyle = {
  paddingBottom: '51px',
  backgroundColor: 'white'
};

export const linkStyle = {
  color: softBlackColor,
  textDecoration: 'none',
  fontWeight: 100,
  borderBottom: `4px solid ${ silverSandColor }`
};

export const alignLeftStyle = {
  display: 'inline-block',
  width: '50%',
  textAlign: 'left'
};

export const alignRightStyle = {
  display: 'inline-block',
  width: '50%',
  textAlign: 'right'
};

export const underlineFAQStyle = {
  borderBottom: `1px solid ${lightGreyColor}`
};

export const wrapperStyle = {
  margin: '16px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  borderBottom: `1px solid ${softBlackColor}`,
  paddingBottom: '16px'
};
