import { softBlackColor, boulderColor } from 'utils/styles';

export const tagStyle = (selected) => ({
  display: 'inline-block',
  marginRight: '24px',
  fontSize: '14px',
  cursor: 'pointer',
  color: selected ? softBlackColor : boulderColor,
});

export const dataToolTagStyle = {
  ...tagStyle(false),
  cursor: 'default',
};

const tagsWrapperHeight = 54;

export const tagsWrapperStyle = {
  padding: '16px 0 16px 0',
  height: `${tagsWrapperHeight}px`,
  boxSizing: 'border-box',
  width: '100%',
  overflow: 'hidden',
  display: 'inline-block',
  whiteSpace: 'nowrap',
};
