import { clayGray, accentColor, fadedAccentColor, concreteColor } from 'utils/styles';

export const columnWrapperStyle = {
  verticalAlign: 'top'
};

export const itemsWrapperStyle = {
  whiteSpace: 'nowrap'
};

export const headerStyle = (isFocused) => ({
  fontSize: '14px',
  fontWeight: 300,
  color: isFocused ? accentColor : clayGray,
  padding: '34px 0 10px 0',
  textTransform: 'uppercase',
  boxSizing: 'border-box',
  background: isFocused ? fadedAccentColor : concreteColor,
});
