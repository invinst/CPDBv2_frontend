import { softBlackColor, sanFranciscoTextFamily, whiteSmokeColor, accentColor } from 'utils/styles';


export const buttonStyle = {
  display: 'inline-block',
  boxSizing: 'border-box',
  width: '56px',
  height: '26px',
  verticalAlign: 'baseline',
  padding: '8px',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '13px',
  lineHeight: '11px',
  fontWeight: 300,
  borderRadius: '1.6px',
  color: softBlackColor,
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: whiteSmokeColor
};

export const buttonHoverStyle = {
  ...buttonStyle,
  color: accentColor
};
