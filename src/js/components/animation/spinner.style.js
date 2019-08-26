import Radium from 'radium';

const pulseKeyframes = Radium.keyframes({
  '0%': { transform: 'rotate(0)' },
  '100%': { transform: 'rotate(360deg)' },
}, 'rotate');

export const svgStyle = {
  animation: 'x 1s linear infinite',
  animationName: pulseKeyframes,
  width: '20px',
  height: '20px',
  margin: '0 auto',
};

export const pathStyle = {
  opacity: 1,
  stroke: 'black',
  strokeWidth: 4,
  fill: 'none',
  strokeDashoffset: 110.244,
  strokeDasharray: 204.244,
};
