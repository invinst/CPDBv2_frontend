import { accentColor, whiteTwoColor } from 'utils/styles';


export const defaultMenuStyle = width => ({
  position: 'absolute',
  width: `${width}px`,
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
  zIndex: 10,
});

export const defaultMenuItemStyle = {
  fontSize: '14px',
  color: accentColor,
  backgroundColor: 'white',
  height: '28px',
  lineHeight: '28px',
  cursor: 'pointer',
};
