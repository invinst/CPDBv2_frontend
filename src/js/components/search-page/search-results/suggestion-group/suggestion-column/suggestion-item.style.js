import {
  softBlackColor, whiteTwoColor, sanFranciscoTextFamily, eggPlantColor, accentColor
} from 'utils/styles';


export const suggestionItemStyle = {
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  width: '415px',
  height: '40px',
  display: 'block',
  textDecoration: 'none'
};

export const metaTextStyle = (hovering) => ({
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : eggPlantColor
});

export const suggestionTextStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : softBlackColor
});

export const tagStyle = (hovering) => ({
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: sanFranciscoTextFamily,
  color: hovering ? accentColor : softBlackColor
});
