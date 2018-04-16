import { whiteTwoColor, sanFranciscoTextFamily, softBlackColor, clayGray, sugarCaneColor } from 'utils/styles';


export const wrapperStyle = {
  padding: '12px 0 12px 0',
  fontFamily: sanFranciscoTextFamily,
  minHeight: '54px',
  boxSizing: 'border-box',
  display: 'block',
  fontSize: '14px',
  borderBottom: `solid 1px ${whiteTwoColor}`
};

export const chartWrapperStyle = {
  display: 'inline-block',
  marginRight: '10px',
  verticalAlign: 'middle',
  borderRadius: '2px',
  overflow: 'hidden',
  width: '32px',
  height: '32px'
};

export const rightWrapperStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: 'calc(100% - 92px)'
};

export const officerNameStyle = {
  fontSize: '14px',
  fontWeight: 400,
  color: softBlackColor
};

export const extraInfoStyle = {
  fontSize: '12px',
  fontWeight: 300,
  color: clayGray
};

export const tagWrapperStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  width: '50px',
  textAlign: 'right'
};

export const tagStyle = {
  color: softBlackColor,
  backgroundColor: sugarCaneColor,
  borderRadius: '2px',
  fontSize: '14px',
  fontWeight: 400,
  padding: '2px 5px',
  overflow: 'hidden',
  maxWidth: '50px',
  display: 'inline-block',
  boxSizing: 'border-box'
};
