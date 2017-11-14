import { whiteTwoColor, softBlackColor, greyishColor } from 'utils/styles';


export const tagStyle = (selected) => ({
  display: 'inline-block',
  marginRight: '24px',
  fontSize: '14px',
  cursor: 'pointer',
  color: selected ? softBlackColor : greyishColor
});

export const dataToolTagStyle = {
  ...tagStyle(false),
  cursor: 'default'
};

export const tagsWrapperHeight = 44;

export const tagsWrapperStyle = {
  padding: '11px 0 11px 0',
  height: `${tagsWrapperHeight}px`,
  boxSizing: 'border-box',
  width: '100%',
  borderBottom: `2px solid ${whiteTwoColor}`,
  borderTop: `2px solid ${whiteTwoColor}`
};
