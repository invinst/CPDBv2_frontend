import { accentColor } from 'utils/styles';


export const outerWrapperStyle = {
  position: 'absolute',
  zIndex: 200
};

export const wrapperStyle = {
  position: 'relative',
  background: 'white',
  border: `1px solid ${accentColor}`,
  borderRadius: '2px'
};

const baseArrowStyle = {
  top: '100%',
  left: '50%',
  borderStyle: 'solid',
  borderColor: 'transparent',
  height: 0,
  width: 0,
  position: 'absolute',
  pointerEvents: 'none'
};

export const arrowStyle = {
  ...baseArrowStyle,
  borderColor: 'white rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)',
  borderWidth: '9px',
  marginLeft: '-9px'
};

export const arrowBorderStyle = {
  ...baseArrowStyle,
  borderColor: `${accentColor} rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)`,
  borderWidth: '10px',
  marginLeft: '-10px'
};
