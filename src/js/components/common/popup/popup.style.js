import { sugarCaneColor, whiteTwoColor, clayGray, boulderColor, softBlackColor } from 'utils/styles';


export const wrapperStyle = {
  width: '15px',
  height: '15px',
  backgroundColor: sugarCaneColor,
  border: `solid 1px ${whiteTwoColor}`,
  borderRadius: '7.5px',
  boxSizing: 'border-box',
  cursor: 'help',
};

export const innerStyle = {
  display: 'inline-block',
  color: clayGray,
  fontSize: '10px',
  lineHeight: '12px',
  verticalAlign: 'top',
  textAlign: 'center',
  width: '100%',
  fontWeight: 600,
};

export const titleStyle = {
  fontSize: '14px',
  fontWeight: 500,
  color: softBlackColor,
  marginBottom: '16px',
  lineHeight: '18px',
};

export const textStyle = {
  fontSize: '14px',
  fontWeight: 300,
  color: boulderColor,
  lineHeight: '18px',
};
