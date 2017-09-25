import { altoColor, softBlackColor, greyishColor, accentColor } from 'utils/styles';


export const labelIconStyle = {
  float: 'left',
  textAlign: 'left',
  display: 'inline-block'
};

export const labelsWrapperStyle = {
  float: 'left'
};

export const blankIconStyle = {
  backgroundColor: altoColor,
  width: '32px',
  height: '32px',
  borderRadius: '2px',
  float: 'left',
  display: 'inline-block',
  marginRight: '8px'
};

export const labelStyle = (hovering) => ({
  float: 'left',
  fontSize: '14px',
  height: '18px',
  lineHeight: '18px',
  color: hovering ? accentColor : softBlackColor
});

export const sublabelStyle = (hovering) => ({
  float: 'left',
  fontSize: '12px',
  height: '14px',
  lineHeight: '14px',
  color: hovering ? accentColor : greyishColor
});
