import { accentColor, softBlackColor, fadedAccentColor, concreteColor } from 'utils/styles';

export const columnWrapperStyle = {
  verticalAlign: 'top'
};

export const itemsWrapperStyle = {
  whiteSpace: 'nowrap'
};

export const headerStyle = (isFocused) => ({
  fontSize: '14px',
  fontWeight: 500,
  color: isFocused ? accentColor : softBlackColor,
  padding: '34px 16px 10px 16px',
  textTransform: 'uppercase',
  boxSizing: 'border-box',
  background: isFocused ? fadedAccentColor : concreteColor,
  cursor: 'pointer',
});
