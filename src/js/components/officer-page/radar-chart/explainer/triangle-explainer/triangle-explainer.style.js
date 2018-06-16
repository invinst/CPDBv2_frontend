import { softBlackColor, boulderColor } from 'utils/styles';


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
  padding: '16px 16px 3px',
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
  margin: '7px 0 10px',
  fontWeight: 600,
};

export const textStyle = {
  fontWeight: 300,
  margin: '0 0 18px',
};

export const subTextStyle = {
  color: boulderColor,
  fontWeight: 200,
  margin: 0
};
