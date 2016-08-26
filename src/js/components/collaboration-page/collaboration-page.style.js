import { softBlackColor, accentColor, lightGreyColor } from 'utils/styles';


export const wrapperStyle = {
  base: {
    margin: '0 auto',
    padding: '88px 16px 132px 16px',
    boxSizing: 'border-box'
  },
  mobile: {
    width: '614.4px'
  },
  tablet: {
    width: '794px'
  }
};

export const headLineStyle = {
  marginBottom: '79px',
  fontFamily: '"Minion Pro Regular",sans-serif',
  fontWeight: 'normal',
  fontSize: '30px',
  color: softBlackColor
};

export const leftColumnStyle = {
  paddingRight: '32px',
  height: '354px',
  borderRight: `1px solid ${lightGreyColor}`,
  boxSizing: 'border-box'
};

export const rightColumnStyle = {
  paddingLeft: '32px',
  boxSizing: 'border-box'
};

export const columnHeadLineStyle = {
  height: '53px',
  margin: '0',
  padding: '0 0 35px 0',
  color: softBlackColor,
  fontSize: '13px',
  fontFamily: '"San Francisco Text Web", sans-serif',
  fontWeight: '600',
  boxSizing: 'border-box'
};

export const emailLinkWrapperStyle = {
  height: '62px',
  padding: '17px 0',
  boxSizing: 'border-box'
};

export const emailLinkStyle = {
  color: accentColor,
  fontSize: '14px',
  fontFamily: '"San Francisco Text Web", sans-serif',
  fontWeight: '600',
  textDecoration: 'none',
  verticalAlign: 'middle'
};

export const copyLinkStyle = {
  marginLeft: '16px',
  verticalAlign: 'middle'
};

export const listElementStyle = {
  color: softBlackColor,
  fontSize: '11px',
  fontFamily: '"San Francisco Text Web", sans-serif',
  fontWeight: '600',
  marginBottom: '10px'
};

export const smallTextStyle = {
  color: softBlackColor,
  fontSize: '11px',
  fontFamily: '"San Francisco Text Web", sans-serif'
};

export const paragraphStyle = {
  fontFamily: '"Minion Pro Regular",sans-serif',
  fontWeight: 'normal',
  fontSize: '15px',
  margin: '0 0 9px 0',
  color: softBlackColor
};

export const listStyle = {
  paddingLeft: '14px'
};
