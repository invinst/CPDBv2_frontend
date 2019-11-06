import { softBlackColor, boulderColor } from 'utils/styles';


export const wrapperStyle = {
  width: '320px',
  boxSizing: 'border-box',
  display: 'inline-block',
  verticalAlign: 'top',
};

export const titleStyle = {
  lineHeight: '32px',
  fontSize: '26px',
  fontWeight: 500,
  color: `${softBlackColor}`,
  margin: '48px 16px 16px 16px',
};

export const descriptionStyle = {
  fontSize: '14px',
  fontWeight: 400,
  margin: '7px 16px 16px 16px',
  color: boulderColor,
  height: 'calc(100% - 96px - 40px)',
};
