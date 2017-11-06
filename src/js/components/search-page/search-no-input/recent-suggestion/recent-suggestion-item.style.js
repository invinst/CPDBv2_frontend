import {
  softBlackColor, whiteTwoColor, sanFranciscoTextFamily, greyishColor, accentColor
} from 'utils/styles';


export const suggestionItemStyle = {
  padding: '12px 14px 12px 0',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px',
  display: 'block',
  textDecoration: 'none'
};

export const metaTextStyle = (hovering) => ({
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : greyishColor,
  width: '177px',
  display: 'inline-block'
});

export const suggestionTextStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : softBlackColor,
  textDecoration: 'none'
});
