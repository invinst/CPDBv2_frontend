import {
  sanFranciscoTextFamily,
  girlyPink,
  lightGirlyPink,
  accentColor,
  softBlackColor,
  boulderColor,
  whiteTwoColor,
} from 'utils/styles';


export const searchBoxLineHeight = 32;
const searchBoxPadding = 8;
export const searchBoxHeight = searchBoxLineHeight + searchBoxPadding * 2;

export const searchContentWrapperStyle = (aliasEditModeOn) => ({
  minHeight: '100vh',
  background: aliasEditModeOn ? lightGirlyPink : 'white',
  fontFamily: sanFranciscoTextFamily,
  overflow: 'hidden',
});

export const searchBoxStyle = (aliasEditModeOn) => ({
  backgroundColor: aliasEditModeOn ? girlyPink : 'white',
  padding: `${searchBoxPadding}px 0 9px 0`,
  margin: '0 16px',
  borderBottom: `1px solid ${whiteTwoColor}`,
});

const _cancelButtonStyle = (searchTermsHidden) => ({
  display: 'inline-block',
  fontSize: '13px',
  color: searchTermsHidden ? boulderColor : accentColor,
  width: '41px',
  cursor: 'pointer',
  position: 'relative',
  top: '6px',
});

export const cancelButtonStyle = (searchTermsHidden) => ({
  base: _cancelButtonStyle(searchTermsHidden),
  hover: {
    ..._cancelButtonStyle(searchTermsHidden),
    color: softBlackColor,
  },
});
