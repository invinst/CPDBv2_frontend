import { whiteTwoColor, wildSandColor } from 'utils/styles';


export const tagStyle = (selected) => ({
  display: 'inline-block',
  border: `1px solid ${whiteTwoColor}`,
  padding: '5px 9px',
  marginRight: '2px',
  fontSize: '13px',
  backgroundColor: selected ? whiteTwoColor : wildSandColor,
  cursor: 'pointer',
  borderRadius: '2px'
});

export const dataToolTagStyle = {
  ...tagStyle(false),
  cursor: 'default'
};

export const tagsWrapperHeight = 50;

export const tagsWrapperStyle = {
  padding: '9px 16px',
  height: `${tagsWrapperHeight}px`,
  boxSizing: 'border-box',
  float: 'left'
};
