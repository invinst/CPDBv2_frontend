import { softBlackColor, clayGray, whiteTwoColor, brightOrangeTwoColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  margin: '16px',
  boxSizing: 'border-box',
  textDecoration: 'none',
  verticalAlign: 'top',
  border: `solid 1px ${whiteTwoColor}`,
};

export const visualTokenStyle = {
  display: 'block',
};

export const lightTextStyle = {
  fontSize: '12px',
  lineHeight: 1.17,
  fontWeight: 400,
  color: clayGray,
  marginTop: 0,
  marginBottom: 0,
  height: '14px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export const boldTextStyle = {
  lineHeight: '18px',
  fontSize: '14px',
  fontWeight: 400,
  color: softBlackColor,
  marginTop: 0,
  marginBottom: 0
};

export const extraInfoStyle = {
  fontSize: '14px',
  lineHeight: '18px',
  margin: 0,
  color: clayGray
};

export const sectionStyle = {
  margin: '0 16px',
  padding: '11px 0',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  height: '60px',
  boxSizing: 'border-box',
};

export const noBorderSectionStyle = {
  ...sectionStyle,
  border: 'none'
};

export const sustainedStyle = {
  color: brightOrangeTwoColor,
  whiteSpace: 'nowrap'
};
