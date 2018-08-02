import { sanFranciscoTextFamily } from 'utils/styles';


export const panelStyle = top => ({
  position: 'relative',
  top: `${top}px`,
  // left: 'calc(50% + 130px)',
  width: '320px',
  minHeight: '112px',
  background: 'transparent',
  fontFamily: sanFranciscoTextFamily
});
