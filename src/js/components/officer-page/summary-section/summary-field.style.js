import { sanFranciscoTextFamily, mediumGrayColor, hardBlackColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  margin: '0 16px',
  width: 'calc(100% - 32px)',
  height: '40px',
  lineHeight: '39px',
  borderTop: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
};

export const labelStyle = {
  display: 'inline-block',
  color: mediumGrayColor,
  fontWeight: 300,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  width: '117px'
};

export const valueStyle = {
  display: 'inline-block',
  color: hardBlackColor
};

export const extraInfoStyle = {
  display: 'inline-block',
  float: 'right',
};

