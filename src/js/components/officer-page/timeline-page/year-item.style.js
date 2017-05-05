import { sanFranciscoTextFamily, softBlackColor, mediumGrayColor, hardBlackColor, whiteTwoColor } from 'utils/styles';

export const yearStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '26px',
  fontWeight: 'bold',
  textAlign: 'right',
  color: softBlackColor,
  display: 'block',
  width: '100%',
  marginBottom: '12px'
};

export const labelStyle = {
  width: '89px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  color: mediumGrayColor,
  display: 'inline-block'
};

export const valueStyle = {
  width: '15px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  color: hardBlackColor
};

export const rowStyle = {
  boxSizing: 'border-box',
  padding: '11px 0 0'
};

export const rowWithBorderStyle = {
  ...rowStyle,
  borderBottom: `solid 2px ${whiteTwoColor}`,
  padding: '10px 0'
};
