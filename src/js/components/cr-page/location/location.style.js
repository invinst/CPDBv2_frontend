import { sanFranciscoTextFamily, softBlackColor, whiteTwoColor, mediumGrayColor } from 'utils/styles';


export const wrapperStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  borderBottom: `solid 1px ${whiteTwoColor}`
};

export const locationTextStyle = {
  padding: '40px 0 5px 16px',
  color: softBlackColor,
  fontWeight: 600
};

export const addressStyle = {
  marginLeft: '16px',
  padding: '11px 0',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  fontWeight: 400,
  minHeight: '18px'
};

export const locationStyle = {
  marginLeft: '16px',
  padding: '11px 0',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  fontWeight: 400,
  minHeight: '18px'
};

export const beatStyle = {
  marginLeft: '16px',
  padding: '11px 0',
  minHeight: '18px'
};

export const labelStyle = {
  display: 'inline-block',
  width: '108px',
  color: mediumGrayColor,
  verticalAlign: 'middle',
  float: 'left'
};

export const contentStyle = {
  display: 'inline-block',
  color: softBlackColor,
  verticalAlign: 'middle',
  float: 'left'
};
