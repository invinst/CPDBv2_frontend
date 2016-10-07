import { softBlackColor, silverSandColor, lightGreyColor, sanFranciscoTextFamily } from 'utils/styles';


export const headerStyle = {
  base: {
    marginBottom: '34px',
    backgroundColor: 'white',
    height: '26px',
    lineHeight: '26px',
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 300,
    borderLeft: `8px solid ${silverSandColor}`,
    color: softBlackColor,
    letterSpacing: '-0.2px',
    paddingLeft: '8px'
  },
  extraWide: {
    fontSize: '14px'
  },
  desktop: {
    fontSize: '13px'
  },
  tablet: {
    fontSize: '12px'
  }
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
  padding: '32px 16px',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  borderBottom: `1px solid ${softBlackColor}`
};
