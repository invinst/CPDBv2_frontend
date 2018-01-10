import { clayGray, sugarCaneColor } from 'utils/styles';

export const shareableHeaderHeight = 40;

export const outerStyle = {
  backgroundColor: sugarCaneColor,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 3,
};

export const navBarStyle = {
  height: `${shareableHeaderHeight}px`,
  lineHeight: '22px',
  color: clayGray,
  padding: '0 16px',
  fontSize: '14px',
  fontWeight: 400,
};

export const breadcrumbsStyle = {
  margin: 0,
  padding: 0,
};

export const headerPlaceholderStyle = {
  height: `${shareableHeaderHeight}px`,
  position: 'relative'
};
