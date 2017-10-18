import { softGreyColor } from 'utils/styles';

export const HEIGHT = 20;

export const wrapperStyle = width => ({
  position: 'relative',
  display: 'inline-block',
  height: `${HEIGHT}px`,
  width: `${width}px`,
  backgroundColor: 'rgba(0, 94, 244, 0.1)',
  verticalAlign: 'top',
  top: '-2px'
});

export const hoverOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const sparklinesStyle = { fill: 'none', stroke: softGreyColor };
