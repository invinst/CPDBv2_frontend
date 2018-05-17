import { softBlackColor, clayGray } from 'utils/styles';


export const containerStyle = {
  height: '305px',
};

export const radarContainerStyle = {
  height: '100%',
  width: 'calc(224px + (100% - 480px) * 0.5)',
  display: 'inline-block',
};

export const explainerContainerStyle = {
  height: '305px',
  width: 'calc(256px + (100% - 480px) * 0.5)',
  display: 'inline-block',
  backgroundColor: 'white',
  color: softBlackColor,
  fontSize: '14px',
  padding: '16px 16px 6px',
  boxSizing: 'border-box',
  fontWeight: 400,
  verticalAlign: 'top',
  lineHeight: '17px',
  overflow: 'auto',
  textAlign: 'justify',
  textJustify: 'inter-word'
};

export const titleTextStyle = {
  fontSize: '14px',
  margin: '10px 0 10px',
};

export const textStyle = {
  margin: '0 0 18px',
};

export const subTextStyle = {
  color: clayGray,
  margin: 0
};

export const legendStyle = {
  position: 'relative',
  top: '-34px',
  float: 'right',
  right: '18px',
  fontSize: '14px',
  color: softBlackColor,
};
