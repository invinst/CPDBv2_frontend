import { softBlackColor, clayGray, greyishColor, brightOrangeTwoColor } from 'utils/styles';


export const wrapperStyle = (borderTop, dashedBorder) => {
  const borderType = dashedBorder ? 'dashed' : 'solid';
  return {
    margin: '0 16px',
    padding: '28px 0 27px 0',
    borderTop: borderTop ? `2px ${borderType} ${greyishColor}` : 'none',
  };
};

export const valueStyle = (active, highlightValue) => ({
  height: '32px',
  lineHeight: '32px',
  fontSize: '26px',
  fontWeight: 500,
  color: highlightValue ? brightOrangeTwoColor : active ? softBlackColor : clayGray,
  textAlign: 'center',
});

export const nameStyle = (active) => ({
  height: '18px',
  lineHeight: '18px',
  paddingTop: '3px',
  fontSize: '14px',
  fontWeight: 500,
  color: active ? softBlackColor : clayGray,
  textAlign: 'center',
});

export const descriptionStyle = {
  height: '14px',
  lineHeight: '14px',
  paddingTop: '2px',
  fontSize: '12px',
  fontWeight: 500,
  color: clayGray,
  textAlign: 'center',
};
