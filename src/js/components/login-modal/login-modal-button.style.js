import { mediumGrayColor, accentColor, wildSandColor } from 'utils/styles';

const baseStyle = {
  cursor: 'pointer',
  float: 'right',
  borderRadius: '2px',
  height: '18px',
  padding: '4px 9px'
};

export const buttonStyle = {
  base: {
    ...baseStyle,
    color: mediumGrayColor
  },
  hover: {
    ...baseStyle,
    color: accentColor,
    backgroundColor: wildSandColor
  }
};
