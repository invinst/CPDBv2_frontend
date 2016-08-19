import { softBlackColor, silverSandColor } from 'utils/styles';


export const underlineWrapperStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

export const baseStyle = {
  color: softBlackColor,
  textDecoration: 'none',
  fontWeight: 300,
  position: 'relative',
  lineHeight: 'initial'
};

export const underlineStyle = {
  backgroundColor: silverSandColor,
  display: 'inline-block',
  width: '100%',
  height: '4px',
  bottom: '-4px',
  position: 'relative',
  verticalAlign: 'baseline'
};
