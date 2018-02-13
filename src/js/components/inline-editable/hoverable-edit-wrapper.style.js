import { fashionPinkColor, tomatoPinkColor, mistyRoseColor, sanFranciscoTextFamily } from 'utils/styles';

export const wrapperStyle = (hovering=false) => ({
  position: 'relative',
  border: hovering
    ? `1px solid ${fashionPinkColor}`
    : 0
});

export const buttonWrapperStyle = hovering => ({
  position: 'absolute',
  zIndex: 1,
  display: hovering ? 'block' : 'none',
  top: 0,
  right: 0
});

const _buttonStyle = {
  backgroundColor: mistyRoseColor,
  pointerEvents: 'auto',
  padding: '5px 7px',
  borderRadius: '3px',
  borderLeft: `1px solid ${fashionPinkColor}`,
  borderBottom: `1px solid ${fashionPinkColor}`,
  color: 'white',
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  cursor: 'pointer',
  fontWeight: 300,
  display: 'inline-block'
};

export const buttonStyle = {
  base: _buttonStyle,
  hover: {
    ..._buttonStyle,
    backgroundColor: tomatoPinkColor
  }
};
