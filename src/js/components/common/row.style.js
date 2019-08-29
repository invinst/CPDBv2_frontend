import { whiteTwoColor, sanFranciscoTextFamily, greyishColor, softBlackColor, accentColor } from 'utils/styles';


export const wrapperStyle = (hasBorderBottom) => ({
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: hasBorderBottom ? `solid 1px ${whiteTwoColor}` : '0',
});

export const labelStyle = (width, hovering) => ({
  color: hovering ? accentColor : greyishColor,
  fontWeight: 400,
  display: 'inline-block',
  width: `${width}px`,
  padding: '11px 0',
  verticalAlign: 'middle',
});

export const contentStyle = (width, hovering) => ({
  color: hovering ? accentColor : softBlackColor,
  verticalAlign: 'middle',
  width: width ? `${width}px` : null,
});
