import { sugarCaneColor, whiteTwoColor, clayGray } from 'utils/styles';


export const wrapperStyle = {
  width: '15px',
  height: '15px',
  backgroundColor: sugarCaneColor,
  border: `solid 1px ${whiteTwoColor}`,
  borderRadius: '7.5px',
  position: 'absolute',
  boxSizing: 'border-box',
  top: '10px',
  right: 0,
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
