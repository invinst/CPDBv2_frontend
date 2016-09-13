import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const headerStyle = {
  marginBottom: '50px',
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

export const coverageWrapperStyle = {
  borderBottom: `1px solid ${softBlackColor}`
};

export const linkStyle = {
  color: softBlackColor,
  textDecoration: 'none',
  fontWeight: 300
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

export const wrapperStyle = {
  margin: '16px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  borderBottom: `1px solid ${softBlackColor}`,
  paddingBottom: '16px'
};

export const contentStyle = {
  backgroundColor: 'white',
  paddingBottom: '16px'
};
