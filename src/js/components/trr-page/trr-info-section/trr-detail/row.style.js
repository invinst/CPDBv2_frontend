import { whiteTwoColor, softBlackColor } from 'utils/styles';


export const rowStyle = (borderBottom) => ({
  margin: '0 16px',
  color: softBlackColor,
  fontSize: '14px',
  borderBottom: borderBottom ? `1px solid ${whiteTwoColor}` : 'none',
  boxSizing: 'border-box',
});

export const rowTitleItemStyle = {
  verticalAlign: 'top',
  width: 'calc((50% - 16px) * 0.34)',
  display: 'inline-block',
  padding: '12px 0',
};

export const rowValueItemStyle = (haveBox) => ({
  width: 'calc(83% + 16px * 0.34)',
  display: 'inline-block',
  padding: haveBox ? '8px 0' : '12px 0',
});

export const popupStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  marginLeft: '6px',
};
