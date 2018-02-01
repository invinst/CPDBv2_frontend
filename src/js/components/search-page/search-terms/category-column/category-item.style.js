import { greyishColor, softBlackColor, accentColor, whiteTwoColor } from 'utils/styles';


export const itemStyle = (isFocused) => ({
  fontSize: '14px',
  fontWeight: 300,
  borderBottom: `1px solid ${whiteTwoColor}`,
  background: isFocused ? 'red' : 'white',
});

export const nameStyle = (show, hovering) => ({
  color: show ? softBlackColor : (hovering ? accentColor : greyishColor),
  cursor: 'pointer',
  padding: '11px 0',
  lineHeight: '18px',
});
