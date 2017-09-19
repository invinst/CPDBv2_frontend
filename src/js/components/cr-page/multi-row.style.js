import { whiteTwoColor, sanFranciscoTextFamily, greyishColor } from 'utils/styles';


export const wrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
};

export const labelStyle = {
  color: greyishColor,
  fontWeight: 400,
  display: 'inline-block',
  width: '175px',
  padding: '11px 0',
  verticalAlign: 'top'
};

export const contentStyle = {
  display: 'inline-block',
  width: 'calc(100% - 175px)',
  marginBottom: '-1px'
};

export const contentRowStyle = {
  borderBottom: `1px solid ${whiteTwoColor}`,
  padding: '11px 0',
  boxSizing: 'border-box',
  verticalAlign: 'middle'
};

export const lastRowStyle = {
  ...contentRowStyle,
  borderBottom: 0
};
