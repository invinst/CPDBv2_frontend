import { lightBlackColor, sanFranciscoTextFamily, mediumGrayColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  width: '288px',
  height: '100%',
  background: 'white',
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`,
  padding: '18px 16px',
  boxSizing: 'border-box',
  verticalAlign: 'top'
};

export const leftButtonStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  color: mediumGrayColor,
  display: 'inline-block',
  float: 'left'
};

export const rightButtonStyle = {
  ...leftButtonStyle,
  float: 'right'
};
