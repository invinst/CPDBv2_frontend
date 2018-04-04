import { accentColor, whiteTwoColor, clayGray } from 'utils/styles';


export const subItemStyle = (hovering) => ({
  fontSize: '14px',
  fontWeight: 400,
  padding: '11px 32px 11px 16px',
  color: hovering ? accentColor : clayGray,
  cursor: 'pointer',
  lineHeight: '18px',
  borderBottom: `1px solid ${whiteTwoColor}`,
});
