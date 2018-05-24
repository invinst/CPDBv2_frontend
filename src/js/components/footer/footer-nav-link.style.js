import { clayGray, sanFranciscoTextFamily, accentColor } from 'utils/styles';


export const navStyle = hovering => ({
  display: 'inline-block',
  marginRight: '24px',
  cursor: 'pointer',
  fontWeight: '300',
  textDecoration: 'none',
  color: hovering ? accentColor : clayGray,
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px'
});
