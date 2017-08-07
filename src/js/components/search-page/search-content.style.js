import { lightBlackColor, wildSandColor, lightMineShaftColor, whiteTwoColor,
  sanFranciscoTextFamily } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';
import { fashionPinkColor, pinkishWhiteColor, girlyPink, lightGirlyPink, deepGirlyPink } from 'utils/styles';
import { tagsWrapperHeight, tagStyle, tagsWrapperStyle } from './search-tags.style';


export const searchContentWrapperStyle = (aliasEditModeOn) => ({
  minHeight: '100vh',
  background: aliasEditModeOn ? lightGirlyPink : 'white',
  fontFamily: sanFranciscoTextFamily
});

export const backButtonStyle = {
  background: `url(${imgUrl('arrow.svg')}) center no-repeat ${wildSandColor}`,
  display: 'inline-block',
  width: '26px',
  height: '26px',
  margin: '4px 23px 5px 0',
  border: `1px solid ${whiteTwoColor}`,
  borderRadius: '2px'
};

export const searchBoxStyle = (aliasEditModeOn) => ({
  height: '83px',
  backgroundColor: aliasEditModeOn ? girlyPink : 'white',
  boxSizing: 'border-box',
  padding: '23px 16px',
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`,
  marginBottom: '1px'
});

export const helperTextStyle = {
  padding: '16px 63px 92px',
  color: lightMineShaftColor
};

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
