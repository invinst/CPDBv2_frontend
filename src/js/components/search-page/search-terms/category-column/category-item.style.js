import { greyishColor, softBlackColor, accentColor, whiteTwoColor } from 'utils/styles';


export const itemStyle = {
  width: '668px',
  fontSize: '14px',
  height: '40px',
  fontWeight: 500,
  borderBottom: `2px solid ${whiteTwoColor}`
};

export const nameStyle = (show, hovering) => ({
  color: show ? softBlackColor : (hovering ? accentColor : greyishColor),
  cursor: 'pointer',
  padding: '11px 0',
});
