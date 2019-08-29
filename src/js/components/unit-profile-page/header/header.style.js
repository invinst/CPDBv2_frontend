import {
  sanFranciscoTextFamily, softBlackColor, mediumGrayColor, whiteTwoColor,
  sugarCaneColor, accentColor,
} from 'utils/styles';


const height = 64;

// Todo: when converting this file into SASS, please use the constant $shareable-header-height in variables
const shareableHeaderHeight = 40;

export const unitNameWrapperStyle = (scrollPosition) => ({
  fontSize: '26px',
  fontWeight: 500,
  fontFamily: sanFranciscoTextFamily,
  color: scrollPosition === 'bottom' ? sugarCaneColor: softBlackColor,
  display: 'inline-block',
  float: 'left',
  paddingTop: '8px',
});

export const unitNameStyle = (scrollPosition) => ({
  fontSize: '18px',
  fontWeight: 500,
  color: scrollPosition === 'bottom' ? 'white' : mediumGrayColor,
});

export const wrapperStyle = (scrollPosition) => ({
  height: `${height}px`,
  margin: '0px 16px',
  boxSizing: 'border-box',
  borderBottom: scrollPosition === 'bottom' ? 'none': `solid 1px ${whiteTwoColor}`,
});

export const outerStyle = (scrollPosition) => {
  if (scrollPosition === 'bottom') {
    return {
      position: 'fixed',
      left: 0,
      right: 0,
      zIndex: 2,
      top: `${shareableHeaderHeight}px`,
      backgroundColor: accentColor,
    };
  }

  return {
    position: 'relative',
    backgroundColor: 'white',
  };
};

export const outerPlaceHolderStyle = (scrollPosition) => ({
  position: 'relative',
  height: `${height}px`,
  display: scrollPosition === 'bottom' ? 'inherit' : 'none',
});
