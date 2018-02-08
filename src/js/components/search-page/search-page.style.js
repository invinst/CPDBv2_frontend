import {
  sanFranciscoTextFamily,
  girlyPink,
  lightGirlyPink,
  accentColor,
  softBlackColor,
  clayGray
} from 'utils/styles';


export const searchBoxLineHeight = 32;
const searchBoxPadding = 8;
export const searchBoxHeight = searchBoxLineHeight + searchBoxPadding * 2;

export const searchContentWrapperStyle = (aliasEditModeOn) => ({
  minHeight: '100vh',
  background: aliasEditModeOn ? lightGirlyPink : 'white',
  fontFamily: sanFranciscoTextFamily
});

export const searchBoxStyle = (aliasEditModeOn) => ({
  backgroundColor: aliasEditModeOn ? girlyPink : 'white',
  padding: `${searchBoxPadding}px 16px 9px 16px`,
});

const _cancelButtonStyle = (searchTermsHidden) => ({
  display: 'inline-block',
  fontSize: '13px',
  color: searchTermsHidden ? clayGray : accentColor,
  width: '41px',
  cursor: 'pointer',
  position: 'relative',
  top: '6px'
});

export const cancelButtonStyle = (searchTermsHidden) => ({
  base: _cancelButtonStyle(searchTermsHidden),
  hover: {
    ..._cancelButtonStyle(searchTermsHidden),
    color: softBlackColor
  }
});
