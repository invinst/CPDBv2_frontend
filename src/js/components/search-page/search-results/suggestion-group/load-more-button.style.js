import { sanFranciscoTextFamily, softBlackColor, accentColor } from 'utils/styles';


export const loadMoreButtonStyle = {
  padding: '12px 14px',
  width: '415px',
  cursor: 'pointer'
};

export const suggestionTextStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : softBlackColor
});
