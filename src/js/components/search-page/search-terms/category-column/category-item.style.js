import { greyishColor, softBlackColor, accentColor } from 'utils/styles';


export const itemStyle = {
  width: '320px',
  fontSize: '14px',
  fontWeight: 500
};

export const nameStyle = (show, hovering) => ({
  color: show ? softBlackColor : (hovering ? accentColor : greyishColor),
  cursor: 'pointer',
  padding: '7px 0'
});
