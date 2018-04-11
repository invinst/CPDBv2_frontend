import { softBlackColor, clayGray, greyishColor, brightOrangeTwoColor, whiteTwoColor } from 'utils/styles';


export const wrapperStyle = (borderTop, dashedBorder) => {
  const border = dashedBorder ? `1px dotted ${whiteTwoColor}`: `1px solid ${greyishColor}`;
  return {
    margin: '0 16px',
    padding: '28px 0 27px 0',
    borderTop: borderTop ? border : 'none',
  };
};

export const valueStyle = (active, highlightValue) => {
  let color;
  if (active) {
    if (highlightValue) {
      color = brightOrangeTwoColor;
    }
    else {
      color = softBlackColor;
    }
  }
  else {
    color = clayGray;
  }

  return {
    height: '32px',
    lineHeight: '32px',
    fontSize: '26px',
    fontWeight: 400,
    color: color,
    textAlign: 'center',
  };
};

export const nameStyle = (active) => ({
  height: '18px',
  lineHeight: '18px',
  paddingTop: '3px',
  fontSize: '14px',
  fontWeight: 400,
  color: active ? softBlackColor : clayGray,
  textAlign: 'center',
});

export const descriptionStyle = {
  height: '14px',
  lineHeight: '14px',
  paddingTop: '2px',
  fontSize: '12px',
  fontWeight: 300,
  color: clayGray,
  textAlign: 'center',
};
