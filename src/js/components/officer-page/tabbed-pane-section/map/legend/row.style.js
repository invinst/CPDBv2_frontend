import { clayGray, softBlackColor, accentColor } from 'utils/styles';


export const wrapperStyle = (haveMarginBottom) => ({
  marginBottom: haveMarginBottom ? '16px' : 0,
  cursor: 'pointer',
});

export const textStyle = (hovering) => ({
  textAlign: 'left',
  color: hovering ? accentColor : clayGray,
});

export const numberStyle = {
  color: softBlackColor,
  float: 'right',
};

export const ovalStyle = (color, borderColor) => ({
  width: '11px',
  height: '11px',
  borderRadius: '50%',
  display: 'inline-block',
  marginRight: '18px',
  verticalAlign: 'middle',
  marginBottom: '2px',
  backgroundColor: color,
  border: `solid 1px ${ borderColor }`
});
