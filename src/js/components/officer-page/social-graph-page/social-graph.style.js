import { sanFranciscoTextFamily, greyishColor } from 'utils/styles';

export const svgStyle = {
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)'
};

export const textStyle = [
  `font-family: ${sanFranciscoTextFamily}`,
  'font-size: 14px',
  'font-weight: 400',
  `color: ${greyishColor}`,
].join('; ');
