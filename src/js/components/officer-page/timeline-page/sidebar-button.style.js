import { sanFranciscoTextFamily, mediumGrayColor, accentColor } from 'utils/styles';

export const buttonStyle = hovering => ({
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  display: 'inline-block',
  cursor: 'pointer',
  color: hovering ? accentColor : mediumGrayColor
});
