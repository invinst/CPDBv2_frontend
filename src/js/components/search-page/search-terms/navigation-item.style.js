import { clayGray, accentColor } from 'utils/styles';


export const itemStyle = hovering => ({
  color: hovering ? accentColor : clayGray,
  fontSize: '14px',
  marginRight: '16px',
  cursor: 'pointer',
  fontWeight: '500'
});
