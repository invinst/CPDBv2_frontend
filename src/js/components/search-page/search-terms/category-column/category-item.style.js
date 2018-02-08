import { greyishColor, softBlackColor, accentColor, whiteTwoColor } from 'utils/styles';


export const itemStyle = {
  fontSize: '14px',
  fontWeight: 300,
  borderBottom: `1px solid ${whiteTwoColor}`
};

export const nameStyle = (show, hovering) => ({
  color: show ? softBlackColor : (hovering ? accentColor : greyishColor),
  cursor: 'pointer',
  padding: '11px 0',
  lineHeight: '18px',
});
