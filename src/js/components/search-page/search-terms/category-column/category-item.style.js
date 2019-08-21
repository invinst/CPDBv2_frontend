import {
  greyishColor, accentColor, whiteTwoColor, concreteColor,
  fadedAccentColor,
} from 'utils/styles';


export const itemStyle = (isFocused) => ({
  fontSize: '14px',
  fontWeight: 300,
  padding: '0 16px',
  background: isFocused ? fadedAccentColor : concreteColor,
});

export const nameStyle = (isFocused, hovering) => {
  let color;
  if (hovering)
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
    borderBottom: `1px solid ${whiteTwoColor}`,
  };
};
