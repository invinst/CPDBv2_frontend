import { whiteTwoColor, clayGray, softBlackColor, accentColor } from 'utils/styles';


export const wrapperStyle = {
  display: 'inline-block',
  cursor: 'pointer',
};

export const textStyle = {
  fontWeight: 300,
  fontSize: '12px',
  color: clayGray,
  width: '200px',
  height: '14px',
};

export const nameStyle = (hovering) => ({
  fontWeight: 500,
  fontSize: '14px',
  color: hovering ? accentColor : softBlackColor,
  width: '200px',
  height: '18px',
});

export const personaInfoStyle = {
  fontWeight: 300,
  fontSize: '14px',
  color: clayGray,
  width: '200px',
  height: '36px',
};

export const rowDividerStyle = {
  width: '200px',
  border: `solid 1px ${whiteTwoColor}`,
  boxSizing: 'border-box',
  margin: '11px 0',
};
