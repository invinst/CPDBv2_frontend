import {
  sanFranciscoTextFamily,
  fashionPinkColor,
  pinkishWhiteColor,
  girlyPink,
  lightGirlyPink,
  deepGirlyPink,
  greyishColor
} from 'utils/styles';
import { tagsWrapperHeight, tagStyle, tagsWrapperStyle } from './search-tags.style';


export const searchContentWrapperStyle = (aliasEditModeOn) => ({
  minHeight: '100vh',
  background: aliasEditModeOn ? lightGirlyPink : 'white',
  fontFamily: sanFranciscoTextFamily,
  padding: '0 16px'
});

export const backButtonWidth = 41;
export const backButtonStyle = {
  display: 'inline-block',
  fontSize: '13px',
  color: greyishColor,
  width: `${backButtonWidth}px`,
  lineHeight: '32px',
  cursor: 'pointer'
};

export const searchBoxStyle = (aliasEditModeOn) => ({
  backgroundColor: aliasEditModeOn ? girlyPink : 'white',
  padding: '8px 0',
  marginBottom: '1px'
});

export const plusPlaceholderHeight = 74;
export const plusPlaceHolderStyle = {
  height: `${plusPlaceholderHeight}px`,
  marginBottom: '20px'
};

export const plusWrapperStyle = {
  height: '100%',
  textAlign: 'center',
  fontSize: '36px',
  color: fashionPinkColor,
  fontWeight: '600',
  backgroundColor: pinkishWhiteColor,
  boxSizing: 'border-box',
  cursor: 'pointer',
  marginLeft: '16px',
  marginBottom: '20px',
  width: '40%',
  minWidth: '480px',
  margin: 'auto'
};

export const plusSignStyle = {
  // Reset <a> link styles:
  textDecoration: 'none',
  color: 'inherit',

  position: 'relative',
  display: 'block',
  top: '50%',
  transform: 'translateY(-50%)'
};

export const cancelButtonStyle = {
  ...tagStyle(false),
  float: 'right',
  textDecoration: 'none',
  backgroundColor: deepGirlyPink,
  color: 'inherit',
  margin: tagsWrapperStyle.padding,
  border: 'none'
};

export const buttonsWrapperStyle = {
  height: `${tagsWrapperHeight}px`
};
