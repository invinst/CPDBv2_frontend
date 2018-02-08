import { sanFranciscoTextFamily, accentColor, glitterColor, clayGray, whiteTwoColor } from 'utils/styles';


export const loadMoreButtonStyle = (hovering, isFocused) => ({
  backgroundColor: isFocused ? glitterColor : (hovering ? 'white' : 'transparent'),
  padding: '0 16px',
  height: '40px',
  boxSizing: 'border-box',
  cursor: 'pointer',
});

export const loadMoreButtonTextStyle = (hovering, isFocused) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: isFocused ? accentColor : (hovering ? accentColor : clayGray),
  borderBottom: `1px solid ${whiteTwoColor}`,
  padding: '11px 0',
  height: '100%',
  boxSizing: 'border-box',
  textAlign: 'center'
});
