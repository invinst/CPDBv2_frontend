import { lightBlackColor, snowColor } from 'utils/styles';


export const wrapperStyle = (hovering) => ({
  width: '448px',
  padding: '11px 16px 19px 16px',
  boxSizing: 'border-box',
  position: 'relative',
  marginTop: '16px',
  marginLeft: '16px',
  boxShadow: `0 1px 2px 0 ${lightBlackColor}`,
  backgroundColor: hovering ? 'white' : snowColor
});
