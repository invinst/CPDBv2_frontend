import {
  sanFranciscoTextFamily, whiteTwoColor, softBlackColor
} from 'utils/styles';

export const wrapperStyle = {
  padding: '7px 0',
  margin: '0 16px',
  borderTop: `1px solid ${whiteTwoColor}`,
  boxSizing: 'border-box',
  position: 'relative',
  top: '-1px'
};

export const labelStyle = {
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  color: softBlackColor,
  width: '170px',
  display: 'inline-block',
  fontWeight: 400,
  verticalAlign: 'top',
  paddingTop: '4px'
};

export const contentStyle = {
  display: 'inline-block',
  width: '520px',
  marginLeft: '10px'
};
