import { clayGray, whiteTwoColor, accentColor } from 'utils/styles';


export const buttonStyle = (alreadyRequested, hovering, hasData) => ({
  fontSize: '14px',
  fontWeight: 300,
  color: hovering || !hasData ? accentColor : clayGray,
  padding: '5px 6px',
  border: `1px solid ${hovering ? accentColor : whiteTwoColor}`,
  borderRadius: '2px',
  display: 'inline-block',
  cursor: alreadyRequested ? 'default' : 'pointer'
});
