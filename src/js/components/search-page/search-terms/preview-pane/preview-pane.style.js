import { softBlackColor, clayGray } from 'utils/styles';


export const wrapperStyle = {
  position: 'absolute',
  top: '49px',
  right: '0px',
  width: '320px',
  boxSizing: 'border-box',
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
  fontWeight: 500,
  margin: '7px 16px 16px 16px',
  color: clayGray,
  height: 'calc(100% - 96px - 40px)',
};

