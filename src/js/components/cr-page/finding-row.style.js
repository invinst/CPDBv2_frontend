import { whiteTwoColor, sanFranciscoTextFamily, greyishColor, softBlackColor } from 'utils/styles';
import { FINDING_COLORS } from 'utils/constants';

export const wrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: `solid 1px ${whiteTwoColor}`
};

export const labelStyle = {
  color: greyishColor,
  fontWeight: 500,
  display: 'inline-block',
  width: '175px',
  padding: '11px 0'
};

export const contentStyle = content => ({
  color: softBlackColor,
  padding: '2px 8px',
  backgroundColor: FINDING_COLORS[content] || 'white'
});
