import {
  sanFranciscoTextFamily, lightBlackColor, softBlackColor, greyishColor, sugarCaneColor,
  accentColor
} from 'utils/styles';
import { shareableHeaderHeight } from 'components/headers/shareable-header/shareable-header.style';

const height = 64;

export const boxShadowStyle = (scrollPosition, hovering) => {
  if (scrollPosition === 'bottom') {
    return {
      position: 'fixed',
      left: 0,
      right: 0,
      top: `${shareableHeaderHeight}px`,
      zIndex: 1,
      backgroundColor: hovering ? 'white' : accentColor,
    };
  }

  return {
    position: 'relative',
    backgroundColor: 'white',
    zIndex: 1,
  };
};

export const outerPlaceholderStyle = (scrollPosition) => ({
  position: 'relative',
  height: `${height}px`,
  display: scrollPosition === 'bottom' ? 'inherit' : 'none',
});

export const headerStyle = {
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  lineHeight: '32px',
  textAlign: 'center',
  margin: '0 16px',
  height: `${height}px`,
  boxSizing: 'border-box',
  borderBottom: `1px solid ${lightBlackColor}`,
};

export const titleStyle = (displayCoaccusedDropdown, scrollPosition, hovering) => {
  let color = 'inherit';
  if (displayCoaccusedDropdown)
    color = greyishColor;
  else if (scrollPosition === 'bottom')
    color = hovering ? softBlackColor : sugarCaneColor;

  return {
    fontSize: '26px',
    fontWeight: 500,
    display: 'inline-block',
    float: 'left',
    color: color,
    paddingTop: '16px'
  };
};
