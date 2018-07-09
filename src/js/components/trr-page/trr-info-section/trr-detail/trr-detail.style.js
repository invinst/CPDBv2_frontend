import { whiteTwoColor } from 'utils/styles';


export const wrapperStyle = {
  paddingTop: '11px',
  backgroundColor: 'white',
  fontSize: '14px',
};

export const rowStyle = (borderBottom) => ({
  height: '40px',
  margin: '0 16px',
  borderBottom: borderBottom ? `1px solid ${whiteTwoColor}` : 'none',
});

export const rowTitleItemStyle = {
  width: 'calc((50% - 16px) * 0.34)',
  display: 'inline-block',
};

export const rowValueItemStyle = {
  display: 'inline-block',
};
