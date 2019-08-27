import { boulderColor, accentColor, wildSandColor } from 'utils/styles';

const baseStyle = {
  cursor: 'pointer',
  float: 'right',
  borderRadius: '2px',
  height: '18px',
  padding: '4px 9px',
};

export const buttonStyle = {
  base: {
    ...baseStyle,
    color: accentColor,
  },
  hover: {
    ...baseStyle,
    color: accentColor,
    backgroundColor: wildSandColor,
  },
  disabled: {
    ...baseStyle,
    color: boulderColor,
    cursor: 'default',
  },
};
