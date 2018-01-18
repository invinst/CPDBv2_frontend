import { sanFranciscoTextFamily, softBlackColor, mediumGrayColor, sugarCaneColor, accentColor } from 'utils/styles';
import { shareableHeaderHeight } from 'components/headers/shareable-header/shareable-header.style';

const height = 64;

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

export const outerPlaceholderStyle = (scrollPosition) => ({
  position: 'relative',
  height: `${height}px`,
  display: scrollPosition === 'bottom' ? 'inherit' : 'none'
});

export const officerNameStyle = (scrollPosition) => ({
  fontSize: '26px',
  fontWeight: 500,
  fontFamily: sanFranciscoTextFamily,
  color: scrollPosition === 'bottom' ? sugarCaneColor : softBlackColor,
  display: 'inline-block',
  paddingTop: '16px',
  float: 'left'
});

export const wrapperStyle = {
  padding: '0 16px',
  height: `${height}px`,
  boxSizing: 'border-box',
};

export const linkWrapperStyle = {
  float: 'right',
  height: '64px',
  letterSpacing: '.8px',
  padding: '22px 0',
  boxSizing: 'border-box'
};

export const linkStyle = (scrollPosition) => ({
  fontFamily: sanFranciscoTextFamily,
  color: scrollPosition === 'bottom' ? sugarCaneColor : mediumGrayColor,
  textDecoration: 'none',
  display: 'inline-block',
  marginLeft: '50px',
  fontWeight: 400,
  fontSize: '16px',
  cursor: 'pointer'
});

export const activeLinkStyle = (scrollPosition) => ({
  ...linkStyle(scrollPosition),
  color: scrollPosition === 'bottom' ? 'white' : softBlackColor
});
