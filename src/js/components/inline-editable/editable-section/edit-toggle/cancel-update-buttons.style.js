import { mistyRoseColor, tomatoPinkColor } from 'utils/styles';

export const buttonStyle = {
  backgroundColor: mistyRoseColor,
  border: '1px solid white',
  borderRadius: '3px',
  marginRight: '10px',
  padding: '5px 7px',
  cursor: 'pointer'
};

export const hoverButtonStyle = {
  ...buttonStyle,
  backgroundColor: tomatoPinkColor
};
