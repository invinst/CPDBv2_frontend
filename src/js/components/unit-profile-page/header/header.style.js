import {
  sanFranciscoTextFamily, softBlackColor, mediumGrayColor, whiteTwoColor,
  sugarCaneColor, accentColor
} from 'utils/styles';
import { shareableHeaderHeight } from 'components/headers/shareable-header/shareable-header.style';


const height = 64;

export const unitNameWrapperStyle = (scrollPosition) => ({
  fontSize: '26px',
  fontWeight: 500,
  fontFamily: sanFranciscoTextFamily,
  color: scrollPosition === 'bottom' ? sugarCaneColor: softBlackColor,
  display: 'inline-block',
  float: 'left',
  paddingTop: '8px'
});

export const unitNameStyle = (scrollPosition) => ({
  fontSize: '18px',
  fontWeight: 500,
  color: scrollPosition === 'bottom' ? 'white' : mediumGrayColor
});

export const wrapperStyle = (scrollPosition) => ({
  height: `${height}px`,
  margin: '0px 16px',
  boxSizing: 'border-box',
  borderBottom: scrollPosition === 'bottom' ? 'none': `solid 1px ${whiteTwoColor}`
});

export const outerStyle = (scrollPosition) => {
  if (scrollPosition === 'bottom') {
    return {
      position: 'fixed',
      left: 0,
      right: 0,
      zIndex: 2,
      top: `${shareableHeaderHeight}px`,
      backgroundColor: accentColor
    };
  }

  return {
    position: 'relative',
    backgroundColor: 'white'
  };
};

export const outerPlaceHolderStyle = (scrollPosition) => ({
  position: 'relative',
  height: `${height}px`,
  display: scrollPosition === 'bottom' ? 'inherit' : 'none'
});
