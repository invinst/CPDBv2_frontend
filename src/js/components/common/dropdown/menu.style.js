import { accentColor, whiteTwoColor } from 'utils/styles';
import { defaultHeight } from './dropdown.style';


export const defaultMenuStyle = {
  position: 'absolute',
  width: '146px',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
};
export const defaultMenuItemStyle = {
  fontSize: '14px',
  color: accentColor,
  backgroundColor: 'white',
  height: `${defaultHeight}px`,
  lineHeight: `${defaultHeight}px`,
  cursor: 'pointer',
};
