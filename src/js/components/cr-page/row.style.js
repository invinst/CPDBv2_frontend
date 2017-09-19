import { whiteTwoColor, sanFranciscoTextFamily, greyishColor, softBlackColor } from 'utils/styles';


export const wrapperStyle = (hasBorderBottom) => ({
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: hasBorderBottom ? `solid 1px ${whiteTwoColor}` : '0'
});

export const labelStyle = {
  color: greyishColor,
  fontWeight: 400,
  display: 'inline-block',
  width: '175px',
  padding: '11px 0',
  verticalAlign: 'middle'
};

export const contentStyle = {
  color: softBlackColor,
  verticalAlign: 'middle'
};
