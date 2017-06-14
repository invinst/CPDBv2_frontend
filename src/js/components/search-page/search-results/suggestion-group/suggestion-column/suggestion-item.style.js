import {
  softBlackColor, whiteTwoColor, sanFranciscoTextFamily, eggPlantColor, accentColor
} from 'utils/styles';


export const suggestionItemHeight = 65;

export const suggestionItemStyle = {
  padding: '12px 14px',
  borderBottom: `1px solid ${whiteTwoColor}`,
  height: `${suggestionItemHeight}px`,
  width: '443px',
  boxSizing: 'border-box',
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

export const suggestionItemWrapperStyle = (isFocused) => ({
  border: isFocused ? 'solid 1px #ccc': 'none'
});
