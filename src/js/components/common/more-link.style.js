import { softBlackColor, silverSandColor, accentColor } from 'utils/styles';


export const underlineWrapperStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

export const baseCommonStyle = {
  textDecoration: 'none',
  fontWeight: 100,
  position: 'relative',
  lineHeight: 'initial'
};

export const baseStyle = {
  ...baseCommonStyle,
  color: softBlackColor
};

export const baseHoverStyle = {
  ...baseCommonStyle,
  color: accentColor
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

export const underlineHoverStyle = {
  backgroundColor: accentColor
};
