import { softBlackColor, sanFranciscoTextFamily, silverSandColor } from 'utils/styles';


export const headerStyle = {
  base: {
    marginBottom: '50px',
    height: '26px',
    lineHeight: '26px',
    fontFamily: sanFranciscoTextFamily,
    fontWeight: 300,
    borderLeft: `8px solid ${silverSandColor}`,
    color: softBlackColor,
    letterSpacing: '-0.2px',
    paddingLeft: '8px',
    position: 'relative'
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

export const coverageWrapperStyle = {
  borderBottom: `1px solid ${softBlackColor}`
};

export const linkStyle = {
  color: softBlackColor,
  textDecoration: 'none',
  fontWeight: 100
};

export const alignRightStyle = {
  display: 'inline-block',
  width: '130px',
  textAlign: 'right'
};

export const wrapperStyle = {
  padding: '30px 16px 32px',
  boxSizing: 'border-box',
  borderBottom: `1px solid ${softBlackColor}`
};

export const contentStyle = {

};

export const editBoxStyle = {
  width: 'calc(100% - 130px)',
  display: 'inline-block'
};
