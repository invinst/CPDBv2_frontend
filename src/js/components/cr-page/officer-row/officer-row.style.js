import { sanFranciscoTextFamily, softBlackColor, greyishColor, mediumGrayColor, whiteTwoColor } from 'utils/styles';

export const wrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  boxSizing: 'border-box',
  padding: '11px 0',
  fontSize: '14px',
  minHeight: '54px',
  textAlign: 'center',
  borderBottom: `solid 1px ${whiteTwoColor}`,
  verticalAlign: 'middle'
};

export const labelStyle = {
  fontWeight: 400,
  color: greyishColor,
  display: 'inline-block',
  float: 'left',
  width: '175px',
  textAlign: 'left',
  verticalAlign: 'middle'
};

export const officerNameStyle = {
  fontWeight: 500,
  color: softBlackColor,
  paddingRight: '16px',
  display: 'inline-block',
  float: 'left',
  verticalAlign: 'middle'
};

export const extraInfoStyle = {
  fontWeight: 400,
  color: mediumGrayColor,
  display: 'inline-block',
  float: 'left',
  verticalAlign: 'middle'
};
