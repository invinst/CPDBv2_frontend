import { sanFranciscoTextFamily, softBlackColor, accentColor, sugarCaneColor } from 'utils/styles';


export const loadMoreButtonStyle = {
  padding: '12px 14px',
  width: '415px',
  cursor: 'pointer',
  backgroundColor: sugarCaneColor
};

export const suggestionTextStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : softBlackColor,
});
