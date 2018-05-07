import { clayGray, sugarCaneColor, gainsboroColor } from 'utils/styles';
import { imgUrl } from 'utils/static-assets';
import { breadcrumbItemStyle } from 'components/headers/shareable-header/breadcrumbs-item.style';

export const shareableHeaderHeight = 40;

export const outerStyle = {
  backgroundColor: sugarCaneColor,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 3,
  boxShadow: `0 1px 1px 0 ${gainsboroColor}`
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
export const breadcrumbSeparatorStyle = {
  ...breadcrumbItemStyle,
  padding: '2px 8px 0 0',
  height: '12px',
  width: '7.4px',
  background: `url(${imgUrl('disclosure-indicator.svg')}) no-repeat scroll`,
  verticalAlign: 'middle',
};

export const headerPlaceholderStyle = {
  height: `${shareableHeaderHeight}px`,
  position: 'relative'
};
