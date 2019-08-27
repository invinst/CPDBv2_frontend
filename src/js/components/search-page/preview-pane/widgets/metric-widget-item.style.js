import { whiteTwoColor, softBlackColor, brightOrangeTwoColor, boulderColor } from 'utils/styles';


export const wrapperStyle = (isFirst) => ({
  borderRight: isFirst ? `1px solid ${whiteTwoColor}` : 0,
  width: 'calc(50% - 0.5px)',
  height: '144px',
  float: 'left',
  textAlign: 'center',
});


export const valueStyle = (active, isHighlight) => {
  let color = !active ? boulderColor : softBlackColor;
  if (isHighlight && active) {
    color = brightOrangeTwoColor;
  }
  return {
    fontSize: '26px',
    textAlign: 'center',
    color,
    lineHeight: '32px',
    marginTop: '30px',
  };
};

export const nameStyle = (active) => ({
  color: active ? softBlackColor : boulderColor,
  lineHeight: '18px',
});

export const descriptionStyle = {
  fontSize: '12px',
  textAlign: 'center',
  width: '100%',
  lineHeight: '14px',
  color: boulderColor,
  marginTop: '2px',
};
