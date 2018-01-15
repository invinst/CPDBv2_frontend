import {
  sanFranciscoTextFamily,
  girlyPink,
  lightGirlyPink,
  accentColor
} from 'utils/styles';

export const searchBoxLineHeight = 32;
const searchBoxPadding = 8;
export const searchBoxHeight = searchBoxLineHeight + searchBoxPadding * 2;
export const backButtonWidth = 41;

export const searchContentWrapperStyle = (aliasEditModeOn) => ({
  minHeight: '100vh',
  background: aliasEditModeOn ? lightGirlyPink : 'white',
  fontFamily: sanFranciscoTextFamily
});

export const backButtonStyle = {
  display: 'inline-block',
  fontSize: '13px',
  color: accentColor,
  width: `${backButtonWidth}px`,
  cursor: 'pointer',
  position: 'relative',
  top: '6px'
};

export const searchBoxStyle = (aliasEditModeOn) => ({
  backgroundColor: aliasEditModeOn ? girlyPink : 'white',
  padding: `${searchBoxPadding}px 16px 9px 16px`,
});
