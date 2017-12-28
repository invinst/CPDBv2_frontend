import { sanFranciscoTextFamily, accentColor, greyishColor, whiteTwoColor } from 'utils/styles';


export const loadMoreButtonStyle = {
  padding: '0 16px',
  height: '40px',
  boxSizing: 'border-box',
  cursor: 'pointer',
};

export const loadMoreButtonTextStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : greyishColor,
  backgroundColor: hovering ? 'white' : 'transparent',
  borderBottom: `1px solid ${whiteTwoColor}`,
  padding: '11px 0',
  height: '100%',
  boxSizing: 'border-box',
  textAlign: 'center'
});
