import {
  greyishColor, softBlackColor, accentColor, whiteTwoColor, concreteColor,
  fadedAccentColor
} from 'utils/styles';


export const itemStyle = (isFocused) => ({
  fontSize: '14px',
  fontWeight: 300,
  borderBottom: `1px solid ${whiteTwoColor}`,
  background: isFocused ? fadedAccentColor : concreteColor,
});

export const nameStyle = (isFocused, show, hovering) => {
  let color;
  if (show)
    color = softBlackColor;
  else if (hovering)
    color = accentColor;
  else if (isFocused)
    color = accentColor;
  else
    color = greyishColor;

  return {
    color,
    cursor: 'pointer',
    padding: '11px 0',
    lineHeight: '18px',
  };
};
